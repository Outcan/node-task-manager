// CRUD - CREATE read update delete
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL =
  "mongodb://tmanagerAdmin:qwMhFWAjGj6RgLmFXu@127.0.0.1:27017/task-manager";
const databaseName = "task-manager";

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log(error);
    }

    const db = client.db(databaseName);
    // InsertOne
    // db.collection("users").insertOne(
    //   {
    //     name: "Mike",
    //     age: 62
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // InsertMany
    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Reynard",
    //       age: 19
    //     },
    //     {
    //       name: "Mimi",
    //       age: 32
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents");
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // Insert many tasks
    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Read emails",
    //       completed: false
    //     },
    //     {
    //       description: "Do laundry",
    //       completed: false
    //     },
    //     {
    //       description: "Go to gym",
    //       completed: true
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents!");
    //     }
    //     console.log(result.ops);
    //   }
    // );
  }
);
