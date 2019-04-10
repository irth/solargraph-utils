/// <reference types="node" />
import { Configuration } from './Configuration';
import { ChildProcess } from 'child_process';
export declare class SocketProvider {
    private configuration;
    private child;
    private listening;
    private _port;
    private _pid;
    constructor(configuration: Configuration);
    start(): Promise<void>;
    stop(): void;
    restart(): Promise<void>;
    isListening(): Boolean;
    readonly port: number;
    readonly process: ChildProcess;
}