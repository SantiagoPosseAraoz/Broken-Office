import { Box, Button, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import NotFound from "../pages/NotFound";
import ReportData from "../commons/ReportData";
import Footer from "./Footer";
import { ArrowLeftIcon } from "@chakra-ui/icons";
const SingleReport = () => {
  const [report, setReport] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    async function getReportbyId() {
      axios
        .get(`http://localhost:3001/api/report/getreportbyid/${params.id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setReport(res.data[0]);
          setIsLoading(false);
        });
    }
    getReportbyId();
  }, []);

  const acceptReport = async (e) => {
    try {
      axios.put(
        `http://localhost:3001/api/report/catchreport/${params.id}`,
        {
          admin: `${user.name} ${user.lastname}`,
        },
        { withCredentials: true }
      );
      Swal.fire({
        icon: "success",
        text: "Reporte aceptado",
        width: 400,
        showConfirmButton: false,
        timer: 1500,
        color: "secondary",
      });

      axios
        .get(`http://localhost:3001/api/report/getreportbyid/${params.id}`, {
          withCredentials: true,
        })
        .then((res) => setReport(res.data[0]));
    } catch {
      console.log("ERROR REPORT");
    }
  };
  const resolveReport = () => {
    navigate(`/admin/reports/resolve/${params.id}`);
  };

  if (isLoading) return <Spinner />;
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

        <Box mb={15} display="flex" flexDirection="row" alignItems="center">
          {!report.admin || report.admin === "No admin." ? (
            <Button
              m="3"
              borderRadius="40px"
              bg="secondary"
              color="black"
              _hover={{ bg: "fourth" }}
              onClick={acceptReport}
            >
              Acept
            </Button>
          ) : report.state === "pending" ? (
            <Button
              m="3"
              borderRadius="40px"
              bg="secondary"
              color="black"
              _hover={{ bg: "fourth" }}
              onClick={resolveReport}
            >
              Resolve Report
            </Button>
          ) : (
            <Button
              borderRadius="40px"
              fontSize={15}
              textTransform="uppercase"
              color="black"
              bg={report.state === "fulfilled" ? "secondary" : "red"}
            >
              {report.state}
            </Button>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SingleReport;
