import { NavLink, useNavigate } from 'react-router-dom';

import { ReactComponent as GitHubIcon } from '@assets/images/github.svg';
import { ReactComponent as KafkaIcon } from '@assets/images/kafka-icon.svg';
import { ReactComponent as SlackIcon } from '@assets/images/slack-icon.svg';
import { Button, Center, Flex, IconButton, Link, Text } from '@chakra-ui/react';

import { ClusterSelect } from 'components/ClusterSelect';

import { routes } from '../../routes';

const menuRoutes = routes?.[0]?.children
  ? routes[0].children.filter((menu) => menu.title)
  : [];

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Flex
      className="w-56 h-screen p-2 shrink-0 flex-col bg-dark-blue"
      position="fixed"
      zIndex="9999">
      <Flex maxWidth="100%">
        <ClusterSelect />
      </Flex>
      <Flex color="gray.600" className="justify-center mb-6 mt-8">
        <Link onClick={() => navigate('/')} className="w-36">
          <KafkaIcon />
        </Link>
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
      <Flex
        direction="row"
        style={{ marginTop: 'auto' }}
        maxWidth="100%"
        gap={5}
        mb={2}
        justify="center">
        <Link href={KB_ENVIRONMENTS.SLACK_URL} isExternal>
          <SlackIcon width="30px"></SlackIcon>
        </Link>
        <Link href="https://github.com/ferditatlisu/bee" isExternal>
          <GitHubIcon width="34px" />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
