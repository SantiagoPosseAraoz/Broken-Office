import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "../styles/login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Spinner,
  Box,
  Heading,
  Grid,
  Text,
  useColorModeValue,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import Footer from "../components/Footer";
import ImageList from "@mui/material/ImageList";
import "@fontsource/heebo/700.css";
import ImageListItem from "@mui/material/ImageListItem";
import FormRequest from "../components/FormRequest";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JoyRide from "react-joyride";
import { itemData } from "../hooks/info";

export const Home = () => {
  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const [setIsReadyForInstall, setSetIsReadyForInstall] = useState(false);
  const color = useColorModeValue("black", "white");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY,
  });

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  async function donwloadApp() {
    console.log("ok, butinstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      console.log("oops, no prompt event guardado en window");
      return;
    }
    promptEvent.prompt();

    const result = await promptEvent.userChoice;
    console.log("ok, user choice", result);
    window.deferredPrompt = null;

    setIsReadyForInstall(false);
  }
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      console.log("funca");
      window.deferredPrompt = event;

      setIsReadyForInstall(true);
    });
  });

  return (
    <>
      <Box
        mt={3}
        mr={5}
        alignItems="center"
        display="flex"
        justifyContent="center"
      >
        {setIsReadyForInstall && (
          <Tooltip
            bg="gray.300"
            color="black"
            label="You can download the page in your phone."
          >
            <Button>Download</Button>
          </Tooltip>
        )}
      </Box>
      <Box
        className="box-mapa"
        display="flex"
        flexDirection={{
          base: "column", // 0-48em
          md: "column",
          lg: "row", // 48em-80em,
          xl: "row", // 80em+
        }}
        alignItems={{ base: "center", md: "center" }}
      >
        <Box
          width="50%"
          display="flex"
          flexDirection="column"
          // justifyContent="center"
          alignItems="center"
          pt={{ base: "70px", md: "70px" }}
          mb={{ xl: "150px", lg: "150px" }}
        >
          <Heading
            className="tour-search"
            m="0 auto"
            fontFamily="heading"
            color={color}
            textAlign="left"
            fontSize={50}
          >
            Your Location
          </Heading>{" "}
          <Text
            fontFamily="body"
            color={color}
            textAlign={{
              xl: "center",
              lg: "center",
              md: "center",
              base: "left",
            }}
            fontSize={25}
            m="0 auto"
            // pl={{ xl: "150px", lg: "70px" }}
            // pr={{ xl: "70px", lg: "40px", md: "20px" }}
          >
            In this map, you can see where you are, but if you want, you can
            scan a{" "}
            <Link
              className="link-qr"
              to="/scanner"
              style={{
                textDecoration: "underline",

                color: useColorModeValue("#92c64e", "#BFD732"),
              }}
            >
              location's QR!
            </Link>
          </Text>
        </Box>
        <Box
          width={{ xl: "50%", lg: "50%", md: "50%", base: "80%" }}
          height="500px"
          display="flex"
          justifyContent={{
            xl: "flex-end",
            lg: "flex-end",
            md: "center",
            base: "center",
          }}
          mr={{ md: 40, lg: 40, xl: 40 }}
          mt={90}
        >
          {isLoaded ? (
            <GoogleMap
              mapContainerClassName="maps"
              mapContainerStyle={{ width: "90%", height: "60%" }}
              center={{
                lat: location[0],
                lng: location[1],
              }}
              zoom={15}
            >
              <Marker position={{ lat: location[0], lng: location[1] }} />
              <></>
            </GoogleMap>
          ) : (
            <Spinner pt="80px" color="secondary" size="xl" />
          )}
        </Box>
      </Box>
      <Grid mt={-50} mb={50}>
        <ImageList
          sx={{ width: "full", height: 246 }}
          variant="quilted"
          cols={4}
          rowHeight={121}
        >
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 1}
            >
              <img
                {...srcset(item.img, 121, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>

      <FormRequest />
      <Box mt={50}>
        <Footer />
      </Box>
    </>
  );
};
