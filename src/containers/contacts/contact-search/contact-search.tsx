import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { InputField, SelectField } from "src/components";

const filterOptions = ["ФИО", "E-mail", "Номер телефона", "Теги"];

export const ContactSearch = ({
  register,
  searchRegisterOptions,
  selectRegisterOptions,
}: {
  register: UseFormRegister<FieldValues>;
  searchRegisterOptions: RegisterOptions;
  selectRegisterOptions: RegisterOptions;
}) => {
  return (
    <div className="flex justify-between w-full">
      <div className="w-full">
        <InputField
          register={register("search", searchRegisterOptions)}
          placeholder="Поиск..."
        />
      </div>
      <div className="flex flex-row w-1/3 justify-center items-center">
        <h4 className="pr-2  w-[200px] text-center text-md">Фильтр по:</h4>
        <SelectField
          className="h-2/3  w-full border-[1px] border-gray-500"
          name="filter"
          options={filterOptions}
          register={register}
          registerOptions={selectRegisterOptions}
        />
      </div>
    </div>
  );
};
