import { Configuration } from './Configuration';
export declare class Server {
    private child;
    private _port;
    private pid;
    private configuration;
    constructor(config: Configuration);
    isRunning(): Boolean;
    readonly port: number;
    readonly url: string;
    configure(config: Configuration): void;
    start(): Promise<Object>;
    update(filename: string, workspace?: string): Promise<Object>;
    stop(): void;
    restart(): Promise<Object>;
    wait(): Promise<Boolean>;
    post(path: string, params: any): Promise<any>;
    prepare(workspace: string): Promise<Object>;
    suggest(text: string, line: number, column: number, filename?: string, workspace?: string, withSnippets?: boolean): Promise<Object>;
    define(text: string, line: number, column: number, filename?: string, workspace?: string): Promise<Object>;
    hover(text: string, line: number, column: number, filename?: string, workspace?: string): Promise<Object>;
    resolve(path: string, workspace?: string): Promise<Object>;
    signify(text: string, line: number, column: number, filename?: string, workspace?: string): Promise<Object>;
}
