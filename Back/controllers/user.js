const User = require("../models/User");

const { generateToken } = require("../config/token");
const Reports = require("../models/Reports");
const webpush = require("../webpush")

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgmprcco9",
  api_key: "658267799784839",
  api_secret: "16dlQI3LiVBGyNLOsIfm--iReo4",
});

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.code === "E11000") {
    errors.email = "that email is already registered";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const user = {};

//create user
user.notification = async(req, res) => {

  let pushNotification = req.body;
  
  const payload = JSON.stringify({
    name: pushNotification.name,
    message: pushNotification.message
  });

  try {
    await webpush.sendNotification(pushNotification.endpoint, payload);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }

}

user.register = async (req, res) => {
  try {
    let usuario = await User.findOne({ email: req.body.email });
    if (usuario) return res.status(400).send("Email already exists");

    const user = req.body;
    const newUser = new User({
      name: user.name,
      lastname: user.lastname,
      password: user.password,
      email: user.email,
      tel: user.tel,
      companyRole: user.companyRole,
      isAdmin: user.isAdmin,
      picture: user.picture,
    });

    newUser.save().then((savedUser) => {
      res.status(201).send(savedUser);
    });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json({ errors });
  }
};

user.me = async (req, res) => {
  let user = await User.findOne({ email: req.user.email });
  res.send(user);
};

user.login = async (req, res) => {
  try {
    if (!req.body.loginWithGoogle) {
      const { email, password } = req.body;

      User.findOne({ email }).then((user) => {
        if (!user) return res.sendStatus(401);
        if(!user.active) return res.status(401).send("This account has been deactivated by an Administrator")

        user.validatePassword(password).then((isValid) => {
          if (!isValid) return res.sendStatus(401);
          const token = generateToken({
            email: user.email,
            name: user.name,
            id: user._id,
            lastname: user.lastname,
            tel: user.tel,
            companyRole: user.companyRole,
            isAdmin: user.isAdmin,
          });
          res.cookie("token", token);
          res.send({
            email: user.email,
            name: user.name,
            id: user._id,
            lastname: user.lastname,
            tel: user.tel,
            picture: user.picture,
            companyRole: user.companyRole,
            isAdmin: user.isAdmin,
          });
        });
      });
    } else {
      const userArr = await User.find({ email: req.body.email });
      if (userArr.length) {
        let user = userArr[0];
        const token = generateToken({
          email: user.email,
          name: user.name,
          id: user._id,
          lastname: user.lastname,
          tel: user.tel,
          companyRole: user.companyRole,
          isAdmin: user.isAdmin,
        });
        res.cookie("token", token);
        res.send({
          email: user.email,
          name: user.name,
          id: user._id,
          lastname: user.lastname,
          tel: user.tel,
          companyRole: user.companyRole,
          isAdmin: user.isAdmin,
          picture: user.picture,
        });
      } else {
        const user = await User.create(req.body);
        const token = generateToken({
          email: user.email,
          name: user.name,
          id: user._id,
          lastname: user.lastname,
          tel: user.tel,
          companyRole: user.companyRole,
          isAdmin: user.isAdmin,
        });
        res.cookie("token", token);

        res.send({
          email: user.email,
          name: user.name,
          id: user._id,
          lastname: user.lastname,
          tel: user.tel,
          companyRole: user.companyRole,
          isAdmin: user.isAdmin,
          picture: user.picture,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

user.logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};

user.deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    User.findByIdAndDelete({ id });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

user.updateUser = async (req, res) => {
  try {
    const usuario = await User.findOneAndUpdate(
      { _id: req.params._id },
      req.body
    );
    usuario.save();
    const user = await User.find({ _id: req.params._id });

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

user.search = async (req, res) => {
  const user = await User.find();
  let filterUsers = [];

  user.forEach((users) => {
    if (users.name.toLowerCase().includes(req.params.search.toLowerCase()))
      filterUsers.push(users);
    else if (
      users.lastname.toLowerCase().includes(req.params.search.toLowerCase())
    )
      filterUsers.push(users);
  });

  res.send(filterUsers);
};

user.updatePicture = async (req, res) => {
  try {
    const { image } = req.body;

    const results = await cloudinary.uploader.upload(image);

    const img = await User.update(
      { _id: req.params.id },
      { picture: results.secure_url }
    );

    res.send("Updated!");
  } catch {
    res.status(500).send("falla");
  }
};

user.removePicture = async (req, res) => {
  try {
    const report = await Reports.update(
      { _id: req.user.id },
      { picture: undefined }
    );
    res.status(200).send("Imagen borrada!");
  } catch {
    res.status(500).send("Error");
  }
};
user.userSearch = async (req, res) => {
  try {
    const users = await User.find();
    let filteredUsers = [];

    users.forEach((user) => {
      if (user.name.toLowerCase().includes(req.params.search.toLowerCase()))
        filteredUsers.push(user);
      else if (
        user.lastname.toLowerCase().includes(req.params.search.toLowerCase())
      )
        filteredUsers.push(user);
      else if (
        user.companyRole.toLowerCase().includes(req.params.search.toLowerCase())
      )
        filteredUsers.push(user);
      else if (
        user.email.toLowerCase().includes(req.params.search.toLowerCase())
      )
        filteredUsers.push(user);
    });
    res.status(200).send(filteredUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

user.allUsers = async (req, res) => {
  try {
    let users = [];
    req.params.role === "ADMIN"
      ? (users = await User.find({ isAdmin: true }))
      : (users = await User.find({ isAdmin: false }));
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = user;
