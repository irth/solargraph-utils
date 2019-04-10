export declare class Configuration {
    private _workspace;
    private _useBundler;
    private _useWSL;
    private _bundlerPath;
    private _commandPath;
    private _withSnippets;
    private _viewsPath;
    constructor(workspace?: string, useBundler?: Boolean, bundlerPath?: string, commandPath?: string, withSnippets?: Boolean, viewsPath?: string, useWSL?: Boolean);
    workspace: string;
    useBundler: Boolean;
    useWSL: Boolean;
    bundlerPath: string;
    commandPath: string;
    withSnippets: Boolean;
    viewsPath: string;
}
