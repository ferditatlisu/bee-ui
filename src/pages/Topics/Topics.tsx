import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex, Input, Text } from '@chakra-ui/react';

import ViewedTags from 'components/ViewedTag';

import ItemPage from 'hooks/paginations/itemPage';
import { useGetTopics } from 'hooks/services/useGetTopicsQuery';
import { useUserViewedTopics } from 'hooks/storages/useUserViewedTopic';
import { useDebounce } from 'hooks/util/useDebounce';

import TopicItem from './TopicItem';

const Topics = () => {
  const navigate = useNavigate();
  const [topicName, setTopicName] = useState('');
  const { isLoading, data } = useGetTopics();
  const [messages, setMessages] = useState([]);
  const removeViewedTopic = useUserViewedTopics((x) => x.removeViewedTopic);
  const viewedTopics = useUserViewedTopics((x) => x.viewedTopics);

  const topicNameDebounce = useDebounce(topicName, 500);
  useEffect(() => {
    if (data !== undefined) {
      var mes = [];
      if (data?.length > 0) {
        mes = data.filter((item: any) => item.includes(topicName));
      }
      setMessages(mes);
    }
  }, [data]);

  useEffect(() => {
    if (topicNameDebounce.length >= 3) {
      if (data?.length > 0)
        setMessages(data.filter((item: any) => item.includes(topicName)));
    }
  }, [topicNameDebounce]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopicName(event.target.value);
  };

  const onButtonClickedRemoveViewedTag = (removedViewedTopicName: string) => {
    removeViewedTopic(removedViewedTopicName);
  };

  const onClickedButtonText = (topic_id: string) => {
    navigate(`/topics/${topic_id}`);
  };

  return (
    <Flex className="flex-col flex-1" p="2" gap="12px">
      {viewedTopics.length > 0 && (
        <ViewedTags
          viewedData={viewedTopics}
          onClickedText={onClickedButtonText}
          onRemoveButton={onButtonClickedRemoveViewedTag}></ViewedTags>
      )}
      <Flex className="items-end gap-5">
        <Flex direction="column">
          <Text as="b" fontSize="xs" color="gray.500" mb="6px">
            Topic Name
          </Text>
          <Input
            size="sm"
            style={{ width: '800px' }}
            value={topicName}
            onChange={handleChange}
          />
        </Flex>
      </Flex>
      <Flex>
        {messages.length > 0 && (
          <ItemPage pageItems={messages} CustomPage={TopicItem} />
        )}
      </Flex>
    </Flex>
  );
};

export default Topics;
