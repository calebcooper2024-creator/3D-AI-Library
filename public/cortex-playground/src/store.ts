import { create } from 'zustand';

interface FactoryState {
  cameraMode: 'free' | 'follow';
  followedProductId: number | null;
  isSidePanelMode: boolean;
  chatWidth: number;
  focusedNodePos: [number, number, number] | null;
  focusedNodeOffset: [number, number, number] | null;
  focusedNodeLookOffset: [number, number, number] | null;
  setCameraMode: (mode: 'free' | 'follow') => void;
  setFollowedProductId: (id: number | null) => void;
  setIsSidePanelMode: (mode: boolean) => void;
  setChatWidth: (width: number) => void;
  setFocusedNodePos: (
    pos: [number, number, number] | null, 
    offset?: [number, number, number] | null,
    lookOffset?: [number, number, number] | null
  ) => void;
}

export const useFactoryStore = create<FactoryState>((set) => ({
  cameraMode: 'free',
  followedProductId: null,
  isSidePanelMode: false,
  chatWidth: 50,
  focusedNodePos: null,
  focusedNodeOffset: null,
  focusedNodeLookOffset: null,
  setCameraMode: (mode) => set({ cameraMode: mode }),
  setFollowedProductId: (id) => set({ followedProductId: id }),
  setIsSidePanelMode: (mode) => set({ isSidePanelMode: mode }),
  setChatWidth: (width) => set({ chatWidth: width }),
  setFocusedNodePos: (pos, offset = null, lookOffset = null) => set({ 
      focusedNodePos: pos, 
      focusedNodeOffset: offset,
      focusedNodeLookOffset: lookOffset
  }),
}));
