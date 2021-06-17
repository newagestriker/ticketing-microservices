import buildClient from "../api/build-client";
const LandingPage = ({ currentUser }) => {
  return <h1>You are {!!currentUser ? "" : "not"} signed in..</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const response = await buildClient(context).get("/api/users/currentuser");
  return response.data;
};

export default LandingPage;
