"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configuration_1 = require("./Configuration");
exports.Configuration = Configuration_1.Configuration;
const Server_1 = require("./Server");
exports.Server = Server_1.Server;
const SocketProvider_1 = require("./SocketProvider");
exports.SocketProvider = SocketProvider_1.SocketProvider;
const commands = require("./commands");
exports.commands = commands;
const path = require("path");
const fs = require("fs");
function nearestWorkspace(file, parent) {
    var result = null;
    var cursor = path.dirname(file);
    if (parent == cursor) {
        result = cursor;
    }
    else {
        var root = parent || cursor;
        while (cursor.startsWith(root)) {
            var sy = path.join(cursor, '.solargraph.yml');
            if (fs.existsSync(sy) && fs.lstatSync(sy).isFile()) {
                result = cursor;
                break;
            }
            cursor = path.dirname(cursor);
        }
        if (!result)
            result = parent;
    }
    return result;
}
exports.nearestWorkspace = nearestWorkspace;
function verifyGemIsInstalled(configuration) {
    return new Promise((resolve, reject) => {
        var solargraphTest = commands.solargraphCommand(['help'], configuration);
        solargraphTest.on('exit', (code) => {
            if (code == 0) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
        solargraphTest.on('error', (err) => {
            console.log(err);
            resolve(false);
        });
    });
}
exports.verifyGemIsInstalled = verifyGemIsInstalled;
function verifyGemIsCurrent(configuration) {
    return new Promise((resolve, reject) => {
        let child = commands.gemCommand(['outdated'], configuration);
        let result = "\n";
        child.stdout.on('data', (data) => {
            result += data.toString();
        });
        child.on('exit', (code) => {
            if (code == 0) {
                if (result.match(/[\s]solargraph[\s]/)) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            }
            else {
                reject();
            }
        });
    });
}
exports.verifyGemIsCurrent = verifyGemIsCurrent;
function writeConfigFile(configuration) {
    return new Promise((resolve, reject) => {
        var child = commands.solargraphCommand(['config', '.'], configuration);
        child.on('exit', (code) => {
            if (code == 0) {
                resolve(true);
            }
            else {
                reject(false);
            }
        });
    });
}
exports.writeConfigFile = writeConfigFile;
function updateGemDocumentation(configuration) {
    console.log('Updating gem yardocs');
    commands.yardCommand(['gems'], configuration);
}
exports.updateGemDocumentation = updateGemDocumentation;
function installGem(configuration) {
    return new Promise((resolve, reject) => {
        var child = commands.gemCommand(['install', 'solargraph'], configuration);
        child.on('exit', (code) => {
            if (code == 0) {
                resolve(true);
            }
            else {
                reject(false);
            }
        });
    });
}
exports.installGem = installGem;
function updateGem(configuration) {
    return new Promise((resolve, reject) => {
        var child = commands.gemCommand(['update', 'solargraph'], configuration);
        child.on('exit', (code) => {
            if (code == 0) {
                resolve(true);
            }
            else {
                reject(false);
            }
        });
    });
}
exports.updateGem = updateGem;
//# sourceMappingURL=index.js.map