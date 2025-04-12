// components/FullScreenLoader.tsx

"use client";

import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface FullScreenLoaderProps {
  label?: string;
  className?: string;
}

export const FullScreenLoader = ({
  label = "Loading, please wait...",
  className,
}: FullScreenLoaderProps) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
        className="p-4 rounded-full bg-muted shadow-xl"
      >
        <Loader className="size-10 text-primary" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-sm text-muted-foreground"
      >
        {label}
      </motion.p>
    </div>
  );
};
