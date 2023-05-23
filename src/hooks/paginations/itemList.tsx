import { useEffect, useState } from 'react';

import { Box, Flex, Spacer, Text } from '@chakra-ui/react';

export const ItemList = (items: any, curPage: any, itemLimit: any) => {
  const [curItems, setCurItems] = useState([]);

  useEffect(() => {
    const offset = curPage * itemLimit;
    const getList = (curPage: any, itemLimit: any) => {
      setCurItems(items.slice(offset, offset + itemLimit));
    };

    getList(curPage, itemLimit);
  }, [curPage, itemLimit, items]);

  return (
    <Box h={32} m={4} borderWidth={2}>
      {curItems.map(function (data) {
        const { name, quantity } = data;
        return (
          <Flex p={2} key={name}>
            <Text>{name}</Text>
            <Spacer />
            <Text>{quantity}</Text>
          </Flex>
        );
      })}
    </Box>
  );
};

export default ItemList;
