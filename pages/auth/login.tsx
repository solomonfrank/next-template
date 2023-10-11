import PageWrapper from "@/components/PageWrapper";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  EmailInputField,
  PasswordInputField,
} from "@/components/form/inputs/input";
import { Button } from "@/components/ui";
import { FiAtSign } from "react-icons/fi";
import { BiLogoGoogle } from "react-icons/bi";
import Link from "next/link";
import { loginScheme } from "@/utils/schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

type FormValue = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [response, setResponse] = useState("");
  const [errorEesponse, setErrorResponse] = useState("");
  const methods = useForm<FormValue>({
    resolver: zodResolver(loginScheme),
    mode: "onChange",
  });

  const { register, handleSubmit } = methods;

  const onSubmit = async (data: FormValue) => {
    const response = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "",
    });

    if (!response) {
      setErrorResponse("Internal Server error");
    }
    if (!response?.error) {
      return router.push("/");
    }

    if (response?.error) {
      setErrorResponse(response.error);
    }

    console.log("usesss", response);
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
          Login
        </h3>
        <div className="mb-5">
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
                    name="email"
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
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>

          <p className="text-center text-[#0069ff] mt-3">
            Dont have an account? <Link href="/signup">Signup</Link>
          </p>
        </div>
        <div>
          <Button type="button" prefixIcon={<BiLogoGoogle size={20} />}>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

Login.PageWrapper = PageWrapper;

export default Login;
