"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cmd = require("./commands");
const request = require("request");
const timers_1 = require("timers");
class Server {
    constructor(config) {
        this.child = null;
        this._port = null;
        this.pid = null;
        this.configure(config);
    }
    isRunning() {
        return (this.child != null && this.port != null && this.pid != null);
    }
    get port() {
        return this._port;
    }
    get url() {
        return 'http://localhost:' + this.port;
    }
    configure(config) {
        this.configuration = config;
    }
    start() {
        return new Promise((resolve, reject) => {
            var started = false;
            if (this.child) {
                console.warn('There is already a process running for the Solargraph server.');
            }
            else {
                console.log('Starting the server');
                var args = ['server', '--port', '0'];
                if (this.configuration.viewsPath) {
                    args.push('--views', this.configuration.viewsPath);
                }
                this.child = cmd.solargraphCommand(args, this.configuration);
                this.child.stderr.on('data', (data) => {
                    var out = data.toString();
                    console.log(out);
                    if (!this.port) {
                        var match = out.match(/port=([0-9]*)/);
                        if (match) {
                            this._port = parseInt(match[1]);
                        }
                        match = out.match(/pid=([0-9]*)/);
                        if (match) {
                            this.pid = parseInt(match[1]);
                        }
                    }
                    if (this.isRunning() && !started) {
                        started = true;
                        resolve();
                    }
                });
                this.child.on('exit', () => {
                    this._port = null;
                    if (!started) {
                        reject();
                    }
                });
            }
        });
    }
    update(filename, workspace) {
        return new Promise((resolve, reject) => {
            request.post({ url: this.url + '/update', form: {
                    filename: filename,
                    workspace: workspace
                } }, function (err, httpResponse, body) {
                if (err) {
                    reject();
                }
                else {
                    if (httpResponse.statusCode == 200) {
                        resolve(JSON.parse(body));
                    }
                    else {
                        reject('Server responded with ' + httpResponse.statusCode);
                    }
                }
            });
        });
    }
    stop() {
        if (!this.child) {
            console.warn('The server is not running.');
        }
        else {
            this.child.kill();
            if (this.pid) {
                process.kill(this.pid);
            }
            this.pid = null;
            this._port = null;
            this.child = null;
        }
    }
    restart() {
        this.stop();
        return this.start();
    }
    wait() {
        return new Promise((resolve) => {
            if (this.isRunning()) {
                resolve(true);
            }
            else {
                var interval = setInterval(() => {
                    if (this.isRunning()) {
                        timers_1.clearInterval(interval);
                        resolve(true);
                    }
                }, 100);
            }
        });
    }
    post(path, params) {
        return new Promise((resolve, reject) => {
            //let prepareStatus = vscode.window.setStatusBarMessage('Analyzing Ruby code in workspace ' + workspace);
            request.post({
                url: this.url + path,
                form: params
            }, function (err, response, body) {
                if (err) {
                    reject();
                }
                else {
                    if (response.headers['content-type'] && response.headers['content-type'].includes('json')) {
                        resolve(JSON.parse(body));
                    }
                    else {
                        resolve(body);
                    }
                }
            });
        });
    }
    prepare(workspace) {
        return new Promise((resolve, reject) => {
            //let prepareStatus = vscode.window.setStatusBarMessage('Analyzing Ruby code in workspace ' + workspace);
            request.post({ url: this.url + '/prepare', form: {
                    workspace: workspace
                } }, function (err, response, body) {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    suggest(text, line, column, filename, workspace, withSnippets) {
        return new Promise((resolve, reject) => {
            if (this.isRunning()) {
                request.post({ url: this.url + '/suggest', form: {
                        text: text,
                        line: line,
                        column: column,
                        filename: filename || null,
                        workspace: workspace || null,
                        with_snippets: withSnippets || false
                    }
                }, function (err, httpResponse, body) {
                    if (err) {
                        reject({ status: "err", message: err });
                    }
                    else {
                        if (httpResponse.statusCode == 200) {
                            resolve(JSON.parse(body));
                        }
                        else {
                            reject('Server responded with ' + httpResponse.statusCode);
                        }
                    }
                });
            }
            else {
                reject({ status: "err", message: "The server is not running" });
            }
        });
    }
    define(text, line, column, filename, workspace) {
        return new Promise((resolve, reject) => {
            if (this.isRunning()) {
                request.post({ url: this.url + '/hover', form: {
                        text: text,
                        line: line,
                        column: column,
                        filename: filename || null,
                        workspace: workspace || null
                    } }, function (err, httpResponse, body) {
                    if (err) {
                        // TODO Handle error
                        reject(err);
                    }
                    else {
                        if (httpResponse.statusCode == 200) {
                            resolve(JSON.parse(body));
                        }
                        else {
                            reject('Server responded with ' + httpResponse.statusCode);
                        }
                    }
                });
            }
            else {
                // TODO Handle error
                reject();
            }
        });
    }
    hover(text, line, column, filename, workspace) {
        return this.define(text, line, column, filename, workspace);
    }
    resolve(path, workspace) {
        return new Promise((resolve, reject) => {
            if (this.isRunning()) {
                request.post({ url: this.url + '/resolve', form: {
                        path: path,
                        workspace: workspace || null
                    } }, function (err, httpResponse, body) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (httpResponse.statusCode == 200) {
                            resolve(JSON.parse(body));
                        }
                        else {
                            reject('Server responded with ' + httpResponse.statusCode);
                        }
                    }
                });
            }
            else {
                // TODO Handle error
                reject();
            }
        });
    }
    signify(text, line, column, filename, workspace) {
        return new Promise((resolve, reject) => {
            if (this.isRunning()) {
                request.post({ url: this.url + '/signify', form: {
                        text: text,
                        filename: filename || null,
                        line: line,
                        column: column,
                        workspace: workspace || null
                    }
                }, function (err, httpResponse, body) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (httpResponse.statusCode == 200) {
                            resolve(JSON.parse(body));
                        }
                        else {
                            // TODO: Handle error
                        }
                    }
                });
            }
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map