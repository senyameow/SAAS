import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="pb-12 pt-28 sm:pt-40 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="max-w-fit mx-auto flex flex-col mb-12 items-center justify-center ">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold border max-w-2xl mb-6">Chat with your <span className="text-blue-600">documents </span>in seconds</h1>
          <p className="text-neutral-400 text-md max-w-xl">senya allows you to have conversation with your PDF document. Simply upload your document and start asking the questions right away </p>
          <Link href={'/dashboard'} className="px-6 mt-4">
            <Button>
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>


        </div>
        <div className="fixed h-16 border border-black top-0 w-full px-12 py-2 flex justify-between items-center">
          <div>
            SenyameowDance
          </div>
          <div className="flex items-center gap-4">
            <Button variant={'ghost'}>Price</Button>
            <Button variant={'ghost'}>Sign In</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="relative">
        <div aria-hidden='true' className="absolute  border isolate inset-x-0 -top-30 -z-10 opacity-70 h-16 transition blur-2xl sm:-top-80">
          <div style={{ clipPath: `polygon(24.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 55.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 70.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)` }} className="relative opacity-50 w-[45rem] left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)] -translate-x-1/2 -rotate-[20deg] aspect-[1200/700] bg-gradient-to-tr from-[#9180Fc] to-[#FF9151]" />
        </div>
      </div>
    </>
  )
}
