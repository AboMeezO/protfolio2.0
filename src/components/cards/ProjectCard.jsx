import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeIn } from "../../utils/motion";

const tagColors = ["blue-text-gradient", "green-text-gradient", "pink-text-gradient"];

const ProjectCard = ({ index = 0, project }) => {
  const cover = project.cover || project.gallery?.[0]?.src;

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.2, 0.75)}>
      <Tilt
        tiltMaxAngleX={20}
        tiltMaxAngleY={20}
        perspective={900}
        transitionSpeed={800}
        scale={1.05}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full background-stripes parallax-effect"
      >
        <Link to={`/projects/${project.slug}`} className="block">
          <div className="relative w-full h-[230px] inner-element">
            {cover ? (
              <img
                src={cover}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <div className="w-full h-full rounded-2xl green-pink-gradient p-[1px]">
                <div className="w-full h-full bg-tertiary rounded-2xl flex justify-center items-center">
                  <p className="text-secondary text-[14px]">No preview</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5">
            <h3 className="text-white font-bold text-[24px]">{project.title}</h3>
            <p className="mt-2 text-secondary text-[14px]">
              {project.description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(project.tags || []).map((tag, tagIndex) => (
              <p
                key={`${project.slug}-${tag}`}
                className={`text-[14px] ${tagColors[tagIndex % tagColors.length]}`}
              >
                #{tag}
              </p>
            ))}
          </div>
        </Link>
      </Tilt>
    </motion.div>
  );
};

export default ProjectCard;
