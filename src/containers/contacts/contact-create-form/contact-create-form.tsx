import { useForm } from "react-hook-form";
import { InputField } from "src/components";

interface IContactCreateFields {
  name: string;
  email: string;
  phone: number;
}

const formOptions = {
  name: { required: true },
  phone: { required: true },
};

export const ContactCreateForm = () => {
  const { register, handleSubmit } = useForm<IContactCreateFields>();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <InputField title="Name" register={register("name", formOptions.name)} />
      <InputField title="Email" register={register("email")} />
      <InputField
        title="Phone"
        register={register("phone", formOptions.phone)}
      />
    </form>
  );
};
