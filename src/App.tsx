import Routes from "@/routes";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/organism/Navbar/Index";
import PageLoader from "@/components/organism/PageLoader";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {!pathname.includes("auth") && <Navbar />}
      <Suspense fallback={<PageLoader />}>
        <Routes />
      </Suspense>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
