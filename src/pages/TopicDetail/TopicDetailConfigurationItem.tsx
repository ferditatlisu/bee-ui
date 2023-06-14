import { Td, Tr } from '@chakra-ui/react';

import { CustomEditablePopover } from 'components/CustomEditablePopover';

export const TopicDetailConfigurationItem = ({
  item,
  index,
  topicName,
  refetch,
}: any) => {
  const getKey = () => {
    return Object.keys(item).map((it: any) => it)[0];
  };
  const key = getKey();

  const getValue = () => {
    return Object.values(item).map((it: any) => it)[0];
  };
  const value = getValue();
  return (
    <Tr key={index}>
      <Td key="0">{key}</Td>
      <Td
        key="1"
        maxW="xl"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis">
        {value}
      </Td>
      <Td key="2">
        <CustomEditablePopover
          topicName={topicName}
          configKey={key}
          value={value}
          refetch={refetch}
        />
      </Td>
    </Tr>
  );
};

export default TopicDetailConfigurationItem;
