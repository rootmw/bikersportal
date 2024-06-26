import userModel from "../models/userModel.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.username) {
      const existingUser = await userModel.findOne({
        username: updates.username,
      });
      if (
        existingUser &&
        existingUser._id.toString() !== req.user._id.toString()
      ) {
        return res.status(400).json({ message: "Username already exists" });
      }
    }
    const user = await userModel
      .findByIdAndUpdate(req.user._id, updates, {
        new: true,
        runValidators: true,
      })
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = user.generateAuthToken();
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default { getProfile, updateProfile };
