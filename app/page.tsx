import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Gradient from "@/components/ui/Gradient";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="pb-12 pt-28 sm:pt-40 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className=" mx-auto flex flex-col mb-6 items-center justify-center ">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold max-w-2xl mb-6">Chat with your <span className="text-blue-600">documents </span>in seconds</h1>
          <p className="text-neutral-400 text-sm sm:text-[15px] max-w-xl">senya allows you to have conversation with your PDF document. Simply upload your document and start asking the questions right away </p>
          <Link href={'/dashboard'} className="px-6 mt-4">
            <Button>
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>


        </div>
        <Navbar />
      </MaxWidthWrapper>
      <Gradient />
    </>
  )
}
