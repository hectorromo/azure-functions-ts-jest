import { Context } from "@azure/functions";

export interface FunctionResponse {
    statusCode: number
    body: string
    headers: Record<string, string>
}

export function responseFactory(context: Context, body: any, httpCode = 200): FunctionResponse {
    const response: FunctionResponse = {
        statusCode: httpCode,
        // body: JSON.stringify(body),
        body,
        headers: {
            'content-type': 'application/json; charset=utf-8',
        },
    }
    context.res = response;

    return response;
}