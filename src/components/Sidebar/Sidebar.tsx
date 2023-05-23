import { NavLink } from 'react-router-dom';

import { ReactComponent as KafkaIcon } from '@assets/images/kafka-icon.svg';
import { ReactComponent as SlackIcon } from '@assets/images/slack-icon.svg';
import { Button, Flex, Link, Text } from '@chakra-ui/react';

import { routes } from '../../routes';

const menuRoutes = routes?.[0]?.children
  ? routes[0].children.filter((menu) => menu.title)
  : [];

const Sidebar = () => {
  return (
    <Flex
      className="w-56 h-screen p-2 shrink-0 flex-col bg-dark-blue"
      position="fixed"
      zIndex="9999">
      <Flex className="justify-center mb-4">
        <KafkaIcon className="w-50 text-kb-orange" />
      </Flex>
      {menuRoutes.map((route, i) => (
        <NavLink key={i} to={route.path}>
          {({ isActive }) => (
            <Flex
              className={`items-center rounded p-3 mb-1 text-gray-600 hover:text-white [&:hover>svg]:text-white ${
                isActive
                  ? 'bg-light-blue text-white [&>svg]:text-white'
                  : '[&>svg]:text-gray-600'
              } `}>
              {route?.icon && route.icon}
              <Text className="ml-2">{route.title}</Text>
            </Flex>
          )}
        </NavLink>
      ))}
      <Flex style={{ marginTop: 'auto' }}>
        <Link
          href="slack://channel?team=T03Q89XFN&id=C058R54EG73"
          isExternal
          minWidth="100%">
          <Button
            _hover={{
              backgroundColor: '#00000047',
            }}
            backgroundColor="#00000047"
            leftIcon={<SlackIcon width="25px" />}
            color="white"
            minWidth="100%">
            Slack
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
