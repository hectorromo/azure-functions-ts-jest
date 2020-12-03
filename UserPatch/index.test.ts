import { mockedRequestFactory } from "../testing/mockedRequestFactory";
import { User } from "../shared/models";

import httpTrigger from "./index";

describe("UserPatch", () => {
    const users = [
        { name: "Elsa", email: "elsa@frozen.com" },
        { name: "Olaf", email: "olaf@frozen.com" }
    ]
    let userId;

    beforeEach(async () => {
        // Create a single user to save its ID as ref.
        const newUser: any = new User({ name: "Anna", email: "anna@frozen.com" });
        const user = await newUser.save(); // ? 
        userId = user._id; //?
    })

    afterEach(async () => {
        // Remove all inserted users after each test
        await User.deleteMany({})
    })

    it("Should fail if user data is bad", async () => {
        const user = { email: "blablablb@sdf.se" }; // email can't be updated
        const context = await mockedRequestFactory(httpTrigger, { body: user, params: { id: userId } })

        expect(context.res.statusCode).toBe(400);
        expect(context.res.body).toContain("");
    });

    it("Should return updated user if updates successfully", async () => {
        const user = { name: "Sven" };
        const context = await mockedRequestFactory(httpTrigger, { body: user, params: { id: userId } })

        expect(context.res.statusCode).toBe(200);
        expect(context.res.body).toMatchObject(user);
    });
})