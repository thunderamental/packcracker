import React, { useState, useEffect } from 'react';
import { ChakraProvider, 
  Box, 
  Center, 
  Image, 
  Flex, 
  Badge, 
  Text,
  SlideFade,
  Slide,
  Wrap,
  WrapItem
} from '@chakra-ui/react'

export function SetBooster(props) {
    const [pack, setPack] = useState("empty wrapper");
  
    useEffect(() => {
        fetch("http://localhost:9000/neo/set/")
        .then(response => response.json())
        .then((result) => {
            setPack(result)
            console.log(result)
        })
        .then(() => console.log(pack))
      }, []
    );
    useEffect(() => {
      console.log('pack state is: ', pack);
    }, [pack]);
  
    return (
      <ChakraProvider>
        <Center h="100vh">
        <Wrap>
  
          <WrapItem>
            <SlideFade in={true} offsetY='100px' transition={{ enter: {duration: 1, delay : 0}}}>
              <Image mx={0.5} borderRadius="md" maxW="320px" src="https://c1.scryfall.com/file/scryfall-cards/png/front/5/4/546e0452-5304-41fa-9e3a-a3fa5a571315.png?1597525896" />
            </SlideFade>
          </WrapItem>
  
          <WrapItem>
          <SlideFade  in={true} offsetY='100px' transition={{ enter: {duration: 1, delay : 1}}}>
            <Image mx={0.5} borderRadius="md" maxW="320px" src="https://c1.scryfall.com/file/scryfall-cards/png/front/9/3/936335d7-1c4a-4fcd-80ff-cd4d4fcab8c4.png?1597533987" />
          </SlideFade >
          </WrapItem>
          
          <WrapItem>
          <SlideFade in={true} offsetY='100px' transition={{ enter: {duration: 1, delay : 2}}}>
            <Image mx={0.5} borderRadius="md" maxW="320px" src="https://c1.scryfall.com/file/scryfall-cards/png/front/c/7/c75672e0-fa2d-43c5-9381-e17f2fd6d3bc.png?1597533988" />
          </SlideFade >
          </WrapItem>
  
          <WrapItem>
          <SlideFade in={true} offsetY='100px' transition={{ enter: {duration: 1, delay : 3}}}>
            <Image mx={0.5} borderRadius="md" maxW="320px" src="https://c1.scryfall.com/file/scryfall-cards/png/front/9/6/96d1a254-01a8-4590-8878-690c5bfb4a95.png?1599710761" />
          </SlideFade >
          </WrapItem>

          <WrapItem>
            <SlideFade in={true} offsetY='100px' transition={{ enter: {duration: 1, delay : 0}}}>
              <Image mx={0.5} borderRadius="md" maxW="320px" src="https://c1.scryfall.com/file/scryfall-cards/png/front/5/4/546e0452-5304-41fa-9e3a-a3fa5a571315.png?1597525896" />
            </SlideFade>
          </WrapItem>
  
          <WrapItem>
          <SlideFade  in={true} offsetY='100px' transition={{ enter: {duration: 1, delay : 1}}}>
            <Image mx={0.5} borderRadius="md" maxW="320px" src="https://c1.scryfall.com/file/scryfall-cards/png/front/9/3/936335d7-1c4a-4fcd-80ff-cd4d4fcab8c4.png?1597533987" />
          </SlideFade >
          </WrapItem>
          
          <WrapItem>
          <SlideFade in={true} offsetY='100px' transition={{ enter: {duration: 1, delay : 2}}}>
            <Image mx={0.5} borderRadius="md" maxW="320px" src="https://c1.scryfall.com/file/scryfall-cards/png/front/c/7/c75672e0-fa2d-43c5-9381-e17f2fd6d3bc.png?1597533988" />
          </SlideFade >
          </WrapItem>
  
          <WrapItem>
          <SlideFade in={true} offsetY='100px' transition={{ enter: {duration: 1, delay : 3}}}>
            <Image mx={0.5} borderRadius="md" maxW="320px" src="https://c1.scryfall.com/file/scryfall-cards/png/front/9/6/96d1a254-01a8-4590-8878-690c5bfb4a95.png?1599710761" />
          </SlideFade >
          </WrapItem>
  
        </Wrap>
        </Center>
      </ChakraProvider>
    );
  }