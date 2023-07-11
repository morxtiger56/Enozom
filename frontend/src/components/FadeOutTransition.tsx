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
        translateX: -100,
      }}
      animate={{
        opacity: 1,
        translateX: 0,
      }}
      exit={{
        opacity: 0,
        translateX: 100,
      }}
      transition={{
        duration: 0.4,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default FadeOutTransition;
