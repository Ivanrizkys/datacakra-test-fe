import Routes from "@/routes";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/organism/Navbar/Index";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {!pathname.includes("auth") && <Navbar />}
      <Suspense>
        <Routes />
      </Suspense>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
