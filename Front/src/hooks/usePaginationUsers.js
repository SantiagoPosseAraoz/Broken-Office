import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const usePaginationUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const getAllUsers = () => {
    axios
      .get(`http://localhost:3001/api/user/allUsers/${"USER"}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handlerSearch = async (data) => {
    const reportes = await axios.get(
      `http://localhost:3001/api/user/search/${data.search}`,
      { withCredentials: true }
    );
    setUsers(reportes.data);
  };

  const handlerUser = (e) => {
    const value = e.target.value;
    axios
      .get(`http://localhost:3001/api/user/allUsers/${value}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data);
        setCurrentPage(0);
      });
  };

  const nextPage = () => {
    if (currentPage + 5 < users.length) setCurrentPage(currentPage + 5);
  };
  const prevPage = () => {
    currentPage > 0 ? setCurrentPage(currentPage - 5) : setCurrentPage(0);
  };

  return {
    currentPage,
    nextPage,
    prevPage,
    setCurrentPage,
    handlerSearch,
    isLoading,
    setIsLoading,
    getAllUsers,
    handlerUser,
    users,
  };
};

export default usePaginationUsers;
