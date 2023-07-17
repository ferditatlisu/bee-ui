import './index.scss';

import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom';
import { ConfigProvider as AntConfigProvider } from 'antd';

import { ChakraProvider } from '@chakra-ui/react';

import { theme } from 'constants/theme';

import { routes } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 250,
      retry: (failureCount, error) =>
        (error as Response).status === 500 && failureCount <= 3 ? true : false,
    },
  },
});
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
        <AntConfigProvider
          theme={{
            token: {
              colorPrimary: '#f27a1a',
            },
          }}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AntConfigProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
export default App;
