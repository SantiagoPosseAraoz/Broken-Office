import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import usePaginationReports from "../hooks/usePaginationReports";

const ReportList = ({ reports }) => {
  const { currentPage, nextPage, prevPage } = usePaginationReports(reports);

  const filteredReports = () => {
    if (reports.length <= 5) return reports.slice(0, 5);
    return reports.slice(currentPage, currentPage + 5);
  };

  return (
    <>
      <TableContainer
        m="0 auto"
        width={["100%", "70%", "60%"]}
        display="flex"
        alignItems="center"
        p="2"
        fontSize={["18", "18"]}
        flexDir={"column"}
      >
        <Table size="s">
          <Thead>
            <Tr>
              <Th textAlign="left">TITLE</Th>
              <Th textAlign="left"> NAME</Th>
              <Th textAlign="left"> INFO</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reports?.length > 0 ? (
              filteredReports()?.map((report) => (
                <Tr key={report._id}>
                  <Td textAlign="left" py="4">
                    {" "}
                    {report.title.slice(0, 10)}
                  </Td>
                  <Td textAlign="left" py="4">
                    {report.name} {report.lastname}
                  </Td>
                  <Td textAlign="left">
                    <Link to={`/admin/reports/${report._id}`}>
                      <Button
                        bg="secondary"
                        textAlign="center"
                        size="sm"
                        mt={2}
                        mb={2}
                        color="black"
                        borderRadius="40px"
                      >
                        +
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td>No reports.</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        <Box>
          <Button
            alt="previus page"
            bg="secondary"
            ml={5}
            mt={15}
            color="black"
            onClick={prevPage}
          >
            <ArrowBackIcon />
          </Button>
          <Button
            alt="next page"
            bg="secondary"
            ml={5}
            color="black"
            mt={15}
            onClick={nextPage}
          >
            <ArrowForwardIcon />
          </Button>
        </Box>
      </TableContainer>
    </>
  );
};

export default ReportList;
