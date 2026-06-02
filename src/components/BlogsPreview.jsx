import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { blogs } from "../utils/blogs";
import BlogCard from "./cards/BlogCard";
import SectionCta from "./ui/SectionCta";
import { fadeIn, textVariant } from "../utils/motion";

const BlogsPreview = () => {
  const latestBlogs = blogs.slice(0, 3);
  if (latestBlogs.length === 0) return null;

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

      <div className="mt-10 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7">
        {latestBlogs.map((blog, index) => (
          <motion.div
            key={blog.slug}
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            className="h-full"
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(BlogsPreview, "blogs");
