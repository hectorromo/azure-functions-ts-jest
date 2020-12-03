import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as Joi from 'joi';

import { User } from "../shared/models";
import { responseFactory } from "../shared/responseFactory";
import HttpError from "../shared/error";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        // Body validation
        const validated = validation(req.body)
        if (validated.error) {
            throw new HttpError(400, validated.error.toString());
        };

        const user = await User.create(context.req.body); //?
        responseFactory(context, user, 200)
    } catch (err) {
        responseFactory(context, err.message, err.status);
    }
};

export default httpTrigger;


function validation(dataToValidate): Joi.ValidationResult {
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
    }).required();

    const result = schema.validate(dataToValidate);
    return result;
}