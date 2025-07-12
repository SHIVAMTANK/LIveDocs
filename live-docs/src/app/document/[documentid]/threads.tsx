
import { ClientSideSuspense, useThreads } from "@liveblocks/react/suspense";
import {
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";

export const Threads = ({ editor }: { editor: Editor | null }) => {
  return(
    // It allows you to suspend rendering of a component until 
    // Liveblocks data (like comments/threads/presence) is available on the client,
    //  without causing issues during server-side rendering (SSR).
    <ClientSideSuspense fallback={null}>
      <ThreadsList editor={editor}/>
    </ClientSideSuspense>
  )
}

function ThreadsList({ editor }: { editor: Editor | null }) {
  // fetch collaborative comments
  const { threads } = useThreads({ query: { resolved: false } });

  return (
    <>
      <div className="anchored-threads">
        {/* display comment directly next to the thry're attached to */}
        <AnchoredThreads editor={editor} threads={threads} />
      </div>
      <FloatingThreads
        editor={editor}
        threads={threads}
        className="floating-threads"
      />
      <FloatingComposer editor={editor} className="floating-composer" />
    </>
  );
}