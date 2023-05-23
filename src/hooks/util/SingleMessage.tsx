import { useState } from 'react';
import { useGetMessage } from 'services';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';

interface SingleMessageProps {
  TopicName: string;
  Partition: number;
  Offset: number;
}

function SingleMessage({ TopicName, Partition, Offset }: SingleMessageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getMessageEnabled, setGetMessageEnabled] = useState(false);
  const { isLoading, data, refetch, isRefetching } = useGetMessage(
    TopicName,
    Partition,
    Offset,
    getMessageEnabled
  );

  const onClickedButtonOpen = () => {
    setGetMessageEnabled(true);
    onOpen();
  };

  const onClickedButtonClose = () => {
    setGetMessageEnabled(false);
    onClose();
  };

  return (
    <>
      <Button
        size="xs"
        rightIcon={<ArrowForwardIcon />}
        onClick={onClickedButtonOpen}>
        View Message
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
        scrollBehavior="inside">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>
            Partition: {Partition} - Offset: {Offset}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data === undefined && (
              <center>
                <Spinner size="xl" />
              </center>
            )}
            {data !== undefined && <pre>{JSON.stringify(data, null, 2)}</pre>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClickedButtonClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SingleMessage;
