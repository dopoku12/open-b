import { extendTheme } from '@chakra-ui/react';

export const defaultTheme = {
  colors: {
    brand: {
      50: '#cbbff8', // Lavender Mist
      100: '#876cea', // Lilac Sky
      200: '#582CFF', // Violet Flame
      300: '#542de1', // Royal Purple
      400: '#4a25d0', // Grape Soda
      500: '#3915bc', // Indigo Night
      600: '#300eaa', // Midnight Blue
      700: '#1c0377', // Plum Shadow
      800: '#130156', // Eggplant Dream
      900: '#0e0042', // Blackberry Crush
      red: '#FF4560', // Red
      yellow: '#FEB019', // Yellow
      black: '#000000', // Black
    },
  },
  fonts: {
    heading: 'Plus Jakarta Display',
    body: 'Plus Jakarta Display',
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: "Roboto, sans-serif",
        color: 'white',
        backgroundColor: "black",
      },
    },
  },
};

export const theme = extendTheme(defaultTheme);
