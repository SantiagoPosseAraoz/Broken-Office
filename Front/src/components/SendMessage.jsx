import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Button, FormControl, Input } from "@chakra-ui/react";

const style = {
  form: `h-14 w-full max-w-[728px]  flex text-xl absolute bottom-0`,

  button: `w-[20%] bg-green-500`,
};

const SendMessage = ({ scroll, report }) => {
  const [input, setInput] = useState("");
  const user = useSelector((state) => state.user);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid message")
      return;
    }
    const { id } = user;
    const { _id } = report;
    await addDoc(collection(db, "messages"), {
      text: input,
      name: `${user.name} ${user.lastname}`,
      userId: id,
      reportId: _id,
      timestamp: serverTimestamp(),
    });
    setInput("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessageEnter = async (e) => {
    if (e.keyCode === 13) {
      if (input === "") {
        alert("Please enter a valid message");
        return;
      }
      const { id, name, lastname } = user;
      const { _id } = report;
      await addDoc(collection(db, "messages"), {
        text: input,
        name: `${name} ${lastname}`,
        userId: id,
        reportId: _id,
        timestamp: serverTimestamp(),
      });
      setInput("");
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <FormControl display="flex" flexDirection="row" onSubmit={sendMessage}>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        w="full"
        p={3}
        type="text"
        placeholder="Message"
        onKeyDown={sendMessageEnter}
      />
      <Button
        ml={2}
        onClick={sendMessage}
        className={style.button}
        type="submit"
        bg="secondary"
        _hover={{ bg: "fourth" }}
        p={5}
      >
        Send
      </Button>
    </FormControl>
  );
};

export default SendMessage;
