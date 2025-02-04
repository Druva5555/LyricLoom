const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// POST route for user login
router.post("/", async (req, res) => {
  try {
    // Check if both email and password are provided
    if (req.body.email && req.body.password) {
      const { error } = validateLogin(req.body); // Validate the request body
      if (error)
        return res.status(400).send({ message: error.details[0].message });

      // Find user by email
      let user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(400).send({ message: "Invalid Email or Password" });

      // Check if password is valid
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid Email or Password" });

      // Check if the user is verified 
      if (!user.verified) {
        return res
          .status(400)
          .send({ message: "Please verify your account before logging in." });
      }

      // Generate an authentication token for the user
      const authToken = user.generateAuthToken();

      // Return user data and token upon successful login
      return res
        .status(200)
        .send({ data: user, authToken, message: "Logged in successfully" });
    } else {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// Validate function for validating email and password input
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
