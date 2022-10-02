import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Spinner,
  Table,
  TableContainer,
  Tag,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import Maps from "./Maps";

const ReportData = ({ report }) => {
  return (
    <>
      <Box
        mt={"-60px"}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading my="5" textAlign="center">
          Report
        </Heading>

        <Box
          display="flex"
          flexDirection={["column", "row", "row"]}
          alignItems="center"
          w="100%"
          justifyContent={{
            xl: "center",
            lg: "center",
            md: "space-evenly",
            base: "space-evenly",
          }}
        >
          <Image
            src={report.image}
            alt="photo of the report"
            fallbackSrc="https://via.placeholder.com/150"
            minWidth={["60%", "40%", "30%", "20%"]}
            maxWidth="30%"
            borderRadius="10"
            mr={{ xl: "40px", lg: "45px", md: "0", base: "0" }}
            mb={{ base: "15px" }}
            ml={{ xl: "20px" }}
          />
          <Box>
            <TableContainer
              whiteSpace="pre-wrap"
              display="flex"
              flexDirection="column"
              m="15px auto"
            >
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>TITLE</Th>
                    <Td> {report.title}</Td>
                  </Tr>
                  <Tr>
                    <Th>DESCRIPTION</Th>
                    <Td textAlign="left" maxWidth="300px">
                      {report.description}
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>ID</Th>
                    <Td>{report._id}</Td>
                  </Tr>
                  <Tr>
                    <Th>PRIORITY</Th>
                    <Td>{report.priority}</Td>
                  </Tr>
                  <Tr>
                    <Th>NAME</Th>
                    <Td>
                      {report.name} {report.lastname}
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>EMAIL</Th>
                    <Td>{report.email}</Td>
                  </Tr>
                  <Tr>
                    <Th>STATE</Th>
                    <Td>{report.state}</Td>
                  </Tr>
                </Thead>
              </Table>

              <HStack justifyContent="center" pt={5} spacing={2} m="0 auto">
                {report?.tags?.map((size, i) =>
                  i >= 3 ? (
                    <></>
                  ) : (
                    <Tag
                      minW={20}
                      key={i}
                      p={1}
                      variant="solid"
                      textAlign="center"
                    >
                      {size}
                    </Tag>
                  )
                )}
              </HStack>
              <Box mt={7} mb={5} ml="auto" mr="auto">
                <Chat report={report} />
              </Box>
            </TableContainer>
          </Box>
        </Box>

        <Box m="20px auto">
          <Maps location={report.coord} />
        </Box>
      </Box>
    </>
  );
};

export default ReportData;
