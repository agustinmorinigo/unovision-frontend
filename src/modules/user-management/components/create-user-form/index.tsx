import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ContractType, DocumentType } from '@/client/entities';
import OrganizationsFormSection from '@/modules/user-management/components/create-user-form/organizations-info/organizations-form-section';
import PersonalInfoFormSection from '@/modules/user-management/components/create-user-form/personal-info/personal-info-form-section';
import RolesFormSection from '@/modules/user-management/components/create-user-form/roles-info/roles-form-section';
import {
  type CreateUserFormSchema,
  createUserFormSchema,
} from '@/modules/user-management/schemas/create-user-form-schema';

interface CreateUserFormRef {
  submit: () => void;
}

const basicSchedule = {
  startTime: '09:00',
  endTime: '18:00',
  isRemote: false,
}

const CreateUserForm = forwardRef<CreateUserFormRef>((_, ref) => {
  const methods = useForm({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      documentType: DocumentType.dni,
      roles: [],
      doctorInfo: {
        isResident: false,
      },
      employeeInfo: {
        contractType: ContractType.singleTax,
        schedules: [
          {
            weekday: 1,
            ...basicSchedule,
            isActive: true,
          },
          {
            weekday: 2,
            ...basicSchedule,
            isActive: true,
          },
          {
            weekday: 3,
            ...basicSchedule,
            isActive: true,
          },
          {
            weekday: 4,
            ...basicSchedule,
            isActive: true,
          },
          {
            weekday: 5,
            ...basicSchedule,
            isActive: true,
          },
          {
            weekday: 6,
            ...basicSchedule,
            isActive: false,
          },
          {
            weekday: 7,
            ...basicSchedule,
            isActive: false,
          },
        ],
      },
    },
    shouldFocusError: false,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (formValues: CreateUserFormSchema) => {
    console.log(formValues);
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
  }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full overflow-hidden flex flex-col gap-10">
        <PersonalInfoFormSection />
        <OrganizationsFormSection />
        <RolesFormSection />
      </form>
    </FormProvider>
  );
});

export default CreateUserForm;
