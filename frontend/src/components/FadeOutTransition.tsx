import { FC, HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@lib/utils";

interface FadeOutTransitionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const FadeOutTransition: FC<FadeOutTransitionProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default FadeOutTransition;
