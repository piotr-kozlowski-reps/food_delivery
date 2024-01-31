import React, { useState } from "react";
import styles from "../../utils/style";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "@/src/graphql/actions/register.action";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long!"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8characters long!"),
  phone_number: z
    .number()
    .min(10, "Phone number must be at least 11 characters!"),
});
type SignupSchema = z.infer<typeof formSchema>;

const Signup = ({
  setActiveState,
}: {
  setActiveState: (e: string) => void;
}) => {
  const [registerUserMutation, { loading, error, data }] =
    useMutation(REGISTER_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupSchema>({
    resolver: zodResolver(formSchema),
  });

  const [show, setShow] = useState(false);

  const onSubmit = async (data: SignupSchema) => {
    try {
      const response = await registerUserMutation({
        variables: data,
      });

      localStorage.setItem(
        "activation_token",
        response.data.register.activation_token
      );
      toast.success("Please check your email to activate your account!");
      reset();
      setActiveState("Verification");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Signup with Becodemy</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative w-full mb-3">
          <label className={`${styles.label}`}>Enter your Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="johndoe**"
            className={`${styles.input}`}
          />
        </div>
        <label className={`${styles.label}`}>Enter your Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="loginmail@gmail.com"
          className={`${styles.input}`}
        />
        {errors.email && (
          <span className="block mt-1 text-red-500">
            {`${errors.email.message}`}
          </span>
        )}
        <div className="relative w-full mt-3">
          <label className={`${styles.label}`}>Enter your Phone Number</label>
          <input
            {...register("phone_number", { valueAsNumber: true })}
            type="number"
            placeholder="+8801*******"
            className={`${styles.input}`}
          />
          {errors.phone_number && (
            <span className="block mt-1 text-red-500">
              {`${errors.phone_number.message}`}
            </span>
          )}
        </div>
        <div className="relative w-full mt-5 mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password
          </label>
          <input
            {...register("password")}
            type={!show ? "password" : "text"}
            placeholder="password!@%"
            className={`${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute cursor-pointer bottom-3 right-2 z-1"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute cursor-pointer bottom-3 right-2 z-1"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && (
          <span className="text-red-500">{`${errors.password.message}`}</span>
        )}
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Signup"
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3`}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[16px] text-white">
          Or join with
        </h5>
        <div
          className="flex items-center justify-center my-3"
          // onClick={() => signIn()}
        >
          <FcGoogle size={30} className="mr-2 cursor-pointer" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Already have an account?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setActiveState("Login")}
          >
            Login
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default Signup;
