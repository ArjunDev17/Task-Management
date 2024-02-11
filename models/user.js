const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { emailRegex,
   mobileRegex, 
   strongPasswordRegex,
   
  } = require('../constant/userConst');

const userSchema = new mongoose.Schema(
  {
    name: {
      first: {
        type: String,
        required: true,
      },
      last: {
        type: String,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          // Use the defined regex for email validation
          return emailRegex.test(value);
        },
        message: "Invalid email address.",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Use the defined regex for strong password validation
          return strongPasswordRegex.test(value);
        },
        message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      },
    },
    mobile: {
      type: String,
      validate: {
        validator: function (value) {
          // Use the defined regex for mobile number validation
          return mobileRegex.test(value);
        },
        message: "Invalid mobile number. It should be a 10-digit numeric code.",
      },
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      number: {
        type: String,
      },
      pincode: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            // Use the defined regex for PIN code validation
            return /^\d{6}$/.test(value);
          },
          message: "Invalid PIN code. It should be a 6-digit numeric code.",
        },
      },
      district: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
