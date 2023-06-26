import React, { useState } from 'react';

import { EditIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { useSearchParameter } from 'hooks/storages/useSearchParameter';

import CustomDateTimePicker from './CustomDateTimePicker';

export const AdvanceSearch = ({ searchValueRef }: any) => {
  const parameters = useSearchParameter((x) => x.request);
  const changeParameter = useSearchParameter((x) => x.change);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startDate, setStartDate] = useState(new Date(parameters.startDate));
  const [endDate, setEndDate] = useState(new Date(parameters.endDate));

  const keyRef = React.useRef<any>(null);
  const valueRef = React.useRef<any>(null);
  const headerRef = React.useRef<any>(null);

  const onClickedButtonOpen = () => {
    onOpen();
  };

  const onButtonClickedSave = () => {
    parameters.valueType = getValueType();
    parameters.startDate = startDate.getTime();
    parameters.endDate = endDate.getTime();
    changeParameter(parameters);

    onClose();
  };

  const getDefaultValueType = () => {
    var valueType = parameters.valueType;
    var defaultValues = [];

    var hasKey = (valueType & 1) === 1;
    if (hasKey) defaultValues.push('1');
    var hasValue = ((valueType >> 1) & 1) === 1;
    if (hasValue) defaultValues.push('2');
    var hasHeader = ((valueType >> 2) & 1) === 1;
    if (hasHeader) defaultValues.push('4');

    return defaultValues;
  };

  const getValueType = () => {
    var k = keyRef.current.checked ? 1 : 0;
    var v = valueRef.current.checked ? 2 : 0;
    var h = headerRef.current.checked ? 4 : 0;
    return k + v + h;
  };

  return (
    <Flex className="flex-col">
      <InputGroup size="md">
        <Input defaultValue={parameters.value} ref={searchValueRef} />
        <InputRightElement>
          <IconButton
            icon={<SettingsIcon />}
            size="sm"
            aria-label="filter"
            onClick={onClickedButtonOpen}></IconButton>
        </InputRightElement>
      </InputGroup>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
        scrollBehavior="inside">
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent>
          <ModalHeader>Advance Search</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Flex direction="column">
                <Text as="b" fontSize="xs" color="gray.500" mb="6px">
                  Start Date:
                </Text>
                <CustomDateTimePicker
                  selected={startDate}
                  setDate={setStartDate}></CustomDateTimePicker>
              </Flex>
              <Flex direction="column">
                <Text as="b" fontSize="xs" color="gray.500" mb="6px">
                  End Date:
                </Text>
                <CustomDateTimePicker
                  selected={endDate}
                  setDate={setEndDate}></CustomDateTimePicker>
              </Flex>
              <Flex direction="column">
                <Text as="b" fontSize="xs" color="gray.500" mb="6px">
                  Search In:
                </Text>
                <CheckboxGroup
                  colorScheme="orange"
                  defaultValue={getDefaultValueType()}>
                  <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    <Checkbox ref={keyRef} value="1">
                      Key
                    </Checkbox>
                    <Checkbox ref={valueRef} value="2">
                      Value
                    </Checkbox>
                    <Checkbox ref={headerRef} value="4">
                      Header
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>
              </Flex>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onButtonClickedSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
