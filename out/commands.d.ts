/// <reference types="node" />
import * as child_process from 'child_process';
import { Configuration } from './Configuration';
export declare function solargraphCommand(args: string[], configuration: Configuration): child_process.ChildProcess;
export declare function gemCommand(args: string[], configuration: Configuration): child_process.ChildProcess;
export declare function yardCommand(args: string[], configuration: Configuration): child_process.ChildProcess;