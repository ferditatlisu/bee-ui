import { DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import { IconButton, Spinner, Td, Tooltip, Tr } from '@chakra-ui/react';

import { useCopyEventMutation } from 'hooks/services/useCopyEventMutation';
import { useDeleteCopyEventMutation } from 'hooks/services/useDeleteCopyEventMutation';

export interface CopyEventModel {
  from_topic: string;
  to_topic: string;
  status: string;
  key: string;
  createdDate: number;
  error: string | undefined;
  podName: string;
}

interface CopyTableItemDto {
  pageItem: CopyEventModel;
  actionCallback: () => void;
}

const CopyTableItem = ({ pageItem, actionCallback }: CopyTableItemDto) => {
  const { mutateAsync } = useDeleteCopyEventMutation();
  const { mutate } = useCopyEventMutation();

  const onButtonClickedDelete = () => {
    mutateAsync(
      {
        fromTopic: pageItem.from_topic,
        toTopic: pageItem.to_topic,
      },
      {
        onSuccess: () => {
          actionCallback();
        },
      }
    );
  };
  const onButtonClickedRetry = () => {
    mutateAsync(
      {
        fromTopic: pageItem.from_topic,
        toTopic: pageItem.to_topic,
      },
      {
        onSuccess: () => {
          mutate(
            {
              fromTopic: pageItem.from_topic,
              fromId: 0,
              toTopic: pageItem.to_topic,
              toId: 0,
            },
            {
              onSuccess: () => {
                actionCallback();
              },
            }
          );
        },
      }
    );
  };

  return (
    <Tr>
      <Td>{pageItem.from_topic}</Td>
      <Td>{pageItem.to_topic}</Td>
      {pageItem.error !== undefined ? (
        <Tooltip label={pageItem.error} placement="top-start" bg="red.600">
          <Td textColor="white" bg="red.500">
            {pageItem.status}
          </Td>
        </Tooltip>
      ) : pageItem.status === 'Completed' ? (
        <Td>{pageItem.status}</Td>
      ) : (
        <Td>
          <Tooltip label="Click fetch to get update">
            <Spinner></Spinner>
          </Tooltip>
        </Td>
      )}
      <Td>{new Date(+pageItem.createdDate).toLocaleString()}</Td>
      <Td>
        <IconButton
          p="1px"
          m="2px"
          onClick={() => onButtonClickedDelete()}
          icon={<DeleteIcon />}
          colorScheme="red"
          aria-label="delete"></IconButton>
        <IconButton
          p="1px"
          m="2px"
          onClick={() => onButtonClickedRetry()}
          icon={<RepeatIcon />}
          colorScheme="green"
          aria-label="retry"></IconButton>
      </Td>
    </Tr>
  );
};

export default CopyTableItem;
