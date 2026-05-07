import { motion } from "framer-motion";
import PageWrapper from "../components/layout/PageWrapper";
import Seo from "../components/Seo";
import SectionCta from "../components/ui/SectionCta";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const NotFound = () => (
  <PageWrapper>
    <Seo title="Not Found" description="The requested portfolio page could not be found." />
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>404</p>
      <h1 className={styles.sectionHeadText}>Page not found.</h1>
    </motion.div>
    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
    >
      This page does not exist or the content slug is no longer available.
    </motion.p>
    <SectionCta to="/" className="mt-10">Back home</SectionCta>
  </PageWrapper>
);

export default NotFound;
