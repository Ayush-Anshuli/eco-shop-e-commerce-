import {
  Box,
  Button,
  HStack,
  Image,
  VStack,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaRegUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { db, useFirebase } from '../utils/firebase';
import { onValue, ref } from 'firebase/database';

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const firebase = useFirebase();
  const { isSignedIn, signOutUser, user } = firebase;
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        setUserDetails(snapshot.val());
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleLogout = () => {
    signOutUser();
    navigate('/');
  };

  return (
    <>
      <Box borderBottom={'1.5px solid green'}>
        <HStack justifyContent="space-between" p={8} display={['none', 'none', 'flex', 'flex']}>
          <Link to="/">
            <Text fontSize={"34px"} fontFamily={"cursive"}>Branders</Text>
          </Link>

          <HStack spacing="24px">
            <Link to="/" style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}>
              <Text>Home</Text>
            </Link>
            <Link to="/electronic" style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}>
              <Text>Electronic</Text>
            </Link>
            <Link to="/jewelery" style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}>
              <Text>Jewelery</Text>
            </Link>
            <Link to="/mens clothing" style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}>
              <Text>Men's Clothing</Text>
            </Link>
            <Link to="/womens clothing" style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}>
              <Text>Women's Clothing</Text>
            </Link>
          </HStack>

          {isSignedIn ? (
            <HStack spacing="24px">
              <Menu>
                <MenuButton as={Button} border={'none'} bg={'transparent'} color='green' fontSize={'20px'} cursor={'pointer'}>
                  <FaRegUserCircle size={24} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigate(`/users/${user.uid}`)}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          ) : (
            <Button border={'none'} bg={'transparent'} color='green' fontSize={'20px'} cursor={'pointer'}>
              <Link to={"/login"}>Login</Link>
            </Button>
          )}
        </HStack>

        {/* Mobile Menu */}
        <HStack justifyContent="space-between" p={8} display={['flex', 'flex', 'none', 'none']}>
          <Link to="/">
            <Image src={logo} w="5rem" />
          </Link>
          <IconButton
            icon={<HamburgerIcon />}
            variant="outline"
            aria-label="Open Menu"
            onClick={onOpen}
          />
        </HStack>

        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="start">
                <Link to="/" style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }} onClick={onClose}>
                  <Text>Home</Text>
                </Link>
                <Link to="/electronic" style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }} onClick={onClose}>
                  <Text>Electronic</Text>
                </Link>
                <Link to="/jewelery" style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }} onClick={onClose}>
                  <Text>Jewelery</Text>
                </Link>
                <Link to="/mens clothing" style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }} onClick={onClose}>
                  <Text>Men's Clothing</Text>
                </Link>
                <Link to="/womens clothing" style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }} onClick={onClose}>
                  <Text>Women's Clothing</Text>
                </Link>
                {isSignedIn ? (
                  <>
                    <Button border={'none'} bg={'transparent'} color='green' fontSize={'20px'} cursor={'pointer'} onClick={() => { navigate(`users/${user.uid}`); onClose(); }}>
                      Profile
                    </Button>
                    <Button border={'none'} bg={'transparent'} color='green' fontSize={'20px'} cursor={'pointer'} onClick={() => { handleLogout(); onClose(); }}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button border={'none'} bg={'transparent'} color='green' fontSize={'20px'} cursor={'pointer'} onClick={onClose}>
                    <Link to={"/login"}>Login</Link>
                  </Button>
                )}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default NavBar;
