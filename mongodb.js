// CRUD - create read update DELETE
// Not used - early connection to local DB

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = process.env.MONGODB_URI;
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
