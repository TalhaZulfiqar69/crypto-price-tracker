import * as React from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import Navigation from "./components/Navigation";
import CryptoPriceTracker from "./components/CryptoPriceTracker";

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <Navigation />
    <Box fontSize="xl">
      <Grid p={3}>
        <CryptoPriceTracker />
      </Grid>
    </Box>
  </ChakraProvider>
);
