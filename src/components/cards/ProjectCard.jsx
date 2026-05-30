import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, onTagClick, activeTags = [] }) => {
  const cover = project.cover || project.gallery?.[0]?.src;

  return (
    <Tilt
      tiltMaxAngleX={16}
      tiltMaxAngleY={16}
      perspective={900}
      transitionSpeed={800}
      scale={1.03}
      className="bg-tertiary p-4 sm:p-5 rounded-2xl w-full h-full background-stripes parallax-effect group flex flex-col border border-white/5"
    >
      <Link to={`/projects/${project.slug}`} className="block flex-1">
        <div className="relative w-full h-[160px] xs:h-[230px] inner-element overflow-hidden rounded-xl">
          {cover ? (
            <img
              src={cover}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full rounded-xl green-pink-gradient p-[1px]">
              <div className="w-full h-full bg-tertiary rounded-xl flex justify-center items-center">
                <p className="text-secondary text-[12px]">No preview</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
        </div>

        <div className="mt-4 sm:mt-5">
          <p className="text-secondary text-[11px] sm:text-[14px]">{project.date}</p>
          <h3 className="text-white font-bold text-[18px] sm:text-[24px] group-hover:text-purple-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="mt-2 text-secondary text-[13px] sm:text-[14px] line-clamp-2 sm:line-clamp-3">
            {project.description}
          </p>
        </div>
      </Link>

      <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
        {(project.tags || []).map((tag) => {
          const tagName = typeof tag === "string" ? tag : tag.name;
          const isActive = activeTags.includes(tagName);
          
          return (
            <button
              key={`${project.slug}-${tagName}`}
              onClick={(e) => {
                if (onTagClick) {
                  e.preventDefault();
                  onTagClick(tagName);
                }
              }}
              className={`text-[10px] sm:text-[12px] px-2 py-0.5 rounded-md border transition-all duration-300 ${
                isActive
                  ? "bg-violet-gradient border-transparent text-white"
                  : "bg-primary/30 border-white/5 text-secondary hover:text-white hover:border-white/20"
              }`}
            >
              #{tagName}
            </button>
          );
        })}
      </div>
    </Tilt>
  );
};

export default ProjectCard;
