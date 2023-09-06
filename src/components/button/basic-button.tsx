interface IBasicButtonProps {
  renderIcon: () => React.ReactElement;
  title: string;
  classname: string;
  onClick: () => void;
}

export const BasicButton = ({
  renderIcon,
  title,
  classname,
  onClick,
}: IBasicButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={"flex flex-row p-2 border-1 " + classname}
    >
      <div>{renderIcon?.()}</div>
      <div>{title}</div>
    </button>
  );
};
