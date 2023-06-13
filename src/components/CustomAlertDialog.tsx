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
  message: string;
  okText: string;
}
const CustomAlertDialog = ({
  isOpen = false,
  onClose = () => {},
  onButtonClickedOk,
  message,
  okText,
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
        <AlertDialogBody>{message}</AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green" ml={3} onClick={onButtonClickedOk}>
            {okText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
