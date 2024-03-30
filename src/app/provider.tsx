"use client";
// provider includes chakra config and clerk
import { ChakraProvider } from "@chakra-ui/react";
import { ClerkProvider } from "@clerk/nextjs";
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: 600,
      },

      defaultProps: {
        size: "md", // default is md
        variant: "small", // default is solid
      },
    },
  },

  styles: {
    global: {
      "::-webkit-scrollbar": {
        width: "6px",
        height: "4px",
      },

      "::-webkit-scrollbar-thumb": {
        bg: "rgba(197, 197, 197, 1)",

        borderRadius: "full",
      },
      "::-webkit-scrollbar-track": {
        bg: "inherit",
        borderRadius: "full",
      },
    },
  },
});
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      {/*So that we can use the services in the wraped children*/}
      <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
    </ClerkProvider>
  );
}
