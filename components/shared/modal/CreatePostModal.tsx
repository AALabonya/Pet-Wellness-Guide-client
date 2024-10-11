"use client";
import dynamic from "next/dynamic";

// Dynamically import ReactQuillEditor with SSR disabled
const ReactQuillEditor = dynamic(
  () => import("@/components/shared/ReactQuill/ReactQuillEditor"),
  {
    ssr: false,
  }
);
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { BadgeCheck, LucideImage, LucidePen, LucideSmile, Pen, Plus, X } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Image from "next/image";
import { usePost } from "@/hooks/post.hook";
import { Spinner } from "@nextui-org/spinner";
import PetSelect from "@/components/form/PetSelect";
import PetInput from "@/components/form/PetInput";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Textarea } from "@nextui-org/input";

const CreatePostModal = ({
  userId,
  premiumMember,
}: {
  userId: string | undefined;
  premiumMember: boolean | undefined;
}) => {
  const { mutate: handlePost, isPending, isSuccess } = usePost();

  const [content, setContent] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isImageUploading, setIsImageUploading] = useState(false);
const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<File | null>(null);

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  //   image handle
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //   // Handle file selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (files.length > 0) {
      setImages((prev) => [...prev, ...files]);

      const newPreviews = files.map((file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        return new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
        });
      });

      Promise.all(newPreviews).then((previews) => {
        setImagePreviews((prev) => [...prev, ...previews]);
      });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
 
    const formData= new FormData
    const postData = {
      ...data,
      isPremium:
        data.isPremium === "true"
          ? true
          : data.isPremium === "false"
            ? false
            : false,
      content,
      userId,
    };
    formData.append("data", JSON.stringify(postData));
    images.forEach((image) => {
      formData.append(`images`, image);
    });
    await handlePost(formData);
  

    if (!isPending) {
      reset();
      setPreviewUrl(null);
      setContent("");
      onOpenChange();
    }
  };

  return (
    <>

     <Card className="mb-4 w-full" radius="sm">
      <CardHeader className="flex items-center p-2">
        <Pen className="text-blue-500 mr-3" />
        <h2 className="text-lg font-semibold">Create Post</h2>
      </CardHeader>
      <CardBody className="">
        <Textarea
          readOnly
          color="primary"
          placeholder="What's on your mind?"
          variant="bordered"
         
        />
        <div className="flex justify-between mt-4">
          <Button
            startContent={
              <LucideImage className="mr-2 text-green-500" size={20} />
            }
            variant="light"
     
          >
            <span className=" hidden lg:block">Photo/Video</span>
          </Button>
          <Button
            startContent={
              <LucideSmile className="mr-2 text-orange-500" size={20} />
            }
            variant="light"
     
          >
            <span className=" hidden lg:block">Feeling/Activity</span>
          </Button>
          <Button
        startContent={<Plus />}
        onPress={onOpen}
       color="primary"
      > 
        {/* <span>Write pets tips and stories!</span> */}
      </Button>
        </div>
      </CardBody>
    </Card>
    
   
      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex justify-center items-center">
                Create Pet Care Tips and Stories Post
              </ModalHeader>
              <ModalBody className="overflow-y-auto max-h-[600px]">
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <PetSelect
                          label="Category"
                          name="category"
                          options={[
                            { key: "Tip", label: "Tip" },
                            { key: "Story", label: "Story" },
                          ]}
                        />
                      </div>
                      {premiumMember && (
                        <div className="space-y-2">
                          <PetSelect
                            label="Premium Status"
                            name="isPremium"
                            options={[
                              { key: "true", label: "Premium" },
                              { key: "false", label: "Regular" },
                            ]}
                          />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <PetInput
                        type="text"
                        placeholder="Enter you title"
                        label="Title"
                        name="title"
                      />
                    </div>
                    <div>
                    {imagePreviews.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-4">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative w-32 h-24 mb-1">
                              <span
                                onClick={() => removeImage(index)}
                                className="hover:bg-red-400 cursor-pointer hover:scale-110 absolute z-50 top-1 right-1 bg-red-500 rounded-full text-white p-1"
                              >
                                <X size={20} />
                              </span>
                              <Image
                                src={preview}
                                alt={`Image preview ${index + 1}`}
                                fill
                                style={{ objectFit: "cover" }}
                                className="rounded-md"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="">
                        <label
                          className="flex h-10 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                          htmlFor="image"
                        >
                          Upload Image
                        </label>

                        <input
                          className="hidden"
                          id="image"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          ref={fileInputRef}
                        />
                      </div>
                    </div>
                    <div>
                      <ReactQuillEditor
                        toolbarId="editor-toolbar"
                        value={content}
                        setValue={setContent}
                      />
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primaryLight"
                      type="submit"
                    >
                      {isImageUploading || isPending ? <Spinner /> : "Post Now"}
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

export default CreatePostModal;
