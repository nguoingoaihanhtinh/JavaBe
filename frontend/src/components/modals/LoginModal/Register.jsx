import authApi from "@/apis/authApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCircleNotch, FaEnvelope, FaKey, FaUser } from "react-icons/fa6";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const onSubmit = async (data) => {
    const response = await authApi.register({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });
    if (response?.status === "success") {
      window.location.reload();
    } else if (
      response?.status === "failed" &&
      response?.message === "Email đã được sử dụng!"
    ) {
      setError("email", {
        type: "manual",
        message: "Email đã được sử dụng.",
      });
    }
  };

  const handleRegister = () => {};

  const password = watch("password"); // Watch the password field to compare

  return (
    <div>
      <header className="text-center text-4xl font-bold text-gray-800 mb-6 dark:text-dark-text">
        Sign Up
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 items-center">
          <div className="basis-[50%]">
            <p className="text-base ml-2 font-bold mb-1">First Name</p>
            <div className="relative">
              <input
                placeholder="First name..."
                className="w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full "
                {...register("firstName", {
                  required: "Vui lòng nhập tên",
                  pattern: {
                    value: /^[A-Za-z]{1,20}$/,
                    message:
                      "Tên chỉ có thể chứa 1-20 ký tự là chữ",
                  },
                })}
              />
              <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
                <FaUser />
              </div>
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-sm ml-2">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="basis-[50%]">
            <p className="text-base ml-2 font-bold mb-1">Last Name</p>
            <div className="relative">
              <input
                placeholder="Last name..."
                className="w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full "
                {...register("lastName", {
                  required: "Vui lòng nhập họ",
                  pattern: {
                    value: /^[A-Za-z]{1,20}$/,
                    message:
                      "Họ chỉ có thể chứa 1-20 ký tự là chữ",
                  },
                })}
              />
              <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
                <FaUser />
              </div>
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-sm ml-2">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <p className="text-base ml-2 font-bold mb-1 mt-2">Email</p>
        <div className="relative">
          <input
            placeholder="Email"
            type="email"
            className="w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full "
            {...register("email", {
              required: "Vui lòng nhập vào email của bạn",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email không đúng",
              },
            })}
          />
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FaEnvelope />
          </div>
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm ml-2">{errors.email.message}</p>
        )}
        <p className="text-base ml-2 font-bold mb-1 mt-2">Password</p>
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full "
            {...register("password", {
              required: "Vui lòng nhập vào mật khẩu",
              minLength: {
                value: 6,
                message: "Mật khẩu cần phải lớn hơn 6 kí tự",
              },
            })}
          />
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FaKey />
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm ml-2">{errors.password.message}</p>
        )}
        <p className="text-base ml-2 font-bold mb-1 mt-2">Password Confirm</p>
        <div className="relative">
          <input
            type="password"
            placeholder="Xác nhận mật khẩu của bạn"
            className="w-full bg-[#F1EFF1] outline-none px-12 border-[1px] border-[#F1EFF1] font-semibold py-3 rounded-full "
            {...register("passwordConfirm", {
              required: "Hãy xác nhận mật khẩu của bạn ",
              validate: (value) =>
                value === password || "Mật khẩu không trùng khớp",
            })}
          />
          <div className="absolute top-[50%] translate-y-[-55%] left-[20px]  text-lg text-[#9CA3AF]">
            <FaKey />
          </div>
        </div>
        {errors.passwordConfirm && (
          <p className="text-red-500 text-sm ml-2">
            {errors.passwordConfirm.message}
          </p>
        )}
        <button
          type="submit"
          onClick={() => handleRegister()}
          className={` mt-[15px] block select-none cursor-pointer transition-all  mx-auto text-center bg-primary-color w-[150px] px-6 py-3 rounded-full text-white text-lg font-semibold ${
            loading ? "opacity-70" : "hover:opacity-80"
          }`}
        >
          {loading ? <div>{<FaCircleNotch />}</div> : <p>Register</p>}
        </button>
      </form>
    </div>
  );
}
