import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Navbar } from "./navbar";

export default function Home() {
  return(
    <div className="flex flex-col  min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 h-15 bg-white">
        <Navbar />
      </div>
      <div className="mt-16">
      Click <Link href="document/123">
      <span className="text-blue-500 underline">&nbsp;here&nbsp;</span>

      </Link>to go to document id
      </div>
    </div>
  )
}         
