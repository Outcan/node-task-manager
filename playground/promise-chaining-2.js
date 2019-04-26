require("../src/db/mongoose");

const Task = require("../src/models/Task");

// 5cbccdfe75cd07762417cc67

Task.findByIdAndDelete("5cbccdfe75cd07762417cc67")
  .then(task => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
