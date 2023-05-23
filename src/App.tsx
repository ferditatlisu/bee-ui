import './index.scss';

import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import { theme } from 'constants/theme';

import { routes } from './routes';

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return useRoutes(routes);
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
export default App;
