import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
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
  WrapItem,
  Stack,
  VStack
} from '@chakra-ui/react'
import { SetBooster } from './setBooster';
import './navbar.js'
import WithSubnavigation from './navbar.js';

ReactDOM.render(
  <ChakraProvider>
    <VStack>
      <WithSubnavigation />
      
      <Image style={{
              resizeMode: "cover",
              flex : 1,
              height: 100,
              width: 1000
            }}
            src={require("./neoSet.png")} />
      <SetBooster />
    </VStack>
  </ChakraProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();