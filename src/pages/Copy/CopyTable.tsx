import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import CopyTableItem from './CopyTableItem';

const CopyTable = ({ pageItem, actionCallback }: any) => {
  return (
    <TableContainer w="100%">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Status</Th>
            <Th>CreatedDate</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pageItem !== undefined && (
            <CopyTableItem
              actionCallback={actionCallback}
              pageItem={pageItem}></CopyTableItem>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CopyTable;
