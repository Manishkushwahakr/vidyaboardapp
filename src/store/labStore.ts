import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getAllDownloadedIds, storeSimulation, deleteSimulation, getSimulation } from '../lib/db';
import { toast } from 'sonner';

interface LabState {
  downloadedIds: string[];
  isDownloading: Record<string, boolean>;
  
  // Actions
  init: () => Promise<void>;
  downloadExperiment: (id: string, url: string) => Promise<void>;
  removeExperiment: (id: string) => Promise<void>;
  getSimulationContent: (id: string) => Promise<string | null>;
}

export const useLabStore = create<LabState>()(
  persist(
    (set, get) => ({
      downloadedIds: [],
      isDownloading: {},

      init: async () => {
        const ids = await getAllDownloadedIds();
        set({ downloadedIds: ids });
      },

      downloadExperiment: async (id, url) => {
        // Prevent duplicate downloads
        if (get().downloadedIds.includes(id)) {
          toast.info('This simulation is already saved locally.');
          return;
        }

        // Check internet connectivity
        if (!navigator.onLine) {
          toast.error('No internet connection. Please connect to download simulations.');
          return;
        }
        
        set((state) => ({ 
          isDownloading: { ...state.isDownloading, [id]: true } 
        }));

        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error('Failed to fetch simulation');
          
          const content = await response.text();
          await storeSimulation(id, content);
          
          set((state) => ({
            downloadedIds: [...state.downloadedIds, id],
            isDownloading: { ...state.isDownloading, [id]: false }
          }));
          
          toast.success('Simulation downloaded for offline use');
        } catch (error) {
          console.error('Download error:', error);
          set((state) => ({ 
            isDownloading: { ...state.isDownloading, [id]: false } 
          }));
          toast.error('Download failed. Please check your connection and try again.');
        }
      },

      removeExperiment: async (id) => {
        try {
          await deleteSimulation(id);
          set((state) => ({
            downloadedIds: state.downloadedIds.filter((dId) => dId !== id)
          }));
          toast.info('Simulation removed from local storage');
        } catch (error) {
          console.error('Removal error:', error);
          toast.error('Failed to remove simulation');
        }
      },

      getSimulationContent: async (id) => {
        return await getSimulation(id);
      }
    }),
    {
      name: 'vidyaboard-lab-storage',
      partialize: (state) => ({ downloadedIds: state.downloadedIds }),
    }
  )
);
