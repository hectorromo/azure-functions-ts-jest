import { AzureFunction, Context } from "@azure/functions";
import { createHttpTrigger, runStubFunctionFromBindings } from "stub-azure-function-context";

interface RequestData {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url?: string,
    headers?: object,
    params?: object,
    body?: any,
    query?: object,
    originalUrl?: string,
    rawBody?: any
}

export async function mockedRequestFactory(trigger: AzureFunction, requestData: RequestData): Promise<Context> {
    const defaults = {
        method: 'GET',
        url: "http://localhost:7071",
        headers: {},
        params: {},
        body: undefined,
        query: {}
    }
    const data = Object.assign(defaults, requestData)

    data

    return runStubFunctionFromBindings(
        trigger,
        [
            {
                type: 'httpTrigger',
                name: 'req',
                direction: 'in',
                data: createHttpTrigger(data.method, data.url, data.headers, data.params, data.body, data.query),
            },
            {
                type: "http",
                direction: "out",
                name: "res"
            }
        ],
        new Date(),
    )
}