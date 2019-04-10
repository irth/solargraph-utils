"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Configuration {
    constructor(workspace = null, useBundler = false, bundlerPath = "bundle", commandPath = 'solargraph', withSnippets = false, viewsPath = null, useWSL = false) {
        this._workspace = workspace;
        this._useBundler = useBundler;
        this._useWSL = useWSL;
        this._bundlerPath = bundlerPath;
        this._commandPath = commandPath;
        this._withSnippets = withSnippets;
        this._viewsPath = viewsPath;
    }
    get workspace() {
        return this._workspace;
    }
    set workspace(path) {
        this._workspace = path;
    }
    get useBundler() {
        return this._useBundler;
    }
    set useBundler(bool) {
        this._useBundler = bool;
    }
    get useWSL() {
        return this._useWSL;
    }
    set useWSL(bool) {
        this._useWSL = bool;
    }
    get bundlerPath() {
        return this._bundlerPath;
    }
    set bundlerPath(path) {
        this._bundlerPath = path;
    }
    get commandPath() {
        return this._commandPath;
    }
    set commandPath(path) {
        this._commandPath = path;
    }
    get withSnippets() {
        return this._withSnippets;
    }
    set withSnippets(bool) {
        this._withSnippets = bool;
    }
    get viewsPath() {
        return this._viewsPath;
    }
    set viewsPath(path) {
        this._viewsPath = path;
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map