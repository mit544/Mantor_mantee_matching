import Navbar from "./src/components/navbar";
import Footer from "./src/components/footer";
import LoginPopup from "./src/components/login_popup";
import TestMatchingPage from "./test_match/page";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* <h1>this the initial stage of the project....</h1>
      <h4 className=" h-96">loading...</h4> */}
      {/* <LoginPopup /> */}
      <TestMatchingPage />
      <Footer />
    </>
  );
}
