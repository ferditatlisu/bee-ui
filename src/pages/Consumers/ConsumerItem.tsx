import { useNavigate } from 'react-router-dom';

import { Box, Flex, Link } from '@chakra-ui/react';

import { useUserViewedGroups } from 'hooks/storages/useUserViewedGroup';

export const ConsumerItem = ({ pageItem }: any) => {
  const navigate = useNavigate();
  const group_id = pageItem.item;
  const addViewedGroup = useUserViewedGroups((x) => x.addViewedGroup);

  const onClickedButtonText = () => {
    addGroupToSearchCache();
    navigate(`/consumers/${group_id}`);
  };

  const addGroupToSearchCache = () => {
    addViewedGroup(group_id);
  };

  return (
    <Flex className="flex-col flex-1">
      <Box borderWidth="1px" borderRadius="lg" p="2">
        <Link>
          <Flex onClick={onClickedButtonText}>{pageItem.item}</Flex>
        </Link>
      </Box>
    </Flex>
  );
};

export default ConsumerItem;
