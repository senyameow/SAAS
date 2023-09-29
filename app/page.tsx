import Heading from "@/components/Heading";
import ImageWithContainer from "@/components/ImageWithContainer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Step from "@/components/Step";
import Gradient from "@/components/ui/Gradient";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="pb-0 pt-28 sm:pt-40 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className=" mx-auto flex flex-col mb-6 items-center justify-center ">
          <Heading title="Chat with Your documents in seconds" description="senya allows you to have conversation with your PDF document. Simply upload your document and start asking the questions right away" />
          <Link href={'/dashboard'} className="px-6 mt-4">
            <Button>
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>


        </div>
        <Navbar />
      </MaxWidthWrapper>

      <Gradient />
      <div className="mx-auto max-w-6xl px-6">
        <ImageWithContainer src='/dashboard-preview.jpg' alt="product preview" width={1300} height={700} />
      </div>
      <Gradient rotate="5deg" right />
      <div className="mt-22 sm:mt-32 ">
        <MaxWidthWrapper className="max-w-4xl pb-6 sm:pb-12">
          <div className="mx-auto flex flex-col gap-4 items-center text-center justify-center">
            <Heading title="start conversation within a minute" classNameTitle="text-3xl md:text-4xl xl:text-5xl max-w-4xl" description="Chatting with Your pdfs has never been that easy" classNameDescr="pb-8 sm:pb-16" />
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              <Step number={1} title="Sign up your account" description="Start your journey with our free plan or upgrade to" link="pro plan" href="/pro" />
              <Step number={2} title="Sign up your account" description="Start your journey with our free plan or upgrade to" link="pro plan" href="/pro" />
              <Step number={3} title="Sign up your account" description="Start your journey with our free plan or upgrade to" link="pro plan" href="/pro" />
            </div>
          </div>
          <ImageWithContainer src='/dashboard-preview.jpg' alt="product preview" width={1300} height={700} imageclassName="p-0" />
        </MaxWidthWrapper>
      </div>
    </>
  )
}
