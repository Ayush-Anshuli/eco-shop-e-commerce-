import React, { useEffect, useState } from 'react';
import { Box, Heading, Image, Select, Text, VStack, Wrap } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Electronic = () => {
  const [electronic, setElectronic] = useState([]);
  const [sort, setSort] = useState('asc');
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchElectronic = async () => {
      try {
        const data = await fetch(`https://fakestoreapi.com/products/category/electronics?sort=${sort}`);
        const jsons = await data.json();
        setElectronic(jsons);
        setLoad(false);
      } catch (error) {
        console.error('Error fetching electronic products:', error);
        setLoad(false); // Handle error state
      }
    };
    fetchElectronic();
  }, [sort]);

  return (
    <Box mt={5} p={3}>
      <VStack spacing={5} alignItems="center">
        <Heading fontSize={['3xl', '4xl', '5xl']}>Electronic</Heading>
        <Select
          w={['full', 300]}
          maxW={['full', 300]}
          fontSize={['md', 'xl']}
          p={2}
          defaultValue={'asc'}
          onChange={(e) => setSort(e.currentTarget.value)}
        >
          <option value="asc">Price low to high</option>
          <option value="desc">Price high to low</option>
        </Select>
      </VStack>

      <Wrap mt={10} p={5} justify="center" spacing={5}>
        {load ? (
          <Loader />
        ) : (
          electronic.map((item) => (
            <ElectronicCard key={item.id} image={item.image} title={item.title} price={item.price} id={item.id} />
          ))
        )}
      </Wrap>
    </Box>
  );
};

const ElectronicCard = ({ image, title, price, id }) => {
  return (
    <Link to={`/productsdetails/${id}`}>
      <VStack w={['full', 300, 350]} h={['auto', 400, 500]} p={5}  borderRadius="lg" overflow="hidden" spacing={3}>
        <Image src={image} w="full" h={['auto', 200, 300]} objectFit="contain" />
        <Text p={2} fontSize={['md', 'lg', 'xl']} textAlign="center">
          {title}
        </Text>
        <Text color="green.600" fontSize={['md', 'lg', 'xl']}>
          ${price}
        </Text>
      </VStack>
    </Link>
  );
};

export default Electronic;
