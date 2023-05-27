import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import { Navbar } from 'components/Navbar';
import Sidebar from 'components/Sidebar';

const DefaultLayout = () => {
  return (
    <Flex bgColor="#EFF2F5">
      <Sidebar />
      <Suspense fallback={<div>Loading...</div>}>
        <Flex className="w-full ml-56" direction="column">
          <Navbar />
          <Flex className="m-5 w-full" minHeight="100vh">
            <Flex
              boxShadow="0 3px 3px 1px rgb(0 0 0 / 5%)"
              className="w-full bg-white gap-4 rounded-sm py-4 px-6">
              <Outlet />
            </Flex>
          </Flex>
        </Flex>
      </Suspense>
    </Flex>
  );
};

export default DefaultLayout;
