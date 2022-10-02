import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  useColorMode,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "@fontsource/open-sans";
import "@fontsource/heebo";
import Footer from "../components/Footer";
import axios from "axios";
import Swal from "sweetalert2";
const Register = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { colorMode } = useColorMode();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/api/user/register", data, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/login");
      })
      .catch(() => {
        Swal.fire({
          text: "Datos inválidos.",
          width: 400,
          showConfirmButton: false,
          timer: 1500,
          color: "secondary",
        });
      });
  };

  return (
    <>
      <HStack
        w="full"
        h={{ xl: "100vh", lg: "100vh", md: "150vh", base: "100vh" }}
        flexDirection={{ xl: "row", lg: "row", md: "column", base: "column" }}
      >
        <Flex w="full" h="full">
          <Image
            objectFit="cover"
            w="full"
            h={{ xl: "100vh", lg: "100vh", md: "full", base: "full" }}
            src="https://fotos.perfil.com/2021/03/03/trim/950/534/globant-20210303-1136704.jpg"
            alt="Imagen de una oficina de globant"
          />
        </Flex>
        <Flex
          w={["full", "full", "full"]}
          h="full"
          alignItems="center"
          justifyContent="center"
        >
          <Stack maxW="full" spacing={6} p={6}>
            <Heading
              fontSize="35px"
              color={useColorModeValue("third", "white")}
            >
              Register
            </Heading>

            <Box minWidth="100%" display="flex" flexDirection="row">
              <FormControl isRequired id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  _focusVisible={colorMode === "light" ? "third" : "white"}
                  _hover="ActiveBorder"
                  borderColor="ActiveBorder"
                  width={40}
                  placeholder="Name"
                  size="md"
                  {...register("name", { required: true })}
                ></Input>
                <Box>
                  {errors.name?.type === "required" && "Name is required"}
                </Box>
              </FormControl>
              <FormControl id="lastname" isRequired>
                <FormLabel ml={5}>Lastname </FormLabel>
                <Input
                  _hover="ActiveBorder"
                  _focusVisible={colorMode === "light" ? "black" : "white"}
                  borderColor="ActiveBorder"
                  ml={5}
                  alt="lastname"
                  width={40}
                  placeholder="Lastname"
                  size="md"
                  {...register("lastname", { required: true })}
                ></Input>
                <Box ml="22px">
                  {errors.lastname?.type === "required" &&
                    "Lastname is required"}
                </Box>
              </FormControl>
            </Box>
            <FormControl isRequired id="email">
              <FormLabel>Email</FormLabel>
              <Input
                _hover="ActiveBorder"
                _focusVisible={colorMode === "light" ? "third" : "white"}
                borderColor="ActiveBorder"
                placeholder="Email"
                size="md"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                })}
              ></Input>
              {errors.email?.type === "required" && "Email is required"}
              {errors.email?.type === "pattern" && "Invalid email address"}
            </FormControl>
            <FormControl fontFamily="body" isRequired id="password">
              <FormLabel>Password </FormLabel>
              <InputGroup size="md">
                <Input
                  _hover="ActiveBorder"
                  _focusVisible={colorMode === "light" ? "third" : "white"}
                  borderColor="ActiveBorder"
                  fontFamily="body"
                  pr="4.5rem"
                  size="md"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password", { required: true, minLength: "7" })}
                />

                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    alignItems="center"
                    onClick={handleClick}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password?.type === "required" && "Password is required"}
              {errors.password?.type === "minLength" &&
                "Minimum ten characters"}
            </FormControl>
            <Button
              fontFamily="body"
              display="flex"
              mt={4}
              id="Register"
              alt="Register"
              color="black"
              onClick={handleSubmit(onSubmit)}
              borderRadius="40px"
              bg="secondary"
              _hover={{ bg: "fourth" }}
            >
              Submit
            </Button>
          </Stack>
        </Flex>
      </HStack>
      <Footer />
    </>
  );
};

export default Register;
