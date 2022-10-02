import {
  Box,
  Divider,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendMe } from "../state/user";
import EditAbout from "./EditAbout";

const CartPerfil = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendMe());
  }, []);
  return (
    <Box mt={5} display="flex" flexDir="column" alignItems="center">
      <Heading mt={5} fontSize="25">
        About
      </Heading>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent={{
          xl: "center",
          lg: "center",
          md: "none",
          base: "center",
        }}
        w={{ xl: 600, lg: 600 }}
        bg={useColorModeValue("white", "black")}
        p="1.5rem"
        borderRadius="10"
        boxShadow="inner"
      >
        <Box display="flex" flexDirection="column">
          <Text fontWeight="bold">Email</Text>
          <Divider ml={2} mt={1} mb={1} />
          <Text fontWeight="bold">Works</Text>
          <Divider ml={2} mt={1} mb={1} />
          <Text fontWeight="bold">Phone</Text>
          <Divider ml={2} mt={1} mb={1} />
          <Text fontWeight="bold">Role</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text ml="1rem">{`${user.email}`}</Text>
          <Divider ml={2} mt={1} mb={1} />
          <Text ml="1rem"> Globant</Text>
          <Divider ml={2} mt={1} mb={1} />
          <Text ml="1rem"> {user.tel || "None"} </Text>
          <Divider ml={2} mt={1} mb={1} />
          <Text ml="1rem"> {user.companyRole || "None"}</Text>
        </Box>

        <Box display="flex" alignItems="flex-end" mt={5}>
          <EditAbout />
        </Box>
      </Box>
    </Box>
  );
};

export default CartPerfil;

/*<Box
        display="flex"
        flexDirection="row"
        justifyContent={{ xl: "none", lg: "none", md: "none", base: "center" }}
        w={[300, 400, 700]}
        bg="white"
        p="1.5rem"
        borderRadius="10"
        boxShadow="inner"
      >
        <Box justifyContent="center" display="flex" flexDirection="column">
          <Text fontWeight="bold">Email</Text>
          <Text fontWeight="bold">Works</Text>
          <Text fontWeight="bold">Phone</Text>
          <Text fontWeight="bold">Puesto</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text ml="1rem">{`${user.email}`}</Text>
          <Text ml="1rem"> Globant</Text>
          <Text ml="1rem"> {user.tel || "None"} </Text>
          <Text ml="1rem"> {user.companyRole || "None"}</Text>
        </Box>*/
