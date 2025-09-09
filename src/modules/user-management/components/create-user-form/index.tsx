import { zodResolver } from '@hookform/resolvers/zod';
import type { UseMutateAsyncFunction } from '@tanstack/react-query';
import { forwardRef, useImperativeHandle } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ContractType, DocumentType, RoleName } from '@/client/entities';
import OrganizationsFormSection from '@/modules/user-management/components/create-user-form/organizations-info/organizations-form-section';
import PersonalInfoFormSection from '@/modules/user-management/components/create-user-form/personal-info/personal-info-form-section';
import RolesFormSection from '@/modules/user-management/components/create-user-form/roles-info/roles-form-section';
import {
  type CreateUserFormSchema,
  createUserFormSchema,
} from '@/modules/user-management/schemas/create-user-form-schema';
import type { CreateUserBody, CreateUserResponse } from '@/services/api/user/create';

interface CreateUserFormRef {
  submit: () => void;
}

interface CreateUserFormProps {
  createUserAsync: UseMutateAsyncFunction<CreateUserResponse | null, Error, CreateUserBody, unknown>
}

const basicSchedule = {
  startTime: '09:00',
  endTime: '18:00',
  isRemote: false,
};

const CreateUserForm = forwardRef<CreateUserFormRef, CreateUserFormProps>(({ createUserAsync }, ref) => {
  const methods = useForm({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      documentType: DocumentType.dni,
      roles: [],
      organizationIds: [],
      doctorInfo: {
        isResident: false,
      },
      // employeeInfo: {
      //   contractType: ContractType.singleTax,
      //   schedules: [
      //     {
      //       weekday: 1,
      //       ...basicSchedule,
      //       isActive: true,
      //     },
      //     {
      //       weekday: 2,
      //       ...basicSchedule,
      //       isActive: true,
      //     },
      //     {
      //       weekday: 3,
      //       ...basicSchedule,
      //       isActive: true,
      //     },
      //     {
      //       weekday: 4,
      //       ...basicSchedule,
      //       isActive: true,
      //     },
      //     {
      //       weekday: 5,
      //       ...basicSchedule,
      //       isActive: true,
      //     },
      //     {
      //       weekday: 6,
      //       ...basicSchedule,
      //       isActive: false,
      //     },
      //     {
      //       weekday: 7,
      //       ...basicSchedule,
      //       isActive: false,
      //     },
      //   ],
      // },
    },
    shouldFocusError: false,
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;
  console.log('errors: ', errors);

  const onSubmit = async (formValues: CreateUserFormSchema) => {
    const { roles } = formValues;

    const cleanedValues: CreateUserFormSchema = {
      ...formValues,
      employeeInfo: roles.includes(RoleName.Employee) ? formValues.employeeInfo : undefined,
      patientInfo: roles.includes(RoleName.Patient) ? formValues.patientInfo : undefined,
      doctorInfo: roles.includes(RoleName.Doctor) ? formValues.doctorInfo : undefined,
    };

    await createUser(cleanedValues);
  };

  const createUser = async (newUserData: CreateUserFormSchema) => {
    try {
      console.log('newUserData: ', newUserData);

      const body: CreateUserBody = {
        profile: {
          name: newUserData.name,
          lastName: newUserData.lastName,
          documentType: newUserData.documentType,
          documentValue: newUserData.documentValue,
          gender: newUserData.gender,
          email: newUserData.email,
          phone: newUserData.phone,
          address: newUserData.address,
          birthDate: newUserData.birthDate,
        },
        organizationIds: newUserData.organizationIds,
        roleIds: newUserData.roles
          .filter((r) => r === RoleName.Admin || r === RoleName.Accountant)
          .map((r) => (r === RoleName.Admin ? 1 : 5)),
        // employeeData: newUserData.employeeInfo
        //   ? {
        //       startDate: newUserData.employeeInfo.startDate,
        //       cuil: newUserData.employeeInfo.cuil,
        //       contractType: newUserData.employeeInfo.contractType as ContractType,
        //       netSalary: newUserData.employeeInfo.netSalary,
        //       schedules: newUserData.employeeInfo.schedules.map((s) => ({
        //         weekday: s.weekday,
        //         startTime: s.startTime,
        //         endTime: s.endTime,
        //         isRemote: s.isRemote,
        //       })),
        //     }
        //   : undefined,
        patientData: newUserData.patientInfo
          ? {
              healthInsuranceName: newUserData.patientInfo.healthInsuranceName,
            }
          : undefined,
        doctorData: newUserData.doctorInfo
          ? {
              isResident: newUserData.doctorInfo.isResident,
            }
          : undefined,
      }

      await createUserAsync(body);
      toast.success('Usuario creado correctamente');
      reset({
        // TENGO Q AGREGAR TODO MANUALMENTE....
        roles: [],
        organizationIds: [],
      });
      
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error al crear usuario: ${error.message}`);
      }
    }
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
