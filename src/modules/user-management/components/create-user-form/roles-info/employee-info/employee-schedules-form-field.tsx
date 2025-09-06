import { Controller, useFormContext } from 'react-hook-form';
import EmployeeSchedulesFieldContent from '@/modules/user-management/components/create-user-form/roles-info/employee-info/employee-schedules-field-content';
import type { CreateUserFormSchema } from '@/modules/user-management/schemas/create-user-form-schema';

export default function EmployeeSchedulesFormField() {
  const { formState: { errors }, control } = useFormContext<CreateUserFormSchema>();
  
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor="employeeInfo.schedules" className="text-sm">
        Horarios de trabajo*
      </label>
      <div className="w-full overflow-hidden">
        <p className="text-xs">Configura horarios específicos para cada día de la semana</p>

        <div>
          <Controller
            name="employeeInfo.schedules"
            control={control}
            defaultValue={[]}
            render={({ field }) => <EmployeeSchedulesFieldContent field={field} errors={errors} /> }
          />
        </div>

        {errors.employeeInfo?.schedules && errors.employeeInfo.schedules.type === 'too_small' && (
          <p className="mt-1 text-xs text-destructive">{errors.employeeInfo.schedules.message}</p>
        )}
      </div>
    </div>
  )
}
