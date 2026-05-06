import { motion } from "framer-motion";
import { styles } from "../../styles";
import { staggerContainer } from "../../utils/motion";
import { StarsCanvas, ErrorBoundary } from "../";

const PageWrapper = ({ children }) => (
  <div className="relative z-0 bg-primary min-h-screen">
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <motion.main
        variants={staggerContainer()}
        initial="hidden"
        animate="show"
        className={`${styles.padding} max-w-7xl mx-auto relative z-0 pt-[120px]`}
      >
        {children}
      </motion.main>
    </div>
    <div className="relative z-0">
      <ErrorBoundary>
        <StarsCanvas />
      </ErrorBoundary>
    </div>
  </div>
);

export default PageWrapper;
