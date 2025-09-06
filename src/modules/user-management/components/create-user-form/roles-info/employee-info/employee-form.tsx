import { useFormContext } from 'react-hook-form';
import { FormField } from '@/components/common/form-field';
import FormSectionLayout from '@/modules/user-management/components/create-user-form/form-section-layout';
import ContractTypeEmployeeForm from '@/modules/user-management/components/create-user-form/roles-info/employee-info/contract-type-employee-form';
import EmployeeSchedulesFormField from '@/modules/user-management/components/create-user-form/roles-info/employee-info/employee-schedules-form-field';
import type { CreateUserFormSchema } from '@/modules/user-management/schemas/create-user-form-schema';

export default function EmployeeForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateUserFormSchema>();

  return (
    <FormSectionLayout
      title="Información del empleado"
      description="Proporcione la información específica del empleado"
      hasErrors={!!errors.employeeInfo}
    >
      <FormField
        id="employeeInfo.startDate"
        label="Fecha de ingreso"
        type="date"
        required
        register={register('employeeInfo.startDate')}
        error={errors.employeeInfo?.startDate}
      />

      <FormField
        id="employeeInfo.cuil"
        label="CUIL"
        type="text"
        required
        register={register('employeeInfo.cuil')}
        error={errors.employeeInfo?.cuil}
      />

      <ContractTypeEmployeeForm />

      <FormField
        id="employeeInfo.netSalary"
        label="Salario neto"
        type="number"
        required
        register={register('employeeInfo.netSalary', { valueAsNumber: true })}
        error={errors.employeeInfo?.netSalary}
      />

      <EmployeeSchedulesFormField />
    </FormSectionLayout>
  );
}