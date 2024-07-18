import React, { useEffect, useState } from 'react'
import { Text, Box, VStack, Heading, HStack, Image, Grid, GridItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import NewArrival from './NewArrival';
const Product = () => {



    const product = [
        {
            "id": 1,
            "price": 109.95,
            "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            "title": "Fjallraven - Foldsack No. 1 Backpack"
        },
        {
            "id": 2,
            "price": 22.3,
            "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
            "title": "Mens Casual Premium Slim Fit T-Shirts "
        },
        {
            "id": 3,
            "price": 55.99,
            "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
            "title": "Mens Cotton Jacket"
        },
        {
            "id": 4,
            "price": 15.99,
            "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
            "title": "Mens Casual Slim Fit"
        }
    ]



    return (


        <>
            <VStack bg={'#FFEFCB'} textAlign={'center'} mt={100}>
                <Heading fontSize='5xl' p={5}>
                    Our Most Wanted Products

                    <Text fontSize={'20'} fontFamily={'arial'} color={'gray'}>
                        Good for environment, good for you
                    </Text>
                </Heading>

                <HStack flexDirection={["column",'column', 'row']} p={10} gap={[10]} justifyContent={'center'} mt={10}>
                    {
                        product.map((e) => (
                            <ProductCard key={e.id} price={e.price} image={e.image} title={e.title} id={e.id} />
                        ))
                    }
                </HStack>
            </VStack>

            <NewArrival />
        </>
    )
}

const ProductCard = ({ image, price, title, id }) => {
    return (
        <Link to={`/productsdetails/${id}`}>
            <Box p={2} h={[600]}>
                <Image src={image} h={['500']} borderRadius={'20px'} />
                <Text p={2} fontSize={'xl'} fontWeight={'bold'}>{title}</Text>
                <Text mt={1} fontSize={'xl'} fontWeight={'bold'} color={'green.600'}>${price}</Text>
            </Box>
        </Link>

    )

}

export default Product