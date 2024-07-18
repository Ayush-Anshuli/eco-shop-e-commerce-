import { Container, HStack , Heading, Text } from '@chakra-ui/react'
import React from 'react'
import AutoPlay from './AutoPlay'

const NewArrival = () => {
  return (
    
        <Container maxW={'container.xl'} py={10} px={10} mt={16}>
            
                <Heading fontSize={["4xl","5xl",'5xl']}>New Arrival</Heading>
                <Text fontSize={'xl'} py={'2'} >Be the first to have the first-class product</Text>
       
              <AutoPlay/>
        </Container>
    
  )
}

export default NewArrival