import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  GridItem,
  FormControl,
  Checkbox,
  CheckboxGroup,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  UnorderedList,
  ListItem,
  Spinner,
  Flex
} from '@chakra-ui/react';
import _ from 'lodash';
import GoogleMaps from './GoogleMaps.js';

const fetchURL = 'http://localhost:3010';

function App() {
  const mainLocation = {
    lat: -33.4266707,
    lng: -70.6202899
  }

  const [data, setData] = useState(null)
  const [center, setCenter] = useState(mainLocation)
  const [checkValues, setCheckValues] = useState([]);

  const getData = () => fetch(`${fetchURL}/api/pois`).then(res => res.json());

  useEffect(() => {
    getData().then(data => {
      setData(data);
    });
  }, []);

  const pois = _.groupBy(data, 'category_name');

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        {data !== null ? (
        <Grid templateColumns="25% 75%" minH="100vh">
          <GridItem maxH="100vh" overflow="auto">
            <Heading bg="blue.200" fontSize="xl" py={4}>Puntos de Interés</Heading>
            <FormControl id="email">
              <Accordion defaultIndex={[0]} allowMultiple>
                <CheckboxGroup
                  onChange={e =>
                    // console.log(e)
                    setCheckValues(e)
                  }
                >
                  {_.map(pois, (group, i) => (
                    <AccordionItem bg="white"  key={i}>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          <Checkbox
                            // isChecked={checkCategory}
                            // onChange={handleCheck}
                            value={i}
                          >
                            {i}
                          </Checkbox>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <UnorderedList styleType="none" textAlign="left" m={0}>
                          {group.map((item, i) => (
                            <ListItem
                              key={item.id}
                              fontSize="sm"
                              borderBottom="1px"
                              borderColor="gray.100"
                              p={2}
                              cursor="pointer"
                              onClick={() => setCenter({'lat': parseFloat(item.latitude), 'lng': parseFloat(item.longitude)})}>
                                {item.name}
                            </ListItem>
                          ))}
                        </UnorderedList>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </CheckboxGroup>
              </Accordion>
            </FormControl>
          </GridItem>

          <GridItem minH="100vh">
            {data !== null &&
              <GoogleMaps data={data} checkValues={checkValues} center={center} mainLocation={mainLocation} />
            }
          </GridItem>
        </Grid>
        ) : (
        <Flex justify="center" align="center" minH="100vh">
          <Spinner
            thickness="8px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.400"
            size="xl"
          />
        </Flex>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
