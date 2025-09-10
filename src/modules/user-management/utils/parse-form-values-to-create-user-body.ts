import { type ContractType, RoleName } from '@/client/entities';
import type { CreateUserFormSchema } from '@/modules/user-management/schemas/create-user-form-schema';
import type { CreateUserBody } from '@/services/api/users/create';
import { roles } from '@/shared/users/constants/roles';

function getProfileFromFormValues(formValues: CreateUserFormSchema): CreateUserBody['profile'] {
  return {
    name: formValues.name,
    lastName: formValues.lastName,
    documentType: formValues.documentType,
    documentValue: formValues.documentValue,
    gender: formValues.gender,
    email: formValues.email,
    phone: formValues.phone,
    address: formValues.address,
    birthDate: formValues.birthDate,
  };
}

function getRoleIdsFromFormValues(formValues: CreateUserFormSchema): number[] {
  return formValues.roles
    .filter((r) => r === RoleName.Admin || r === RoleName.Accountant)
    .map((roleName) => {
      const role = roles.find((r) => r.name === roleName);
      return role ? role.id : -1;
    })
    .filter((id) => id !== -1);
}

function getEmployeeDataFromFormValues(formValues: CreateUserFormSchema): CreateUserBody['employeeData'] | undefined {
  if (!formValues.employeeInfo) return undefined;

  return {
    startDate: formValues.employeeInfo.startDate,
    cuil: formValues.employeeInfo.cuil,
    contractType: formValues.employeeInfo.contractType as ContractType,
    netSalary: formValues.employeeInfo.netSalary,
    schedules: formValues.employeeInfo.schedules
      .filter((s) => s.isActive)
      .map((s) => ({
        weekday: s.weekday,
        startTime: s.startTime,
        endTime: s.endTime,
        isRemote: s.isRemote,
      })),
  };
}

function getPatientDataFromFormValues(formValues: CreateUserFormSchema): CreateUserBody['patientData'] | undefined {
  if (!formValues.patientInfo) return undefined;

  return {
    healthInsuranceName: formValues.patientInfo.healthInsuranceName,
  };
}

function getDoctorDataFromFormValues(formValues: CreateUserFormSchema): CreateUserBody['doctorData'] | undefined {
  if (!formValues.doctorInfo) return undefined;

  return {
    isResident: formValues.doctorInfo.isResident,
  };
}

export default function parseFormValuesToCreateUserBody(formValues: CreateUserFormSchema): CreateUserBody {
  return {
    profile: getProfileFromFormValues(formValues),
    organizationIds: formValues.organizationIds,
    roleIds: getRoleIdsFromFormValues(formValues),
    employeeData: getEmployeeDataFromFormValues(formValues),
    patientData: getPatientDataFromFormValues(formValues),
    doctorData: getDoctorDataFromFormValues(formValues),
  };
}
