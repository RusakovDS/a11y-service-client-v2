import ctl from "@netlify/classnames-template-literals";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSignInMutation } from "../app/services/api/authApi";
import { setCredentials } from "../app/slices/authSlice";
import { useAppDispatch } from "../app/store";
import { SignInFormData } from "../app/types/user";
import FormValidationError from "./FormValidationError";
import Modal from "./Modal";
import Spinner from "./Spinner";

interface Props {
  active: boolean;
  closeModal: () => void;
}

const inputStyle = ctl(`
  p-3 
  w-full 
  border 
  rounded-sm 
  outline-none 
  border-gray-300 
  focus:border-blue-600 
  hover:border-blue-600 
  transition-colors
`);

const SignInModal = ({ active, closeModal }: Props) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>();

  const [signin, { isLoading, error }] = useSignInMutation();

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    const response = await signin(data).unwrap();
    if (response) {
      dispatch(setCredentials(response));
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    reset();
    closeModal();
  };

  return (
    <Modal active={active} closeModal={handleCloseModal}>
      <div className="p-5 space-y-4">
        <h1 className="text-xl font-bold text-center">
          Sign in to A11y Checker
        </h1>
        <form className={"space-y-4"} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              className={`${inputStyle} ${errors.email && 'border-red-500'}`}
              id="email"
              placeholder="Email"
              type="text"
              {...register("email", { required: "Email is required." })}
            />
            {errors.email?.type === "required" && (
              <FormValidationError message={errors.email.message} />
            )}
          </div>
          <div>
            <label className="sr-only" htmlFor="email">
              Password
            </label>
            <input
              className={`${inputStyle} ${errors.password && 'border-red-500'}`}
              id="password"
              placeholder="Password"
              type="password"
              {...register("password", { required: "Password is required." })}
            />
            {errors.password?.type === "required" && (
              <FormValidationError message={errors.password.message} />
            )}
          </div>
          <div className="flex justify-between items-center text-center">
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 rounded-md px-4 py-2 text-center inline-flex items-center transition"
              disabled={isLoading}
            >
              {isLoading && <Spinner />}
              <span>Login</span>
            </button>
            <a href="#">Forgot your password?</a>
          </div>
        </form>
        {error && 'data' in error && <FormValidationError message={error?.data?.message}/>}
      </div>
      
    </Modal>
  );
};

export default SignInModal;
