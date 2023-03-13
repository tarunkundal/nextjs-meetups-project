import { MongoClient } from "mongodb";
// POST api/new-meetup

const newMeetupHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const data = req.body;

      // const { title, image, descripition, address } = data;

      const client = await MongoClient.connect(
        "mongodb+srv://tarun:tarun@cluster0.afwgpmq.mongodb.net/meetups-project?retryWrites=true&w=majority"
      );

      const db = client.db();

      const meetupsCollection = db.collection("meetups");

      const result = await meetupsCollection.insertOne(data);

      console.log(result);

      client.close();

      // sending response
      res.status(201).json({ message: "Meetup inserted sucessfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default newMeetupHandler;
