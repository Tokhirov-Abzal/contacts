import { ReactComponent as CancelIcon } from "src/assets/icons/cancel.svg";

interface IBasicModalProps {
  children: React.ReactElement | React.ReactElement[];
  isOpen: boolean;
  onClickOK: () => void;
  onCancel: () => void;
}

export const BasicModal = ({
  children,
  isOpen,
  onClickOK,
  onCancel,
}: IBasicModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="top-0 left-0 fixed flex justify-center items-center w-screen h-screen z-10 bg-slate-800 opacity-50">
      <div className="w-[550px] flex flex-col opacity-100 z-12 bg-white relative px-12 py-4 rounded-sm">
        <CancelIcon
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onCancel}
        />
        <div className="w-full mt-14 text-center">{children}</div>
        <div
          className="mt-16 w-24 p-2 text-center self-end  bg-green-200 cursor-pointer"
          onClick={onClickOK}
        >
          <button>OK</button>
        </div>
      </div>
    </div>
  );
};
