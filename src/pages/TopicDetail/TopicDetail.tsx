import { useLocation } from 'react-router-dom';

import {
  Box,
  Flex,
  HStack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { RefreshButton } from 'components/RefreshButton';

import { useTopicInformationQuery } from 'hooks/services/useTopicInformationQuery';

import TopicDetailConfiguration from './TopicDetailConfiguration';
import TopicDetailConsumer from './TopicDetailConsumer';
import TopicDetailMessage from './TopicDetailMessage';
import TopicDetailPublish from './TopicDetailPublish';
import TopicDetailSearch from './TopicDetailSearch';

const TopicDetail = () => {
  const location = useLocation();
  const topic_id = location.pathname.replace('/topics/', '');
  const { isLoading, data, refetch, isRefetching } =
    useTopicInformationQuery(topic_id);

  const onButtonClicked = () => {
    refetch();
  };

  return (
    <Flex className="flex-col" maxW="xl" width="100%" maxWidth="100%" gap={3}>
      <Flex width="100%" maxWidth="100%" gap={2}>
        <Flex>
          <Text as="b" alignSelf="center" fontSize="2xl" color="gray.700">
            {topic_id}
          </Text>
        </Flex>
        <RefreshButton
          isLoading={isLoading || isRefetching}
          onButtonClicked={onButtonClicked}></RefreshButton>
      </Flex>
      <Box borderWidth="1px" borderRadius="lg" width="500px">
        <HStack spacing="1px" divider={<StackDivider borderColor="gray.200" />}>
          <Stat p="4">
            <StatLabel>Messages</StatLabel>
            <StatNumber>
              {data['message_count'].toLocaleString('en-US')}
            </StatNumber>
          </Stat>
          <Stat p="4">
            <StatLabel>Retention Day</StatLabel>
            <StatNumber>{data['retention_day']}</StatNumber>
          </Stat>
          <Stat p="4">
            <StatLabel>Partitions</StatLabel>
            <StatNumber>{data['partition_count']}</StatNumber>
          </Stat>
        </HStack>
      </Box>
      <Flex maxW="xl" width="100%" maxWidth="100%">
        <Tabs isFitted variant="enclosed" width="100%" maxWidth="100%">
          <TabList
            width="100%"
            maxWidth="100%"
            className="[&>button]:text-kb-orange">
            <Tab padding={11} className="w-52">
              <Text as="b" fontSize="md" mb="6px">
                Messages
              </Text>
            </Tab>
            <Tab padding={11} className="w-52">
              <Text as="b" fontSize="md" mb="6px">
                Consumers
              </Text>
            </Tab>
            <Tab padding={11} className="w-52">
              <Text as="b" fontSize="md" mb="6px">
                Configurations
              </Text>
            </Tab>
            <Tab padding={11} className="w-52">
              <Text as="b" fontSize="md" mb="6px">
                Publish
              </Text>
            </Tab>
            <Tab padding={11} className="w-52">
              <Text as="b" fontSize="md" mb="6px">
                Search
              </Text>
            </Tab>
          </TabList>
          <TabPanels width="100%">
            <TabPanel maxWidth="100%">
              <Flex width="100%">
                <TopicDetailMessage
                  topic_name={topic_id}
                  partition_count={
                    data?.['partition_count']
                  }></TopicDetailMessage>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex mt="5" className="flex-col flex-1">
                <Box borderWidth="1px" borderRadius="lg">
                  <TopicDetailConsumer
                    topic_name={topic_id}></TopicDetailConsumer>
                </Box>
              </Flex>
            </TabPanel>
            <TabPanel maxWidth="100%">
              <TopicDetailConfiguration
                topic_name={topic_id}></TopicDetailConfiguration>
            </TabPanel>
            <TabPanel>
              <Flex>
                <TopicDetailPublish topic_name={topic_id}></TopicDetailPublish>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex>
                <TopicDetailSearch topic_name={topic_id}></TopicDetailSearch>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default TopicDetail;
