const { User } = require("../models");
const { compareHashedPassword } = require("../helpers/bcryptjs");
const { signJWT } = require("../helpers/jwt");

class userController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        statusCode: 201,
        message: "User created successfully",
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        phoneNumber: newUser.phoneNumber,
        address: newUser.address,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw {
          code: 401,
          msg: "Email/ password cannot be empty",
        };
      }
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!foundUser) {
        throw {
          code: 401,
          msg: "Invalid email/ password",
        };
      }

      if (foundUser.role === "Customer") {
        throw {
          code: 403,
          msg: "Customer has no access",
        };
      }
      const comparePassword = compareHashedPassword(
        foundUser.password,
        password
      );
      if (!comparePassword) {
        throw {
          code: 401,
          msg: "Invalid email/ password",
        };
      }
      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      };
      const token = signJWT(payload);

      res.status(200).json({
        statusCode: 200,
        message: "User logged in successfully",
        access_token: token,
        id: foundUser.id,
        email: foundUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = userController;
