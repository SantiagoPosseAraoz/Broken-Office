import {
  Box,
  Button,
  Icon,
  IconButton,
  useToast,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../state/user";
import { BiSun, BiMoon } from "react-icons/bi";
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // customizacion del darkmode.
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "black");
  const img = useColorModeValue(
    "https://emprendedoresnews.com/wp-content/uploads/2020/01/company_5d7c04ad08a25a53fd4d5987.png",
    "https://i.ibb.co/SxKhWCJ/Captura-desde-2022-09-14-16-08-00.png"
  );
  //log out.
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        boxShadow="lg"
        rounded="sm"
        bg={bg}
        width="full"
      >
        <Menu bg="red">
          <Link className="globant-logo" to="/">
            <Image
              boxSize="100px"
              objectFit="cover"
              alt="Globant logo"
              minW={"fit-content"}
              w={15}
              h={90}
              ml="ml"
              src={img}
            ></Image>
          </Link>
          <IconButton
            alt="dark mode"
            aria-label="mode"
            textAlign="center"
            onClick={toggleColorMode}
            marginInlineStart="auto"
            mr={3}
            className="dark-mode"
            isRound="true"
            icon={colorMode === "light" ? <BiSun /> : <BiMoon />}
          ></IconButton>
          {user.email ? (
            <MenuButton
              leftIcon={<Icon as={FaUserCircle} />}
              mr={5}
              alt="Your name."
              bg="secondary"
              _hover={{ bg: "fourth" }}
              as={Button}
              color="black"
              borderRadius="40px"
              className="user-name"
            >
              {user.name}
            </MenuButton>
          ) : (
            <MenuButton
              borderRadius="40px"
              rightIcon={<ChevronDownIcon />}
              mr={5}
              color="black"
              bg="secondary"
              alt="menu button"
              _hover={{ bg: "fourth" }}
              as={Button}
              aria-label="Menu options"
            >
              <HamburgerIcon />
            </MenuButton>
          )}

          {user.email ? (
            <MenuList>
              {" "}
              <Link to="/profile">
                <MenuItem aria-label="profile">Profile</MenuItem>
              </Link>
              {user.isAdmin ? (
                <>
                  {" "}
                  <Link to="/admin/users">
                    <MenuItem aria-label="admin reports">Users</MenuItem>
                  </Link>
                  <Link to="/admin/reports">
                    <MenuItem aria-label="admin reports">Reports</MenuItem>
                  </Link>
                  <Link to={"/admin/myreports"}>
                    <MenuItem aria-label="admin my reports">
                      My reports
                    </MenuItem>
                  </Link>
                </>
              ) : (
                ""
              )}
              <MenuItem
                alt="Log out."
                onClick={() => {
                  handleLogOut();
                  toast({
                    title: "Closed account.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                }}
              >
                Log Out
              </MenuItem>
            </MenuList>
          ) : (
            <MenuList>
              <Link to="/login">
                {" "}
                <MenuItem aria-label="Log in">Log In</MenuItem>{" "}
              </Link>
              <Link to="/register">
                {" "}
                <MenuItem aria-label="Register">Register</MenuItem>{" "}
              </Link>
            </MenuList>
          )}
        </Menu>
      </Box>
    </>
  );
};

export default Navbar;
