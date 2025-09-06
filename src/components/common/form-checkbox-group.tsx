import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CheckboxOption<T extends string | number = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface FormCheckboxGroupProps<T extends string | number = string> {
  id: string;
  label?: string;
  required?: boolean;
  error?: string;
  options: CheckboxOption<T>[];
  value?: T[];
  onChange?: (values: T[]) => void;
}

export default function FormCheckboxGroup<T extends string | number = string>({
  id,
  label,
  required,
  error,
  options,
  value = [],
  onChange,
}: FormCheckboxGroupProps<T>) {
  const handleCheckboxChange = (optionValue: T, checked: boolean) => {
    if (!onChange) return;

    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      {
        label && (
          <label className="text-sm" htmlFor={id}>
            {label}
            {required && '*'}
          </label>
        )
      }
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <div key={option.value.toString()} className="flex items-center space-x-2">
            <Checkbox
              id={`${id}-${option.value}`}
              checked={value.includes(option.value)}
              onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
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
      </div>
      {error && <span className="text-destructive text-xs mt-1 block">{error}</span>}
    </div>
  );
}