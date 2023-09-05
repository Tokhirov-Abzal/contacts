import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface ISelectFieldProps {
  register: UseFormRegister<FieldValues>;
  options: string[];
  name: string;
  registerOptions?: RegisterOptions;
}

export function SelectField({
  register,
  options,
  name,
  registerOptions,
  ...rest
}: ISelectFieldProps) {
  return (
    <select {...register(name, registerOptions)} {...rest}>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
