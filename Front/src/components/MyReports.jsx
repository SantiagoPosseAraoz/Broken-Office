import { Box, Heading, Spinner, Tab, TabList, Tabs } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReportList from "../commons/ReportList";
import Footer from "./Footer";

const MyReports = () => {
  const user = useSelector((state) => state.user);
  const [reports, setReports] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    allReports();
  }, []);

  const allReports = () => {
    axios
      .get("http://localhost:3001/api/report/catchedreports", {
        withCredentials: true,
      })
      .then((res) => {
        setReports(res.data);
        setIsLoading(false);
      });
  };

  const handlerReports = (e) => {
    const value = e.target.value;

    if (value === "PENDING") {
      axios
        .get("http://localhost:3001/api/report/catchedreports", {
          withCredentials: true,
        })
        .then((res) => {
          setReports(res.data);
          setIsLoading(false);
        });
    }
    if (value === "FULFILLED") {
      axios
        .get("http://localhost:3001/api/report/myreportsfullfilled", {
          withCredentials: true,
        })
        .then((res) => {
          setReports(res.data);
        });
    }
    if (value === "REJECTED") {
      axios
        .get("http://localhost:3001/api/report/myreportsrejected", {
          withCredentials: true,
        })
        .then((res) => {
          setReports(res.data);
        });
    }
  };

  if (isLoading) {
    if (user.length) {
      user.isAdmin ? allReports() : navigate("/404");
    }
    return <Spinner size="xl" color="secondary" ml="50%" my="10%" />;
  }

  return (
    <>
      <Box
        h={{ xl: "110vh", lg: "110vh", md: "75vh", base: "83vh" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading textAlign={"center"} m="5">
          My reports
        </Heading>
        <Tabs m="3">
          <TabList display="flex" justifyContent="center">
            <Tab
              value={"PENDING"}
              _selected={{ color: "white", bg: "gray" }}
              onClick={handlerReports}
            >
              In Progress
            </Tab>
            <Tab
              value={"REJECTED"}
              _selected={{ color: "white", bg: "red" }}
              onClick={handlerReports}
            >
              Rejected
            </Tab>
            <Tab
              value={"FULFILLED"}
              _selected={{ color: "white", bg: "secondary" }}
              onClick={handlerReports}
            >
              Fulfilled
            </Tab>
          </TabList>
        </Tabs>
        <ReportList reports={reports} />
      </Box>
      <Footer />
    </>
  );
};

export default MyReports;
