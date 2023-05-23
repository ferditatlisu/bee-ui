import { usePagination } from '@ajna/pagination';
import { Box, Flex } from '@chakra-ui/react';

import { PaginationBottom } from 'hooks/paginations/paginationBottom';

interface ItemPageProps {
  pageItems: unknown[];
  CustomTable: React.ComponentType<PaginationCustomItem>;
  actionCallback: () => void;
}

export interface PaginationCustomItem {
  pageItems: unknown[];
  offset: number;
  pageSize: number;
  actionCallback: () => void;
}

function CustomItemPage({
  pageItems,
  CustomTable,
  actionCallback,
}: ItemPageProps): JSX.Element {
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
    <Flex className="flex-col flex-1" width="100%">
      <Box borderWidth="1px" borderRadius="lg" p="2">
        <CustomTable
          pageItems={pageItems}
          pageSize={pageSize}
          offset={offset}
          actionCallback={actionCallback}></CustomTable>
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

export default CustomItemPage;
