import { preloadQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";
import { api } from "../../../../convex/_generated/api";

export interface DocumentPageProps {
  params?: Promise<{ documentid: Id<"documents"> }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const resolvedParams = params ? await params : undefined;
  // const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const documentid = resolvedParams?.documentid;

  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  if (!documentid) {
    throw new Error("Document ID is required");
  }

  const preloadeddocument = await preloadQuery(
    api.documents.getById,
    { id: documentid },
    { token }
  );

  if (!preloadeddocument) {
    throw new Error("Document not found");
  }

  return <Document preloadedDocument={preloadeddocument} />;
};

export default DocumentPage;

// These are optional, but including them avoids future errors
export const generateStaticParams = () => [];
export const generateMetadata = () => ({});
