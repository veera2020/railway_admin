import Head from "next/head";
import Loginform from "./login/Loginform";
function App() {
  return (
    <>
      <Head>
        <title>Admin - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Loginform />
    </>
  );
}

export default App;
