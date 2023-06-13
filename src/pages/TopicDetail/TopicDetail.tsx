import { useLocation, useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import CustomAlertDialog from 'components/CustomAlertDialog';
import { RefreshButton } from 'components/RefreshButton';

import { useDeleteTopicMutation } from 'hooks/services/useDeleteTopicMutation';
import { useTopicInformationQuery } from 'hooks/services/useTopicInformationQuery';
import { useSearchParameter } from 'hooks/storages/useSearchParameter';

import TopicDetailConfiguration from './TopicDetailConfiguration';
import TopicDetailConsumer from './TopicDetailConsumer';
import TopicDetailMessage from './TopicDetailMessage';
import TopicDetailPublish from './TopicDetailPublish';

const TopicDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const topic_id = location.pathname.replace('/topics/', '');
  const searchParameter = useSearchParameter((x) => x.request, shallow);
  const { mutate } = useDeleteTopicMutation();
  const changeSearchParameter = useSearchParameter((x) => x.change);

  changeSearchParameter({
    ...searchParameter,
    topicName: topic_id,
  });

  const { isLoading, data, refetch, isRefetching } =
    useTopicInformationQuery(topic_id);

  const onButtonClicked = () => {
    refetch();
  };

  const onButtonClickedDeleted = () => {
    mutate(topic_id, {
      onSuccess(data, variables, context) {
        navigate(`/topics`);
      },
      onError(error, variables, context) {
        toast({
          title: 'Error',
          description: (error as any).message,
          status: 'error',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        });
        onClose();
      },
    });
  };
  return (
    <Flex className="flex-col" maxW="xl" width="100%" maxWidth="100%">
      <Flex width="100%" maxWidth="100%">
        <Flex fontSize="25" fontStyle="bold" p="2">
          {topic_id}
        </Flex>
        <RefreshButton
          isLoading={isLoading || isRefetching}
          onButtonClicked={onButtonClicked}></RefreshButton>
        <Tooltip label="Delete Group" placement="left">
          <IconButton
            style={{ marginLeft: 'auto', marginRight: '20px' }}
            onClick={() => onOpen()}
            icon={<DeleteIcon />}
            colorScheme="red"
            aria-label="delete"
          />
        </Tooltip>
      </Flex>

      <Box borderWidth="1px" borderRadius="lg" width="500px">
        <HStack spacing="1px" divider={<StackDivider borderColor="gray.200" />}>
          {data !== undefined && (
            <Stat p="4">
              <StatLabel>Messages</StatLabel>
              <StatNumber>
                {data['message_count'] &&
                  data['message_count'].toLocaleString('en-US')}
              </StatNumber>
            </Stat>
          )}
          {data !== undefined && (
            <Stat p="4">
              <StatLabel>Retention Day</StatLabel>
              <StatNumber>{data['retention_day']}</StatNumber>
            </Stat>
          )}
          {data !== undefined && (
            <Stat p="4">
              <StatLabel>Partitions</StatLabel>
              <StatNumber>{data['partition_count']}</StatNumber>
            </Stat>
          )}
        </HStack>
      </Box>
      <Flex mt="5" maxW="xl" width="100%" maxWidth="100%">
        <Tabs isFitted variant="enclosed" width="100%" maxWidth="100%">
          <TabList
            width="100%"
            maxWidth="100%"
            className="[&>button]:text-kb-orange">
            <Tab padding={11} className="w-52">
              Messages
            </Tab>
            <Tab padding={11} className="w-52">
              Consumers
            </Tab>
            <Tab padding={11} className="w-52">
              Configuration
            </Tab>
            <Tab padding={11} className="w-52">
              Publish
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
          </TabPanels>
        </Tabs>
      </Flex>
      <CustomAlertDialog
        isOpen={isOpen}
        onButtonClickedOk={onButtonClickedDeleted}
        onClose={onClose}
        message="You are trying to delete the topic?"
        okText="Remove"
      />
    </Flex>
  );
};

export default TopicDetail;
