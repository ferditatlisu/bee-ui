import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SearchRequest {
  topicName: string;
  value: string;
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
      },
      change: (data: SearchRequest) => {
        set({ request: data });
      },
    }),
    {
      name: 'search-parameter',
    }
  )
);
