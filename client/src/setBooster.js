import React, { useState, useEffect } from 'react';
import './Card.js'
import { 
  Box, 
  Flex, 
  Wrap,
  Container,
  Spacer
} from '@chakra-ui/react';
import WrapCard from './Card.js';

const axios = require("axios");

export function SetBooster(props) {
    const [pack, setPack] = useState("empty wrapper");
/* 
    useEffect(() => {
        fetch("http://161.35.10.143:9000/neo/set") // http://localhost: 161.35.10.143:
        .then(response => {response.json()})
        .then((result) => {
            setPack(result)
            console.log(result)
        })
        .then(() => console.log(pack))
      }, []
    );
*/
    useEffect(() => {
      axios.get("http://161.35.10.143:9000/neo/set") // http://localhost: 161.35.10.143:
        //.then(response => {response.json()})
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
  
    var urls = pack[2];
    var packImgs = [];
    for (let i = 0 ; i < urls.length ; i++) {
      packImgs.push(
        <WrapCard position={i/2} link={urls[(urls.length) - i - 1][2]} />
      )
    }

    return (
        <Container maxW='container.xl'>
          <Flex><Box><Spacer />q</Box><Spacer /></Flex>
          <Wrap align="center" justify='center'>
            {packImgs}
          </Wrap>
        </Container>
    );
  }