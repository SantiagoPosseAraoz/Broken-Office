import React from "react";
import { useEffect, useState } from "react";

const usePaginationReports = (reports) => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage + 5 <= reports.length) setCurrentPage(currentPage + 5);
  };

  const prevPage = () => {
    currentPage > 0 ? setCurrentPage(currentPage - 5) : setCurrentPage(0);
  };

  return { currentPage, nextPage, prevPage };
};

export default usePaginationReports;
