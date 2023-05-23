import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserViewedGroup {
  viewedGroups: string[];
  addViewedGroup: (group: string) => void;
  removeViewedGroup: (group: string) => void;
}

export const useUserViewedGroups = create(
  persist<UserViewedGroup>(
    (set, get) => ({
      viewedGroups: [],
      addViewedGroup: (group: string) => {
        var groups = [...get().viewedGroups.filter((x) => x !== group), group];
        if (groups.length > 5) groups.shift();

        set({ viewedGroups: groups });
        console.log(groups);
      },

      removeViewedGroup: (group: string) => {
        var groups = get().viewedGroups.filter((x) => x !== group);
        set({ viewedGroups: groups });
      },
    }),
    {
      name: 'user-viewed-group',
    }
  )
);
