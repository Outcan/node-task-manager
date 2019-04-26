// CRUD - create read UPDATE delete

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
    //   .updateOne(
    //     {
    //       _id: new ObjectID("5cb8dca5ed1a8a7dcc0c6592")
    //     },
    //     {
    //       $set: {
    //         name: "Tony"
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // Update one - increment age by one
    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("5cb8dca5ed1a8a7dcc0c6592")
    //     },
    //     {
    //       $inc: {
    //         age: 1
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result.result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    db.collection("tasks")
      .updateMany(
        {
          completed: false
        },
        {
          $set: {
            completed: true
          }
        }
      )
      .then(result => {
        console.log(result.result);
      })
      .catch(error => {
        console.log(error);
      });
  }
);
