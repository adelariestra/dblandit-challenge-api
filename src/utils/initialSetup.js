import User from "../models/User";

const createDefaultUser = async () => {
    // check for an existing admin user
    const user = await User.findOne({ username: "admin" });

    if (!user) {
        const userCreated = new User({
            username: "admin",
            password: await User.encryptPassword("admin")
        });
        await userCreated.save()
    }
    console.log("Initial setup done");
};

export default createDefaultUser;