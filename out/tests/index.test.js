"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const solargraph = require("../index");
const path = require("path");
const os_1 = require("os");
// suite('Server', () => {
//     let configuration:solargraph.Configuration = new solargraph.Configuration();
//     let server:solargraph.Server = new solargraph.Server(configuration);
//     it('starts', (done) => {
//         expect(server.isRunning()).to.equal(false);
//         server.start().then(() => {
//             expect(server.isRunning()).to.equal(true);
//         }).then(done, done);
//     });
//     /*it('restarts', (done) => {
//         server.restart().then(() => {
//             expect(server.isRunning()).to.equal(true);
//         }).then(done, done);
//     });*/
//     it('returns suggestions', (done) => {
//         server.suggest('String.n', 0, 7, 'file.rb').then((response) => {
//             expect(response['suggestions'].length).to.be.above(0);
//         }).then(done, done);
//     });
//     it('returns hover info', (done) => {
//         server.hover('String', 0, 1, 'file.rb').then((response) => {
//             expect(response['suggestions'].length).to.be.above(0);
//         }).then(done, done);
//     });
//     it('returns signature info', (done) => {
//         server.signify('String.new()', 0, 11, 'file.rb').then((response) => {
//             expect(response['suggestions'].length).to.be.above(0);
//         }).then(done, done);
//     });
//     it('stops', () => {
//         server.stop();
//         expect(server.isRunning()).to.equal(false);
//     });
// });
suite('solargraphCommand', () => {
    let configuration = new solargraph.Configuration();
    it('works with the default command path', (done) => {
        let child = solargraph.commands.solargraphCommand(['-v'], configuration);
        let output = '';
        child.stdout.on('data', (buffer) => {
            output += buffer.toString();
        });
        child.on('exit', () => {
            chai_1.expect(output).not.to.equal('');
            done();
        });
    });
    it('works with a custom command path', (done) => {
        let cmd = 'solargraph';
        if ((os_1.platform().match(/darwin|linux/))) {
            cmd += '.rb';
        }
        else {
            cmd += '.bat';
        }
        configuration.commandPath = path.resolve('.', 'src', 'tests', 'bin', cmd);
        let child = solargraph.commands.solargraphCommand(['-v'], configuration);
        let output = '';
        child.stdout.on('data', (buffer) => {
            output += buffer.toString();
        });
        child.on('exit', () => {
            chai_1.expect(output).not.to.equal('');
            done();
        });
    });
});
suite('SocketProvider', () => {
    let configuration = new solargraph.Configuration();
    let provider = new solargraph.SocketProvider(configuration);
    it('starts', (done) => {
        chai_1.expect(provider.isListening()).to.equal(false);
        provider.start().then(() => {
            chai_1.expect(provider.isListening()).to.equal(true);
        }).then(done, done);
    });
    it('opens a port', () => {
        chai_1.expect(provider.port).to.be.above(0);
    });
    it('restarts', (done) => {
        provider.restart().then(() => {
            chai_1.expect(provider.isListening()).to.equal(true);
        }).then(done, done);
    });
    it('opens another port', () => {
        chai_1.expect(provider.port).to.be.above(0);
    });
    it('stops', () => {
        provider.stop();
        chai_1.expect(provider.isListening()).to.equal(false);
    });
});
//# sourceMappingURL=index.test.js.map