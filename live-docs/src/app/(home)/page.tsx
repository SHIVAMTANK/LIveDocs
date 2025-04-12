"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { space } from "postcss/lib/list";
import { Span } from "next/dist/trace";
import { DocumentTable } from "./documents-table";

export default function Home() {
  const {results,status,loadMore} = usePaginatedQuery(api.documents.get,{},{initialNumItems:5});
 
  return(
    <div className="flex flex-col  min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 h-14 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
          <TemplatesGallery/>
        {
          <DocumentTable
            documents={results}
            loadMore={loadMore}
            status={status}
          />
        }
      </div>
    </div>
  )
}         

