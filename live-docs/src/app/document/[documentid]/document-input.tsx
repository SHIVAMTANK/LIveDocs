"use client";

import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { LoaderIcon } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useStatus } from "@liveblocks/react";
import { toast } from "sonner";

// ✅ Debounce hook
function useDebounce<T extends (...args: Parameters<T>) => void>(callback: T, delay = 1000) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const status = useStatus();
  const [value, setValue] = useState<string>(title || "Untitled Document");
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [hasShownToast, setHasShownToast] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mutate = useMutation(api.documents.updateById);

  // ✅ Stable save function
  const save = useCallback(
    (newTitle: string) => {
      if (newTitle === title) return;
      setIsPending(true);

      mutate({ id, title: newTitle })
        .then(() => toast.success("✅ Document saved"))
        .catch(() => toast.error("❌ Failed to save"))
        .finally(() => setIsPending(false));
    },
    [id, title, mutate]
  );

  const debouncedSave = useDebounce(save, 1000);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setValue(newVal);

    if (!hasShownToast) {
      setHasShownToast(true);
      toast("💡 Changes will be saved automatically after you stop typing...", {
        duration: 3000,
      });
    }

    debouncedSave(newVal);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ id, title: value })
      .then(() => toast.success("✅ Document updated"))
      .catch(() => toast.error("❌ Update failed"))
      .finally(() => {
        setIsEditing(false);
        setIsPending(false);
      });
  };

  const showLoader =
    isPending || ["connecting", "reconnecting", "not-connected-yet"].includes(status);
  const showError = status === "disconnected";

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">{value || " "}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
              inputRef.current?.select();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {title || "Untitled Document"}
        </span>
      )}
      {showError && <BsCloudSlash className="size-4 text-red-500" />}
      {!showError && !showLoader && <BsCloudCheck className="size-4 text-green-500" />}
      {showLoader && <LoaderIcon className="size-4 animate-spin text-muted-foreground" />}
    </div>
  );
};
