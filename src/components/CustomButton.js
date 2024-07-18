import React from "react";
import { Button } from "@chakra-ui/react";

export default function CustomButton({
  text = "Click me",
  isOutlined = false,
  both = false,
  type = "",
  ...props
}) {
  if (isOutlined) {
    return (
      <Button
        type={type}
        fontFamily={"'Inter', sans-serif"}
        color={"brand.1"}
        border={"2px solid #658C4A"}
        bg={"white"}
        h={"2rem"}
        p={"22px"}
        borderRadius={"2rem"}
        fontWeight={400}
        _hover={{ bgColor: "#668c4ad6", color: "white" }}
        style={{ "-webkit-tap-highlight-color": "transparent" }}
        {...props}
      >
        {text}
      </Button>
    );
  }
  return (
    <Button
      type={type}
      fontFamily={"'Inter', sans-serif"}
      color={"white"}
      background={
        "linear-gradient(45deg, rgba(101,140,74,1) 0%, rgba(137,188,104,1) 100%)"
      }
      h={"2rem"}
      border={both ? "2px solid #658C4A" : "none"}
      p={6}
      borderRadius={"2rem"}
      fontWeight={400}
      _hover={{ bgColor: "#668c4ad6" }}
      style={{ "-webkit-tap-highlight-color": "transparent" }}
      {...props}
    >
      {text}
    </Button>
  );
}