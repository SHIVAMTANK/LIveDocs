import { Editor } from "./editor";
import { Toolbar } from "./toolbar";
interface DocumentPageProps {
    params: Promise<{documentid: string}>
}

const DocumentPage = async ({params}: DocumentPageProps) => {
    const {documentid} = await params;

    return (
       <div className="min-h-screen bg-[#FAFBFD]">
        <Toolbar />
        <Editor />
       </div>
    )
}

export default DocumentPage;