import { usePagination } from '@ajna/pagination';
import { Box, ChakraProvider, Flex, Stack } from '@chakra-ui/react';

import { PaginationBottom } from './paginationBottom';

interface SearchItemPageProps {
  pageItems: any;
  CustomPage: any;
  SearchKeyword: string;
}

function SearchItemPage({
  pageItems,
  CustomPage,
  SearchKeyword,
}: SearchItemPageProps): JSX.Element {
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
    <Flex className="flex-col flex-1">
      <ChakraProvider>
        <Box borderWidth="1px" p="3" borderRadius="lg">
          <Stack>
            {pageItems !== undefined &&
              Array.isArray(pageItems) &&
              pageItems.length > 0 &&
              pageItems
                .slice(offset, offset + pageSize)
                .map((item: any) => (
                  <CustomPage item={item} keyword={SearchKeyword}></CustomPage>
                ))}
            {pagesCount > 1 && (
              <PaginationBottom
                pages={pages}
                pagesCount={pagesCount}
                currentPage={currentPage}
                onPageChanged={setCurrentPage}
              />
            )}
          </Stack>
        </Box>
      </ChakraProvider>
    </Flex>
  );
}

export default SearchItemPage;
