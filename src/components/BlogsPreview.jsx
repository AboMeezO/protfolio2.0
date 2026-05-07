import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { blogs } from "../utils/content";
import BlogCard from "./cards/BlogCard";
import SectionCta from "./ui/SectionCta";
import { fadeIn, textVariant } from "../utils/motion";

const BlogsPreview = () => {
  const latestBlogs = blogs.slice(0, 3);

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Latest notes</p>
          <h2 className={styles.sectionHeadText}>Blogs.</h2>
        </motion.div>
        <motion.div variants={fadeIn("", "", 0.1, 1)} className="sm:self-start">
          <SectionCta to="/blogs">View all blogs</SectionCta>
        </motion.div>
      </div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Recent writing about interfaces, static content, 3D visuals, and the
          engineering choices behind this portfolio.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {latestBlogs.map((blog, index) => (
          <motion.div
            key={blog.slug}
            variants={fadeIn("up", "spring", index * 0.2, 0.75)}
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(BlogsPreview, "blogs");
