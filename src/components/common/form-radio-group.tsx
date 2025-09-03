import type { FieldError } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RadioOption<T extends string | number = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface FormRadioGroupProps<T extends string | number = string> {
  id: string;
  label: string;
  required?: boolean;
  error?: FieldError;
  options: RadioOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
}

function FormRadioGroup<T extends string | number = string>({ id, label, required, error, options, value, onChange }: FormRadioGroupProps<T>) {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-sm" htmlFor={id}>
        {label}
        {required && '*'}
      </label>
      <div>
        <RadioGroup value={value?.toString()} onValueChange={(val) => onChange?.(val as T)} className="flex flex-col gap-2">
          {options.map((option) => (
            <div key={option.value.toString()} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value.toString()}
                id={`${id}-${option.value}`}
                disabled={option.disabled}
              />
              <Label
                htmlFor={`${id}-${option.value}`}
                className={option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {error && <span className="text-destructive text-xs">{error.message}</span>}
      </div>
    </div>
  );
}

export default FormRadioGroup;