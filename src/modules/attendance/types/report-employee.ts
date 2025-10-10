export interface ReportEmployee {
  id: string;
  netSalary: number;
  profile: {
    id: string;
    documentType: 'dni' | 'le' | 'lc' | 'ci' | 'passport' | 'other';
    documentValue: string;
    name: string;
    lastName: string;
    email: string;
  };
}