import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Room } from "./room";
import { Toolbar } from "./toolbar";
interface DocumentPageProps {
  params: Promise<{ documentid: string }>;
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { documentid } = await params;

  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden h-[112px]">
          <Navbar />
          <Toolbar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor />
        </div>
      </div>
    </Room>
  );
};

export default DocumentPage;
