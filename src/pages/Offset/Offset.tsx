import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  HStack,
  Input,
  Link,
  Select,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { useChangeOffsetMutation } from 'hooks/services/useChangeOffsetMutation';
import { useSimulationChangeOffsetQuery } from 'hooks/services/useSimulationChangeOffsetQuery';
import { useOffsetParameter } from 'hooks/storages/useOffsetParameter';
import { useUserViewedGroups } from 'hooks/storages/useUserViewedGroup';

const Offset = () => {
  const toast = useToast();
  const addViewedGroup = useUserViewedGroups((x) => x.addViewedGroup);
  const navigate = useNavigate();

  const parameters = useOffsetParameter((x) => x.offsetRequest);
  const changeParameter = useOffsetParameter((x) => x.change);

  const { mutate } = useChangeOffsetMutation();
  const { isLoading, data, refetch, isRefetching } =
    useSimulationChangeOffsetQuery(parameters);
  const cancelRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      changeParameter({ ...parameters, [key]: event.target.value });
      return;
    };

  const onSelectChangedType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeParameter({ ...parameters, offset_type: event.target.value });
    return;
  };

  const onClickedButtonSimulationOffset = () => {
    console.log(parameters);
    refetch();
  };

  const onClickedButtonShowConsumerGroupPage = () => {
    addViewedGroup(parameters.group_id);
    navigate(`/consumers/${parameters.group_id}`);
  };

  const onClickedButtonApply = () => {
    onOpen();
  };

  const onClickedButtonOk = () => {
    console.log(parameters);
    mutate(parameters, {
      onSuccess: () => {
        toast({
          title: 'Offset updated',
          description: (
            <Link>
              <Flex as="u" onClick={onClickedButtonShowConsumerGroupPage}>
                Show consumer group page
              </Flex>
            </Link>
          ),
          status: 'success',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        });
      },
      onError(error, variables, context) {
        toast({
          title: 'Error',
          description: error instanceof Error && error.message,
          status: 'error',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        });
      },
    });

    onClose();
  };

  return (
    <Flex className="flex-col gap-8">
      <Flex className="items-end gap-5 [&>div>p]:text-gray-500 [&>div>p]:text-xs [&>div>p]:font-semibold">
        <Stack spacing={8} direction="row">
          <VStack align="left">
            <Flex direction="column">
              <Text as="b" fontSize="xs" color="gray.500" mb="6px">
                Group Id
              </Text>
              <Input
                size="sm"
                value={parameters?.group_id}
                onChange={handleChange('group_id')}
              />
            </Flex>
            <Flex direction="column">
              <Text as="b" fontSize="xs" color="gray.500" mb="6px">
                Topic Name
              </Text>
              <Input
                size="sm"
                style={{ width: '500px' }}
                value={parameters?.topic_name}
                onChange={handleChange('topic_name')}
              />
            </Flex>
            <Flex direction="column">
              <HStack>
                <Select
                  fontSize="sm"
                  value={parameters.offset_type}
                  onChange={onSelectChangedType}>
                  <option value="SHIFTBY">SHIFTBY</option>
                  <option value="DATE">DATE</option>
                  <option value="BEGINNING">BEGINNING</option>
                  <option value="END">END</option>
                </Select>
              </HStack>
              {parameters.offset_type === 'SHIFTBY' && (
                <Input
                  mt="6px"
                  size="sm"
                  style={{ width: '500px' }}
                  placeholder="Specific offset: 1231423"
                  value={parameters?.value}
                  onChange={handleChange('value')}
                />
              )}
              {parameters.offset_type === 'DATE' && (
                <Input
                  mt="6px"
                  size="sm"
                  style={{ width: '500px' }}
                  placeholder={`UTC timestamp: ${+new Date()}`}
                  value={parameters?.value}
                  onChange={handleChange('value')}
                />
              )}
            </Flex>
            <Button
              color="white"
              size="sm"
              isDisabled={isLoading || isRefetching}
              isLoading={isLoading || isRefetching}
              backgroundColor="#f27a1a"
              _hover={{
                background: '#f59547',
              }}
              onClick={onClickedButtonSimulationOffset}
              className="text-white w-24">
              Check
            </Button>
          </VStack>
          {data !== undefined && data.message === undefined && (
            <VStack spacing="10px">
              <TableContainer borderWidth="1px" borderRadius="lg" p="2">
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Partition Id</Th>
                      <Th>Topic Offset</Th>
                      <Th>Exist Offset</Th>
                      <Th>Exist Lag</Th>
                      <Th>New Offset</Th>
                      <Th>New Lag</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.partitions !== undefined &&
                      data.partitions
                        .sort((a: any, b: any) => a['id'] - b['id'])
                        .map((item: any, index: number) => (
                          <Tr key={index}>
                            <Td>{item.id}</Td>
                            <Td>{item.topic_offset}</Td>
                            <Td fontStyle="bold" color="red">
                              {item.exist_offset}
                            </Td>
                            <Td>{item.exist_lag}</Td>
                            <Td fontStyle="bold" color="green">
                              {item.new_offset}
                            </Td>
                            <Td>{item.new_lag}</Td>
                          </Tr>
                        ))}
                  </Tbody>
                  {data !== undefined && (
                    <TableCaption>
                      Total Changes:{' '}
                      <Tag size="md" variant="solid" colorScheme="green">
                        {data.change.toLocaleString('en-US')}
                      </Tag>
                    </TableCaption>
                  )}
                </Table>
              </TableContainer>
              <Button
                size="sm"
                color="white"
                backgroundColor="#f27a1a"
                _hover={{
                  background: '#f59547',
                }}
                onClick={onClickedButtonApply}
                className="text-white w-24">
                Apply
              </Button>
            </VStack>
          )}
        </Stack>
      </Flex>
      <AlertDialog
        motionPreset="slideInBottom"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Are you sure?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You are trying to change the offset?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="green" ml={3} onClick={onClickedButtonOk}>
              Change
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
};

export default Offset;
