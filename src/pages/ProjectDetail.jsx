import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";
import MediaGallery from "../components/gallery/MediaGallery";
import NotFound from "./NotFound";
import Seo from "../components/Seo";
import { getProjectBySlug } from "../utils/projects";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFound />;

  const Content = project.Component;

  return (
    <PageWrapper>
      <div className="max-w-screen-2xl mx-auto">
        <Seo title={project.title} description={project.description} />

        <motion.div variants={fadeIn("down", "spring", 0, 0.5)}>
          <Link to="/projects" className="breadcrumb-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
            Projects
          </Link>
        </motion.div>

        <motion.div variants={textVariant()} className="mt-6">
          <span className="section-label">
            <span className="section-label__dot" />
            {project.category || "Project"}
          </span>
          <h1 className="mt-4 text-white font-black md:text-[56px] sm:text-[44px] xs:text-[36px] text-[28px] leading-[1.05]">
            {project.title}
          </h1>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-2xl leading-[1.7]"
        >
          {project.description}
        </motion.p>

        <motion.div
          variants={fadeIn("up", "spring", 0.2, 0.75)}
          className="detail-hero mt-10"
        >
          {project.cover ? (
            <>
              <img
                src={project.cover}
                alt={project.title}
                loading="lazy"
                className="w-full h-[340px] sm:h-[420px] lg:h-[500px] object-cover"
              />
              <div className="detail-hero__backdrop" />
              <div className="detail-hero__grain" />
              <div className="detail-hero__glow" />
              <div className="detail-hero__content absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <div className="flex flex-wrap gap-2">
                  {(project.tech || []).slice(0, 5).map((tech) => (
                    <span key={tech} className="text-[11px] sm:text-[12px] font-medium px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white-100 border border-white/10">
                      {tech}
                    </span>
                  ))}
                  {(project.tech || []).length > 5 && (
                    <span className="text-[11px] sm:text-[12px] font-medium px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white-100 border border-white/10">
                      +{(project.tech || []).length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-[340px] sm:h-[420px] bg-tertiary flex justify-center items-center rounded-3xl">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-secondary">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                    <line x1="7" y1="2" x2="7" y2="22" />
                    <line x1="17" y1="2" x2="17" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="2" y1="7" x2="7" y2="7" />
                    <line x1="2" y1="17" x2="7" y2="17" />
                    <line x1="17" y1="7" x2="22" y2="7" />
                    <line x1="17" y1="17" x2="22" y2="17" />
                  </svg>
                </div>
                <p className="mt-3 text-secondary text-[14px]">No preview available</p>
              </div>
            </div>
          )}
        </motion.div>

        <div className="mt-16 lg:grid lg:grid-cols-[1fr_340px] lg:gap-12">
          <div className="min-w-0">
            <div className="project-content">
              <MarkdownRenderer>
                <Content />
              </MarkdownRenderer>
            </div>

            {project.features?.length > 0 && (
              <motion.div
                variants={fadeIn("up", "spring", 0.3, 0.75)}
                className="mt-20"
              >
                <span className="section-label">
                  <span className="section-label__dot" />
                  Key Features
                </span>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      variants={fadeIn("up", "spring", index * 0.1, 0.5)}
                      className="feature-card"
                    >
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="feature-card__icon">
                          <span className="text-[13px] font-bold green-text-gradient">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="text-white-100 text-[15px] leading-[1.6] font-medium pt-2">
                          {feature}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {project.links?.length > 0 && (
              <motion.div
                variants={fadeIn("up", "spring", 0.4, 0.75)}
                className="mt-16"
              >
                <span className="section-label">
                  <span className="section-label__dot" />
                  Links & Resources
                </span>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="cta-link"
                    >
                      <span>{link.label}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                        <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                      </svg>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            <MediaGallery items={project.gallery} fallbackCover={project.cover} title={project.title} />
          </div>

          <aside className="mt-12 lg:mt-0">
            <div className="lg:sticky lg:top-[140px]">
              <motion.div
                variants={fadeIn("left", "spring", 0.3, 0.75)}
                className="meta-card p-6"
              >
                <h3 className="text-white font-bold text-[16px]">Project Details</h3>
                <div className="meta-card__divider mt-4" />

                {project.date && (
                  <div className="mt-4">
                    <p className="text-secondary text-[12px] uppercase tracking-wider font-semibold">Date</p>
                    <p className="mt-1 text-white-100 text-[14px] font-medium">
                      {new Date(project.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                )}

                {project.category && (
                  <>
                    <div className="meta-card__divider mt-4" />
                    <div className="mt-4">
                      <p className="text-secondary text-[12px] uppercase tracking-wider font-semibold">Category</p>
                      <p className="mt-1 text-white-100 text-[14px] font-medium">{project.category}</p>
                    </div>
                  </>
                )}

                {project.tags?.length > 0 && (
                  <>
                    <div className="meta-card__divider mt-4" />
                    <div className="mt-4">
                      <p className="text-secondary text-[12px] uppercase tracking-wider font-semibold">Tags</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => {
                          const tagName = typeof tag === "string" ? tag : tag.name;
                          return (
                            <span key={tagName} className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-secondary border border-white/5">
                              #{tagName}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {(project.tech || []).length > 0 && (
                  <>
                    <div className="meta-card__divider mt-4" />
                    <div className="mt-4">
                      <p className="text-secondary text-[12px] uppercase tracking-wider font-semibold">Tech Stack</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {project.tech.map((tech) => (
                          <span key={tech} className="tech-pill text-[11px] !px-2.5 !py-1">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {typeof project.openSource === "boolean" && (
                  <>
                    <div className="meta-card__divider mt-4" />
                    <div className="mt-4 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${project.openSource ? "bg-[#00cea8]" : "bg-secondary/40"}`} />
                      <p className="text-secondary text-[13px]">
                        {project.openSource ? "Open Source" : "Proprietary"}
                      </p>
                    </div>
                  </>
                )}

                {project.links?.length > 0 && (
                  <>
                    <div className="meta-card__divider mt-4" />
                    <div className="mt-4 space-y-2">
                      {project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-[13px] text-[#00cea8] font-medium hover:text-white transition-colors duration-300 py-1"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProjectDetail;
