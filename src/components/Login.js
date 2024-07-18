import {
    Button,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightAddon,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { FaGithub, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
  import { FcGoogle } from "react-icons/fc";
  import { Link } from "react-router-dom";
  import { useFirebase } from "../utils/firebase"; // Ensure the correct path
  import { useNavigate } from "react-router-dom";
  
  export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const firebase = useFirebase();
    const signInUserWithEmailAndPassword = firebase.signInUserWithEmailAndPassword;
    const signInWithGoogle = firebase.signInWithGoogle;
    const signInWithGithub = firebase.signInWithGithub;
  
    const handleSubmit = (e) => {
      e.preventDefault();
      signInUserWithEmailAndPassword(email, password);
    };
  
    useEffect(() => {
      window.scrollTo(0, 0);
      if (firebase.isSignedIn) {
        navigate("/");
      }
    }, [firebase.isSignedIn, navigate]); // Ensured correct dependencies
  
    return (
      <Container maxW={"container.sm"} p={[5, 10]} m={"auto"}>
        <VStack p={[5, 10]} borderRadius={"2rem"} boxShadow={"0 0 10px #999"}>
          <Heading
            fontFamily={"'Libre Baskerville', serif"}
            lineHeight={"150%"}
            textAlign={["center", "left"]}
            fontSize={["4xl", "5xl"]}
            color={"#333"}
            borderBottom={"2px solid #333"}
            mb={5}
          >
            Login
          </Heading>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormControl fontFamily={"'Inter', sans-serif"}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                borderRadius={"2rem"}
                placeholder="Enter your email"
                focusBorderColor="#658C4A"
                border={"1px solid #658C4A"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
              <FormLabel mt={5}>Password</FormLabel>
              <InputGroup
                focusBorderColor="#658C4A"
                border={"1px solid #658C4A"}
                borderRadius={"2rem"}
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  borderRadius={"2rem"}
                  placeholder="Enter your password"
                  focusBorderColor="#658C4A"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightAddon
                  backgroundColor={"transparent"}
                  borderRadius={"0 2rem 2rem 0"}
                  cursor={"pointer"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            <Button
              my={5}
              borderRadius={"2rem"}
              color={"white"}
              bgColor={"brand.1"}
              variant={"solid"}
              letterSpacing={"1px"}
              fontFamily={"'Inter', sans-serif"}
              w={"full"}
              _hover={{ bgColor: "rgba(101, 140, 74, 0.9)" }}
              type="submit"
            >
              Login
            </Button>
          </form>
          <Text fontFamily={"'Inter', sans-serif"}>Or Login with</Text>
          <Button
            my={5}
            borderRadius={"2rem"}
            border={"1px solid #658C4A"}
            color={"brand.1"}
            variant={"outline"}
            letterSpacing={"1px"}
            fontFamily={"'Inter', sans-serif"}
            w={"full"}
            _hover={{ bgColor: "rgba(101, 140, 74, 0.2)" }}
            leftIcon={<FcGoogle size={20} />}
            onClick={signInWithGoogle}
          >
            Login with Google
          </Button>
         {/* <Button
            mb={5}
            borderRadius={"2rem"}
            border={"1px solid #658C4A"}
            color={"brand.1"}
            variant={"outline"}
            letterSpacing={"1px"}
            fontFamily={"'Inter', sans-serif"}
            w={"full"}
            _hover={{ bgColor: "rgba(101, 140, 74, 0.2)" }}
            leftIcon={<FaGithub size={20} />}
            onClick={signInWithGithub}
          >
            Login with Github
          </Button>*/}
          <Text fontFamily={"'Inter', sans-serif"}>Don't have an account?</Text>
          <Link to={"/register"} style={{ width: "100%" }}>
            <Button
              my={5}
              borderRadius={"2rem"}
              border={"1px solid #658C4A"}
              color={"brand.1"}
              variant={"outline"}
              letterSpacing={"1px"}
              fontFamily={"'Inter', sans-serif"}
              w={"full"}
              _hover={{ bgColor: "rgba(101, 140, 74, 0.2)" }}
            >
              Sign Up
            </Button>
          </Link>
        </VStack>
      </Container>
    );
  }
  