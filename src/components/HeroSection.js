import { HStack, Heading, Stack, VStack, Image, Text, Box } from '@chakra-ui/react'
import React from 'react'
import free from '../assets/free.png'
import happiness from '../assets/happiness.png'
import head from '../assets/headphones.png'
import leaf from '../assets/leaf.png'

const HeroSection = () => {
    return (
        <>
            <Heading textAlign='center' mt={10} p={2} color={'#4CAF50'} fontSize={['2xl', '3xl', '4xl', '5xl']}>
                Why Buy From Us?
            </Heading>
            <HStack 
                justifyContent={'space-around'} 
                mt={[5, 10, 20]} 
                fontSize={['md', 'lg']} 
                flexWrap='wrap'
                spacing={[5, 10, 15]}
            >
                <Stack 
                    w={['80%', '60%', '30%', '20%']} 
                    fontWeight={'bold'} 
                    alignItems={'center'} 
                    textAlign={'center'}
                >
                    <Image src={free} h={[50, 70, 90]} w={[50, 70, 90]}/>
                    <Text mt={2}>Free Shipping</Text>
                    <Text color={'#4CAF50'}>Shop now and enjoy free shipping on all orders</Text>
                </Stack>

                <Stack 
                    w={['80%', '60%', '30%', '20%']} 
                    fontWeight={'bold'} 
                    alignItems={'center'} 
                    textAlign={'center'}
                >
                    <Image src={happiness} h={[50, 70, 90]} w={[50, 70, 90]} />
                    <Text mt={2}>Satisfaction Guaranteed</Text>
                    <Text color={'#4CAF50'}>Our satisfaction guarantee ensures quality products</Text>
                </Stack>

                <Stack 
                    w={['80%', '60%', '30%', '20%']} 
                    fontWeight={'bold'} 
                    alignItems={'center'} 
                    textAlign={'center'}
                >
                    <Image src={leaf} h={[50, 70, 90]} w={[50, 70, 90]}/>
                    <Text mt={2}>Eco Friendly Packaging</Text>
                    <Text color={'#4CAF50'}>Using eco-friendly materials, sustainable and biodegradable</Text>
                </Stack>

                <Stack 
                    w={['80%', '60%', '30%', '20%']} 
                    fontWeight={'bold'} 
                    alignItems={'center'} 
                    textAlign={'center'}
                >
                    <Image src={head} h={[50, 70, 90]} w={[50, 70, 90]}/>
                    <Text mt={2}>Fast Response</Text>
                    <Text color={'#4CAF50'}>24/7 fast and reliable assistance whenever you need it</Text>
                </Stack>
            </HStack>
        </>
    )
}

export default HeroSection
