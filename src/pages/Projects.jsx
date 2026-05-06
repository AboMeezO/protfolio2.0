import { motion } from "framer-motion";
import PageWrapper from "../components/layout/PageWrapper";
import ProjectCard from "../components/cards/ProjectCard";
import Seo from "../components/Seo";
import { projects } from "../utils/content";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const Projects = () => (
  <PageWrapper>
    <Seo
      title="Projects"
      description="All selected projects by AboTasneem, including web, bots, games, and software systems."
    />
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Selected work</p>
      <h1 className={styles.sectionHeadText}>Projects.</h1>
    </motion.div>
    <motion.p
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
    >
      A static archive of projects with detailed writeups, media galleries,
      technologies, and project links where available.
    </motion.p>
    <div className="mt-20 flex flex-wrap gap-7">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  </PageWrapper>
);

export default Projects;
