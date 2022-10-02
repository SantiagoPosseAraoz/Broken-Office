const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: [validator.default.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    minlength: [7, "Minimun password length is 7 characters"],
  },
  tel: {
    type: Number,
  },
  companyRole: {
    type: String,
    default: "none",
  },
  salt: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  picture: {
    type: String,
  },
});

// Schema Hook => has de la password y creacion del salt del usuario
UserSchema.pre("save", async function () {
  if (!this.salt && this.password) {
    this.salt = bcrypt.genSaltSync();
    return (this.password = await bcrypt.hash(this.password, this.salt));
  }
});

UserSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt
    .hash(password, this.salt)
    .then((newHash) => newHash === this.password);
};

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", UserSchema);
