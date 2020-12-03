import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { User } from "../shared/models";
import { responseFactory } from "../shared/responseFactory";
import HttpError from "../shared/error";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        if (!context.req.params.id) {
            throw new HttpError(400, "Id parameter is missing");
        }

        const user = await User.findOne({ _id: req.params.id }); //?
        responseFactory(context, user, 200)
    } catch (err) {
        responseFactory(context, err.message, err.status);
    }
};

export default httpTrigger;