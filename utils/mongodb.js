const { MongoClient, ObjectId } = require('mongodb')
const fs = require('fs')
const path = require("path");

var mongodbClient;
var mongo;

const getMongo = async () => {
  if (typeof mongo === "undefined") {
    try {
      const mongoClient = await getMongoClient();
      mongo = mongoClient.db("netskope_test");
    } catch (err) {
      throw err;
    }
  }

  return mongo;
};

const getMongoClient = async () => {
  if (typeof mongodbClient === "undefined") {
    try {
      const uri = await getDbUri();
      mongodbClient = await MongoClient.connect(uri, {
        useUnifiedTopology: true,
      });
    } catch (err) {
      throw err;
    }
  }

  return mongodbClient;
};

const getDbUri = async () => {
  let password

  switch(process.env.ENV) {
    case "dev":
      password = fs.readFileSync(path.resolve("dev-keys/mongo.key")).toString()
      break
    case "prd":
      password = process.env.MONGO_PASSWORD
      break
    default:
      throw Error('invalid env')
  }

  return `mongodb+srv://lettlebread:${ password }@cluster0.isvxs.mongodb.net/?retryWrites=true&w=majority`;
};

const findCollectionDoc = async (collectionName, query, fineOne = true) => {
  const mongo = await getMongo();
  const queryObj = createQueryObj(query);
  let res;

  try {
    if (fineOne) {
      res = await mongo.collection(collectionName).findOne(queryObj);
    } else {
      res = await mongo.collection(collectionName).find(queryObj);
      res = res.toArray();
    }

    return res;
  } catch (e) {
    throw e;
  }
};

const insertCollectionDoc = async (collectionName, data) => {
  const mongo = await getMongo();

  try {
    const { insertedId } = await mongo
      .collection(collectionName)
      .insertOne(data);

    if (insertedId === null) {
      throw `insert data to collection ${collectionName} failed`;
    }

    return insertedId.toString();
  } catch (e) {
    console.log(`create document failed with error ${e}`);
    throw e;
  }
};

function createQueryObj(query) {
  try {
    if (typeof query === "string") {
      return { _id: ObjectId(query) };
    }

    if (typeof query._id === "string") {
      query._id = ObjectId(query._id);
    }

    delete query.id;
    return query;
  } catch (e) {
    throw { code: 404, error: "invalid object id" };
  }
}

exports.getMongo = getMongo;
exports.insertCollectionDoc = insertCollectionDoc
exports.findCollectionDoc = findCollectionDoc