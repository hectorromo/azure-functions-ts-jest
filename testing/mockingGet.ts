import { AzureFunction, Context } from "@azure/functions";
import { createHttpTrigger, runStubFunctionFromBindings } from "stub-azure-function-context";

// Argumtents:
// createHttpTrigger(
//     method = 'GET', 
//     url = 'http://example.com/', 
//     headers = {}, 
//     params = {}, 
//     body, 
//     query = {}, 
//     originalUrl, 
//     rawBody
// )

// GET method
export async function mockedRequestFactory(trigger: AzureFunction, params: object = {}, query: object = {}): Promise<Context> {
    return runStubFunctionFromBindings(
        trigger,
        [
            {
                type: 'httpTrigger',
                name: 'req',
                direction: 'in',
                data: createHttpTrigger(
                    'GET',
                    'http://localhost:7071',
                    {},
                    params,
                    undefined, // body
                    query, // query
                ),
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