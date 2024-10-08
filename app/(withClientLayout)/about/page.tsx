import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutUs() {
  const milestones = [
    { year: "2015", event: "Founded PetCare with a mission to provide reliable tips and resources for pet owners." },
    { year: "2017", event: "Launched our online community, bringing pet owners together to share stories and advice." },
    { year: "2019", event: "Introduced our blog section, featuring articles from pet care experts and veterinarians." },
    { year: "2021", event: "Expanded our content to include video tutorials and webinars for pet training and care." },
    { year: "2023", event: "Celebrated 100,000 community members and released our first pet care e-book." },
    { year: "2024", event: "Launched a mobile app to provide easy access to pet care tips and resources on the go." },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-cover bg-center h-64" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1496284427489-f59461d8a8e6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white mb-2">About Us</h1>
          <div className="flex">
            <Link href="/" className="text-white mr-2">Home</Link>
            <span className="text-white">/</span>
            <Link href="/about-us" className="text-white ml-2">About Us</Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex gap-5'>
        <div className="flex w-full grow bg-slate-50 py-3 w-[50%]">
          <div className="w-full gap-1 overflow-hidden bg-slate-50 grid grid-cols-[2fr_1fr_1fr]">
            <div
              className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none row-span-2"
              style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/stability/b96711a9-3db5-40ba-a766-3ac448d7d2a9.png")' }}
            ></div>
            <div
              className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none col-span-2"
              style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/stability/b5d97cb2-ee2d-4f6a-b83a-3b5a607175bf.png")' }}
            ></div>
            <div
              className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none"
              style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/stability/9b80eec9-2e47-4ae1-a17a-7e04ba44ca6b.png")' }}
            ></div>
            <div
              className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none"
              style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/c43ef902-e39b-447e-864d-77e01cc4dca5.png")' }}
            ></div>
          </div>
        </div>
        <div className='w-1/2 lg:pt-28'>
          At PetCare, we are committed to enhancing the relationship between pet owners and their beloved pets. Founded in 2015, our mission is to provide trusted pet care advice, helpful resources, and engaging stories that cater to every pet lovers needs. From expert articles to community tips, we have grown into a platform with 100,000+ members, offering everything from training guides to health tips. Our dedicated team works tirelessly to ensure you have the most accurate information, whether you are a seasoned pet parent or just getting started.

          Join us in nurturing happy, healthy pets!
        </div>
      </div>
{/* Mission Section */}
<div className="bg-gray-100 py-8 mt-8 px-8">
  <div className="flex">
    <div className="flex-1 bg-white ml-4 p-6 rounded-md lg:pt-32">
      <h4 className="text-2xl font-bold">Our Mission at PetCare</h4>
      <p className="mt-2">At PetCare, our mission is to enhance the bond between pets and their owners by providing trusted advice, heartwarming stories, and a supportive community.</p>
      <Link href="/about">
        <button className="bg-[#148d8c] text-white px-4 py-2 rounded mt-4">Learn More</button>
      </Link>
    </div>
    <div className="flex-1">
      <Image
        src="https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Mission"
        className="rounded-lg"
        layout="responsive"
        width={1740}
        height={1160}
        quality={80}
      />
    </div>
  </div>
</div>

{/* History Section */}
<h2 className="text-4xl font-bold mb-8 text-center">Our History &amp; Milestones</h2>
<div className="flex justify-center mb-6">
  <div className="relative space-y-4">
    {milestones.map((milestone, index) => (
      <div key={index} className="flex items-start mb-4">
        <span className="font-bold text-lg text-gray-600 w-16">{milestone.year}</span>
        <div className="ml-4">
          <div className="flex items-center mb-1">
            <span className="bg-[#148d8c] text-white rounded-full w-8 h-8 flex items-center justify-center mr-2"></span>
            <p className="text-lg">{milestone.event}</p>
          </div>
          {index < milestones.length - 1 && (
            <div className="absolute left-6 top-4 w-1 h-full bg-gray-300"></div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
