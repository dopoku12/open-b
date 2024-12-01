import { ChakraProvider} from '@chakra-ui/react';
import { theme } from './theme/ThemeProvider.ts'
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
);
