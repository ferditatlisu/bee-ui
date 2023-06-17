import { useEffect, useRef, useState } from 'react';

import { RepeatIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Switch, Tooltip } from '@chakra-ui/react';

export interface RefreshButtonData {
  isLoading: boolean;
  onButtonClicked: () => void;
}

export const RefreshButton = ({
  isLoading,
  onButtonClicked,
}: RefreshButtonData) => {
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);
  const currentTimer = useRef<NodeJS.Timer>();

  const savedCallback = useRef(onButtonClicked);
  useEffect(() => {
    savedCallback.current = onButtonClicked;
  }, [onButtonClicked]);

  useEffect(() => {
    if (isAutoRefresh) {
      currentTimer.current = setInterval(() => {
        savedCallback.current();
      }, 5000);
    } else {
      clearInterval(currentTimer.current);
    }

    return () => {
      clearInterval(currentTimer.current);
    };
  }, [isAutoRefresh]);

  return (
    <Box display="flex" alignItems="center">
      <Tooltip
        hasArrow
        label="Refresh"
        placement="start"
        backgroundColor="#f27a1a">
        <Flex marginRight="3px">
          <IconButton
            alignItems="center"
            icon={<RepeatIcon />}
            bgColor="#f27a1a"
            _hover={{ bg: '#f59547' }}
            color="white"
            isDisabled={isLoading}
            isLoading={isLoading}
            onClick={() => onButtonClicked()}
            aria-label="refresh"></IconButton>
        </Flex>
      </Tooltip>
      <Tooltip hasArrow label="Auto-Refresh" placement="right-end">
        <Flex alignItems="baseline">
          <Switch
            id="auto-refresh"
            onChange={() => setIsAutoRefresh((x) => !x)}
          />
        </Flex>
      </Tooltip>
    </Box>
  );
};
