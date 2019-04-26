const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://tmaDBAdmin:FwXgAiewxgMAMps4hX@127.0.0.1:27017/task-manager-api",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
