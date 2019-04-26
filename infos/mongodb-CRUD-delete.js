// CRUD - create read update DELETE

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL =
  "mongodb://tmanagerAdmin:qwMhFWAjGj6RgLmFXu@127.0.0.1:27017/task-manager";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log(error);
    }

    const db = client.db(databaseName);

    // db.collection("users")
    //   .deleteMany({
    //     age: 55
    //   })
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    db.collection("tasks")
      .deleteOne({
        description: "Go to gym"
      })
      .then(result => {
        console.log(result.result);
      })
      .catch(error => {
        console.log(error);
      });
  }
);
