import { useNavigate } from 'react-router-dom';

import { Box, Flex, Select } from '@chakra-ui/react';

import { useKafkaClusterQuery } from 'hooks/services/useKafkaClusterQuery';
import { useUserKafkaCluster } from 'hooks/storages/useUserKafkaCluster';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useKafkaClusterQuery();
  const kafkaCluster = useUserKafkaCluster((x) => x.kafkaCluster);
  const changeParameter = useUserKafkaCluster((x) => x.change);

  const onSelectChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    var selectedData = data?.find(
      (x) => x.id.toString() === event.target.value
    );
    changeParameter(selectedData!!);
    navigate(`/`);
  };

  return (
    <Box as="section">
      <Box as="nav">
        <Flex justifyContent="flex-end" marginRight="1">
          {data !== undefined && (
            <Select
              size="sm"
              onChange={onSelectChanged}
              maxWidth="10%"
              defaultValue={kafkaCluster.id}>
              {data.map((d: any) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
          )}
        </Flex>
      </Box>
    </Box>
  );
};
