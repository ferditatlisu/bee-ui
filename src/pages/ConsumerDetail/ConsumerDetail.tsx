import { useLocation } from 'react-router-dom';
import { useGetConsumerInformation } from 'services';

import {
  Box,
  Flex,
  HStack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

import { RefreshButton } from 'components/RefreshButton';

import ConsumerDetailTopic from './ConsumerDetailTopic';
const ConsumerDetail = () => {
  const location = useLocation();
  const group_id = location.pathname.replace('/consumers/', '');
  const { isLoading, data, refetch, isRefetching } =
    useGetConsumerInformation(group_id);

  const onButtonClicked = () => {
    refetch();
  };

  return (
    <Flex className="flex-col flex-1">
      <Flex width="100%" maxWidth="100%">
        <Flex fontSize="25" fontStyle="bold" p="2">
          {group_id}
        </Flex>
        <RefreshButton
          isLoading={isLoading || isRefetching}
          onButtonClicked={onButtonClicked}></RefreshButton>
      </Flex>
      <Box borderWidth="1px" borderRadius="lg" width="300px">
        <HStack spacing="1px" divider={<StackDivider borderColor="gray.200" />}>
          {data !== undefined && (
            <Stat p="4">
              <StatLabel>State</StatLabel>
              <StatNumber>{data['state']}</StatNumber>
            </Stat>
          )}
          {data !== undefined && (
            <Stat p="4">
              <StatLabel>Members</StatLabel>
              <StatNumber>{data['member_count']}</StatNumber>
            </Stat>
          )}
        </HStack>
      </Box>
      <Flex mt="5" className="flex-col flex-1">
        <Box borderWidth="1px" borderRadius="lg">
          <ConsumerDetailTopic group_id={group_id}></ConsumerDetailTopic>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ConsumerDetail;
