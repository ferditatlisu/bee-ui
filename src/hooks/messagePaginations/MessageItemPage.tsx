import { usePagination } from '@ajna/pagination';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { PaginationBottom } from 'hooks/paginations/paginationBottom';

import { MessageItemProps } from './MessageItem';

interface ItemPageProps {
  pageItems: any[];
  MessageItem: React.FC<MessageItemProps>;
  messageItemProps: Omit<MessageItemProps, 'message'>;
}

function MessageItemPage({
  pageItems,
  MessageItem,
  messageItemProps,
}: ItemPageProps): JSX.Element {
  // states
  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = usePagination({
    total: pageItems.length,
    limits: {
      outer: 2,
      inner: 2,
    },
    initialState: {
      pageSize: 10,
      isDisabled: false,
      currentPage: 1,
    },
  });

  return (
    <Flex className="flex-col" width="100%">
      <Box borderWidth="1px" borderRadius="lg" p="2" maxWidth="100%">
        <TableContainer whiteSpace="unset">
          <Table size="xs" maxWidth="100%" overflowX="hidden">
            <Thead>
              <Tr>
                <Th>Offset</Th>
                <Th>Partition</Th>
                <Th>Timestamp</Th>
                <Th>Key</Th>
                <Th>Value</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {pageItems !== undefined &&
                Array.isArray(pageItems) &&
                pageItems
                  .slice(offset, offset + pageSize)
                  .map((item: any) => (
                    <MessageItem
                      {...messageItemProps}
                      key={`${item['offset']}-${item['partition']}`}
                      message={item}></MessageItem>
                  ))}
            </Tbody>
          </Table>
        </TableContainer>
        <PaginationBottom
          pages={pages}
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageChanged={setCurrentPage}
        />
      </Box>
    </Flex>
  );
}

export default MessageItemPage;
