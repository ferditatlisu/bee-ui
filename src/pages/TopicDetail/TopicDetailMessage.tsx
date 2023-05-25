import { useState } from 'react';
import { useGetTopMessages } from 'services';

import { Flex, HStack, Select, VStack } from '@chakra-ui/react';

import { RefreshButton } from 'components/RefreshButton';

import MessageItem from 'hooks/messagePaginations/MessageItem';
import MessageItemPage from 'hooks/messagePaginations/MessageItemPage';

export interface TopicMessageDto {
  topic: string;
  size: number | undefined;
  partition: number | undefined;
}

export const TopicDetailMessage = ({ topic_name, partition_count }: any) => {
  const [requestParam, setRequestParam] = useState<TopicMessageDto>({
    topic: topic_name,
    size: 10,
    partition: undefined,
  });
  const { isLoading, data, refetch, isRefetching } =
    useGetTopMessages(requestParam);

  const onSelectChangedPartition = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRequestParam({ ...requestParam, partition: Number(event.target.value) });
  };

  const onSelectChangedSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRequestParam({ ...requestParam, size: Number(event.target.value) });
  };

  const onButtonClickedRefresh = () => {
    refetch();
  };

  return (
    <Flex className="flex-col" width="100%">
      <HStack spacing="20px" mb="3" width="100%" alignItems="end">
        <Flex>
          <VStack spacing="0px">
            <Flex fontStyle="bold" fontSize="10" alignSelf="baseline">
              PARTITION
            </Flex>
            <Select onChange={onSelectChangedPartition}>
              {(() => {
                const options = [];
                options.push(
                  <option key="-1" value={undefined}>
                    ALL
                  </option>
                );
                for (let i = 0; i < partition_count; i++) {
                  options.push(
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                }
                return options;
              })()}
            </Select>
          </VStack>
        </Flex>
        <Flex>
          <VStack spacing="0px">
            <Flex fontStyle="bold" fontSize="10" alignSelf="baseline">
              SIZE
            </Flex>
            <Select onChange={onSelectChangedSize}>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="250">250</option>
              <option value="1000">1000</option>
            </Select>
          </VStack>
        </Flex>
        <Flex>
          <RefreshButton
            isLoading={isLoading || isRefetching}
            onButtonClicked={onButtonClickedRefresh}></RefreshButton>
        </Flex>
      </HStack>
      {data !== undefined && Array.isArray(data) && (
        <MessageItemPage
          pageItems={data}
          MessageItem={MessageItem}
          messageItemProps={{
            topicName: topic_name,
          }}></MessageItemPage>
      )}
    </Flex>
  );
};

export default TopicDetailMessage;
