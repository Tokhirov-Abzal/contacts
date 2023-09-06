import { UseFormRegister } from "react-hook-form";
import { InputField } from "src/components";

export interface IContactCreateFields {
  name: string;
  email: string;
  phone: number;
  tags: string;
}

const formOptions = {
  name: { required: true },
  phone: { required: true },
};

export const ContactCreateForm = ({
  register,
}: {
  register: UseFormRegister<IContactCreateFields>;
}) => {
  return (
    <form>
      <InputField title="ФИО" register={register("name", formOptions.name)} />
      <InputField title="Email" register={register("email")} />
      <InputField
        title="Моб. номер"
        type="number"
        register={register("phone", formOptions.phone)}
      />
      <InputField title="Теги" register={register("tags", formOptions.phone)} />
    </form>
  );
};
