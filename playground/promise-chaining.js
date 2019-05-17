require("../src/db/mongoose");

const User = require("../src/models/User");

// 5cbcccf98f3c456e501697df

// User.findByIdAndUpdate("5cbcccf98f3c456e501697df", { age: 55 })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 55 });
//   })
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.log(error);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5cbcccf98f3c456e501697df", 55)
  .then(count => {
    console.log(count);
  })
  .catch(error => {
    console.log(error);
  });
