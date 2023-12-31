import PageWrapper from "@/components/PageWrapper";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import {
  EmailInputField,
  PasswordInputField,
} from "@/components/form/inputs/input";
import { Button } from "@/components/ui";
import { FiAtSign } from "react-icons/fi";
import { BiLogoGoogle } from "react-icons/bi";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { signupSchema } from "@/utils/schema";
import { FetchError, fetchJSON } from "@/libs/fetchJson";

type FormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const [response, setResponse] = useState("");
  const [errorEesponse, setErrorResponse] = useState("");
  const methods = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });
  signupSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetchJSON<{ message: string }>(
        "/api/auth/signup",
        {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(response?.message);
    } catch (ex) {
      if (ex instanceof FetchError) {
        setErrorResponse(ex.message);
        //  methods.setError("email", { message: ex.message });
        return;
      }

      setErrorResponse("Something went wrong");
    }
  };
  return (
    <div className="bg-[#eeee] min-h-screen flex flex-col justify-center items-center ">
      <div className="bg-[#fff] mx-2 px-6 py-10 rounded border-[#D1D5DB] border w-1/3  ">
        <h3
          className="text-xl mb-2 text-center block relative before:content-[''] 
        before:w-[180px] before:h-px before:bg-slate-200 before:absolute before:top-1/2 before:left-0
        after:content-[''] after:absolute after:w-[180px] after:right-0 after:top-1/2 after:h-px after:bg-slate-200
        "
        >
          Signup
        </h3>
        <div className="mb-5">
          {response && (
            <div className="bg-green-500 py-2 text-center block w-full">
              {response}
            </div>
          )}
          {errorEesponse && (
            <div className="bg-white border rounded-md border-red-700 text-red-700 py-1 mb-2 text-center block w-full">
              {errorEesponse}
            </div>
          )}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div className="space-y-4">
                  <EmailInputField
                    label="Email address"
                    labelProps={{ htmlFor: "Email" }}
                    isFullwidth={true}
                    placeholder="Enter email address"
                    suffixIcon={<FiAtSign size={14} />}
                    {...register("email")}
                  />

                  <PasswordInputField
                    label="Password"
                    labelProps={{ htmlFor: "password" }}
                    isFullwidth={true}
                    placeholder="Password"
                    {...register("password")}
                    name="password"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-[#0069ff] text-white p-2 rounded-md my-2"
                  >
                    Signup
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>

          <p className="text-center text-[#0069ff] mt-3">
            Already have an account? <Link href="/auth/login">Login</Link>
          </p>
        </div>
        <div className="w-full">
          <Button
            className="w-full"
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              await signIn("google", { callbackUrl: "" });
            }}
            prefixIcon={<BiLogoGoogle size={20} />}
          >
            Sign up with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

Signup.PageWrapper = PageWrapper;

export default Signup;
