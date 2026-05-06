import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeIn } from "../../utils/motion";

const tagColors = ["blue-text-gradient", "green-text-gradient", "pink-text-gradient"];

const BlogCard = ({ index = 0, blog }) => (
  <motion.div variants={fadeIn("up", "spring", index * 0.2, 0.75)}>
    <Tilt
      tiltMaxAngleX={20}
      tiltMaxAngleY={20}
      perspective={900}
      transitionSpeed={800}
      scale={1.05}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full background-stripes parallax-effect"
    >
      <Link to={`/blogs/${blog.slug}`} className="block">
        <div className="relative w-full h-[230px] inner-element">
          <img
            src={blog.cover}
            alt={blog.title}
            loading="lazy"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="mt-5">
          <p className="text-secondary text-[14px]">{blog.date}</p>
          <h3 className="text-white font-bold text-[24px]">{blog.title}</h3>
          <p className="mt-2 text-secondary text-[14px]">{blog.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(blog.tags || []).map((tag, tagIndex) => (
            <p
              key={`${blog.slug}-${tag}`}
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

export default BlogCard;
