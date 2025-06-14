import React from 'react';

export interface Friend {
  id: string;
  name: string;
  imageSrc: string;
  storyMessage?: string;
  position?: string;
}

export interface Story {
  id: string;
  friendName: string;
  imageUrl: string;
}

interface AppState {
  friends: Friend[];
  stories: Story[];
}

// Load initial state from localStorage or use default
const loadInitialState = (): AppState => {
  const savedState = localStorage.getItem('appState');
  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch (e) {
      console.error('Failed to parse saved state:', e);
    }
  }
  return {
    friends: [
      { id: '1', name: 'lynnette.tee', imageSrc: '/assets/friend-pixel-1.png', storyMessage: "Just swam fifteen laps! 🏊‍♀️", position: 'bottom-[20%] left-[25%]' },
      { id: '2', name: 'loopholehackers', imageSrc: '/assets/friend-pixel-2.png', storyMessage: "The vibe is immaculate in these coders! 🎨", position: 'bottom-[30%] left-[44%]' },
      { id: '3', name: 'aitinkererskl', imageSrc: '/assets/friend-pixel-3.png', storyMessage: "AI moves mountains! ⛰️", position: 'bottom-[20%] right-[25%]' },
    ],
    stories: [],
  };
};

let memoryState: AppState = loadInitialState();
const listeners: Array<(state: AppState) => void> = [];

function emitChange() {
  // Save to localStorage whenever state changes
  localStorage.setItem('appState', JSON.stringify(memoryState));
  for (const listener of listeners) {
    listener(memoryState);
  }
}

const appStore = {
  addFriend: (friend: Omit<Friend, 'id' | 'position' | 'storyMessage'>) => {
    const newFriend: Friend = { ...friend, id: Date.now().toString(), storyMessage: 'What am I up to?' };
    memoryState = { ...memoryState, friends: [...memoryState.friends, newFriend] };
    emitChange();
  },
  deleteFriend: (friendId: string) => {
    memoryState = { ...memoryState, friends: memoryState.friends.filter(f => f.id !== friendId) };
    emitChange();
  },
  setStories: (stories: Story[]) => {
    memoryState = { ...memoryState, stories };
    emitChange();
  },
  subscribe: (listener: (state: AppState) => void): (() => void) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  },
  getSnapshot: (): AppState => memoryState,
};

// React 18's hook for subscribing to external stores
export function useAppStore() {
  const state = React.useSyncExternalStore(appStore.subscribe, appStore.getSnapshot);
  return {
    ...state,
    addFriend: appStore.addFriend,
    deleteFriend: appStore.deleteFriend,
    setStories: appStore.setStories,
  };
}
