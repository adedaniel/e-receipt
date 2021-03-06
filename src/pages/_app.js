import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <DarkModeSwitch />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
