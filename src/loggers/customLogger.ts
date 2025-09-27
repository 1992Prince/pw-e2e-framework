export class customLogger {


    private timestamp(): string {
        return new Date().toISOString();
    }


    info(message: string, ...args: any[]) {
        console.info(`\x1b[34m[${this.timestamp()}] INFO: ${message}`, ...args);
    }

    // info(message: string, ...args: any[]) {
    //     console.log(`\x1b[34m[${this.timestamp()}] INFO: ${message}`, ...args);
    // }


    error(message: string, ...args: any[]) {
        console.error(`\x1b[31m[${this.timestamp()}] ERROR: ${message}`, ...args);
    }


    warn(message: string, ...args: any[]) {
        console.warn(`\x1b[33m[${this.timestamp()}] WARN: ${message}`, ...args);
    }

    debug(message: string, ...args: any[]) {
        console.log(`\x1b[32m[${this.timestamp()}] WARN: ${message}`, ...args);
    }
}


