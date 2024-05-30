import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { firstname, lastname, email, password, role } = req.body;
  //validate

  if (!firstname) {
    next("please provide first name");
  }
  if (!lastname) {
    next("please provide last name");
  }
  if (!email) {
    next("please provide email");
  }
  if (!password) {
    next("please provide password and greaterr than 6 characters");
  }
  if (!role) {
    next("please provide your role");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email already registered Please Login");
  }
  if (password.length < 6) {
    next("password should be greater than 6 characters");
  }
  const user = await userModel.create({
    firstname,
    lastname,
    email,
    password,
    role,
  });
  const token = user.generateAuthToken();
  res.status(201).send({
    success: true,
    message: "user created successfully",
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    },
    token,
  });
};
export default registerController;

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("Please Provide All Fields");
  }
  //find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid Useraname or password");
  }
  //compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid Useraname or password");
  }
  user.password = undefined;
  const token = user.generateAuthToken();
  res.status(200).json({
    success: true,
    message: "Login SUccessfully",
    user,
    token,
  });
};
