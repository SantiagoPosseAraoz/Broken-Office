import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { db } from "../firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import {
  Drawer,
  Button,
  Box,
  Stack,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  AvatarGroup,
  Avatar,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ChatIcon } from "@chakra-ui/icons";
import axios from "axios";


function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const publicKey = 'BAz6iDmfJti4Po5VRdswl8-pbOpCcNjyGUVPBGRlxl2v9yK7WM7M4qQoke4v6qTFon4RRS6SaHcBrfgCBf5dED4' 

const suscribe = async (name, message) => {
let sw = await navigator.serviceWorker.register("../service-worker.js");
let push = await sw.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array(publicKey)      
});
  axios.post("http://localhost:3001/api/user/notification", {endpoint:push, name:name, message:message}, {withCredentials:true} )
}  




const Chat = ({ report }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  
  useEffect( () => {


    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      let filterMessages = messages.filter(
        (message) => message.reportId === id
      );
      if (filterMessages[filterMessages.length - 1]?.userId !== user.id) {
        suscribe(filterMessages[filterMessages.length - 1].name, filterMessages[filterMessages.length - 1].text)
      }
        
      setMessages(filterMessages);
        
      });
      return () => unsubscribe();
    }, []);
    
  return (
    <>
      <Button
        bg="secondary"
        _hover={{ bg: "fourth" }}
        textAlign="center"
        color="black"
        alignSelf="center"
        colorScheme="teal"
        onClick={onOpen}
        borderRadius="40px"
        m="0 auto"
      >
        <ChatIcon mr={1} />
        Messages
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Chat</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                {messages &&
                  messages.map((message) => (
                    <Message
                      key={message.id}
                      message={message}
                      scroll={scroll}
                    />
                  ))}
              </Box>
            </Stack>
            <span ref={scroll}></span>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <SendMessage scroll={scroll} report={report} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Chat;
