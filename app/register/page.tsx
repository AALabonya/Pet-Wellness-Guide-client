"use client";


import { useRegistration } from "@/hooks/auth.hook";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";
import { Player } from '@lottiefiles/react-lottie-player';
import logo from "@/public/logo1.json";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import PetInput from "@/components/form/PetInput";
import PetTextarea from "@/components/form/PetTextarea";
import PetSelect from "@/components/form/PetSelect";

const genderOptions = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
  { key: "other", label: "Other" },
];

const Register = () => {
  const { mutate: handleRegister, isPending } = useRegistration();
  const router = useRouter();
  const methods = useForm({});
  const { handleSubmit, reset } = methods;
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    const profilePicture = fileInputRef.current?.files?.[0];
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    await handleRegister(formData);
    reset();
    setPreviewUrl(null);
    router.push("/login");
  };

  return (
    <>
      {isPending && (
        <div className="bg-black/10 h-screen flex items-center justify-center fixed inset-0 z-[999] backdrop-blur-md">
          <Spinner size="lg" color="primary" />
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="flex items-center justify-center mb-6">
            <Player
              autoplay
              loop
              src={logo}
              className="w-[130px] z-10"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Create Your Account
          </h2>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PetInput
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  required
                />
                <PetInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
                <PetInput
                  label="Password"
                  name="password"
                  type="password"
                  required
                />
                <PetInput
                  placeholder="+1 (555) 000-0000"
                  label="Phone Number"
                  name="phone"
                  required
                />
                <PetTextarea
                  label="Address"
                  placeholder="Enter your address"
                  name="address"
                  required
                 
                />
                <PetSelect
                  label="Gender"
                  name="gender"
                  options={genderOptions}
               
                />
                <div className="md:col-span-2">
                  <label
                    className="block cursor-pointer bg-gray-100 hover:bg-gray-200 text-center py-2 rounded-lg border border-gray-300"
                    htmlFor="image"
                  >
                    Upload Image
                  </label>
                  <input
                    className="hidden"
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </div>
              </div>
              {previewUrl && (
                <div className="mt-4 flex justify-end relative">
                  <span
                    onClick={handleRemoveImage}
                    className="hover:bg-red-500 cursor-pointer hover:scale-110 absolute z-50 top-2 right-2 bg-red-600 rounded-full text-white p-1 transition duration-200"
                  >
                    <X size={20} />
                  </span>
                  <div className="relative w-32 h-32">
                    <Image
                      src={previewUrl}
                      alt="Profile picture preview"
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                    />
                  </div>
                </div>
              )}
              <Button
                className="w-full bg-primary hover:bg-primaryLight mt-6 text-white"
                type="submit"
              >
                {isPending ? <Spinner size="sm" /> : "Register"}
              </Button>
            </form>
          </FormProvider>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
