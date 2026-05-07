import { Link } from "react-router-dom";

const SectionCta = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`inline-block green-pink-gradient p-[1px] rounded-[20px] ${className}`}
  >
    <span className="block bg-tertiary rounded-[20px] py-3 px-5 text-white text-[14px] font-bold transition-transform duration-700 hover:scale-105">
      {children}
    </span>
  </Link>
);

export default SectionCta;
