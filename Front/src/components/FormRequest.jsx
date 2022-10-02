import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Select,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Divider,
  Box,
  useColorMode,
  Heading,
  useColorModeValue,
  Image,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { sendReport } from "../state/reports";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import "../styles/login.css";
const FormRequest = () => {
  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [imageSrc, setImageSrc] = useState();
  const color = useColorModeValue("black", "white");
  const [segundoInput, setSegundoInput] = useState();
  const [input, setInput] = useState(null);
  const [anotherInput, setAnotherInput] = useState(null);
  const { colorMode } = useColorMode();
  const [value, setValue] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues: { compañyRole: "" } });

  const onSubmit = async (data) => {
    try {
      data.coord = location;
      data.name = user.name;
      data.lastname = user.lastname;
      data.email = user.email;
      data.image = imageSrc;
      data.date = new Date();
      dispatch(sendReport(data));
      Swal.fire({
        text: "Your report was success!",
        icon: "success",
        width: 400,
        showConfirmButton: false,
        timer: 1500,
        color: "secondary",
      });
    } catch {}
  };

  useEffect(() => {
    async function cleanInputs() {
      if (formState.isSubmitSuccessful) {
        reset({
          title: "",
          compañyRole: "",
          description: "",
          priority: null,
        });
        setImageSrc("");
        let randomString = Math.random().toString(36);
        setInput(randomString);
        setAnotherInput(randomString);
      }
    }
    cleanInputs();
  }, [formState, reset]);

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  return (
    <Box
      boxShadow="2xl"
      p="6"
      rounded="md"
      pb="35px"
      pt="35px"
      className="report"
      margin="0 auto"
      width={["full", "full", "full", "80vh", "80vh", "90vh"]}
      height="full"
      bg={useColorModeValue("white", "black")}
    >
      <Heading
        color={useColorModeValue("#000000", "white")}
        textAlign="center"
        mb={-2}
      >
        Do you have any problem? Tell us!
      </Heading>

      <Stack spacing={6} p={6}>
        <Divider />
        <Popover backgroundColor={useColorModeValue()}>
          <PopoverTrigger backgroundColor="white">
            <Button
              backgroundColor={useColorModeValue("white", "black")}
              _hover={{ backgroundColor: "secondary" }}
            >
              Your report
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody
              alt=" Tell us what you have broken in your office, and we will help you!"
              fontSize={17}
              mt={2}
              textAlign="center"
            >
              Tell us what you have broken in your office, and we will help you!
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {user.email ? (
          <>
            {" "}
            <FormControl isRequired textAlign="center">
              <FormLabel textAlign="center">Title:</FormLabel>
              <Input
                maxLength={30}
                alt="The title of your report."
                _focusVisible={colorMode === "light" ? "third" : "white"}
                _hover="ActiveBorder"
                borderColor="ActiveBorder"
                textAlign="initial"
                width={["200px", "200px", "330px", "250px", "400px"]}
                placeholder="Title"
                {...register("title", { required: true })}
                onChange={(e) => setValue(e.target.value)}
              ></Input>
              <Box>{value ? value.length : 0}/30</Box>
              <Box>
                {errors.title?.type === "required" && "Title is required."}
              </Box>
            </FormControl>
            <FormControl isRequired textAlign="center">
              <FormLabel textAlign="center">Company role:</FormLabel>
              <Input
                _hover="ActiveBorder"
                borderColor="ActiveBorder"
                alt="Your company role in the company."
                _focusVisible={colorMode === "light" ? "third" : "white"}
                textAlign="initial"
                width={["200px", "200px", "330px", "250px", "400px"]}
                placeholder="Company role"
                {...register("compañyRole", { required: true })}
              ></Input>
              <Box>
                {errors.compañyRole?.type === "required" &&
                  "Company role is required."}
              </Box>
            </FormControl>
            <FormControl isRequired textAlign="center">
              <FormLabel textAlign="center">Description:</FormLabel>
              <Textarea
                maxLength={160}
                _hover="ActiveBorder"
                borderColor="ActiveBorder"
                alt="The description about the problem you have"
                _focusVisible={colorMode === "light" ? "third" : "white"}
                textAlign="initial"
                placeholder="Description"
                width={["200px", "200px", "330px", "250px", "400px"]}
                {...register("description", { required: true })}
                onChange={(e) => setSegundoInput(e.target.value)}
              />
              <Box>{segundoInput ? segundoInput.length : 0}/160</Box>
              <Box>
                {errors.description?.type === "required" &&
                  "Description is required."}
              </Box>
            </FormControl>
            <FormControl id="priority" isRequired textAlign="center">
              <FormLabel textAlign="center">Priority</FormLabel>

              <Select
                key={anotherInput || ""}
                _hover="ActiveBorder"
                borderColor="ActiveBorder"
                alt="Select the priority of your problem."
                m="0 auto"
                textAlign="center"
                _focusVisible={colorMode === "light" ? "third" : "white"}
                width={["200px", "200px", "330px", "250px", "400px"]}
                placeholder="Select level:"
              >
                <option {...register("priority", { required: true })}>
                  High
                </option>
                <option {...register("priority", { required: true })}>
                  Medium
                </option>
                <option {...register("priority", { required: true })}>
                  Low{" "}
                </option>
              </Select>
              <Box>
                {errors.priority?.type === "required" &&
                  "Priority is required."}
              </Box>
            </FormControl>
            <FormControl textAlign="center" isRequired>
              <FormLabel textAlign="center">Add file</FormLabel>

              <Input
                borderColor="ActiveBorder"
                textAlign="center"
                m="0 auto"
                key={input || ""}
                width={["200px", "200px", "330px", "250px", "400px"]}
                alt="Add the photos."
                onChange={handleOnChange}
                id="image"
                type="file"
                placeholder="Add a photo"
              />
            </FormControl>
            {imageSrc && (
              <Image
                maxWidth="50%"
                alignSelf="center"
                alt="your post image"
                src={imageSrc}
              />
            )}
            <Button
              textAlign="center"
              color="black"
              fontFamily="body"
              display="flex"
              alignSelf="center"
              alt="Submit request."
              width={125}
              onClick={handleSubmit(onSubmit)}
              borderRadius="20px"
              bg="secondary"
              _hover={{ bg: "fourth" }}
            >
              Submit
            </Button>
          </>
        ) : (
          <Text fontFamily="body" textAlign="center">
            If you want to add a report, you have to be logged! You can log in{" "}
            <Link
              style={{ textDecoration: "underline", color: "blue" }}
              to="/login"
            >
              here!
              <ExternalLinkIcon ml="5px" mb="4px" />
            </Link>
          </Text>
        )}
      </Stack>
    </Box>
  );
};

export default FormRequest;
