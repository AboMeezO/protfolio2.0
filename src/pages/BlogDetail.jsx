import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";
import MediaGallery from "../components/gallery/MediaGallery";
import NotFound from "./NotFound";
import Seo from "../components/Seo";
import { getBlogBySlug } from "../utils/content";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);

  if (!blog) return <NotFound />;

  const Content = blog.Component;

  return (
    <PageWrapper>
      <div className="max-w-screen-2xl mx-auto">
        <Seo title={blog.title} description={blog.description} />
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{blog.date}</p>
          <h1 className={styles.sectionHeadText}>{blog.title}</h1>
        </motion.div>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          {blog.description}
        </motion.p>
        <motion.div variants={fadeIn("up", "spring", 0.2, 0.75)} className="mt-10 green-pink-gradient p-[1px] rounded-2xl">
          {blog.cover ? (
            <img
              src={blog.cover}
              alt={blog.title}
              loading="lazy"
              className="w-full h-[430px] object-cover rounded-2xl"
            />
          ) : (
            <div className="w-full h-[430px] bg-tertiary rounded-2xl flex justify-center items-center">
              <p className="text-secondary text-[14px]">No preview</p>
            </div>
          )}
        </motion.div>
        <div className="mt-10">
          <MarkdownRenderer>
            <Content />
          </MarkdownRenderer>
        </div>
        <MediaGallery items={blog.gallery} fallbackCover={blog.cover} title={blog.title} />
      </div>
    </PageWrapper>
  );
};

export default BlogDetail;
