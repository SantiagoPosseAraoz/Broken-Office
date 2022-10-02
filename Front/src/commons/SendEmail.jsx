import {
  Button,
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
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function SendEmail({ report }) {
  console.log("🚀 ~ file: SendEmail.jsx ~ line 24 ~ SendEmail ~ report", report)
  const params = useParams();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail]=useState("")
  const sendEmail = () => {
    axios
      .post(`http://localhost:3001/api/report/share/${params.id}`, {
        email,
        subject,
        message,
      }, { withCredentials: true })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Email enviado",
          width: 300,
          showConfirmButton: false,
          timer: 1500,
          color: "secondary",
        });
        setMessage("");
        setSubject("");
      });
  };
  const handlerMessage = (e) => {
    setMessage(e.target.value);
  };
  const handlerSubject = (e) => {
    setSubject(e.target.value);
  };
  return (
    <>
      <Button
        borderRadius="40"
        _focusVisible={{ borderColor: "third" }}
        _hover={{ color: "secondary" }}
        onClick={onOpen}
        m="3"
      >
        Send Email
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>To</FormLabel>
              <Input
                borderColor="ActiveBorder"
                mb={4}
                _focusVisible={{ borderColor: "third" }}
                placeholder="TO"
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}

              />
            </FormControl>
            <FormControl>
              <FormLabel>Subject</FormLabel>
              <Input
                borderColor="ActiveBorder"
                _focusVisible={{ borderColor: "third" }}
                ref={initialRef}
                placeholder="Subject"
                onChange={handlerSubject}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Message</FormLabel>
              <Textarea
                borderColor="ActiveBorder"
                _focusVisible={{ borderColor: "third" }}
                placeholder="Leave your message here"
                onChange={handlerMessage}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              borderRadius={"40"}
              bg="secondary"
              _hover={{ bg: "fourth" }}
              mr={3}
              onClick={() => {
                sendEmail();
                onClose();
              }}
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

export default SendEmail;
