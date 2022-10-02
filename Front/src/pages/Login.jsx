import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Heading,
  Box,
  Button,
  InputRightElement,
  InputGroup,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { logIn } from "../state/user";
import { useDispatch } from "react-redux";
import "@fontsource/open-sans";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import FacebookLogin from "react-facebook-login";
import "../styles/login.css";
import Footer from "../components/Footer";
const Login = () => {
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.loginWithGoogle = false;
    dispatch(logIn(data)).then(() => document.cookie && navigate("/"));
  };

  const responseFacebook = (response) => {
    let nombre = response.name.split(" ");
    const payload = {
      name: nombre[0],
      lastname: nombre[1],
      email: response.email,
      loginWithGoogle: true,
      picture: response.picture.data.url,
    };
    dispatch(logIn(payload));
    navigate("/");
  };

  const handleCallbackResponse = (response) => {
    let userObject = jwt_decode(response.credential);

    const payload = {
      name: userObject.given_name,
      lastname: userObject.family_name,
      email: userObject.email,
      loginWithGoogle: true,
      picture: userObject.picture,
    };
    dispatch(logIn(payload));
    navigate("/");
  };

  useEffect(() => {
    async function loginGoogle() {
      /* global google */ google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById(10), {
        theme: "outline",
        size: "medium",

        margin: "15px",
        width: "15px",
      });
    }
    loginGoogle();
  }, []);

  return (
    <>
      <Box
        className="loginView"
        h={{ xl: 660, lg: 580, md: 900, base: 675 }}
        bgImage="url('https://brand.globant.com/wp-content/uploads/2021/10/bg.png')"
      >
        <Box
          className="loginCart"
          display="flex"
          flexDirection="column"
          justify="center"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="10"
          backgroundColor={useColorModeValue("white", "#1a202c")}
          p={30}
          w={{ xl: 400, lg: 400, md: 400, base: 340 }}
          h={{ xl: 470, lg: 440 }}
          margin={100}
        >
          <Heading
            color={useColorModeValue("third", "white")}
            textAlign="center"
            fontSize="35px"
          >
            Sign in
          </Heading>
          <Center>
            <FormControl className="login" isRequired>
              <FormLabel textAlign={"center"}>Email</FormLabel>
              <Input
                _focusVisible={{ borderColor: "third" }}
                type="email"
                placeholder="Email"
                size="md"
                {...register("email", { required: true })}
              />

              <Box mb="15px" ml="25px">
                {errors.email?.type === "required" && "Email is required"}
              </Box>
            </FormControl>
          </Center>
          <Center>
            <FormControl className="login" isRequired>
              <FormLabel textAlign={"center"}>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  _focusVisible={{ borderColor: "third" }}
                  fontFamily="body"
                  pr="4.5rem"
                  size="md"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", { required: true, minLength: "10" })}
                />

                <InputRightElement width="4.5rem" mr={5}>
                  <Button
                    h="1.75rem"
                    size="md"
                    alignItems="center"
                    onClick={handleClick}
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Box mb="15px" ml="25px">
                {errors.password?.type === "required" && "Password is required"}
                {errors.password?.type === "minLength" &&
                  "Password is required"}
              </Box>
            </FormControl>
          </Center>
          <Button
            color="black"
            fontFamily="body"
            display="flex"
            m="5px 5px auto"
            alt="Submit request."
            width={150}
            onClick={handleSubmit(onSubmit)}
            borderRadius="20px"
            bg="secondary"
            _hover={{ bg: "fourth" }}
          >
            Submit
          </Button>
          <Box backgroundColor="black" mt={15} mb={15} id={10}></Box>
          <Box backgroundColor="black">
            <FacebookLogin
              h={15}
              className="hola"
              borderRadius="5px"
              appId="627379595701369"
              autoLoad={false}
              buttonStyle={{
                backgroundColor: "#3b5998",
                color: "white",
                padding: "6.5px",
                textTransform: "capitalize",
                borderRadius: "4px",
                height: "42px",
                margin: "0 auto",
                minWidth: "234px", //:hover {backgroundColor: "#e2e8f0"}
              }}
              fields="name,email,picture"
              /* onClick={componentClicked} */
              callback={responseFacebook}
            />
          </Box>
          <Text alt="This link allows you to register in the app" mt="10px">
            Need an account? You can register{" "}
            <Link
              to="/register"
              style={{ color: "#2759be", textDecoration: "underline" }}
            >
              {" "}
              here!
              <ExternalLinkIcon ml="5px" mb="4px" />
            </Link>
          </Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Login;
