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
import { Edit, X } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import Image from "next/image";
import { useGetPost, useUpdatePost } from "@/hooks/post.hook";

import { Spinner } from "@nextui-org/spinner";
import PetSelect from "@/components/form/PetSelect";
import PetInput from "@/components/form/PetInput";

const EditPostModal = ({ postId }: { postId: string }) => {
  const { mutate: handleUpdatePost, isPending: updatePending } =
    useUpdatePost();
  const { data: postData } = useGetPost(postId);

  const [content, setContent] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   console.log(data);
    
  //   // const updatePostData = {
  //   //   ...data,
  //   //   content,
  //   //   thumbnail: selectedProfilePicture
  //   //     ? await uploadImageToFirebase(selectedProfilePicture)
  //   //     : postData?.data?.thumbnail,
  //   // };


  //   // await handleUpdatePost({ postId, userData: updatePostData });

  //   const formData= new FormData
  //   const updatePostData = {
  //     ...data,
  //     content,
   
  //   };
  //   formData.append("data", JSON.stringify(updatePostData));
  //   images.forEach((image) => {
  //     formData.append(`images`, image);
  //   });

  //   await handleUpdatePost({formData, postId,});

  //   if (!updatePending) {
  //     reset();
  //     setPreviewUrl(null);
  //     setContent("");
  //     onOpenChange();
  //   }
  // };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    
    // Prepare form data
    const formData = new FormData();
  
    // If there's no new content provided, fallback to the previous content
    const updatePostData = {
      ...data,
      content: content || postData?.data?.content, // Use previous content if no new content is provided
    };
  
    // Append other form data
    formData.append("data", JSON.stringify(updatePostData));
  
    // Append images if any
    images.forEach((image) => {
      formData.append(`images`, image);
    });
  
    // Call the update post function
    await handleUpdatePost({ formData, postId });
  
    // Reset form state if not pending
    if (!updatePending) {
      reset();
      setPreviewUrl(null);
      setContent(""); // Clear content state
      onOpenChange(); // Close the modal
    }
  };
  

  return (
    <>
      <Button
        isIconOnly
        startContent={<Edit className="w-5" />}
        onPress={onOpen}
      ></Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex justify-between items-center">
                Modal Title
              </ModalHeader>
              <ModalBody className="overflow-y-auto max-h-[600px]">
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <PetSelect
                        label="Category"
                        name="category"
                        options={[
                          { key: "Tip", label: "Tip" },
                          { key: "Story", label: "Story" },
                        ]}
                        defaultValue={postData?.data?.category}
                      />
                    </div>
                    <div className="space-y-2">
                      <PetInput
                        type="text"
                        placeholder="Enter you title"
                        label="Title"
                        defaultValue={postData?.data?.title}
                        name="title"
                      />
                    </div>
                    <div>
                    {imagePreviews.length > 0 && (
  <div className="mt-4 flex flex-wrap gap-4">
    {imagePreviews.map((preview, index) => (
      <div key={index} className="relative w-32 h-32">
        <span
          onClick={() => removeImage(index)} // Pass index to remove specific image
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 cursor-pointer hover:bg-red-400 hover:scale-110 z-50"
        >
          <X size={20} />
        </span>
        <div className="relative w-full h-full">
          <Image
            src={preview}
            alt={`Image preview ${index + 1}`}
            fill
            style={{ objectFit: "cover" }} // Ensures image fits properly
            className="rounded-md"
          />
        </div>
      </div>
    ))}
  </div>
)}
                      <div className="space-y-2">
                        <label
                          className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                          htmlFor="image"
                        >
                          Upload Image
                        </label>

                        <input
                          className="hidden"
                          id="image"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          ref={fileInputRef}
                        />
                      </div>
                    </div>
                    <div>
                      <ReactQuillEditor
                        toolbarId="editor-toolbar"
                        value={!content ? postData?.data?.content : content}
                        setValue={setContent}
                        defaultValue={postData?.data?.content}
                      />
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primaryLight"
                      type="submit"
                    >
                      {updatePending ? <Spinner /> : "Update Post"}
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

export default EditPostModal;
