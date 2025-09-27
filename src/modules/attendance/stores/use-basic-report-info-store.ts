import { persist } from 'zustand/middleware';
import create from '@/config/store';
import type { AttendancesInfo, FileMetadata } from '@/modules/attendance/types/basic-report-info';
import type { SelectedPeriod } from '@/modules/attendance/types/selected-period';

interface SetFileDataParams {
  file: File;
  attendancesInfo: AttendancesInfo;
  selectedPeriod: SelectedPeriod;
}

interface State {
  monthNumber: number | null;
  yearNumber: number | null;
  organizationId: string | null;
  fileMetadata: FileMetadata | null;
  attendancesInfo: AttendancesInfo | null;
}

interface Actions {
  setFileData: (params: SetFileDataParams) => void;
  clearFileData: () => void;
  setPeriod: (selectedPeriod: SelectedPeriod) => void;
  setOrganizationId: (organizationId: string) => void;
}

const useBasicReportInfoStore = create<State & Actions>()(
  persist(
    (set) => ({
      monthNumber: null,
      yearNumber: null,
      organizationId: null,
      fileMetadata: null,
      attendancesInfo: null,

      setFileData: (params: SetFileDataParams) => {
        const { file, attendancesInfo, selectedPeriod } = params;
        set({
          fileMetadata: {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            validatedFilePeriod: selectedPeriod,
          },
          attendancesInfo,
        });
      },

      clearFileData: () => {
        set({
          fileMetadata: null,
          attendancesInfo: null,
        });
      },

      setPeriod: (selectedPeriod: SelectedPeriod) => {
        set({ monthNumber: selectedPeriod.monthNumber, yearNumber: selectedPeriod.yearNumber });
      },

      setOrganizationId: (organizationId: string) => {
        set({ organizationId });
      },
    }),
    {
      name: 'basic-report-info',
      partialize: (state) => ({
        monthNumber: state.monthNumber,
        yearNumber: state.yearNumber,
        organizationId: state.organizationId,
        fileMetadata: state.fileMetadata,
        attendancesInfo: state.attendancesInfo,
      }),
    },
  ),
);

export default useBasicReportInfoStore;