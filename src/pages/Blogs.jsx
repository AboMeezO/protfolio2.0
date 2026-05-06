import ContentList from "../components/layout/ContentList";
import BlogCard from "../components/cards/BlogCard";
import { blogs } from "../utils/content";

const blogCategories = ["Engineering", "Design", "Tutorials"];

const Blogs = () => (
  <ContentList
    items={blogs}
    CardComponent={BlogCard}
    title="Blogs."
    subTitle="Writing"
    description="Notes on building interactive interfaces, static content systems, and web experiences that stay fast and maintainable."
    seoTitle="Blogs"
    seoDescription="Articles by AboTasneem about React, 3D visuals, static content, and interface work."
    itemType="blog"
    categories={blogCategories}
  />
);

export default Blogs;
