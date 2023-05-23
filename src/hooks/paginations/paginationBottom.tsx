import {
  Pagination,
  PaginationContainer,
  PaginationPage,
  PaginationPageGroup,
  PaginationSeparator,
} from '@ajna/pagination';

export const PaginationBottom = ({
  pages,
  pagesCount,
  currentPage,
  onPageChanged,
}: {
  pages: number[];
  pagesCount: number;
  currentPage: number;
  onPageChanged: (index: number) => void;
}) => {
  const handlePageChange = (nextPage: number) => {
    onPageChanged(nextPage);
  };

  return pagesCount > 1 ? (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={handlePageChange}>
      <PaginationContainer
        align="center"
        justify="space-between"
        p={2}
        w="full">
        <PaginationPageGroup
          isInline
          align="center"
          separator={<PaginationSeparator fontSize="sm" w={7} jumpSize={11} />}>
          {pages.map((page: number) => (
            <PaginationPage
              w={8}
              h={8}
              key={`pagination_page_${page}`}
              page={page}
              fontSize="sm"
              _hover={{ bg: 'gray.400' }}
              _current={{ bg: 'orange.400', textColor: '#fff' }}
            />
          ))}
        </PaginationPageGroup>
      </PaginationContainer>
    </Pagination>
  ) : null;
};
