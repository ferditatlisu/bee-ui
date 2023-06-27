import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Link,
  Spinner,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';

import { TopicInfo } from 'components/TopicInfo';

import { useCopyEventMutation } from 'hooks/services/useCopyEventMutation';
import { useCopyEventQuery } from 'hooks/services/useCopyEventQuery';
import { useDeleteCopyEventMutation } from 'hooks/services/useDeleteCopyEventMutation';
import { useCopyParameter } from 'hooks/storages/useCopyParameter';

const Copy = () => {
  const navigate = useNavigate();
  const cancelRef = React.useRef(null);
  const [showResultScreen, setShowResultScreen] = useState(false);
  const [isCopyEnabled, setIsCopyEnabled] = useState(false);
  const [refetchInterval, setRefetchInterval] = useState(0);
  const parameters = useCopyParameter((x) => x.copyRequest);
  const changeParameter = useCopyParameter((x) => x.change);

  const { isLoading, data, refetch, isSuccess, removeCache } =
    useCopyEventQuery(
      parameters,
      isCopyEnabled,
      refetchInterval,
      (data: any) => onSuccess(data),
      (data: any) => onError(data)
    );

  const { mutate, mutateLoading } = useCopyEventMutation();
  const { mutateAsync } = useDeleteCopyEventMutation();

  const requestParamHandleChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      changeParameter({ ...parameters, [key]: event.target.value });
      return;
    };

  const onClickedButtonFetch = () => {
    setRefetchInterval(0);
    setIsCopyEnabled(true);
    refetch();
  };

  const onClickedButtonCancel = () => {
    setShowResultScreen(false);
    setIsCopyEnabled(false);
  };

  const onClickedButtonCopy = () => {
    mutate(parameters, {
      onSuccess: () => {
        setShowResultScreen(true);
        setIsCopyEnabled(true);
        setRefetchInterval(3000);
        refetch();
      },
    });
  };

  const onError = (successData: any) => {};

  const onSuccess = (successData: any) => {
    setShowResultScreen(true);
    if (
      successData?.status === 'Completed' ||
      successData?.status === 'Error'
    ) {
      setIsCopyEnabled(false);
      setRefetchInterval(0);
    }
  };

  const onButtonClickedDelete = () => {
    mutateAsync(
      {
        fromTopic: parameters.fromTopic,
        toTopic: parameters.toTopic,
      },
      {
        onSuccess: () => {
          onClickedButtonCancel();
          removeCache();
        },
      }
    );
  };

  const onClickedTopicText = (topic_id: string) => {
    navigate(`/topics/${topic_id}`);
  };

  return (
    <Flex className="flex-col flex-1">
      <Flex className="flex-col gap-8">
        <Flex className="items-end gap-5">
          <VStack align="left" p="2">
            {!showResultScreen && (
              <Flex className="items-end gap-5" alignItems="end">
                <Flex direction="column">
                  <Text as="b" fontSize="xs" color="gray.500" mb="6px">
                    From Topic
                  </Text>
                  <Input
                    size="sm"
                    style={{ width: '500px' }}
                    value={parameters.fromTopic}
                    onChange={requestParamHandleChange('fromTopic')}
                  />
                </Flex>
                <Flex direction="column">
                  <Text as="b" fontSize="xs" color="gray.500" mb="6px">
                    To Topic
                  </Text>
                  <Input
                    size="sm"
                    style={{ width: '500px' }}
                    value={parameters.toTopic}
                    onChange={requestParamHandleChange('toTopic')}
                  />
                </Flex>
                <Button
                  size="sm"
                  color="white"
                  backgroundColor="#f27a1a"
                  _hover={{
                    background: '#f59547',
                  }}
                  onClick={onClickedButtonFetch}
                  className="text-white w-24">
                  Fetch
                </Button>
              </Flex>
            )}
            {showResultScreen && isSuccess && (
              <HStack className="items-end gap-5" alignItems="end">
                <Flex direction="column">
                  <Link
                    onClick={() => onClickedTopicText(parameters.fromTopic)}>
                    <Text as="b" fontSize="sm" color="gray.600" mb="6px">
                      {parameters.fromTopic}
                    </Text>
                  </Link>
                  <TopicInfo
                    topicName={parameters.fromTopic}
                    refetchInterval={refetchInterval}></TopicInfo>
                </Flex>
                <Box borderWidth="1px" borderRadius="lg" maxWidth="100%">
                  <HStack
                    spacing="1px"
                    divider={<StackDivider borderColor="gray.200" />}>
                    <Stat p="4" width="200px">
                      <StatLabel>Status</StatLabel>
                      <Flex direction="row" gap={2}>
                        {(data?.['status'] === 'Requested' ||
                          data?.['status'] === 'In Progress' ||
                          data?.['status'] === 'Created') && <Spinner />}
                        <Tooltip
                          label={data?.error}
                          placement="top-start"
                          bg="red.600">
                          <StatNumber>{data['status']}</StatNumber>
                        </Tooltip>
                      </Flex>
                    </Stat>
                    <Tooltip
                      hasArrow
                      label="Stop Progress"
                      placement="bottom"
                      backgroundColor="red">
                      <Flex marginRight="3px">
                        <IconButton
                          p="1px"
                          m="10px"
                          onClick={() => onButtonClickedDelete()}
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          aria-label="delete"></IconButton>
                      </Flex>
                    </Tooltip>
                  </HStack>
                </Box>
                <Flex direction="column">
                  <Link onClick={() => onClickedTopicText(parameters.toTopic)}>
                    <Text as="b" fontSize="sm" color="gray.600" mb="6px">
                      {parameters.toTopic}
                    </Text>
                  </Link>
                  <TopicInfo
                    topicName={parameters.toTopic}
                    refetchInterval={refetchInterval}></TopicInfo>
                </Flex>
              </HStack>
            )}
            <AlertDialog
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onClickedButtonCancel}
              isOpen={
                !showResultScreen &&
                data === undefined &&
                !isLoading &&
                !isSuccess &&
                isCopyEnabled
              }
              isCentered>
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader>Are you sure?</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  From {parameters.fromTopic} to {parameters.toTopic}
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClickedButtonCancel}>
                    No
                  </Button>
                  <Button
                    colorScheme="red"
                    isLoading={mutateLoading}
                    ml={3}
                    onClick={onClickedButtonCopy}>
                    Copy
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Copy;
