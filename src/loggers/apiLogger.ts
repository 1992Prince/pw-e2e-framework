
export class APILogger {

    private recentLogs: any[] = []; // Store recent logs

    // body can be optional as GET requests may not have body so added ? before it
    // some requests like post, put will have body and some like get and delete will not have body
    logRequest(method: string, url: string, headers: Record<string, string>, reqbody?: any) {
        const logEntry = { method, url, headers, reqbody };
        this.recentLogs.push({ type: "Request Details", data: logEntry });

    }

    logResponse(statusCode: number, respbody?: any) {
        const logEntry = { statusCode, respbody };
        this.recentLogs.push({ type: "Response Details", data: logEntry });

    }

    getRecentLogs() {
        const logs = this.recentLogs.map(log => {
            return `======${log.type}======\n${JSON.stringify(log.data, null, 4)}`;
        }).join('\n\n')

        return logs;
    }
}
