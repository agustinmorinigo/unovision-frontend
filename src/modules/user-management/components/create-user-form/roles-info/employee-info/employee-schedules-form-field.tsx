import { Controller, useFormContext } from 'react-hook-form';
import FormFieldLayout from '@/components/common/form-field-layout';
import EmployeeSchedulesFieldContent from '@/modules/user-management/components/create-user-form/roles-info/employee-info/employee-schedules-field-content';
import type { CreateUserFormSchema } from '@/modules/user-management/schemas/create-user-form-schema';

export default function EmployeeSchedulesFormField() {
  const { formState: { errors }, control } = useFormContext<CreateUserFormSchema>();
  const error = errors.employeeInfo?.schedules && errors.employeeInfo.schedules.type === 'custom' ? errors.employeeInfo.schedules.message : '';

  return (
    <FormFieldLayout label={'Horarios de trabajo'} required={true} id={'schedules'} error={error}>
      <div className='w-full overflow-hidden flex flex-col gap-4'>
        <p className="text-xs">Configura horarios específicos para cada día de la semana</p>

        <div>
          <Controller
            name="employeeInfo.schedules"
            control={control}
            defaultValue={[]}
            render={({ field }) => <EmployeeSchedulesFieldContent field={field} errors={errors} />}
          />
        </div>
      </div>
    </FormFieldLayout>
  );
}
