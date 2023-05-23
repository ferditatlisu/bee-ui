import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChangeOffsetRequest {
  group_id: string;
  topic_name: string;
  offset_type: string;
  value: number | undefined;
}

interface OffsetParameter {
  offsetRequest: ChangeOffsetRequest;
  change: (data: ChangeOffsetRequest) => void;
}

export const useOffsetParameter = create(
  persist<OffsetParameter>(
    (set, get) => ({
      offsetRequest: {
        topic_name: '',
        group_id: '',
        offset_type: 'SHIFTBY',
        value: undefined,
      },
      change: (data: ChangeOffsetRequest) => {
        set({ offsetRequest: data });
      },
    }),
    {
      name: 'offset-parameter',
    }
  )
);
