import { HStack, VStack, Image, Wrap, Text, Heading, Container, Stack, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Productdetails = () => {
  const { id } = useParams();
  // console.log(id)
  const [products, setproducts] = useState([]);

  useEffect(() => {
    const getproductdetails = async () => {
      const data = await fetch(`https://fakestoreapi.com/products/${id}`)
      const jsons = await data.json()
      console.log(jsons)
      setproducts(jsons);

    }
    getproductdetails();
  }, [id])


  return (
    <>

      <Container maxW='100%' justifyContent={'space-evenly'} >
        <HStack mt={20} p={5} >

          <VStack mt={10} p={2} w={'100%'} >
            <Image src={products.image} h={500} />
          </VStack>
          <Stack p={5} mr={10} w={'100%'} >
            <Text fontSize={'5xl'}>{products.title}</Text>
            <Text fontSize={'xl'} mt={3} bg={'green.300'} w={200} textAlign={'center'} borderRadius={'10px'}>{products.category}</Text>

            <Text fontSize={'xl'} mt={3}>{products.description}</Text>

            <Text fontSize={'3xl'} mt='3' fontWeight={'bold'}>$ {products.price}</Text>

            <Button mt={5} p={2}>Add to Cart</Button>

          </Stack>

        </HStack>
      </Container>


    </>
  )
}

export default Productdetails