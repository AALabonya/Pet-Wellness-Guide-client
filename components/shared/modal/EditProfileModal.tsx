/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import dynamic from "next/dynamic";

// Dynamically import ReactQuillEditor with SSR disabled
const genderOptions = [
  {
    key: "male",
    label: "Male",
  },
  {
    key: "female",
    label: "Female",
  },
  {
    key: "other",
    label: "Other",
  },
];
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Edit, Plus, X } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Image from "next/image";
import { TUser } from "@/types";
import { useUpdateProfile } from "@/hooks/auth.hook";
import { Spinner } from "@nextui-org/spinner";
import PetInput from "@/components/form/PetInput";
import PetTextarea from "@/components/form/PetTextarea";
import PetSelect from "@/components/form/PetSelect";

const EditProfileModal = ({ userData }: { userData: TUser }) => {
  const { name, address, gender, email, profilePicture, phone } = userData;
  const { mutate: updateProfile, isPending, isSuccess } = useUpdateProfile();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const methods = useForm({});
  const { handleSubmit, reset } = methods;
  const [isImageUploading, setIsImageUploading] = useState(false);

  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewUrl(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);

  //     setSelectedProfilePicture(file);
  //   }
  // };

  // const uploadImageToFirebase = async (
  //   imageFile: File
  // ): Promise<string | null | undefined> => {
  //   const storageRef = ref(storage, `images/${imageFile.name}`);

  //   setIsImageUploading(true);

  //   try {
  //     const snapshot = await uploadBytes(storageRef, imageFile);
  //     const downloadUrl = await getDownloadURL(snapshot.ref);

  //     return downloadUrl;
  //   } catch (error) {
  //     console.log("Error uploading image", error);
  //     return null;
  //   } finally {
  //     setIsImageUploading(false);
  //   }
  // };

  // const handleRemoveImage = () => {
  //   setPreviewUrl(null);
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  // };

  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   const profilePhotos = selectedProfilePicture
  //     ? await uploadImageToFirebase(selectedProfilePicture)
  //     : null;
  //   const userData = {
  //     ...data,
  //     profilePicture: profilePhotos ? profilePhotos : profilePicture,
  //   };

  //   await updateProfile(userData);

  //   if (!isPending && isSuccess) {
  //     reset();
  //     setPreviewUrl(null);
  //     onOpenChange();
  //   }
  // };
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
console.log(file);

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

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     console.log(data,"dataaaaaaaaaaa");
    
//     const formData = new FormData();
    
//     // Convert the entire data object to JSON and append it as a string
//     formData.append("data", JSON.stringify(data));
  
//     const profilePicture = fileInputRef.current?.files?.[0];
//     if (profilePicture) {
//       formData.append("profilePicture", profilePicture);
//     }
  
//     // Send the formData to the backend
//     await updateProfile(formData);
  
//       if (!isPending && isSuccess) {
//       reset();
//       setPreviewUrl(null);
//       onOpenChange();
//   }
// }
const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  // Get the email from the form (from hidden input or directly from userData)
  const email = data.email || userData.email;

  // Log the data to check for email
  console.log("Submitted data:", { ...data, email });

  const formData = new FormData();
  
  // Append JSON data
  formData.append("data", JSON.stringify({ ...data, email }));

  // Append the profile picture, if selected
  const profilePicture = fileInputRef.current?.files?.[0];
  if (profilePicture) {
    formData.append("profilePicture", profilePicture);
  }

  // Send the formData to the backend
  await updateProfile(formData);

  if (!isPending && isSuccess) {
    reset();
    setPreviewUrl(null);
    onOpenChange();
  }
};

  return (
    <>
      <Button
        startContent={<Edit />}
        onPress={onOpen}
        className="bg-gray-200 dark:bg-slate-950  px-3 text-left py-2 rounded-3xl flex-1 cursor-pointer"
      >
        Edit Profile
      </Button>
      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex justify-center items-center">
                Update User Profile
              </ModalHeader>
              <ModalBody className="overflow-y-auto max-h-[600px]">
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <PetInput
                          name={"name"}
                          label={"Name"}
                          placeholder="Enter your name"
                          defaultValue={name}
                          required
                        />
                      </div>
                      <div className="space-y-2">
  <PetInput
    label={"Email"}
    name="email"
    type="email"
    placeholder="your@email.com"
    defaultValue={email}
    isDisabled={true} // Keep it disabled for the UI
  />
  {/* Hidden input to submit the email */}
  <input type="hidden" name="email" value={email} />
</div>

                      <div className="space-y-2">
                        <PetInput
                          placeholder="+1 (555) 000-0000"
                          label={"Phone Number"}
                          name="phone"
                          defaultValue={phone}
                          required
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <PetTextarea
                          label={"Address"}
                          placeholder="Enter your address"
                          name="address"
                          defaultValue={address}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <PetSelect
                          label="Gender"
                          name="gender"
                          defaultValue={gender}
                          options={genderOptions}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                          htmlFor="image"
                        >
                          Upload Profile Picture
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
                    {(previewUrl || profilePicture) && (
                      <div className="mt-4 flex justify-end relative">
                        <span
                          onClick={handleRemoveImage}
                          className="hover:bg-red-400 cursor-pointer hover:scale-110 absolute z-50 top-2 right-2 bg-red-500 rounded-full text-white p-[1px]"
                        >
                          <X size={20} />
                        </span>
                        <div className="relative w-64 h-64">
                          <Image
                            src={previewUrl || profilePicture}
                            alt="Profile picture preview"
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-md"
                          />
                        </div>
                      </div>
                    )}
                    <Button
                      className="w-full bg-primary hover:bg-primaryLight mt-6"
                      type="submit"
                    >
                      {isPending || isImageUploading ? (
                        <Spinner />
                      ) : (
                        "Update Profile"
                      )}
                    </Button>
                  </form>
                </FormProvider>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
