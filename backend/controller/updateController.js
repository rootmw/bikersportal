import userModel from "../models/userModel.js";
import profileModel from "../models/profileModel.js";
export const updateUserController = async (req, res, next) => {
  try {
    const { username, age, email, mobile_No, address, hobbies } = req.body;
    if (!username || !age || !mobile_No) {
      next("Please Provide All Fields");
    }
    const user = await userModel.findOne({ userId: req.user.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingUser = await profileModel.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "please choose a different username" });
    }

    user.username = username;
    user.age = age;
    user.email = email;
    user.mobile_No = mobile_No;
    user.address = address;
    user.hobbies = hobbies;

    await user.save();

    let profile = await profileModel.findOne({ userId: req.user.userId });
    if (!profile) {
      // If profile doesn't exist, create a new one
      profile = new profileModel({
        userId: req.user.userId,
        username,
        age,
        email,
        mobile_No,
        address,
        hobbies,
        // Other fields
      });
    } else {
      // Update existing profile
      profile.username = username;
      profile.age = age;
      profile.email = email;
      profile.mobile_No = mobile_No;
      profile.address = address;
      profile.hobbies = hobbies;
      // Update other profile fields as needed
    }
    await profile.save();
    const token = user.generateAuthToken();
    res.status(200).json({
      profile,
      token,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default updateUserController;
