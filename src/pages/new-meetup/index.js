import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    alert(data.message);

    router.push("/");
  };

  return (
    <>
      {" "}
      <Head>
        <title>Add new Meetup</title>
        <meta name="descripition" content="Add your own Meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />{" "}
    </>
  );
};

export default NewMeetupPage;
