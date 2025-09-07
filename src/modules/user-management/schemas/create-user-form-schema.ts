import { z } from 'zod';
import { DocumentType, Gender, RoleName } from '@/client/entities';
import { doctorInfoSchema } from '@/modules/user-management/schemas/doctor-info-schema';
import { employeeInfoSchema } from '@/modules/user-management/schemas/employee-info-schema';
import { patientInfoSchema } from '@/modules/user-management/schemas/patient-info-schema';

export const createUserFormSchema = z
  // Personal info.
  .object({
    name: z
      .string('Nombre es requerido')
      .trim()
      .min(2, 'Minímo 2 caracteres')
      .max(80, 'Máximo 80 caracteres'),
    lastName: z
      .string('Apellido es requerido')
      .trim()
      .min(2, 'Minímo 2 caracteres')
      .max(80, 'Máximo 80 caracteres'),
    documentType: z.enum(DocumentType, { error: 'Tipo de documento es requerido' }),
    documentValue: z
      .string('Número de documento es requerido')
      .trim()
      .min(6, 'Minímo 6 caracteres')
      .max(30, 'Máximo 30 caracteres'),
    gender: z.enum(Gender, { error: 'Género es requerido' }),
    email: z
      .email('Correo electrónico inválido')
      .trim()
      .max(150, 'Máximo 150 caracteres'),
    phone: z
      .string()
      .trim()
      .max(30, 'Máximo 30 caracteres')
      .optional(),
    address: z
      .string()
      .trim()
      .max(150, 'Máximo 150 caracteres')
      .optional(),
    birthDate: z
      .iso
      .date('Fecha de nacimiento es requerida'),
    // Organizations.
    organizationIds: z.array(z.string()).min(1, 'Se requiere al menos una organización'),
    // Roles.
    roles: z.array(z.enum(RoleName)).min(1, 'Se requiere al menos un rol'),
    // Conditional subforms.
    employeeInfo: z.any().optional(),
    patientInfo: z.any().optional(),
    doctorInfo: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    // Validate employeeInfo only if the Employee role is present
    if (data.roles.includes(RoleName.Employee)) {
      if (!data.employeeInfo) {
        ctx.addIssue({
          code: 'custom',
          message: 'Debes completar la información del empleado',
          path: ['employeeInfo'],
        });
      } else {
        const result = employeeInfoSchema.safeParse(data.employeeInfo);
        if (!result.success) {
          result.error.issues.forEach((issue) => {
            ctx.addIssue({
              ...issue,
              path: ['employeeInfo', ...issue.path],
            });
          });
        }
      }
    }

    // Validate patientInfo only if the Patient role is present
    if (data.roles.includes(RoleName.Patient)) {
      if (!data.patientInfo) {
        ctx.addIssue({
          code: 'custom',
          message: 'Debes completar la información del paciente',
          path: ['patientInfo'],
        });
      } else {
        const result = patientInfoSchema.safeParse(data.patientInfo);
        if (!result.success) {
          result.error.issues.forEach((issue) => {
            ctx.addIssue({
              ...issue,
              path: ['patientInfo', ...issue.path],
            });
          });
        }
      }
    }

    // Validate doctorInfo only if the Doctor role is present
    if (data.roles.includes(RoleName.Doctor)) {
      if (!data.doctorInfo) {
        ctx.addIssue({
          code: 'custom',
          message: 'Debes completar la información del doctor',
          path: ['doctorInfo'],
        });
      } else {
        const result = doctorInfoSchema.safeParse(data.doctorInfo);
        if (!result.success) {
          result.error.issues.forEach((issue) => {
            ctx.addIssue({
              ...issue,
              path: ['doctorInfo', ...issue.path],
            });
          });
        }
      }
    }
  });

export type CreateUserFormSchema = z.infer<typeof createUserFormSchema>;