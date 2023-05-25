import React from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  UseDisclosureProps,
} from '@chakra-ui/react';
interface MessagePublishAlertDialogProps extends UseDisclosureProps {
  onButtonClickedOk: () => void;
}
const MessagePublishAlertDialog = ({
  isOpen = false,
  onClose = () => {},
  onButtonClickedOk,
}: MessagePublishAlertDialogProps) => {
  const cancelRef = React.useRef(null);
  return (
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
          Your message will publish to the Topic
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="green" ml={3} onClick={onButtonClickedOk}>
            Publish
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MessagePublishAlertDialog;
