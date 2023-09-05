import { useNavigate } from "react-router-dom";
import { useAuth } from "src/hooks/use-auth";

export const Header = () => {
  const navigate = useNavigate();
  const { email } = useAuth();

  return (
    <header className="px-8 py-4 flex flex-row items-center justify-between h-20 bg-slate-50">
      <div
        className=" flex flex-row justify-between items-center w-32"
        onClick={() => {
          navigate("/contacts");
        }}
      >
        <div className="text-2xl text-slate-600 cursor-pointer">Контакты</div>
      </div>
      <div className="text-2xl text-slate-600 ">{email}</div>
    </header>
  );
};
