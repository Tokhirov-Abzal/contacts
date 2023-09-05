interface IContactItem {
  name: string;
  phone: string | number;
  tags?: string[];
  email: string;
  onClickHandler?: () => void;
  renderIcons?: () => React.ReactElement;
}

export const ContactItem = ({
  name,
  tags,
  phone,
  email,
  onClickHandler,
  renderIcons,
}: IContactItem) => {
  const tagsLabel = tags?.join(", ");
  return (
    <div
      className="pl-4 pr-6 h-12 w-full flex flex-row gap-2 items-center"
      onClick={onClickHandler}
    >
      <div className="w-1/5">{name}</div>
      <div className="w-1/5">{phone}</div>
      <div className="w-1/5">{email}</div>
      <div className="w-1/5">{tagsLabel}</div>
      <div className="w-1/5 flex flex-row">{renderIcons?.()}</div>
    </div>
  );
};
