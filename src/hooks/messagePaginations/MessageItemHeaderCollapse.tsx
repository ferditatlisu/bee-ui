import { useState } from 'react';

import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Code, IconButton, Td, Tr } from '@chakra-ui/react';

export const MessageItemHeaderCollapse = (headerValue: any) => {
  const item = headerValue.item;
  const [isShowDetail, setIsShowDetail] = useState(false);
  const onButtonClickedShowDetail = () => {
    setIsShowDetail((x) => !x);
  };

  return (
    <>
      <Tr>
        {Object.keys(item).map((a: any) => (
          <Td>{a}</Td>
        ))}
        {Object.values(item).map((a: any) => (
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
              onClick={() => onButtonClickedShowDetail()}
              marginEnd={2}></IconButton>
            {a}
          </Td>
        ))}
      </Tr>
      {isShowDetail && (
        <Tr>
          {Object.values(item).map((a: any) => {
            return (
              <Td
                maxW="xl"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                colSpan={2}>
                <Code>{a}</Code>
              </Td>
            );
          })}
        </Tr>
      )}
    </>
  );
};

export default MessageItemHeaderCollapse;
