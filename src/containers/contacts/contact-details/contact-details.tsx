import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { InputField } from "src/components";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";
import {
  editContactThunk,
  getContactByIdThunk,
} from "src/store/thunks/contacts-thunks";
import { useAuth } from "src/hooks/use-auth";

const formOptions = {
  phone: { required: true },
  name: { required: true },
};

interface EditInputFields {
  email: string;
  name: string;
  phone: string;
  tags: string;
}

export const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: userId } = useAuth();
  const contactData = useAppSelector((state) => state.contacts.contactById);
  const { register, handleSubmit, setValue } = useForm<EditInputFields>();

  const submitHandler = async (data: EditInputFields) => {
    const tagsArray = data.tags.trim().split(", ");
    await dispatch(
      editContactThunk({
        docId: contactData.id,
        email: data.email,
        phone: data.phone,
        name: data.name,
        ownerId: userId!,
        tags: tagsArray,
      })
    );
    navigate("/contacts");
  };

  useEffect(() => {
    if (id) {
      dispatch(getContactByIdThunk({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (contactData?.id) {
      for (const [key, value] of Object.entries(contactData)) {
        if (Array.isArray(value)) {
          setValue(key as keyof EditInputFields, value.join(", "));
        } else {
          setValue(key as keyof EditInputFields, value);
        }
      }
    }
  }, [contactData]);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
      <h2 className="my-8 text-3xl text-blue-300">Изменение</h2>
      <InputField title="ФИО" register={register("name", formOptions.name)} />
      <InputField title="Email" register={register("email")} />
      <InputField
        title="Моб. номер"
        type="number"
        register={register("phone", formOptions.phone)}
      />
      <InputField title="Теги" register={register("tags", formOptions.phone)} />

      <div className="self-end">
        <button className="p-2 mt-4 w-[200px] border-[1px] border-green-300 rounded-md bg-green-100">
          Изменить
        </button>
      </div>
    </form>
  );
};
