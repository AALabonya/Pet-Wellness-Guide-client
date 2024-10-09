"use client";
import { usePayment } from "@/hooks/payment.hook";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import {
  BadgeCheck,
  BookOpenIcon,
  HeartIcon,
  IndianRupee,
  PawPrintIcon,
  Ticket,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function MonetizationModal({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const { mutate: createPayment, data, isSuccess, isPending } = usePayment();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handlePayment = async () => {
    await createPayment("1000");
  };

  if (data?.paymentSession?.payment_url) {
    router.push(data?.paymentSession?.payment_url);
  }

  return (
    <>
      <div className="bg-[#bc4124] grid grid-cols-1  shadow-lg text-white p-5 mt-4">
    <h1>Be A Premium Member Then Get Life Time Access </h1>
      <Button
        onPress={onOpen}
        className={`mt-2  ${className}`}
        endContent={<BadgeCheck />}
      >
       Unlock Premium Access
      </Button>
      </div>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
          <>
          <ModalHeader className="flex gap-2 justify-center px-16 pt-4 bg-gradient-to-r from-green-400 to-[#148d8c] text-white">
            <BadgeCheck className="h-5 w-5 text-[#bc4124]" />
            <h2 className="text-xl font-bold text-center">Unlock Premium Package</h2>
          </ModalHeader>
          <ModalBody className="bg-white p-6 rounded-lg shadow-md flex justify-center">
            <div className="grid grid-cols-1 gap-6 pb-2">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center text-gray-800">Benefits of Premium Membership:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex justify-center">
                    <PawPrintIcon className="mr-2 h-5 w-5 text-green-600" />
                    <span>Expert pet care advice tailored for you</span>
                  </li>
                  <li className="flex justify-center">
                    <HeartIcon className="mr-2 h-5 w-5 text-red-600" />
                    <span>Create and share premium pet stories with our community</span>
                  </li>
                  <li className="flex justify-center">
                    <BookOpenIcon className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Exclusive access to premium posts and resources</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center items-center space-y-4">
                <Button
                   endContent={<span>৳</span>}
                  className="w-full bg-[#148d8c] hover:bg-[#148d8c] text-white"
                  size="lg"
                  onClick={handlePayment}
                >
                  {isPending ? <Spinner /> : "Pay Now - 1000 BDT"}
                </Button>
             
              </div>
            </div>
          </ModalBody>
        </>
        
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
