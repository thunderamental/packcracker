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
  Fade,
  WrapItem,
  Skeleton
} from '@chakra-ui/react'

export default function WrapCard(props) { // Props : position (in pack), link (to png)
    
  const [loaded, setLoaded] = useState(false);

  
  return (
    <WrapItem>
        <Fade in={true} transition={{ enter: {duration: props.position, delay : 0}}}>
          <Image mx={0.5} borderRadius="md" maxW="245px" src={props.link} onLoad={() => setLoaded(true)} />
        </Fade>
    </WrapItem>  
    )
}