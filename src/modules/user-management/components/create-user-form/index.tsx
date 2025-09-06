import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
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

const CreateUserForm = forwardRef<CreateUserFormRef>((_, ref) => {
  const methods = useForm({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      roles: [],
      doctorInfo: {
        isResident: false,
      },
      employeeInfo: {
        schedules: [],
      },
    },
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
