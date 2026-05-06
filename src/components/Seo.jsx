import { useEffect } from "react";

const Seo = ({ title, description }) => {
  useEffect(() => {
    document.title = title ? `${title} | AboTasneem` : "AboTasneem";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description || "AboTasneem portfolio");
  }, [description, title]);

  return null;
};

export default Seo;
