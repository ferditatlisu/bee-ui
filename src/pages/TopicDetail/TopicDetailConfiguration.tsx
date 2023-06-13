import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import { useTopicConfigurationQuery } from 'hooks/services/useTopicConfigurationQuery';

import TopicDetailConfigurationItem from './TopicDetailConfigurationItem';

export const TopicDetailConfiguration = ({ topic_name }: any) => {
  const { isLoading, data, refetch } = useTopicConfigurationQuery(topic_name);
  return (
    <TableContainer maxWidth="100%">
      <Table variant="striped" size="sm" maxWidth="100%">
        <Thead maxWidth="100%">
          <Tr>
            <Th>Prodperty</Th>
            <Th>Value</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data !== undefined &&
            data.map((item: any, index: number) => (
              <TopicDetailConfigurationItem
                item={item}
                index={index}
                topicName={topic_name}
                refetch={refetch}
              />
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TopicDetailConfiguration;
