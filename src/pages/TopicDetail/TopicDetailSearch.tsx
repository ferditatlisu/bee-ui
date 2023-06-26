import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-datepicker/dist/react-datepicker.css';

import { useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { QueryClient } from 'react-query';

import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Spinner,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useToast,
} from '@chakra-ui/react';

import { AdvanceSearch } from 'components/AdvanceSearch';

import MessageItem from 'hooks/messagePaginations/MessageItem';
import MessageItemPage from 'hooks/messagePaginations/MessageItemPage';
import { useDeleteSearchMutation } from 'hooks/services/useDeleteSearch';
import { SearchResponse, useSearchQuery } from 'hooks/services/useSearchQuery';
import { useSearchParameter } from 'hooks/storages/useSearchParameter';

const SEARCH_START_BUTTON_TEXT = 'Start';
const SEARCH_PAUSE_BUTTON_TEXT = 'Pause';

export const TopicDetailSearch = ({ topic_name }: any) => {
  const parameters = useSearchParameter((x) => x.request);
  const [isSearchingEnabled, setIsSearchingEnabled] = useState(false);
  const changeParameter = useSearchParameter((x) => x.change);
  const { mutate } = useDeleteSearchMutation();
  const toast = useToast();
  const searchValueRef = useRef<any>(null);
  const { isLoading, data, isRefetching, removeCache } = useSearchQuery(
    parameters,
    isSearchingEnabled,
    (data: SearchResponse) => onSuccess(data),
    (err: Error) => onError(err)
  );

  const onError = (err: Error) => {
    pauseSearching();
    toast({
      title: 'Error',
      description: err.message,
      status: 'error',
      duration: 2000,
      position: 'top-right',
      isClosable: true,
    });
  };

  const onSuccess = (successData: SearchResponse) => {
    pauseSearchIfNeeded(successData);
  };

  const onClickedButtonSearch = () => {
    if (!isSearchingEnabled) startSearching();
    else pauseSearching();
  };

  const startSearching = () => {
    parameters.value = searchValueRef.current?.value;
    parameters.topicName = topic_name;
    changeParameter(parameters);
    setIsSearchingEnabled(true);
  };

  const pauseSearching = () => {
    setIsSearchingEnabled(false);
  };

  const pauseSearchIfNeeded = (data: SearchResponse) => {
    if (data.status === 'Finished') {
      pauseSearching();
    }
  };

  const onButtonClickedDeleted = () => {
    pauseSearching();
    mutate(parameters, {
      onSettled: () => {
        console.log('yolo');
        removeCache();
      },
    });
  };

  return (
    <Flex className="flex-col flex-1 gap-5" width="100%">
      <Flex direction="column" className="gap-1">
        <Text as="b" fontSize="xs" color="gray.500">
          Value
        </Text>
        <Flex className="items-end gap-5" alignItems="center">
          <AdvanceSearch searchValueRef={searchValueRef} />
          <Button
            size="sm"
            isDisabled={isLoading || isRefetching}
            isLoading={isLoading || isRefetching}
            backgroundColor="#f27a1a"
            color="white"
            _hover={{
              background: '#f59547',
            }}
            onClick={onClickedButtonSearch}
            className="text-white w-24">
            {isSearchingEnabled
              ? SEARCH_PAUSE_BUTTON_TEXT
              : SEARCH_START_BUTTON_TEXT}
          </Button>
        </Flex>
      </Flex>
      {data !== undefined && (
        <Box borderWidth="1px" borderRadius="lg" width="750px">
          <HStack
            divider={
              <StackDivider margin="0 !important" borderColor="gray.200" />
            }>
            {data !== undefined && (
              <Stat px="3">
                <StatLabel>Status</StatLabel>
                <Flex gap={2}>
                  {data.status !== 'Finished' && isSearchingEnabled && (
                    <Spinner />
                  )}
                  <StatNumber>{data.status}</StatNumber>
                </Flex>
              </Stat>
            )}
            {data !== undefined && (
              <Stat px="3">
                <StatLabel>Created Date</StatLabel>
                <StatNumber whiteSpace="nowrap">
                  {new Date(+data.createdDate).toLocaleString()}
                </StatNumber>
              </Stat>
            )}
            {data !== undefined && data.completedTime !== undefined && (
              <Stat px="3">
                <StatLabel>Completed Time</StatLabel>
                <StatNumber>
                  <StatNumber>{data.completedTime + ' ms'} </StatNumber>
                </StatNumber>
              </Stat>
            )}
            {data !== undefined && data.error !== undefined && (
              <Stat px="3">
                <StatLabel>Error</StatLabel>
                <StatNumber>{data.error}</StatNumber>
              </Stat>
            )}
            {data !== undefined && (
              <Flex direction="column" p="4">
                <IconButton
                  p="1px"
                  m="2px"
                  onClick={() => onButtonClickedDeleted()}
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  aria-label="delete"></IconButton>
              </Flex>
            )}
          </HStack>
        </Box>
      )}
      {data !== undefined &&
        data.status !== 'Finished' &&
        data.data?.length === 0 &&
        isSearchingEnabled && (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        )}
      {data !== undefined &&
        data['data'] !== undefined &&
        Array.isArray(data['data']) &&
        data['data'].length > 0 && (
          <MessageItemPage
            pageItems={data['data']}
            MessageItem={MessageItem}
            messageItemProps={{
              topicName: topic_name,
            }}></MessageItemPage>
        )}
      {data !== undefined &&
        data.status === 'Finished' &&
        data.data.length === 0 &&
        !isSearchingEnabled && (
          <Box borderWidth="1px" p="3" borderRadius="lg">
            <Text fontSize="sm">Record is not found</Text>
          </Box>
        )}
    </Flex>
  );
};

export default TopicDetailSearch;
