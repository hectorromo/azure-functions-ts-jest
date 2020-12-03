import { mockedRequestFactory } from "../testing/mockedRequestFactory";

import httpTrigger from "./index";

describe("UserPost", () => {
    it("Should return the new user when creating.", async () => {
        const user = { name: "Sven", email: "sven@frozen.com" };
        const context = await mockedRequestFactory(httpTrigger, { body: user })

        expect(context.res.statusCode).toBe(200);
        expect(context.res.body).toMatchObject(user);
    })

    it("Should return 400 if user data is bad", async () => {
        const user = { name: "Sven", age: 55 };
        const context = await mockedRequestFactory(httpTrigger, { body: user })

        expect(context.res.statusCode).toBe(400);
        expect(context.res.body).toContain("ValidationError");
    });

    it("Should return 400 if there is no user data", async () => {
        const context = await mockedRequestFactory(httpTrigger, null)

        expect(context.res.statusCode).toBe(400);
        expect(context.res.body).toContain("ValidationError");
    });
})