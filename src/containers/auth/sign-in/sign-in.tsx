import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { InputField, MainWrapper } from "src/components";
import { useAppDispatch } from "src/hooks/redux-hooks";
import { setUser } from "src/store/slices/user-slice";

export interface ISignInInputs {
  email: string;
  password: string;
}

const formOptions = {
  email: { required: true },
  password: { required: true },
};

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInInputs>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = async (data: ISignInInputs) => {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      dispatch(setUser(user));
      navigate("/contacts");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <MainWrapper className="min-h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="w-[550px] px-6 py-8 border-2 border-gray-50 rounded-md flex flex-col shadow-md"
      >
        <div className="mb-4 text-xl font-bold text-center">Вход</div>
        <div>
          <InputField
            title="Email"
            register={register("email", formOptions.email)}
          />
          <InputField
            title="Пароль"
            register={register("password", formOptions.password)}
            type="password"
          />
        </div>
        <div>
          <button className="mt-4 p-2 w-full bg-green-100 rounded-md hover:bg-green-200 ease-out duration-500">
            Войти
          </button>
          <p className="mt-2">
            Нет аккаунта?
            <Link className="text-blue-300 pl-2" to="/register">
              Регистрация
            </Link>
          </p>
        </div>
      </form>
    </MainWrapper>
  );
};
