import { useNavigate } from 'react-router-dom';

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
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { RefreshButton } from 'components/RefreshButton';

import { useConsumerGroupByTopicQuery } from 'hooks/services/useConsumerGroupByTopicQuery';
import SingleMessage from 'hooks/util/SingleMessage';

export const TopicDetailConsumer = ({ topic_name }: any) => {
  const navigate = useNavigate();
  const { isLoading, data, refetch, isRefetching } =
    useConsumerGroupByTopicQuery(topic_name);

  const onButtonClicked = (group_id: string) => {
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
      <HStack margin="1">
        {data !== undefined && (
          <Tag
            marginLeft={4}
            size="md"
            variant="solid"
            colorScheme={getTotalLag(data) > 0 ? 'red' : 'green'}>
            total lag: {getTotalLag(data).toLocaleString('en-US')}
          </Tag>
        )}
        <Box style={{ marginLeft: 'auto' }} paddingRight={4}>
          <RefreshButton
            isLoading={isLoading || isRefetching}
            onButtonClicked={onButtonClickedRefresh}></RefreshButton>
        </Box>
      </HStack>
      <Accordion allowMultiple>
        {data !== undefined &&
          Array.isArray(data) &&
          data.map((item: any, index: number) => (
            <AccordionItem key={index}>
              <AccordionButton>
                <AccordionIcon />
                <Flex className="flex-row flex-1" gap={1}>
                  <Box>{item['group_id']}</Box>
                  <Tag
                    size="md"
                    variant="solid"
                    colorScheme={item['total_lag'] > 0 ? 'red' : 'green'}>
                    lag: {item['total_lag']}
                  </Tag>
                  <Button
                    style={{ marginLeft: 'auto' }}
                    as="div"
                    onClick={() => onButtonClicked(item['group_id'])}
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="gray"
                    size="xs">
                    View Group
                  </Button>
                </Flex>
              </AccordionButton>
              <AccordionPanel>
                <Flex>
                  <TableContainer minWidth="100%">
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>Partition</Th>
                          <Th>Topic Offset</Th>
                          <Th>Group Offset</Th>
                          <Th>Lag</Th>
                          <Th width="100%" textAlign="right">
                            Detail
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {item['partitions'] !== undefined &&
                          item['partitions']
                            .sort(
                              (a: any, b: any) =>
                                a['partition'] - b['partition']
                            )
                            .map((partition: any) => (
                              <Tr
                                key={
                                  partition['topic_offset'] +
                                  '_' +
                                  partition['partition']
                                }>
                                <Td>{partition['partition']}</Td>
                                <Td>
                                  <Text>
                                    {partition['topic_offset'].toLocaleString(
                                      'en-US'
                                    )}
                                  </Text>
                                </Td>
                                <Td>
                                  {partition['group_offset'].toLocaleString(
                                    'en-US'
                                  )}
                                </Td>
                                <Td>
                                  <Tag
                                    size="md"
                                    variant="solid"
                                    colorScheme={
                                      partition['lag'] > 0 ? 'red' : 'green'
                                    }>
                                    {partition['lag'].toLocaleString('en-US')}
                                  </Tag>
                                </Td>
                                {partition['lag'] > 0 ? (
                                  <Td textAlign="right">
                                    <SingleMessage
                                      TopicName={topic_name}
                                      Partition={partition['partition']}
                                      Offset={
                                        partition['group_offset']
                                      }></SingleMessage>
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
