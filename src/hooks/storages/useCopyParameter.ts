import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CopyEventRequest {
  fromTopic: string;
  toTopic: string;
}

interface CopyParameter {
  copyRequest: CopyEventRequest;
  change: (data: CopyEventRequest) => void;
}

export const useCopyParameter = create(
  persist<CopyParameter>(
    (set, get) => ({
      copyRequest: {
        fromTopic: '',
        toTopic: '',
      },
      change: (data: CopyEventRequest) => {
        set({ copyRequest: data });
      },
    }),
    {
      name: 'copy-parameter',
    }
  )
);
