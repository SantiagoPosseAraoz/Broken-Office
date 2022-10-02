import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  Text,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import { HeatmapLayer } from "@react-google-maps/api";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";

const UserData = () => {
  const params = useParams();
  const [user, setUser] = useState({});

  const getUser = () => {
    axios
      .get(`http://localhost:3001/api/admin/user/${params.id}`, {
        withCredentials: true,
      })
      .then((res) => setUser(res.data[0]));
  };

  useEffect(() => {
    getUser();
  }, []);

  const handlerActive = () => {
    Swal.fire({
      title: user.active
        ? "Are you sure you want to deactivate this account?"
        : "Are you sure you want to activate this account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "tomato",
      confirmButtonText: user.active
        ? "Yes, deactivate it"
        : "Yes, activate it",
    }).then((result) => {
      if (result.isConfirmed) {
        if (user.active) {
          axios.put(
            `http://localhost:3001/api/admin/deactivate/${user.id}`,
            {},
            {
              withCredentials: true,
            }
          );
        } else {
          axios.put(
            `http://localhost:3001/api/admin/activate/${user.id}`,
            {},
            {
              withCredentials: true,
            }
          );
        }
        getUser();
        Swal.fire("Updated!", "User has been updated.", "success");
      }
    });
  };
  return (
    <>
      <Box m="5" display="flex" flexDir={"row"} alignItems="center">
        <Link to="/admin/users">
          <Button
            alt="back to admin"
            color="black"
            borderRadius="40px"
            bg="secondary"
            // ml={5}
            // mt={15}
          >
            <ArrowLeftIcon />
          </Button>
        </Link>
        <Heading m="0 auto" textAlign="center">
          {user.active ? "Desactive Account" : "Active Account"}
        </Heading>
      </Box>
      <Box h={{ xl: "90vh", lg: "80vh", md: "110vh", base: "80vh" }}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          mt={8}
        >
          <WrapItem>
            <Avatar
              size="xl"
              mr={3}
              alt="profile photo"
              name={user.name}
              src={
                user.picture ||
                "data:image/png;base64,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"
              }
            />
          </WrapItem>

          <Text
            fontSize="27"
            fontWeight="bold"
          >{`${user.name} ${user.lastname}`}</Text>
        </Box>
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
            shadow="xl"
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
          </Box>
          <Button onClick={handlerActive} my="10">
            {user.active ? "Deactivate account" : "Activate account"}
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default UserData;
