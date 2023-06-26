import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SearchRequest {
  topicName: string;
  value: string;
  startDate: number;
  endDate: number;
  valueType: number;
}

interface SearchParameter {
  request: SearchRequest;
  change: (data: SearchRequest) => void;
}

export const useSearchParameter = create(
  persist<SearchParameter>(
    (set, get) => ({
      request: {
        topicName: '',
        value: '',
        startDate: new Date(
          new Date().setDate(new Date().getDate() - 3)
        ).getTime(),
        endDate: new Date().getTime(),
        valueType: 3,
      },
      change: (data: SearchRequest) => {
        set({ request: data });
      },
    }),
    {
      name: 'topic-search-parameters',
    }
  )
);
