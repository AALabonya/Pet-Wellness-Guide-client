"use client"
import Calculator from "./_components/Calculator";


export default function Dashboard() {
  return (
    <div className="min-h-screen lg:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Pet Nutrition Calculator</h1>
     <Calculator/>
    </div>
  );
}
