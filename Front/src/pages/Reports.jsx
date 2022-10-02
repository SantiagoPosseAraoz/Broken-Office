import {
  Box,
  IconButton,
  Input,
  Spinner,
  Tab,
  TabList,
  Tabs,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import ReportList from "../commons/ReportList";
import { SearchIcon } from "@chakra-ui/icons";
import Footer from "../components/Footer";
import useReports from "../hooks/useReports";

const Reports = () => {
  const user = useSelector((state) => state.user);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const {
    allReports,
    reports,
    setReports,
    isLoading,
    setIsLoading,
    handlerSearch,
    handlerReports,
  } = useReports();

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    async function cleanInputs() {
      if (isSubmitSuccessful) {
        reset({
          search: "",
        });
      }
    }
    cleanInputs();
  }, [formState, reset]);

  if (isLoading) {
    if (user.length) {
      user.isAdmin ? allReports() : navigate("/404");
    }
    return <Spinner size="xl" color="secondary" ml="50%" my="10%" />;
  }

  return (
    <>
      <Box
        h={{ xl: "110vh", lg: "110vh", md: "75vh", base: "110vh" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box mt="5" display="flex" flexDir={"row"} alignItems="center">
          <Input
            borderColor={colorMode === "light" ? "third" : "white"}
            placeholder="Search reports..."
            _focusVisible={{ borderColor: "third" }}
            {...register("search")}
          />
          <IconButton
            onClick={handleSubmit(handlerSearch)}
            aria-label="Search database"
            mt="0px"
            borderRadius={50}
            ml={3}
            icon={<SearchIcon />}
          />
        </Box>

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
        <div>
          <ScrollToTop
            smooth
            color="black"
            bg="#bfd732 "
            style={{
              backgroundColor: "#bfd732",
              width: "10",
              borderRadius: "15px",
            }}
          />
        </div>
      </Box>
      <Footer />
    </>
  );
};

export default Reports;
