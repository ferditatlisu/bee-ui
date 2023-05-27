import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserKafkaClusterResponse {
  id: string;
  name: string;
}

interface UserKafkaCluster {
  kafkaCluster: UserKafkaClusterResponse;
  change: (data: UserKafkaClusterResponse) => void;
}

export const useUserKafkaCluster = create(
  persist<UserKafkaCluster>(
    (set, get) => ({
      kafkaCluster: {
        id: '0',
        name: 'Not selected',
      },
      change: (data: UserKafkaClusterResponse) => {
        set({ kafkaCluster: data });
      },
    }),
    {
      name: 'user-kafka-cluster',
    }
  )
);
