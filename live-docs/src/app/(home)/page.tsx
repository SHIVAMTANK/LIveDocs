"use client";

import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { usePaginatedQuery } from "convex/react";
import { api } from '../../../convex/_generated/api';

import { DocumentTable } from "./documents-table";
import { useSearchParam } from "@/hooks/use-search-param";

export default function Home() {
  const [search] = useSearchParam("search");
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 }
  );

  return (
    <div className="flex flex-col  min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 h-14 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        {
          <DocumentTable
            documents={results}
            loadMore={loadMore}
            status={status}
          />
        }
      </div>
    </div>
  );
}
