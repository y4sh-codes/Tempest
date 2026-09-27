import { create } from 'zustand';

interface MapLayerState {
  radar: boolean;
  ir: boolean;
  lightning: boolean;
  cape: boolean;
}

interface NowcastStore {
  timeOffset: number; // in minutes from -120 to +180
  setTimeOffset: (time: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  
  layers: MapLayerState;
  toggleLayer: (layer: keyof MapLayerState) => void;

  selectedCellId: string | null;
  setSelectedCellId: (id: string | null) => void;

  activePage: string;
  setActivePage: (page: string) => void;
}

export const useNowcastStore = create<NowcastStore>((set) => ({
  timeOffset: 0,
  setTimeOffset: (timeOffset) => set({ timeOffset }),
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  playbackSpeed: 1,
  setPlaybackSpeed: (playbackSpeed) => set({ playbackSpeed }),

  layers: {
    radar: true,
    ir: false,
    lightning: true,
    cape: false,
  },
  toggleLayer: (layer) => set((state) => ({ 
    layers: { ...state.layers, [layer]: !state.layers[layer] } 
  })),

  selectedCellId: null,
  setSelectedCellId: (selectedCellId) => set({ selectedCellId }),

  activePage: 'dashboard',
  setActivePage: (activePage) => set({ activePage }),
}));
