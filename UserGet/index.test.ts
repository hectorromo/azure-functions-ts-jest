import { mockedRequestFactory } from "../testing/mockedRequestFactory";
import { User } from "../shared/models";

import httpTrigger from "./index";

describe("UserGet", () => {
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

        // Insert users
        await User.insertMany(users);
    })

    afterEach(async () => {
        // Remove all inserted users after each test
        // await User.remove({});
        await User.deleteMany({})
    })


    // *** Init tests ***

    it("Should return a user", async () => {
        const context = await mockedRequestFactory(httpTrigger, { params: { id: userId } });

        expect(context.res.body).toMatchObject({ "_id": userId, name: "Anna", email: "anna@frozen.com" });
    });

    it("Should return 400 if no id is passed.", async () => {
        const context = await mockedRequestFactory(httpTrigger, null);

        expect(context.res.statusCode).toBe(400);
        expect(context.res.body).toContain("Id parameter");
    });
})