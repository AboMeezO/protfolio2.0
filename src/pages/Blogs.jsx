import { motion } from "framer-motion";
import PageWrapper from "../components/layout/PageWrapper";
import BlogCard from "../components/cards/BlogCard";
import Seo from "../components/Seo";
import { blogs } from "../utils/content";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const Blogs = () => (
  <PageWrapper>
    <Seo
      title="Blogs"
      description="Articles by AboTasneem about React, 3D visuals, static content, and interface work."
    />
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Writing</p>
      <h1 className={styles.sectionHeadText}>Blogs.</h1>
    </motion.div>
    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
    >
      Notes on building interactive interfaces, static content systems, and
      web experiences that stay fast and maintainable.
    </motion.p>
    <div className="mt-20 flex flex-wrap gap-7">
      {blogs.map((blog, index) => (
        <BlogCard key={blog.slug} blog={blog} index={index} />
      ))}
    </div>
  </PageWrapper>
);

export default Blogs;
