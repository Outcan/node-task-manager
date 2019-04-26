// CRUD - create READ update delete

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

    // Find one
    // db.collection("users").findOne(
    //   { _id: new ObjectID("5cb9d479032b5555942eb434") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to fetch data!");
    //     }
    //     console.log(user);
    //   }
    // );

    // Find
    // db.collection("users")
    //   .find({ age: 55 })
    //   .toArray((error, users) => {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log(users);
    //   });

    // db.collection("users")
    //   .find({ age: 55 })
    //   .count((error, count) => {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log(count);
    //   });

    db.collection("tasks").findOne(
      { _id: new ObjectID("5cb9d60ef660b855bc3ce6da") },
      (error, task) => {
        if (error) {
          return console.log(error);
        }
        console.log(task);
      }
    );

    db.collection("tasks")
      .find({ completed: false })
      .toArray((error, tasks) => {
        if (error) {
          return console.log(error);
        }
        console.log(tasks);
      });
  }
);
