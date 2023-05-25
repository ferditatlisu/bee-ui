import {
  Flex,
  Link,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

interface ViewedTagProps {
  viewedData: string[];
  onClickedText: (name: string) => void;
  onRemoveButton: (name: string) => void;
}

const ViewedTags = ({
  viewedData,
  onClickedText,
  onRemoveButton,
}: ViewedTagProps) => {
  return (
    <Flex>
      <Wrap spacing={2}>
        {viewedData.map((viewedName: string) => (
          <WrapItem key={viewedName}>
            <Tag
              size="md"
              key={viewedName}
              variant="outline"
              colorScheme="orange">
              <Link>
                <TagLabel onClick={() => onClickedText(viewedName)}>
                  {viewedName}
                </TagLabel>
              </Link>
              <TagCloseButton onClick={() => onRemoveButton(viewedName)} />
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  );
};

export default ViewedTags;
