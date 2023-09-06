import { useState, useEffect } from "react";
import { ContactItem } from "./contact-item/contact-item";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "src/assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "src/assets/icons/edit.svg";
import { ReactComponent as AddIcon } from "src/assets/icons/add.svg";

import { BasicModal } from "src/components/modal/basic-modal/basic-modal";
import { IContact } from "./contacts.types";

import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";
import {
  createContactThunk,
  deleteContactThunk,
  getContactsThunk,
} from "src/store/thunks/contacts-thunks";
import {
  ContactCreateForm,
  IContactCreateFields,
} from "./contact-create-form/contact-create-form";
import { useForm } from "react-hook-form";

import { useAuth } from "src/hooks/use-auth";
import { setClickedContact } from "src/store/slices/contacts-slices";
import { ContactSearch } from "./contact-search/contact-search";
import { BasicButton } from "src/components";

const mapObj: { [key: string]: string | undefined } = {
  ФИО: "name",
  "Номер телефона": "phone",
  "E-mail": "email",
  Теги: "tags",
};

export const Contacts = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [controlledFilter, setControlledFilter] = useState({
    search: "",
    tag: "ФИО",
  });

  const onFilter = (data: IContact[]) => {
    const appliedFilter = mapObj[controlledFilter.tag] as string;

    return data.filter((item) =>
      (item[appliedFilter] as string).includes(controlledFilter.search.trim())
    );
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: contactsData } = useAppSelector((state) => state.contacts);
  const filteredData = controlledFilter.search.trim()
    ? onFilter(contactsData as IContact[])
    : contactsData;

  const { id: userId } = useAuth();
  const createFormMethods = useForm<IContactCreateFields>();
  const filterMethods = useForm();
  const clickedContact = useAppSelector(
    (state) => state.contacts.clickedContact
  );

  useEffect(() => {
    dispatch(getContactsThunk({ userId: userId! }));
  }, []);

  const onDelete = async () => {
    try {
      await dispatch(deleteContactThunk({ id: clickedContact!.id })).unwrap();

      dispatch(getContactsThunk({ userId: userId! }));
      setIsDeleteModalOpen(false);
    } catch (e) {
      alert(e.message);
    }
  };

  const onCreateContact = async ({
    email,
    name,
    phone,
    tags,
  }: IContactCreateFields): Promise<void> => {
    try {
      const tagsArray = tags.trim().split(" ");
      await dispatch(
        createContactThunk({
          email,
          name,
          phone,
          tags: tagsArray,
          ownerId: userId!,
        })
      ).unwrap();
      dispatch(getContactsThunk({ userId: userId! }));
      setIsCreateModalOpen(false);
      createFormMethods.reset();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="mt-24">
      <div className="mb-8 flex flex-row items-center">
        <ContactSearch
          register={filterMethods.register}
          searchRegisterOptions={{
            onChange: (e) => {
              setControlledFilter((prev) => ({
                ...prev,
                search: e.target.value,
              }));
            },
          }}
          selectRegisterOptions={{
            onChange: (e) => {
              setControlledFilter((prev) => ({ ...prev, tag: e.target.value }));
            },
          }}
        />
        <BasicButton
          onClick={() => setIsCreateModalOpen(true)}
          title="Добавить"
          classname="mx-2 border-[1px] flex items-center bg-green-50 border-green-500 rounded-md"
          renderIcon={() => <AddIcon />}
        />
      </div>
      <div className="px-4 h-12 flex items-center flex-row gap-2 bg-slate-50">
        <div className="w-1/5">ФИО</div>
        <div className="w-1/5">Номер телефона</div>
        <div className="w-1/5">E-mail адрес</div>
        <div className="w-1/5">Теги</div>
        <div className="w-1/5"></div>
        <div></div>
      </div>
      <div>
        {!filteredData?.length ? (
          <div className="flex items-center justify-center mt-16">
            Нет данных
          </div>
        ) : (
          filteredData.map((contact: IContact) => {
            return (
              <ContactItem
                key={contact.name}
                name={contact.name}
                email={contact.email}
                phone={contact.phone}
                tags={contact.tags}
                renderIcons={() => (
                  <>
                    <DeleteIcon
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        dispatch(setClickedContact(contact));
                      }}
                      cursor="pointer"
                    />
                    <EditIcon
                      onClick={() => {
                        navigate(contact.id);
                      }}
                      className="ml-2 cursor-pointer"
                    />
                  </>
                )}
              />
            );
          })
        )}
      </div>
      <BasicModal
        isOpen={isDeleteModalOpen}
        onClickOK={onDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
        }}
        title="Удаление"
      >
        <div>Вы уверены, что хотите удалить {clickedContact?.phone}</div>
      </BasicModal>
      <BasicModal
        isOpen={isCreateModalOpen}
        onClickOK={() => {
          setIsCreateModalOpen(true);
          createFormMethods.handleSubmit(onCreateContact)();
        }}
        onCancel={() => {
          setIsCreateModalOpen(false);
        }}
        title="Добавление"
      >
        <ContactCreateForm register={createFormMethods.register} />
      </BasicModal>
    </div>
  );
};
