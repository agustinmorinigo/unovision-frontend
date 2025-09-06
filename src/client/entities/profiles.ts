import type { DocumentType, Gender } from '@/client/entities';

export interface Profile {
  id: string;
  name: string;
  lastName: string;
  documentType: DocumentType;
  documentValue: string;
  gender: Gender;
  email: string | null; // ESTO DEBE SER SOLO STRING, NO NULL. ESO SE VA A ARREGLAR CUANDO MANDE LA MIGRACIÓN DE ESO EN EL BACKEND.
  phone: string;
  address: string | null;
  birthDate: string;
}
