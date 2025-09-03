import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { CreateUserFormSchema } from '@/modules/user-management/schemas/create-user-form-schema';
import documentTypes from '@/shared/users/constants/document-types';

export default function DocumentField() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateUserFormSchema>();

  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor="document" className="text-sm">
        Documento*
      </label>
      <div>
        <div className="flex flex-row w-full">
          <Controller
            name="documentType"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ''} onValueChange={(value) => field.onChange(value)}>
                <SelectTrigger
                  className="w-auto rounded-[8px_0_0_8px]"
                  {...(errors.documentType ? { 'aria-invalid': true } : {})}
                >
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((doc) => (
                    <SelectItem key={doc.value} value={doc.value}>
                      {doc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          <Input
            type="text"
            id="document"
            {...register('documentValue')}
            isError={!!errors.documentValue}
            autoComplete="off"
            className="rounded-[0_8px_8px_0]"
          />
        </div>

        <div className="flex flex-col">
          {errors.documentType && <span className="text-destructive text-xs">{errors.documentType.message}</span>}
          {errors.documentValue && <span className="text-destructive text-xs">{errors.documentValue.message}</span>}
        </div>
      </div>
    </div>
  );
}
