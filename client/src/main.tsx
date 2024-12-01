import { StrictMode } from 'react';
import { ChakraProvider} from '@chakra-ui/react';
import { theme } from './theme/ThemeProvider.ts'
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  // </StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
);
