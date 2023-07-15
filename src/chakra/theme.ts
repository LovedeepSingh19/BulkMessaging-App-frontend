import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const themess = extendTheme({
  colors: {
    brand: {
      100: "#3d84f7",
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: "whiteAlpha.100",
      },
    }),
  },
  ...config,
}
);
