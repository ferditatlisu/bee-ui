import React, { useState } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useCopyEventMutation } from 'hooks/services/useCopyEventMutation';
import { useCopyEventQuery } from 'hooks/services/useCopyEventQuery';
import { useCopyParameter } from 'hooks/storages/useCopyParameter';

import CopyTable from './CopyTable';

const Copy = () => {
  const cancelRef = React.useRef(null);
  const [showResultScreen, setShowResultScreen] = useState(false);
  const parameters = useCopyParameter((x) => x.copyRequest);
  const changeParameter = useCopyParameter((x) => x.change);

  const { isLoading, data, refetch, isRefetching, isSuccess } =
    useCopyEventQuery(parameters);
  const { mutate } = useCopyEventMutation();

  const requestParamHandleChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      changeParameter({ ...parameters, [key]: event.target.value });
      setShowResultScreen(false);
      return;
    };

  const onClickedButtonFetch = () => {
    refetch();
    setShowResultScreen(true);
  };

  const onClickedButtonCancel = () => {
    setShowResultScreen(false);
  };

  const onClickedButtonCopy = () => {
    mutate(parameters, {
      onSuccess: () => {
        onClickedButtonActions();
      },
    });
  };

  const onClickedButtonActions = () => {
    refetch();
  };

  return (
    <Flex className="flex-col flex-1">
      <Flex className="flex-col gap-8">
        <Flex className="items-end gap-5 [&>div>p]:text-gray-500 [&>div>p]:text-xs [&>div>p]:font-semibold">
          <VStack align="left" p="2">
            <Flex direction="column">
              <Text mb="6px">From Topic</Text>
              <Input
                size="sm"
                style={{ width: '500px' }}
                value={parameters.fromTopic}
                onChange={requestParamHandleChange('fromTopic')}
              />
            </Flex>
            <Flex direction="column">
              <Text mb="6px">To Topic</Text>
              <Input
                size="sm"
                style={{ width: '500px' }}
                value={parameters.toTopic}
                onChange={requestParamHandleChange('toTopic')}
              />
            </Flex>
            <Button
              size="sm"
              backgroundColor="#f27a1a"
              _hover={{
                background: '#f59547',
              }}
              onClick={onClickedButtonFetch}
              className="text-white w-24">
              Fetch
            </Button>
            {showResultScreen && isSuccess && (
              <CopyTable
                pageItem={data}
                actionCallback={onClickedButtonActions}></CopyTable>
            )}
            {!isLoading && (
              <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClickedButtonCancel}
                isOpen={showResultScreen && !isSuccess}
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
                      ml={3}
                      onClick={onClickedButtonCopy}>
                      Copy
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Copy;
