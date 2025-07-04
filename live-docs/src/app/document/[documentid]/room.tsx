// Room.tsx
"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullScreenLoader } from "@/components/fullscreen-loader";
import { getUsers ,getDocuments} from "./action";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
import { LEFT_MARGIN_DEFAULT,RIGHT_MARGIN_DEFAULT } from "@/constants/margin";


type User = { id: string; name: string; avatar: string;color: string };

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const documentId = params.documentid as string;

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch {
        toast.error("Failed to fetch users");
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const res = await fetch("/api/liveblocks-auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ room: documentId }),
        });

        if (!res.ok) {
          throw new Error("Failed to authorize Liveblocks session");
        }

        return await res.json();
      }}
      resolveUsers={({ userIds }) =>
        userIds.map((userId) => {
          const user = users.find((user) => user.id === userId);
          return user
            ? {
                name: user.name,
                avatar: user.avatar,
                color: user.color,
              }
            : undefined;
        })
      }
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({roomIds}) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents.map((document)=>({
          id: document.id,
          name: document.name,
        }))
      }}
      
    >
      <RoomProvider id={documentId} initialStorage={{leftMargin:LEFT_MARGIN_DEFAULT,rightMargin:RIGHT_MARGIN_DEFAULT}} initialPresence={{ user: null }}>
        <ClientSideSuspense fallback={<FullScreenLoader label="Room loading" />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
