import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  register?: UseFormRegisterReturn;
  title: string;
  registerOptions?: RegisterOptions;
  type?: string;
}

export const InputField = ({ register, title, type, ...rest }: IInputProps) => {
  return (
    <div className="w-full">
      <div className="mb-2">{title}</div>
      <input
        className="mb-2 px-2 py-1 border-[1px] border-gray-300 w-full"
        type={type}
        {...register}
        {...rest}
      />
    </div>
  );
};
