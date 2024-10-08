"use client"

import Calculator from "@/app/(withClientLayout)/(client)/client/pdf/_components/Calculator";




export default function Pdf() {
  return (
    <div className="min-h-screen lg:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Pet Nutrition Calculator</h1>
      <Calculator />
    </div>
  );
}
