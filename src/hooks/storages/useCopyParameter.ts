import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CopyEventRequest {
  fromTopic: string;
  fromId: number;
  toTopic: string;
  toId: number;
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
        fromId: 0,
        toTopic: '',
        toId: 0,
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
