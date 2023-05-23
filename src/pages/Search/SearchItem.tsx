import uuid from 'react-uuid';

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Highlight,
} from '@chakra-ui/react';

export const SearchItem = ({ item, keyword }: any) => {
  return (
    <AccordionItem key={uuid()}>
      <AccordionButton className="max-w-8xl overflow-hidden text-ellipsis">
        <AccordionIcon />
        <Box as="span" flex="5" textAlign="left">
          {JSON.stringify(item).substring(0, 200)}...
        </Box>
      </AccordionButton>
      <AccordionPanel flex="5" className="display-linebreak">
        <pre>
          <Highlight
            query={keyword}
            styles={{ px: '1', py: '1', bg: 'orange.100' }}>
            {JSON.stringify(item, null, 2)}
          </Highlight>
        </pre>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default SearchItem;
