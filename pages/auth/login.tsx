import PageWrapper from "@/components/PageWrapper";
import {
  EmailInputField,
  PasswordInputField,
} from "@/components/form/inputs/input";
import { FiAtSign, FiEye } from "react-icons/fi";

const Login = () => {
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
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-2 rounded-md my-2"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Login.PageWrapper = PageWrapper;

export default Login;
