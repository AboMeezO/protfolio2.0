import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";
import MediaGallery from "../components/gallery/MediaGallery";
import NotFound from "./NotFound";
import Seo from "../components/Seo";
import { getBlogBySlug } from "../utils/blogs";
import { fadeIn, textVariant } from "../utils/motion";

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);

  if (!blog) return <NotFound />;

  const Content = blog.Component;

  const formattedDate = blog.date
    ? new Date(blog.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <PageWrapper>
      <div className="max-w-screen-2xl mx-auto">
        <Seo title={blog.title} description={blog.description} />

        <motion.div variants={fadeIn("down", "spring", 0, 0.5)}>
          <Link to="/blogs" className="breadcrumb-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
            Blogs
          </Link>
        </motion.div>

        <motion.div variants={textVariant()} className="mt-6">
          <span className="section-label">
            <span className="section-label__dot" />
            Article
          </span>
          <h1 className="mt-4 text-white font-black md:text-[56px] sm:text-[44px] xs:text-[36px] text-[28px] leading-[1.05]">
            {blog.title}
          </h1>
        </motion.div>

        <motion.div variants={fadeIn("", "", 0.1, 1)}>
          <p className="mt-4 text-secondary text-[17px] max-w-2xl leading-[1.7]">
            {blog.description}
          </p>

          <div className="article-meta mt-6">
            {formattedDate && (
              <span className="article-meta__item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {formattedDate}
              </span>
            )}
            {blog.category && (
              <span className="article-meta__item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                {blog.category}
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("up", "spring", 0.2, 0.75)}
          className="detail-hero mt-10"
        >
          {blog.cover ? (
            <>
              <img
                src={blog.cover}
                alt={blog.title}
                loading="lazy"
                className="w-full h-[340px] sm:h-[420px] lg:h-[500px] object-cover"
              />
              <div className="detail-hero__backdrop" />
              <div className="detail-hero__grain" />
              <div className="detail-hero__glow" />
            </>
          ) : (
            <div className="w-full h-[340px] sm:h-[420px] bg-tertiary flex justify-center items-center rounded-3xl">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-secondary">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                </div>
                <p className="mt-3 text-secondary text-[14px]">No cover image</p>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          variants={fadeIn("up", "spring", 0.3, 0.75)}
          className="article-divider my-16"
        />

        <div className="article-prose">
          <MarkdownRenderer>
            <Content />
          </MarkdownRenderer>
        </div>

        {blog.tags?.length > 0 && (
          <motion.div
            variants={fadeIn("up", "spring", 0.4, 0.75)}
            className="article-prose mt-20"
          >
            <div className="article-divider mb-8" />
            <span className="section-label">
              <span className="section-label__dot" />
              Tags
            </span>
            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags.map((tag) => {
                const tagName = typeof tag === "string" ? tag : tag.name;
                return (
                  <span key={tagName} className="tag-chip">
                    #{tagName}
                  </span>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="article-prose">
          <MediaGallery items={blog.gallery} fallbackCover={blog.cover} title={blog.title} />
        </div>

        <motion.div
          variants={fadeIn("up", "spring", 0.5, 0.75)}
          className="article-prose mt-16 pb-8"
        >
          <div className="article-divider mb-8" />
          <Link to="/blogs" className="cta-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
            <span>Back to all articles</span>
          </Link>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default BlogDetail;
