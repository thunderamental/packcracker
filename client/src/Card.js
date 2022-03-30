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

export default function WrapCard(props) { // Props : position (in pack), link (to png)
    return (
        <WrapItem>
            <SlideFade in={true} offsetY='100px' transition={{ enter: {duration: props.position, delay : 0}}}>
              <Image mx={0.5} borderRadius="md" maxW="320px" src={props.link} />
            </SlideFade>
          </WrapItem>
    )
}