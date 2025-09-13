import { zodResolver } from '@hookform/resolvers/zod';
import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DocumentType } from '@/client/entities';
import { cn } from '@/lib/cn';
import OrganizationsFormSection from '@/modules/user-management/components/handle-user-form/organizations-info/organizations-form-section';
import PersonalInfoFormSection from '@/modules/user-management/components/handle-user-form/personal-info/personal-info-form-section';
import RolesFormSection from '@/modules/user-management/components/handle-user-form/roles-info/roles-form-section';
import { initialEmployeeInfo } from '@/modules/user-management/constants/employee-info';
import {
  type HandleUserFormSchema,
  handleUserFormSchema,
} from '@/modules/user-management/schemas/handle-user-form-schema';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';
import parseFormValuesToCreateUserBody from '@/modules/user-management/utils/parse-form-values-to-create-user-body';
import type { CreateUserBody, CreateUserResponse } from '@/services/api/users/create';
import type { UserWithDetails } from '@/shared/users/types';

interface CreateUserFormRef {
  submit: () => void;
}

interface CreateUserFormProps {
  createUserAsync: UseMutateAsyncFunction<CreateUserResponse | null, Error, CreateUserBody, unknown>;
  updateUserAsync: UseMutateAsyncFunction<CreateUserResponse | null, Error, CreateUserBody, unknown>; // Review this.
  userData: UserWithDetails | undefined | null;
}

const CreateUserForm = forwardRef<CreateUserFormRef, CreateUserFormProps>((props, ref) => {
  const { createUserAsync, updateUserAsync, userData } = props;
  const { isCreation, isDisabled } = useHandleUserModalStore();
  
  const methods = useForm({
    resolver: zodResolver(handleUserFormSchema),
    defaultValues: {
      name: undefined,
      lastName: undefined,
      email: undefined,
      phone: undefined,
      address: undefined,
      birthDate: undefined,
      documentValue: undefined,
      gender: undefined,
      documentType: DocumentType.dni,
      roles: [],
      organizationIds: [],
      patientInfo: undefined,
      doctorInfo: {
        isResident: false,
      },
      employeeInfo: initialEmployeeInfo,
    },
    shouldFocusError: false,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (userData) {
      let employeeInfo = initialEmployeeInfo;

      if (userData.profile.employees) {
        employeeInfo = {
          startDate: userData.profile.employees.startDate,
          cuil: userData.profile.employees.cuil,
          contractType: userData.profile.employees.contractType,
          netSalary: userData.profile.employees.netSalary,
          schedules: userData.profile.employees.employeeSchedules.map(schedule => ({
            weekday: schedule.weekday,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            isRemote: schedule.isRemote,
            isActive: true,
          })),
        };
      }

      reset({
        name: userData.profile.name,
        lastName: userData.profile.lastName,
        email: userData.profile.email,
        phone: userData.profile.phone,
        address: userData.profile.address,
        birthDate: userData.profile.birthDate,
        documentValue: userData.profile.documentValue,
        gender: userData.profile.gender,
        documentType: userData.profile.documentType,
        roles: userData.roles.map((role) => role.name),
        organizationIds: userData.organizations.map((org) => org.id),
        patientInfo: userData.profile.patients || undefined,
        doctorInfo: userData.profile.doctors || { isResident: false },
        employeeInfo: employeeInfo,
      });
    }
  }, [userData, reset]);

  const onSubmit = async (formValues: HandleUserFormSchema) => {
    if (isCreation) {
      await createUser(formValues);
    } else {
      await updateUser(formValues);
    }
  };

  const createUser = async (formValues: HandleUserFormSchema) => {
    try {
      const body = parseFormValuesToCreateUserBody(formValues);
      await createUserAsync(body);
      toast.success('Usuario creado correctamente');
      reset();
    } catch (error) {
      toast.error('Error al crear usuario', { description: error instanceof Error ? error.message : undefined });
    }
  }

  const updateUser = async (formValues: HandleUserFormSchema) => {
    // TO DO.
  }

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
  }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={
        cn(
          "w-full overflow-hidden flex flex-col gap-10",
          isDisabled && "pointer-events-none select-none",
        )
      }>
        <PersonalInfoFormSection />
        <OrganizationsFormSection />
        <RolesFormSection />
      </form>
    </FormProvider>
  );
});

export default CreateUserForm;
