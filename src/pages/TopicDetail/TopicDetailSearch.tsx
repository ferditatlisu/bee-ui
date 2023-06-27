import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-datepicker/dist/react-datepicker.css';

import { useRef, useState } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
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

import {
  AdvanceSearch,
  AdvanceSearchParameter,
} from 'components/AdvanceSearch';

import MessageItem from 'hooks/messagePaginations/MessageItem';
import MessageItemPage from 'hooks/messagePaginations/MessageItemPage';
import { useDeleteSearchMutation } from 'hooks/services/useDeleteSearch';
import { SearchResponse, useSearchQuery } from 'hooks/services/useSearchQuery';
import { SearchRequest } from 'hooks/storages/useSearchParameter';

const SEARCH_START_BUTTON_TEXT = 'Start';
const SEARCH_PAUSE_BUTTON_TEXT = 'Pause';

export const TopicDetailSearch = ({ topicName }: any) => {
  const [searchRequest, setSearchRequest] = useState<SearchRequest>({
    topicName,
    value: '',
    startDate: new Date(new Date().setDate(new Date().getDate() - 3)).getTime(),
    endDate: new Date().getTime(),
    valueType: 3,
  });

  const [isSearchingEnabled, setIsSearchingEnabled] = useState(false);
  const { mutate } = useDeleteSearchMutation();
  const toast = useToast();
  const searchValueRef = useRef<any>(null);
  const { isLoading, data, isRefetching, removeCache } = useSearchQuery(
    searchRequest,
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

  const updateParameter = ({
    startDate,
    endDate,
    valueType,
  }: AdvanceSearchParameter) => {
    setSearchRequest({
      topicName: searchRequest.topicName,
      value: searchRequest.value,
      startDate,
      endDate,
      valueType,
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
    setSearchRequest({
      topicName: searchRequest.topicName,
      value: searchValueRef.current?.value,
      startDate: searchRequest.startDate,
      endDate: searchRequest.endDate,
      valueType: searchRequest.valueType,
    });
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
    mutate(searchRequest, {
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
          <AdvanceSearch
            searchValueRef={searchValueRef}
            searchRequest={searchRequest}
            updateParameter={updateParameter}
          />
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
              topicName: topicName,
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
