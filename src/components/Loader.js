import React from 'react'
import { Box, Spinner } from '@chakra-ui/react'

const Loader = () => {
    return (
        <Box minH='70vh' alignItems='center' justifyContent='center' display='flex'>
        <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            width='100px'
            height='100px'
        />
        </Box>

    )
}

export default Loader