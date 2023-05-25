import ReactJson from 'react-json-view';

import {
  Flex,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import MessageItemHeaderCollapse from './MessageItemHeaderCollapse';

export const MessageItemCollapse = (messageItem: any) => {
  const message = messageItem.item;

  return (
    <Flex mt="1">
      <Tabs className="flex-col flex-1" isFitted variant="enclosed">
        <TabList
          width="100%"
          maxWidth="100%"
          className="[&>button]:text-kb-orange">
          <Tab padding={11} className="w-52">
            Value
          </Tab>
          <Tab
            padding={11}
            className="w-52"
            isDisabled={!Array.isArray(message['headers'])}>
            Headers
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex>
              <ReactJson
                src={message['value']}
                enableClipboard={false}
                displayDataTypes={false}
                iconStyle="square"
                collapsed={1}
                collapseStringsAfterLength={100}
              />
            </Flex>
          </TabPanel>
          <TabPanel>
            <TableContainer maxWidth="100%">
              <Table size="sm" maxWidth="100%">
                <Thead maxWidth="100%">
                  <Tr>
                    <Th>Key</Th>
                    <Th>Value</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {message['headers'] !== undefined &&
                    message['headers'] !== null &&
                    Array.isArray(message['headers']) &&
                    message['headers'].map((item: any) => (
                      <MessageItemHeaderCollapse
                        item={item}></MessageItemHeaderCollapse>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default MessageItemCollapse;
