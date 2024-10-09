"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import Logo from "@/components/shared/Logo";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { useLogin } from "@/hooks/auth.hook";
import { Spinner } from "@nextui-org/spinner";
import { useUser } from "@/context/user.provider";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import ForgetPassword from "@/components/shared/modal/ForgetPassword";
import { Player } from '@lottiefiles/react-lottie-player';
import logo from "@/public/logo1.json";
import PetInput from "@/components/form/PetInput";
const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { setLoading } = useUser();
  const { mutate: handleLogin, isPending, isSuccess } = useLogin();
  const methods = useForm();

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await handleLogin(data);
    setLoading(true);
    reset();
  };

  if (!isPending && isSuccess) {
    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-center mb-8">
            <Player
        autoplay
        loop
        src={logo}
        className="w-[130px] z-10"
      />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6 uppercase">
              Welcome Pet Care!
            </h2>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <PetInput
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    label="Email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <PetInput
                    label="Password"
                    name="password"
                    type="password"
                    required
                  />
                    <div className="mt-4 text-center">
             <ForgetPassword />
            </div>
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primaryLight"
                  type="submit"
                >
                  {isPending ? <Spinner /> : "Login"}
                </Button>
              </form>
            </FormProvider>
          
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Do not have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
