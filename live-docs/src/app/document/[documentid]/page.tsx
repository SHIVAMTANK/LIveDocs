import { Editor } from "./editor";

interface DocumentPageProps {
    params: Promise<{documentid: string}>
}

const DocumentPage = async ({params}: DocumentPageProps) => {
    const {documentid} = await params;

    return (
       <div className="min-h-screen bg-[#FAFBFD]">
        <Editor />
       </div>
    )
}

export default DocumentPage;