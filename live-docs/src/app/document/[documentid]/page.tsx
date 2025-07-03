/* eslint-disable @typescript-eslint/no-unused-vars */
import { preloadQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";
import { api } from "../../../../convex/_generated/api";

interface DocumentPageProps {
  params: { documentid: Id<"documents"> }; 
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { documentid } = params;

  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
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
