import PageWrapper from "@/components/PageWrapper";
import {
  EmailInputField,
  PasswordInputField,
} from "@/components/form/inputs/input";
import { Button } from "@/components/ui";
import { FiAtSign } from "react-icons/fi";
import { BiLogoGoogle } from "react-icons/bi";
import Link from "next/link";

const Signup = () => {
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
          <form>
            <div className="space-y-6">
              <div className="space-y-4">
                <EmailInputField
                  label="Email address"
                  name="Email"
                  labelProps={{ htmlFor: "Email" }}
                  isFullwidth={true}
                  placeholder="Enter email address"
                  suffixIcon={<FiAtSign size={14} />}
                />

                <PasswordInputField
                  label="Password"
                  name="password"
                  labelProps={{ htmlFor: "password" }}
                  isFullwidth={true}
                  placeholder="Password"
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
          <p className="text-center text-[#0069ff] mt-3">
            Already have an account? <Link href="/auth/login">Login</Link>
          </p>
        </div>
        <div>
          <Button type="button" prefixIcon={<BiLogoGoogle size={20} />}>
            Sign up with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

Signup.PageWrapper = PageWrapper;

export default Signup;
