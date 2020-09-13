/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
interface DnsPrefetchControlOptions {
    allow?: boolean;
}
declare const _default: (options?: DnsPrefetchControlOptions | undefined) => (_req: IncomingMessage, res: ServerResponse, next: () => void) => void;
export = _default;
