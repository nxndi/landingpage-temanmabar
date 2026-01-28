import { motion, AnimatePresence, Variants } from "framer-motion";
import Loading from "../Loading/LoadingScreen";

const contentVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

interface LoadingWrapperProps {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,
  isLoading = false,
  className = "",
}) => {
  return (
    <AnimatePresence mode="sync">
      {isLoading ? (
        <div
          className={`flex justify-center items-center min-h-screen w-full ${className}`}
        >
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Loading fullScreen={false} />
          </motion.div>
        </div>
      ) : (
        <motion.section
          key="content"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={contentVariants}
          className={className}
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default LoadingWrapper;
