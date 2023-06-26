import React from 'react';
import { Navigate } from 'react-router-dom';

import {
  ChatIcon,
  CopyIcon,
  HamburgerIcon,
  RepeatClockIcon,
  SearchIcon,
} from '@chakra-ui/icons';

export type RouteType = {
  path: string;
  title?: string;
  element: JSX.Element;
  icon?: JSX.Element;
  children?: Array<RouteType>;
};

const DefaultLayout = React.lazy(() => import('layouts/DefaultLayout'));
const Topics = React.lazy(() => import('pages/Topics'));
const Consumers = React.lazy(() => import('pages/Consumers'));
const TopicDetail = React.lazy(() => import('pages/TopicDetail'));
const ConsumerDetail = React.lazy(() => import('pages/ConsumerDetail'));
const Offset = React.lazy(() => import('pages/Offset'));
const Copy = React.lazy(() => import('pages/Copy'));

export const routes: Array<RouteType> = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: 'topics',
        title: 'Topics',
        element: <Topics />,
        icon: <ChatIcon />,
      },
      {
        path: 'topics/:id',
        element: <TopicDetail />,
      },
      {
        path: 'consumers',
        title: 'Groups',
        element: <Consumers />,
        icon: <HamburgerIcon />,
      },
      {
        path: 'offset',
        title: 'Offset',
        element: <Offset />,
        icon: <RepeatClockIcon />,
      },
      {
        path: 'copy',
        title: 'Copy',
        element: <Copy />,
        icon: <CopyIcon />,
      },
      {
        path: 'consumers/:id',
        element: <ConsumerDetail />,
      },
      {
        path: '/',
        element: <Navigate replace to="topics" />,
      },
    ],
  },
];
