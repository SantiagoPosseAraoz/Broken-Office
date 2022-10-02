import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { Box, Button, Heading } from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUbication } from "../state/location";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@chakra-ui/icons";

function QRscanner() {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  let ubication;

  useEffect(() => {
    ubication = data.split(", ");
    ubication[0] = Number(ubication[0]);
    ubication[1] = Number(ubication[1]);
    dispatch(setUbication(ubication));
  }, [data]);

  return (
    <>
      <Box display="flex">
        <Link to="/">
          <Button
            color="black"
            alt="back to profile"
            bg="secondary"
            ml={5}
            mt={15}
          >
            <ArrowLeftIcon />
          </Button>
        </Link>
      </Box>
      <Box
        mt="-55px"
        h={{ xl: "85vh", lg: "90vh", md: "91vh", base: "80vh" }}
        backgroundImage="https://i.ibb.co/hWcn2Tz/Captura-desde-2022-09-21-14-45-38.png"
      >
        <Box
          h={{ xl: "75vh", lg: "90vh", md: "80vh", base: "77vh" }}
          flexDirection="column"
          display="flex"
          alignItems="center"
        >
          <Box
            mt={{ xl: "70px", lg: "30px", md: "150px", base: "90px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Heading mb={-2} color="white" fontFamily="heading">
              Scan your location's QR!
            </Heading>
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setData(result?.text);
                  Swal.fire({
                    text: "Scanned successfully!",
                    icon: "success",
                    width: 300,
                    timer: 1500,
                    color: "secondary",
                  });
                }
              }}
              containerStyle={{ width: "350px", height: "350px" }}
            />
            <p>{data}</p>
          </Box>
        </Box>

        <Footer />
      </Box>
    </>
  );
}

export default QRscanner;
