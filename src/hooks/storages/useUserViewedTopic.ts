import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserViewedTopic {
  viewedTopics: string[];
  addViewedTopic: (topic: string) => void;
  removeViewedTopic: (topic: string) => void;
}

export const useUserViewedTopics = create(
  persist<UserViewedTopic>(
    (set, get) => ({
      viewedTopics: [],
      addViewedTopic: (topic: string) => {
        var topics = [...get().viewedTopics.filter((x) => x !== topic), topic];
        if (topics.length > 5) topics.shift();

        set({ viewedTopics: topics });
      },

      removeViewedTopic: (topic: string) => {
        var topics = get().viewedTopics.filter((x) => x !== topic);
        set({ viewedTopics: topics });
      },
    }),
    {
      name: 'user-viewed-topic',
    }
  )
);
