import type { FileMetadata } from '@/modules/attendance/types/basic-report-info';

export function getFakeFileForDisplay(fileMetadata: FileMetadata | null): File | null {
  if (!fileMetadata) return null;

  return new File(
    [''],
    fileMetadata.name,
    {
      type: fileMetadata.type,
      lastModified: fileMetadata.lastModified,
    },
  );
}