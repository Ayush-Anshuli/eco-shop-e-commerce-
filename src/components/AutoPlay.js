import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import { Grid, GridItem } from '@chakra-ui/react';

function AutoPlay() {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const [allproducts, setallproducts] = useState([]);

  useEffect(() => {
    const fetchallproduct = async () => {
      const data = await fetch(`https://fakestoreapi.com/products`);
      const jsons = await data.json();
      console.log(jsons);
      setallproducts(jsons);
    }
    fetchallproduct();
  }, [])

  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          {
            allproducts.map((item) => (
              <CrauselCard key={item.id} image={item.image} title={item.title} price={item.price} id={item.id} />
            ))
          }
        </Slider>
      </div>
      <HeroSection />
    </>
  );
}

const CrauselCard = ({ image, title, price, id }) => {
  return (
    <Link to={`/productsdetails/${id}`}>
      <Grid templateColumns={{ base: '1fr', md: '1fr' }} gap={4} p={2} alignItems="center">
        <GridItem>
          <Image src={image} h={{ base: '500px', md: '400px', lg: '400px' }} w="100%" objectFit="cover" />
        </GridItem>
        <GridItem>
          <Text fontSize={{ base: 'md', md: 'lg' }} textAlign={'center'}>{title}</Text>
        </GridItem>
        <GridItem>
          <Text fontSize={{ base: 'md', md: 'lg' }} color={'#4CAF50'} fontWeight={'bold'} textAlign={'center'}>${price}</Text>
        </GridItem>
      </Grid>
    </Link>
  );
}

export default AutoPlay;
