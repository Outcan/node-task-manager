const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://tmaDBAdmin:FwXgAiewxgMAMps4hX@127.0.0.1:27017/task-manager-api",
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Must not contain the word password!");
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    }
  }
});

// const me = new User({
//   name: " Dave",
//   email: " dave@gmail.com  ",
//   password: "123456",
//   age: 67
// });

// me.save()
//   .then(user => {
//     console.log(user);
//   })
//   .catch(error => {
//     console.log(error.message);
//   });

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const task1 = new Task({ description: "Clean teeth" });

task1
  .save()
  .then(task => {
    console.log(task);
  })
  .catch(error => {
    console.log(error.message);
  });
