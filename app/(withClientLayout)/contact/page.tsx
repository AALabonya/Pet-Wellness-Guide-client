"use client";
import PWInput from "@/components/form/PWInput";
import PWTextarea from "@/components/form/PWTextarea";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const Contact = () => {
  const methods = useForm();

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-background to-muted">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-center items-center mb-10 gap-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
            Contact Us
          </h2>
          <p className="max-w-2xl text-center">
            Have a question or need help with your rental? We are here to help!
            Fill out the form below and we will get back to you as soon as
            possible.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <Card className="md:order-2">
            <CardHeader>
              <h1 className="text-lg font-bold">Contact Information</h1>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin />
                  <p>1234 Your Street, City, Country</p> {/* Changed location data */}
                </div>
                <div className="flex items-center space-x-2">
                  <Mail />
                  <p>info@example.com</p> {/* Changed email address */}
                </div>
                <div className="flex items-center space-x-2">
                  <Phone />
                  <p>(123) 456-7890</p>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Google Maps Embed */}
          <div className="md:order-1">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509835!2d144.95373531568302!3d-37.81720997975147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f6a2f99%3A0x2b49d9a8e0fc76d4!2sYour%20Location%20Name!5e0!3m2!1sen!2sbd!4v1694820431648!5m2!1sen!2sbd"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="mt-10">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <PWInput name="name" label="Your Name" required />
              <PWInput name="email" label="Your Email" type="email" required />
              <PWTextarea name="message" label="Your Message" required />
              <Button
                type="submit"
         
                className="w-full"
                style={{ backgroundColor: "#148d8c" }} // Submit button color
              >
                Send Message
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Contact;
