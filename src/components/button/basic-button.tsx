interface IBasicButtonProps {
  renderIcon: () => React.ReactElement;
  title: string;
  classname: string;
}

export const BasicButton = ({
  renderIcon,
  title,
  classname,
}: IBasicButtonProps) => {
  return (
    <button className={"flex flex-row p-2 border-1 " + classname}>
      <div>{renderIcon?.()}</div>
      <div>{title}</div>
    </button>
  );
};
