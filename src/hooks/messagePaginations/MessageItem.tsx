import { useState } from 'react';

import { AddIcon, CopyIcon, HamburgerIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';

import CustomAlertDialog from 'components/CustomAlertDialog';

import { usePublishMessageMutation } from 'hooks/services/usePublishMessageMutation';

import MessageItemCollapse from './MessageItemCollapse';

export interface MessageItemProps {
  message: any;
  topicName: string;
}

export const MessageItem = ({ message, topicName }: MessageItemProps) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = usePublishMessageMutation(topicName);

  const onButtonClickedShowDetail = () => {
    setIsShowDetail((x) => !x);
  };

  const onButtonClickedPublish = () => {
    mutate({
      key: message['key'],
      headers: !!message['headers']
        ? JSON.stringify(message['headers'])
        : undefined,
      value: JSON.stringify(message['value']),
    });
    onClose();
  };

  const onButtonClickedCopy = () => {
    if (!!message['value'])
      navigator.clipboard.writeText(JSON.stringify(message['value'], null, 2));

    console.log(message['value']);
  };

  return (
    <>
      <Tr>
        <Td>{message['offset']}</Td>
        <Td>{message['partition']}</Td>
        <Td>{new Date(+message['publish_date_utc']).toLocaleString()}</Td>
        <Td>{message['key']}</Td>
        <Td
          onClick={() => onButtonClickedShowDetail()}
          maxW="xl"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis">
          <IconButton
            border="hidden"
            aria-label="show detail"
            variant="outline"
            icon={
              !isShowDetail ? (
                <AddIcon height="15px" border="1px" p="1px" />
              ) : (
                <MinusIcon height="15px" border="1px" p="1px" />
              )
            }></IconButton>
          {JSON.stringify(message['value']).substring(0, 500)}
        </Td>
        <Td width="1%">
          <Center>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                border="hidden"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <MenuItem onClick={onButtonClickedCopy} icon={<CopyIcon />}>
                  Copy Value
                </MenuItem>
                <MenuItem onClick={onOpen} icon={<AddIcon />}>
                  Publish Event
                </MenuItem>
              </MenuList>
            </Menu>
          </Center>
        </Td>
      </Tr>
      {isShowDetail && (
        <Tr>
          <Td colSpan={5}>
            <MessageItemCollapse item={message}></MessageItemCollapse>
          </Td>
        </Tr>
      )}
      <CustomAlertDialog
        isOpen={isOpen}
        onButtonClickedOk={onButtonClickedPublish}
        onClose={onClose}
        message="Your message will publish to the Topic"
        okText="Publish"
      />
    </>
  );
};

export default MessageItem;
