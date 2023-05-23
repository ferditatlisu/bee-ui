import React, { useState } from 'react';
import { useGetSearch } from 'services';

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
import { useDeleteSearch } from 'hooks/services/useDeleteSearch';
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
  const { mutate } = useDeleteSearch();
  const {
    isLoading,
    data: response,
    refetch,
    isRefetching,
  } = useGetSearch(parameters, refetchInterval, isSearchingEnabled, () =>
    onSuccessRequest()
  );

  const onSuccessRequest = () => {
    if (response !== undefined) {
      updateMessageCount(response);
      pauseSearchIfNeeded(response);
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
        {response !== undefined && (
          <Box borderWidth="1px" borderRadius="lg" width="750px">
            <HStack
              divider={
                <StackDivider margin="0 !important" borderColor="gray.200" />
              }>
              {response !== undefined && (
                <Stat px="3">
                  <StatLabel>Status</StatLabel>
                  <StatNumber>{response['status']}</StatNumber>
                  {response['status'] !== 'Finished' && isSearchingEnabled && (
                    <Spinner />
                  )}
                </Stat>
              )}
              {response !== undefined && (
                <Stat px="3">
                  <StatLabel>Created Date</StatLabel>
                  <StatNumber whiteSpace="nowrap">
                    {new Date(+response['createdDate']).toLocaleString()}
                  </StatNumber>
                </Stat>
              )}
              {response !== undefined &&
                response['completedTime'] !== undefined && (
                  <Stat px="3">
                    <StatLabel>Completed Time</StatLabel>
                    <StatNumber>
                      <StatNumber>
                        {response['completedTime'] + ' ms'}{' '}
                      </StatNumber>
                    </StatNumber>
                  </Stat>
                )}
              {response !== undefined && response['error'] !== undefined && (
                <Stat px="3">
                  <StatLabel>Error</StatLabel>
                  <StatNumber>{response['error']}</StatNumber>
                </Stat>
              )}
              {response !== undefined && (
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
        {response !== undefined &&
          response['status'] !== 'Finished' &&
          response['data'].length === 0 &&
          isSearchingEnabled && (
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          )}
        <Accordion allowMultiple>
          {response !== undefined &&
            response.data !== undefined &&
            response['data'].length > 0 && (
              <SearchItemPage
                pageItems={response.data}
                CustomPage={SearchItem}
                SearchKeyword={parameters.value}></SearchItemPage>
            )}
          {response !== undefined &&
            response['status'] === 'Finished' &&
            response['data'].length === 0 &&
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
