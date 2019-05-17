const express = require("express");
const router = express.Router();
const multer = require("multer");
const sharp = require("sharp");
const {
  sendWelcomeEmail,
  sendCancellationEmail
} = require("../emails/account");
const auth = require("../middleware/auth");

const User = require("../models/User");

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const allowedUpdates = ["name", "email", "password", "age"];
  const _id = req.user._id;
  const dataToUpdate = req.body;
  const updates = Object.keys(dataToUpdate);
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });

  console.log(_id, dataToUpdate);

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    //const user = await User.findById(_id);
    const user = req.user;
    updates.forEach(update => {
      return (user[update] = req.body[update]);
    });
    await user.save();
    // const user = await User.findByIdAndUpdate(_id, dataToUpdate, {
    //   new: true,
    //   runValidators: true
    // });
    // if (!user) {
    //   return res.status(404).send({ message: "User not found!" });
    // }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) {
    //   return res.status(404).send({ error: "User not found!" });
    // }
    await req.user.remove();
    sendCancellationEmail(req.user.email, req.user.name);
    console.log(req.user.email, req.user.name);
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      console.log("Wrong filetype");
      return cb(new Error("Wrong filetype, please upload jpg or png."));
    }
    cb(null, true);
  }
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    console.log("Upload image...");
    res.send();
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/users/:id/avatar", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById({ _id });
    if (!user || !user.avatar) {
      throw new Error("No avatar found!");
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = router;
