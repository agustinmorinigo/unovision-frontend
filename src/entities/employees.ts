import type { ContractType } from '@/entities/enums/contractType';

export interface Employee {
  id: string;
  profileId: string;
  startDate: string;
  exitDate?: string;
  cuil: string;
  contractType: ContractType;
  netSalary: number;
}
