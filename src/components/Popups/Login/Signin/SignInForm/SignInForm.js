import { Button } from "../../../../../components/ui/button";
import { Checkbox } from "../../../../../components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { useAuth } from "../../../../../Providers/AuthProvider/AuthProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOff,IoEye } from "react-icons/io5";
import { z } from "zod"; // Still needed for schema validation
import { zodResolver } from "@hookform/resolvers/zod";
import {UserActivityLog} from "../../../../Common/UserActivityLog";
import { useTheme } from '../../../../Layout/ThemeContext/ThemeContext'; // Import the theme context

const formSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(8, "password must be at least 8 characters"),
});

export default function SignInForm({ onForgotPasswordClick, onSignupClick, onClose }) {
  const [isPassword, setIsPassword] = useState(false);
  const { setRole } = useAuth();
  const {profiledetails , setprofiledetails} = useAuth()
  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async(values) => {
    
    console.log(values);
    try {
    const signupObj ={
      username:values.username,
      password:values.password
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}/Registration/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupObj),
    });
    const data = await response.json();
    if(data.success){
      //console.log(data)
      UserActivityLog(data.data, "Logged in")
      setprofiledetails(data.data);
      //setRole("admin");
      setRole(data.data.role);
      localStorage.setItem("AldaleelaRole", data.data.role);
      localStorage.setItem("AldaleelaUserDetails:",JSON.stringify(data.data))
      //setRole("user");
      onClose();
    }      
    else{
      console.log(data.message)
    }
  }catch (error) {
    console.error('Error submitting form:', error);
  }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Enter Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder= {isLangArab ?"أدخل اسم المستخدم":"Enter Username"}
                    type="text"
                    {...field}
                    className={`${
                      isDarkMode
              ? "bg-[#FFFFFF] bg-opacity-30 text-white border-transparent placeholder:text-[#FFFFFF]"
              : "bg-white text-black border-gray-300 placeholder:text-black"
          } h-12 shadow-none border-none outline-none rounded-lg placeholder:font-light placeholder:text-[14px] placeholder:tracking-wide`}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Enter Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder={isLangArab?"أدخل كلمة المرور":"Enter Password"}
                    type={isPassword ? "text" : "password"}
                    {...field}
                    className={`${
                      isDarkMode
              ? "bg-[#FFFFFF] bg-opacity-30 text-white border-transparent placeholder:text-[#FFFFFF]"
              : "bg-white text-black border-gray-300 placeholder:text-black"
          } h-12 shadow-none border-none outline-none rounded-lg placeholder:font-[300] placeholder:text-[14px] placeholder:tracking-wide`}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPassword(!isPassword)}
                    className="absolute right-3 top-3"
                  >
                    {isPassword?<IoEye className={`text-2xl ${
                        isDarkMode ? "text-[#FFFFFF]" : "text-black"
                      } opacity-50`} />:<IoEyeOff className={`text-2xl ${
                        isDarkMode ? "text-[#FFFFFF]" : "text-black"
                      } opacity-50`} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forget Password & Stay logged in */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Checkbox className={`${isDarkMode ? "bg-gray-400 border-gray-700" : "bg-white"}`} />
            <Label className={`text-${isDarkMode ? '[#FFFFFFCC]' : '[#000000CC]'} text-[14px] font-[400]`}>
              {form.formState.isValid ? "Remember me" : isLangArab ? "البقاء مسجلًا":"Stay logged in"}
            </Label>
          </div>

          <div
            onClick={onForgotPasswordClick}
            className={`${
              form.formState.isValid
                ? "text-[#196162] text-[14px] font-medium cursor-pointer"
                : isDarkMode
                ? "text-[#196162] text-[14px] font-medium cursor-pointer"
                : "text-[#004987] text-[14px] font-medium cursor-pointer"
            }`}
          >
            Forget Password?
          </div>
        </div>

        {/* SignIn Button */}
        <Button
          disabled={!form.formState.isValid}
          className={`w-full h-12 rounded-xl transition-all duration-200
            ${
              form.formState.isValid
                ? isDarkMode
                  ? "bg-gradient-to-r from-[#036068] via-[#596451] to-[#1199A8] text-white"
                  : "bg-gradient-to-r from-[#036068] via-[#596451] to-[#1199A8] text-white"
                : isDarkMode
                ? "bg-[white] bg-opacity-40 text-white"
                : "bg-[#636262]  text-white"
            }
          `}
        >
          Sign in
        </Button>
      </form>

      <div className={`flex justify-center items-center space-x-2 mt-12 text-${isDarkMode ? '[#FFFFFFCC]' : 'gray-600'}`}>
        Don't have an account?
        <div
          onClick={onSignupClick}
          className={`ml-2 ${
            isDarkMode ? "text-[#004987]" : "text-[#004987]"
          } underline cursor-pointer`}
        >
          Sign Up
        </div>
      </div>
    </Form>
  );
}
