import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetConsumers } from 'services';

import { Flex, Input, Text } from '@chakra-ui/react';

import ViewedTags from 'components/ViewedTag';

import ItemPage from 'hooks/paginations/itemPage';
import { useUserViewedGroups } from 'hooks/storages/useUserViewedGroup';
import { useDebounce } from 'hooks/util/useDebounce';

import ConsumerItem from './ConsumerItem';

const Consumers = () => {
  const navigate = useNavigate();
  const [consumerName, setConsumerName] = useState('');
  const { isLoading, data } = useGetConsumers();
  const [messages, setMessages] = useState([]);
  const consumerNameDebounce = useDebounce(consumerName, 500);

  const removeViewedGroup = useUserViewedGroups((x) => x.removeViewedGroup);
  const viewedGroups = useUserViewedGroups((x) => x.viewedGroups);

  useEffect(() => {
    if (data !== undefined) {
      var mes = [];
      if (data?.length > 0) {
        mes = data.filter((item: any) => item.includes(consumerName));
      }
      setMessages(mes);
    }
  }, [data]);

  useEffect(() => {
    if (consumerNameDebounce.length >= 3) {
      if (data?.length > 0)
        setMessages(data.filter((item: any) => item.includes(consumerName)));
    }
  }, [consumerNameDebounce]);

  const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    setConsumerName(event.target.value);
  };

  const onButtonClickedRemoveViewedTag = (removedViewedGroup: string) => {
    removeViewedGroup(removedViewedGroup);
  };

  const onClickedButtonText = (group_id: string) => {
    navigate(`/consumers/${group_id}`);
  };

  return (
    <Flex className="flex-col flex-1" p="2" gap="12px">
      {viewedGroups.length > 0 && (
        <ViewedTags
          viewedData={viewedGroups}
          onClickedText={onClickedButtonText}
          onRemoveButton={onButtonClickedRemoveViewedTag}></ViewedTags>
      )}
      <Flex className="items-end gap-5 [&>div>p]:text-gray-500 [&>div>p]:text-xs [&>div>p]:font-semibold">
        <Flex direction="column">
          <Text mb="6px">Consumer Name</Text>
          <Input
            size="sm"
            style={{ width: '800px' }}
            value={consumerName}
            onChange={handleChange()}
          />
        </Flex>
      </Flex>
      <Flex>
        {messages.length > 0 && (
          <ItemPage pageItems={messages} CustomPage={ConsumerItem}></ItemPage>
        )}
      </Flex>
    </Flex>
  );
};

export default Consumers;
