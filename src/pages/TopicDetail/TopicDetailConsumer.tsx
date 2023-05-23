import { useNavigate } from 'react-router-dom';
import { useGetConsumerGroupByTopic } from 'services';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { RefreshButton } from 'components/RefreshButton';

import SingleMessage from 'hooks/util/SingleMessage';

export const TopicDetailConsumer = ({ topic_name }: any) => {
  const navigate = useNavigate();
  const { isLoading, data, refetch, isRefetching } =
    useGetConsumerGroupByTopic(topic_name);

  const onButtonClicked = (group_id: string) => {
    console.log(group_id);
    navigate(`/consumers/${group_id}`);
  };

  const onButtonClickedRefresh = () => {
    refetch();
  };

  const getTotalLag = (data: any) => {
    if (data === undefined || !Array.isArray(data)) return 0;

    return data
      .map((i: any) => i['total_lag'])
      .reduce((sum: number, v: number) => sum + v, 0);
  };

  return (
    <Flex className="flex-col flex-1">
      <HStack m="2">
        <Box>
          <RefreshButton
            isLoading={isLoading || isRefetching}
            onButtonClicked={onButtonClickedRefresh}></RefreshButton>
        </Box>
        {data !== undefined && (
          <Tag
            size="md"
            variant="solid"
            colorScheme={getTotalLag(data) > 0 ? 'red' : 'green'}>
            total lag:
            {getTotalLag(data)}
          </Tag>
        )}
      </HStack>
      <Accordion allowMultiple>
        {data !== undefined &&
          Array.isArray(data) &&
          data.map((item: any) => (
            <AccordionItem>
              <AccordionButton pb={1}>
                <AccordionIcon />
                <HStack spacing={1}>
                  <Box>{item['group_id']}</Box>
                  <Tag
                    size="md"
                    variant="solid"
                    colorScheme={item['total_lag'] > 0 ? 'red' : 'green'}>
                    lag: {item['total_lag']}
                  </Tag>
                  <Button
                    onClick={() => onButtonClicked(item['group_id'])}
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="gray"
                    size="xs">
                    View Group
                  </Button>
                </HStack>
              </AccordionButton>
              <AccordionPanel pb={1}>
                <Flex>
                  <TableContainer>
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>Partition</Th>
                          <Th>Topic Offset</Th>
                          <Th>Group Offset</Th>
                          <Th>Lag</Th>
                          <Th>Detail</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {item['partitions'] !== undefined &&
                          item['partitions'].sort().map((partition: any) => (
                            <Tr
                              backgroundColor={
                                partition['lag'] > 0 ? 'red' : 'white'
                              }>
                              <Td>{partition['partition']}</Td>
                              <Td>{partition['topic_offset']}</Td>
                              <Td>{partition['group_offset']}</Td>
                              <Td>{partition['lag']}</Td>
                              {partition['lag'] > 0 ? (
                                <Td>
                                  {true && (
                                    <SingleMessage
                                      TopicName={topic_name}
                                      Partition={partition['partition']}
                                      Offset={
                                        partition['group_offset']
                                      }></SingleMessage>
                                  )}
                                </Td>
                              ) : (
                                <Td></Td>
                              )}
                            </Tr>
                          ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </Flex>
  );
};

export default TopicDetailConsumer;
