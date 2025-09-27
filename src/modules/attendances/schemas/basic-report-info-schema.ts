import { z } from 'zod';

export const basicReportInfoSchema = z.object({
  monthNumber: z
    .number()
    .min(1, 'El mes es obligatorio')
    .max(12, 'El mes debe estar entre 1 y 12'),
  yearNumber: z
    .number('El año es obligatorio')
    .min(new Date().getFullYear() - 1, `El año debe ser mayor o igual a ${new Date().getFullYear() - 1}`)
    .max(new Date().getFullYear(), `El año debe ser menor o igual a ${new Date().getFullYear()}`),
  organizationId: z.string().min(1, 'La organización es obligatoria'),
  file: z // VALIDAR Q SOLAMENTE PUEDE SER UN SOLO FILE, NO ARRAY O MÚLTIPLES.
    .file()
    .max(10 * 1024 * 1024, 'El archivo debe ser menor a 10MB')
    .mime([
      "application/vnd.ms-excel", // Excel 97-2003 (.xls)
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel (.xlsx)
      "text/csv", // CSV
      "application/csv", // CSV alternative
      "application/vnd.ms-excel.sheet.macroEnabled.12", // Excel macro-enabled (.xlsm)
      "application/vnd.ms-excel.template.macroEnabled.12", // Excel macro-enabled template (.xltm)
      "application/vnd.ms-excel.addin.macroEnabled.12", // Excel macro-enabled add-in (.xlam)
    ])
});

export type BasicReportInfoSchema = z.infer<typeof basicReportInfoSchema>;
