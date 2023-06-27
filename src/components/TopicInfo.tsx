import {
  Box,
  HStack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

import { useTopicInformationQuery } from 'hooks/services/useTopicInformationQuery';

export const TopicInfo = ({ topicName, refetchInterval }: any) => {
  const { data } = useTopicInformationQuery(topicName, refetchInterval);

  return (
    <Box borderWidth="1px" borderRadius="lg" width="500px">
      <HStack spacing="1px" divider={<StackDivider borderColor="gray.200" />}>
        <Stat p="4">
          <StatLabel>Messages</StatLabel>
          <StatNumber>
            {data['message_count'].toLocaleString('en-US')}
          </StatNumber>
        </Stat>
        <Stat p="4">
          <StatLabel>Retention Day</StatLabel>
          <StatNumber>{data['retention_day']}</StatNumber>
        </Stat>
        <Stat p="4">
          <StatLabel>Partitions</StatLabel>
          <StatNumber>{data['partition_count']}</StatNumber>
        </Stat>
      </HStack>
    </Box>
  );
};
