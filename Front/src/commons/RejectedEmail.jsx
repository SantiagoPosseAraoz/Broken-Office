import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
function RejectedEmail({ report }) {
  const params = useParams();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendEmail = (data) => {
    data.from = user.email;
    axios.put(
      `http://localhost:3001/api/report/rejectedreport/${params.id}`,
      {
        data,
      },
      { withCredentials: true }
    );
    onClose();
    navigate("/admin/reports");

  };

  return (
    <>
      <Button m="3" colorScheme="red" borderRadius="40px" onClick={onOpen}>
        Reject
      </Button>
      <Modal
        isCentered="true"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontFamily="body"
            textAlign="center"
            fontStyle="normal"
            font="caption"
            fontSize={15}
            mt={5}
          >
            The report is rejected, but you must send an email to the user
            explaning what the reason is. Thank you.
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>To</FormLabel>
              <Input
                borderColor="ActiveBorder"
                mb={4}
                _hover="ActiveBorder"
                _focusVisible={{ borderColor: "third" }}
                placeholder="TO"
                defaultValue={report.email}
                {...register("to")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Subject</FormLabel>
              <Input
                _hover="ActiveBorder"
                borderColor="ActiveBorder"
                _focusVisible={{ borderColor: "third" }}
                ref={initialRef}
                placeholder="Subject"
                {...register("subject")}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Message</FormLabel>
              <Textarea
                _hover="ActiveBorder"
                borderColor="ActiveBorder"
                _focusVisible={{ borderColor: "third" }}
                placeholder="Leave your message here"
                {...register("message")}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              borderRadius={"40"}
              bg="secondary"
              _hover={{ bg: "fourth" }}
              mr={3}
              onClick={handleSubmit(sendEmail)}
              color="black"
            >
              Send
            </Button>
            <Button borderRadius="40" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RejectedEmail;
