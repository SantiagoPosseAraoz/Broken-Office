import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartReports = () => {
  const report = useSelector((state) => state.report);

  return (
    <Box
      mt={15}
      display="flex"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="row"
        w={{ xl: 600, lg: 600, md: 380, base: 380 }}
        bg={useColorModeValue("white", "black")}
        p="1.5rem"
        borderRadius="10"
        boxShadow="inner"
        h="full"
        justifyContent="center"
      >
        <Box>
          <Accordion
            width={{ xl: 600, lg: 600, md: 380, base: "40vh" }}
            allowToggle
          >
            <AccordionItem>
              <AccordionButton>
                <Box
                  width={{ xl: 600, lg: 600, md: 380, base: "40vh" }}
                  justifyContent="center"
                >
                  Reports
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <TableContainer
                  ml={2}
                  overflowY="scroll"
                  whiteSpace="-moz-initial"
                  overflowX="clip"
                  alignSelf="center"
                  h="35vh"
                  width={{ xl: 600, lg: 600, md: "70vh", base: "60vh" }}
                >
                  <Table variant="simple">
                    <Thead>
                      <Tr id="2">
                        <Th>Date:</Th>
                        <Th>Title:</Th>
                        <Th>Info:</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {report?.length ? (
                        report.map((e) => {
                          return (
                            <Tr key={e._id}>
                              <Td fontSize={15}>{e.date?.slice(0, 10)}</Td>
                              <Td fontSize={15}>{e.title.slice(0, 20)}</Td>
                              <Td>
                                <Link to={`/report/${e._id}`}>
                                  <Button
                                    bg="secondary"
                                    textAlign="center"
                                    size="sm"
                                    mt={2}
                                    color="black"
                                    borderRadius="40px"
                                  >
                                    +
                                  </Button>
                                </Link>
                              </Td>
                            </Tr>
                          );
                        })
                      ) : (
                        <Tr alignSelf="center" id="1">
                          <Td>No data</Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

export default CartReports;
