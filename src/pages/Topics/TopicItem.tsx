import { useNavigate } from 'react-router-dom';

import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, Link } from '@chakra-ui/react';

import { useSearchParameter } from 'hooks/storages/useSearchParameter';
import { useUserViewedTopics } from 'hooks/storages/useUserViewedTopic';

export const TopicItem = ({ pageItem }: any) => {
  const navigate = useNavigate();
  const searchParameter = useSearchParameter((x) => x.request);
  const changeSearchParameter = useSearchParameter((x) => x.change);
  const addViewedTopic = useUserViewedTopics((x) => x.addViewedTopic);

  const topic_id = pageItem.item;

  const onClickedButtonText = () => {
    addTopicToSearchCache();
    navigate(`/topics/${topic_id}`);
  };

  const addTopicToSearchCache = () => {
    addViewedTopic(topic_id);
  };

  const onButtonClickedSearch = () => {
    changeSearchParameter({
      ...searchParameter,
      topicName: topic_id,
    });
    navigate('/search');
  };

  return (
    <Flex className="flex-col flex-1">
      <Box borderWidth="1px" borderRadius="lg" p="2">
        <HStack>
          <SearchIcon onClick={onButtonClickedSearch}></SearchIcon>
          <Link>
            <Flex onClick={onClickedButtonText}>{pageItem.item}</Flex>
          </Link>
        </HStack>
      </Box>
    </Flex>
  );
};

export default TopicItem;
