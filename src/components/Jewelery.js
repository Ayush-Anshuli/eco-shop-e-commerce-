import React, { useEffect, useState } from 'react'
import { Box, HStack, Heading, Image, Select, Text, VStack, Wrap, Stack, Center } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Jewelery = () => {
  const [jewel, setjewel] = useState([]);
  const [sort, setsort] = useState('asc');
  const [load, setload] = useState(true);

  useEffect(() => {
    const fetcheljewelery = async () => {
      const data = await fetch(`https://fakestoreapi.com/products/category/jewelery?sort=${sort}`)
      const jsons = await data.json();
      setjewel(jsons);
      setload(false);
    }
    fetcheljewelery()
  }, [sort]);

  return (
    <Box mt={5} p={3}>
      <Stack direction={['column', 'row']} justifyContent={'space-between'} alignItems={'center'} spacing={5}>
        <Heading fontSize={['3xl', '4xl', '5xl']}>Jewelery</Heading>
        <Select w={['full', 300]} placeholder='Filter' fontSize={['md', 'xl']} p={2} defaultValue='asc' onChange={(e) => setsort(e.currentTarget.value)}>
          <option value='asc'>Price low to high</option>
          <option value='desc'>Price high to low</option>
        </Select>
      </Stack>

      <Center mt={10} p={5}>
        {load ? (
          <Loader />
        ) : (
          <Wrap justify='center' spacing={5}>
            {jewel.map((item) => (
              <JewelCard key={item.id} image={item.image} title={item.title} price={item.price} id={item.id} />
            ))}
          </Wrap>
        )}
      </Center>
    </Box>
  )
}

const JewelCard = ({ image, title, price, id }) => {
  return (
    <Link to={`/productsdetails/${id}`}>
      <VStack w={['100%', '100%', '100%']} h={[350, 400, 500]} p={5}  borderRadius={'lg'} overflow={'hidden'} spacing={3}>
        <Image src={image} w={'full'} h={[150, 200, 300]} objectFit={'contain'} />
        <Text p={2} fontSize={['md', 'lg', 'xl']} textAlign={'center'}>{title}</Text>
        <Text color={'green.600'} fontSize={['md', 'lg', 'xl']}>${price}</Text>
      </VStack>
    </Link>
  )
}

export default Jewelery
