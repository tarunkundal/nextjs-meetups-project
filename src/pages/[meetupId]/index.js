import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        descripition={props.meetupData.descripition}
        address={props.meetupData.address}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://tarun:tarun@cluster0.afwgpmq.mongodb.net/meetups-project?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  // fetch data

  const client = await MongoClient.connect(
    "mongodb+srv://tarun:tarun@cluster0.afwgpmq.mongodb.net/meetups-project?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  console.log(selectedMeetup);
  console.log(meetupId);

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        // descripition: selectedMeetup.descripition,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetails;
