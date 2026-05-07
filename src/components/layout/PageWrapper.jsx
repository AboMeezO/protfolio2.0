import { motion } from "framer-motion";
import { styles } from "../../styles";
import { staggerContainer } from "../../utils/motion";
import { StarsCanvas } from "../canvas";
import ErrorBoundary from "../ErrorBoundary";

const PageWrapper = ({ children }) => (
  <div className="relative z-0 bg-primary min-h-screen w-full">
    {/* Fixed Background Layer with forced fixed attachment */}
    <div 
      className="fixed inset-0 z-[-1] bg-hero-pattern bg-cover bg-no-repeat bg-center bg-fixed" 
      style={{ height: '100vh', width: '100vw' }}
    />
    
    <div className="relative z-10 w-full overflow-x-hidden">
      <motion.main
        variants={staggerContainer()}
        initial="hidden"
        animate="show"
        className={`${styles.padding} w-full relative z-0 pt-[120px] pb-20`}
      >
        {children}
      </motion.main>
    </div>
    
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <ErrorBoundary>
        <StarsCanvas />
      </ErrorBoundary>
    </div>
  </div>
);

export default PageWrapper;
