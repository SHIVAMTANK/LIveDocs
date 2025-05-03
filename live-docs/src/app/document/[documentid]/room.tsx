"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();


  return (
    <LiveblocksProvider publicApiKey={"pk_dev_PJaHXozx9VF3vd1ajSGK6-nXbNXOO3rvk6YgDYtN-NR0-ONH1-iv8BwM2EdrWlYK"}>
      <RoomProvider id={params.documentid as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}