import ContentList from "../components/layout/ContentList";
import ProjectCard from "../components/cards/ProjectCard";
import { projects } from "../utils/projects";

const projectCategories = [
  "Web Development",
  "Discord Bots",
  "Game Development",
  "Software Systems",
  "Tools & Templates",
];

const Projects = () => (
  <ContentList
    items={projects}
    CardComponent={ProjectCard}
    title="Projects."
    subTitle="Selected work"
    description="A static archive of projects with detailed writeups, media galleries, technologies, and project links where available."
    seoTitle="Projects"
    seoDescription="All selected projects by AboTasneem, including web, bots, games, and software systems."
    itemType="project"
    categories={projectCategories}
  />
);

export default Projects;
