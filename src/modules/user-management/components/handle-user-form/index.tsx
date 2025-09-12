import { zodResolver } from '@hookform/resolvers/zod';
import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import { forwardRef, useImperativeHandle } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DocumentType } from '@/client/entities';
import OrganizationsFormSection from '@/modules/user-management/components/handle-user-form/organizations-info/organizations-form-section';
import PersonalInfoFormSection from '@/modules/user-management/components/handle-user-form/personal-info/personal-info-form-section';
import RolesFormSection from '@/modules/user-management/components/handle-user-form/roles-info/roles-form-section';
import { initialEmployeeInfo } from '@/modules/user-management/constants/employee-info';
import {
  type HandleUserFormSchema,
  handleUserFormSchema,
} from '@/modules/user-management/schemas/handle-user-form-schema';
import parseFormValuesToCreateUserBody from '@/modules/user-management/utils/parse-form-values-to-create-user-body';
import type { CreateUserBody, CreateUserResponse } from '@/services/api/users/create';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';
import { cn } from '@/lib/cn';

interface CreateUserFormRef {
  submit: () => void;
}

interface CreateUserFormProps {
  createUserAsync: UseMutateAsyncFunction<CreateUserResponse | null, Error, CreateUserBody, unknown>;
  updateUserAsync: any; // CHANGE THIS.
}

const CreateUserForm = forwardRef<CreateUserFormRef, CreateUserFormProps>((props, ref) => {
  const { createUserAsync, updateUserAsync } = props;
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
