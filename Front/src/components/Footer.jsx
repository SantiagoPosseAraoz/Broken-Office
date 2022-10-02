import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const url = useLocation().pathname;

  return (
    <Box
      flexDirection="column"
      bg="#000000"
      height="15vh"
      width="full"
      display="flex"
      position="absolute"
    >
      <Image
        ml={2.5}
        w="150px"
        h="100%"
        src="https://i.ibb.co/SxKhWCJ/Captura-desde-2022-09-14-16-08-00.png"
        alt="Globant Logo"
        mb={-5}
      />
      <Text fontSize={12} color="#b3ae8d" ml={19.5} mb={5}>
        {" "}
        All rights reserved Globant 2022
      </Text>
    </Box>
  );
};

export default Footer;
