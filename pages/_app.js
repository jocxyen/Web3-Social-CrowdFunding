import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme';
import "@fontsource/dm-sans";
import Navbar from '../components/Navbar';
import { Web3Provider } from '../context/Web3Context';
function MyApp({ Component, pageProps }) {
  return (
  <ChakraProvider theme={theme}>
    <Web3Provider>
      <Navbar/>
      <Component {...pageProps} />
    </Web3Provider>
  </ChakraProvider>
  )
}

export default MyApp
