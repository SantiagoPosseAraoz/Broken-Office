import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import RejectedEmail from "./RejectedEmail";
import ReportData from "./ReportData";
import SendEmail from "./SendEmail";

const ResolveReport = () => {
  const [report, setReport] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getReportbyId() {
      axios
        .get(`http://localhost:3001/api/report/getreportbyid/${params.id}`, {
          withCredentials: true,
        })
        .then((res) => setReport(res.data[0]));
    }
    getReportbyId();
  }, []);

  const resolveReport = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/report/solvereport/${params.id}`,
        {},
        {
          withCredentials: true,
        }
      );
      Swal.fire({
        icon: "success",
        text: "Reporte resuelto",
        width: 400,
        showConfirmButton: false,
        timer: 1500,
        color: "secondary",
      });
      navigate("/admin/reports");
    } catch {
      console.error("no se pudo resolver");
    }
  };

  return (
    <>
      <Box display="flex">
        <Link to="/admin/reports">
          <Button
            color="black"
            borderRadius="40px"
            alt="back to profile"
            bg="secondary"
            ml={5}
            mt={15}
          >
            <ArrowLeftIcon />
          </Button>
        </Link>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        w={["92%", "90%", "80%", "70%"]}
        mx={["4%", "7%", "10%", "15%"]}
      >
        <ReportData report={report} />
      </Box>
      <Box mb={30}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <RejectedEmail report={report} />
          <Button
            m="3"
            borderRadius="40px"
            bg="secondary"
            _hover={{ bg: "fourth" }}
            onClick={resolveReport}
            color="black"
          >
            Resolve
          </Button>
          <SendEmail report={report} />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ResolveReport;
