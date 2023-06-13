import React, { useState } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import {
  Accordion,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Skeleton,
  Spinner,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';

import SearchItemPage from 'hooks/paginations/searchItemPage';
import { useDeleteSearchMutation } from 'hooks/services/useDeleteSearch';
import { useSearchQuery } from 'hooks/services/useSearchQuery';
import { useSearchParameter } from 'hooks/storages/useSearchParameter';

import SearchItem from './SearchItem';

const SEARCH_START_BUTTON_TEXT = 'Start';
const SEARCH_PAUSE_BUTTON_TEXT = 'Pause';
const INTERNAL_REQUEST_MS = 3000;

const Search = () => {
  const parameters = useSearchParameter((x) => x.request);
  const changeParameter = useSearchParameter((x) => x.change);
  const [refetchInterval, setRefetchInterval] = useState(0);
  const [isSearchingEnabled, setIsSearchingEnabled] = useState(false);
  const { mutate } = useDeleteSearchMutation();
  const { isLoading, data, refetch, isRefetching } = useSearchQuery(
    parameters,
    refetchInterval,
    isSearchingEnabled,
    () => onSuccessRequest()
  );

  const onSuccessRequest = () => {
    if (data !== undefined) {
      updateMessageCount(data);
      pauseSearchIfNeeded(data);
    }
  };
  const [messageCount, setMessageCount] = useState(0);

  const [searchTextName, setSearchTextName] = useState(
    SEARCH_START_BUTTON_TEXT
  );

  const handleChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      changeParameter({ ...parameters, [key]: event.target.value });

      return;
    };

  const onClickedButtonSearch = () => {
    if (!isSearchingEnabled) startSearching();
    else pauseSearching();
  };

  const startSearching = () => {
    setMessageCount(0);
    setSearchTextName(SEARCH_PAUSE_BUTTON_TEXT);
    setRefetchInterval(INTERNAL_REQUEST_MS);
    setIsSearchingEnabled(true);
    refetch();
  };

  const pauseSearching = () => {
    setSearchTextName(SEARCH_START_BUTTON_TEXT);
    setRefetchInterval(0);
    setIsSearchingEnabled(false);
  };

  const updateMessageCount = (data: any) => {
    if (messageCount !== data.data.length) {
      setMessageCount(data.data.length);
    }
  };

  const pauseSearchIfNeeded = (data: any) => {
    var state = data['status'];
    if (state === 'Finished') {
      pauseSearching();
    }
  };

  const onButtonClickedDeleted = () => {
    mutate(parameters);
    window.location.reload();
  };

  return (
    <Flex className="flex-col flex-1">
      <Flex className="flex-col gap-5">
        <Flex className="items-end gap-5 [&>div>p]:text-gray-500 [&>div>p]:text-xs [&>div>p]:font-semibold">
          <Flex direction="column">
            <Text mb="6px">Topic Name</Text>
            <Input
              size="sm"
              style={{ width: '500px' }}
              value={parameters?.topicName}
              onChange={handleChange('topicName')}
            />
          </Flex>
          <Flex direction="column">
            <Text mb="6px">Value</Text>
            <Input
              size="sm"
              value={parameters?.value}
              onChange={handleChange('value')}
            />
          </Flex>
          <Button
            size="sm"
            isDisabled={isLoading || isRefetching}
            isLoading={isLoading || isRefetching}
            backgroundColor="#f27a1a"
            _hover={{
              background: '#f59547',
            }}
            onClick={onClickedButtonSearch}
            className="text-white w-24">
            {searchTextName}
          </Button>
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
                    {data['status'] !== 'Finished' && isSearchingEnabled && (
                      <Spinner />
                    )}
                    <StatNumber>{data['status']}</StatNumber>
                  </Flex>
                </Stat>
              )}
              {data !== undefined && (
                <Stat px="3">
                  <StatLabel>Created Date</StatLabel>
                  <StatNumber whiteSpace="nowrap">
                    {new Date(+data['createdDate']).toLocaleString()}
                  </StatNumber>
                </Stat>
              )}
              {data !== undefined && data['completedTime'] !== undefined && (
                <Stat px="3">
                  <StatLabel>Completed Time</StatLabel>
                  <StatNumber>
                    <StatNumber>{data['completedTime'] + ' ms'} </StatNumber>
                  </StatNumber>
                </Stat>
              )}
              {data !== undefined && data['error'] !== undefined && (
                <Stat px="3">
                  <StatLabel>Error</StatLabel>
                  <StatNumber>{data['error']}</StatNumber>
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
          data['status'] !== 'Finished' &&
          data['data'].length === 0 &&
          isSearchingEnabled && (
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          )}
        <Accordion allowMultiple>
          {data !== undefined &&
            data.data !== undefined &&
            data['data'].length > 0 && (
              <SearchItemPage
                pageItems={data.data}
                CustomPage={SearchItem}
                SearchKeyword={parameters.value}></SearchItemPage>
            )}
          {data !== undefined &&
            data['status'] === 'Finished' &&
            data['data'].length === 0 &&
            !isSearchingEnabled && (
              <Box borderWidth="1px" p="3" borderRadius="lg">
                <Text fontSize="sm">Record is not found</Text>
              </Box>
            )}
        </Accordion>
      </Flex>
    </Flex>
  );
};

export default Search;
