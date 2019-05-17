require("../src/db/mongoose");

const Task = require("../src/models/Task");

// 5cbccdfe75cd07762417cc67

// Task.findByIdAndDelete("5cbccdfe75cd07762417cc67")
//   .then(task => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.log(error);
//   });

const deleteTaskAndCount = async id => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("5cbca591a8f9326518f7fed5")
  .then(count => {
    console.log(count);
  })
  .catch(error => {
    console.log(error);
  });
