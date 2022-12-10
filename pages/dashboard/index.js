import Head from "next/head";
import AllCount from "./Allcount";
const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Admin - Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AllCount />
    </>
  );
};
export default Dashboard;
