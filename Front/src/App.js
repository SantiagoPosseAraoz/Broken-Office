import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Register from "./pages/Register";
import Reports from "./pages/Reports";
import { setUbication } from "./state/location";
import { sendMe } from "./state/user";
import SingleReport from "./components/SingleReport";
import ResolveReport from "./commons/ResolveReport";
import MyReports from "./components/MyReports";
import ReportDataById from "./commons/ReportDataById";
import NotFound from "./pages/NotFound";
import Chat from "./components/Chat";
import Users from "./components/Users";
import UserData from "./commons/UserData";
import QrScanner from "./components/QrScanner";
import JoyRide from "react-joyride";
import { TOUR_STEPS } from "./hooks/info";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  let localStorageKey = 1;
  const [run, setRun] = useState(false);
  const user = useSelector((state) => state.user);
  const color = useColorModeValue("black", "white");
  const backgroundColor = useColorModeValue("white", "black");

  useEffect(() => {
    async function persistence() {
      dispatch(sendMe());

      function success(pos) {
        dispatch(setUbication([pos.coords.latitude, pos.coords.longitude]));
      }
      navigator.geolocation.getCurrentPosition(success);
    }
    persistence();
  }, []);

  function tutorial() {
    if (user.email) {
      if (!localStorageKey) {
        setRun(true);
        return;
      }
      const tourViewed = window.localStorage.getItem(localStorageKey);

      if (tourViewed) {
        return;
      }
      window.localStorage.setItem(localStorageKey, 1);
      setRun(true);
    }
  }

  tutorial();

  return (
    <>
      <Box>
        <JoyRide
          steps={TOUR_STEPS}
          continuous={true}
          showSkipButton={true}
          showProgress={true}
          run={run}
          isFixed={true}
          offset={2}
          styles={{
            options: {
              arrowColor: "#BFD732",
              backgroundColor: backgroundColor,
              overlayColor: "rgba(79, 26, 0, 0.4)",
              primaryColor: "#000",
              textColor: color,
              width: 500,
              zIndex: 1000,
            },
            buttonNext: {
              backgroundColor: "#BFD732 ",
            },
            buttonBack: {
              color: color,
            },
          }}
          locale={{ last: "Finish tour", skip: "End tour" }}
        />
      </Box>

      <Navbar />
      <Routes>
        <Route path="/scanner" element={<QrScanner />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Perfil />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/report/:id" element={<ReportDataById />}></Route>
        <Route path="/admin/reports" element={<Reports />}></Route>
        <Route path="/admin/myreports" element={<MyReports />}></Route>
        <Route path="/user/:id" element={<UserData />}></Route>
        <Route path="/admin/reports/:id" element={<SingleReport />}></Route>
        <Route
          path="/admin/reports/resolve/:id"
          element={<ResolveReport />}
        ></Route>
        <Route path="/admin/users" element={<Users />}></Route>
        <Route path="/404" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
