import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";

const useReports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    allReports();
  }, []);

  async function allReports() {
    axios
      .get("http://localhost:3001/api/report/getpendingreports", {
        withCredentials: true,
      })
      .then((res) => {
        setReports(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  const handlerReports = (e) => {
    const value = e.target.value;
    if (value === "PENDING") {
      axios
        .get("http://localhost:3001/api/report/getpendingreports", {
          withCredentials: true,
        })
        .then((res) => {
          setReports(res.data);
          if (isLoading) {
            if (user) {
              user.isAdmin ? allReports() : navigate("/404");
            }
            return <Spinner size="xl" color="secondary" ml="50%" my="10%" />;
          }
        });
    }

    if (value === "FULFILLED") {
      axios
        .get("http://localhost:3001/api/report/getsolvedreports", {
          withCredentials: true,
        })
        .then((res) => {
          setReports(res.data);
        });
    }
    if (value === "REJECTED") {
      axios
        .get("http://localhost:3001/api/report/getrejectedreports", {
          withCredentials: true,
        })
        .then((res) => {
          setReports(res.data);
        });
    }
  };

  const handlerSearch = async (data) => {
    const reportes = await axios.get(
      `http://localhost:3001/api/report/search/${data.search}`,
      { withCredentials: true }
    );
    setReports(reportes.data);
  };

  return {
    allReports,
    reports,
    setReports,
    isLoading,
    setIsLoading,
    handlerSearch,
    handlerReports,
  };
};

export default useReports;
