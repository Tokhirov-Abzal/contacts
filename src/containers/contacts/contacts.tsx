import { useState, useEffect } from "react";
import { ContactItem } from "./contact-item/contact-item";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "src/assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "src/assets/icons/edit.svg";

import { BasicModal } from "src/components/modal/basic-modal/basic-modal";
import { IContact } from "./contacts.types";

import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";
import { contactsThunk } from "src/store/thunks/contacts-thunks";

export const Contacts = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clickedContact, setClickedContact] = useState<null | IContact>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: contactsData } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(contactsThunk());
  }, []);

  const onClickDetails = (id: string) => {
    navigate(id);
  };

  const onClickDelete = (item: IContact) => {
    setIsDeleteModalOpen(true);
    setClickedContact(item);
  };

  const onClickEdit = (id: string) => {};

  return (
    <div className="mt-24">
      <div className="px-4 h-12 flex items-center flex-row gap-2 bg-slate-50">
        <div className="w-1/5">ФИО</div>
        <div className="w-1/5">Номер телефона</div>
        <div className="w-1/5">E-mail адрес</div>
        <div className="w-1/5">Теги</div>
        <div className="w-1/5"></div>
        <div></div>
      </div>
      <div>
        {contactsData.map((contact: IContact) => {
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
                    onClick={() => onClickDelete(contact)}
                    cursor="pointer"
                  />
                  <EditIcon className="ml-2 cursor-pointer" />
                  {/* <InfoIcon
                    className="ml-2 cursor-pointer"
                    onClick={() => onClickDetails(item.id)}
                  /> */}
                </>
              )}
            />
          );
        })}
      </div>
      <BasicModal
        isOpen={isDeleteModalOpen}
        onClickOK={() => {
          setIsDeleteModalOpen(false);
        }}
        onCancel={() => {
          setIsDeleteModalOpen(false);
        }}
      >
        <div>Вы уверены удалить {clickedContact?.email}</div>
      </BasicModal>
    </div>
  );
};
