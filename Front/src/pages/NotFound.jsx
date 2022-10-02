import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const NotFound = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Heading fontSize="20vh">404!</Heading>
        <Text mb="20" mx="10">
          Lo sentimos, no se pudo encontrar la página que buscas.
        </Text>
        <Image
          objectFit="cover"
          src="https://statics.globant.com/production/public/2021-01/404%20desktop.png"
          alt="Error 404"
        />
      </Box>
    </>
  );
};

export default NotFound;
