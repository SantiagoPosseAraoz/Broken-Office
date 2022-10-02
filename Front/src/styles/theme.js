import { extendTheme } from "@chakra-ui/react";
const config = {
  initialColorMode: "light",
  
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

export default theme;
export const myNewTheme = extendTheme({
  colors: {
    primary: "#FFFFFF", //blanco
    secondary: "#BFD732", //verde
    third: "#444444", //gris
    fourth: "#92c64e", //verde + oscuro
  },
  fonts: {
    heading: `'Heebo', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
});
