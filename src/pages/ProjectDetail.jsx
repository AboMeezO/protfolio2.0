import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";
import MediaGallery from "../components/gallery/MediaGallery";
import NotFound from "./NotFound";
import Seo from "../components/Seo";
import { getProjectBySlug } from "../utils/content";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFound />;

  const Content = project.Component;

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto">
        <Seo title={project.title} description={project.description} />
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Project</p>
          <h1 className={styles.sectionHeadText}>{project.title}</h1>
        </motion.div>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          {project.description}
        </motion.p>
        <motion.div variants={fadeIn("up", "spring", 0.2, 0.75)} className="mt-10 green-pink-gradient p-[1px] rounded-2xl">
          {project.cover ? (
            <img
              src={project.cover}
              alt={project.title}
              loading="lazy"
              className="w-full h-[430px] object-cover rounded-2xl"
            />
          ) : (
            <div className="w-full h-[430px] bg-tertiary rounded-2xl flex justify-center items-center">
              <p className="text-secondary text-[14px]">No preview</p>
            </div>
          )}
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-4">
          {(project.tech || []).map((tech) => (
            <p key={tech} className="text-secondary text-[14px] bg-tertiary rounded-2xl py-2 px-4">
              {tech}
            </p>
          ))}
        </div>

        <div className="mt-10">
          <MarkdownRenderer>
            <Content />
          </MarkdownRenderer>
        </div>

        {project.features?.length > 0 && (
          <div className="mt-20 green-pink-gradient p-[1px] rounded-[20px]">
            <div className="bg-tertiary rounded-[20px] py-5 px-5">
              <h2 className="text-white font-bold text-[24px]">Features</h2>
              <ul className="mt-4 text-secondary text-[17px] leading-[30px] list-disc pl-6">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {project.links?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-block green-pink-gradient p-[1px] rounded-[20px]"
              >
                <span className="block bg-tertiary rounded-[20px] py-3 px-5 text-white text-[14px] font-bold transition-transform duration-700 hover:scale-105">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        )}

        <MediaGallery items={project.gallery} fallbackCover={project.cover} title={project.title} />
      </div>
    </PageWrapper>
  );
};

export default ProjectDetail;
