import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

const Home = (props) => {
  return (
    <>
      {" "}
      <Head>
        <title>Next.js Meetups</title>
        <meta
          name="descripition"
          content="Browse a huge list of React active Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// getStaticProps - This method will load the data during the build process i.e at pre-rendering cycle
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://tarun:tarun@cluster0.afwgpmq.mongodb.net/meetups-project?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const allMeetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: allMeetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        id: meetup._id.toString(),
        // descripition: meetup.descripition,
        image: meetup.image,
      })),
    },
    revalidate: 10, // This will help to re-render the page after every 10sec so if some data changes in the database then we will see the updated data not the old one and we donot need to re build and deploye it again after some data was updated
  };
}

// Alternative to getStaticProps() is getServerSideProps()
// // getServerSideProps() --> This function will run only after every deployment not during the build process abd this function code will executed at backend not at the client side
// export async function getServerSideProps(context) {
//   // fetch our data
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default Home;
