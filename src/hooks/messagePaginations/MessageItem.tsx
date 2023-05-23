import { useState } from 'react';

import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { IconButton, Td, Tr } from '@chakra-ui/react';

import MessageItemCollapse from './MessageItemCollapse';

export const MessageItem = ({ pageItem }: any) => {
  const message = pageItem.item;
  const [isShowDetail, setIsShowDetail] = useState(false);

  const onButtonClickedShowDetail = () => {
    setIsShowDetail((x) => !x);
  };

  return (
    <>
      <Tr>
        <Td>{message['offset']}</Td>
        <Td>{message['partition']}</Td>
        <Td>{new Date(+message['publish_date_utc']).toLocaleString()}</Td>
        <Td>{message['key']}</Td>
        <Td
          maxW="xl"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis">
          <IconButton
            height="30px"
            border="0"
            aria-label="show detail"
            variant="outline"
            icon={!isShowDetail ? <AddIcon /> : <MinusIcon />}
            onClick={() => onButtonClickedShowDetail()}></IconButton>
          {JSON.stringify(message['value']).substring(0, 500)}
        </Td>
      </Tr>
      {isShowDetail && (
        <Tr>
          <Td colSpan={5}>
            <MessageItemCollapse item={message}></MessageItemCollapse>
          </Td>
        </Tr>
      )}
    </>
  );
};

export default MessageItem;
