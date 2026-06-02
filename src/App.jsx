import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MiniMusicDock from "./components/MiniMusicDock";
import Navbar from "./components/Navbar";
import BarbaTransitions from "./components/BarbaTransitions";
import ScrollToTop from "./components/ScrollToTop";
import { blogs } from "./utils/blogs";

const Home = lazy(() => import("./pages/Home"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const hasBlogs = blogs.length > 0;

const App = () => {
  return (
    <BrowserRouter
      // basename={import.meta.env.BASE_URL}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="relative z-0 bg-primary">
        <ScrollToTop />
        <BarbaTransitions />
        <Navbar />
        <MiniMusicDock />
        <div data-barba="wrapper">
          <main data-barba="container" data-barba-namespace="portfolio">
            <Suspense fallback={<div className="bg-primary min-h-screen" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                {hasBlogs && <Route path="/blogs" element={<Blogs />} />}
                {hasBlogs && <Route path="/blogs/:slug" element={<BlogDetail />} />}
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
