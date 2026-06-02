import { lazy, Suspense } from "react";

import Hero from "../components/Hero";
import Seo from "../components/Seo";

const About = lazy(() => import("../components/About"));
const BlogsPreview = lazy(() => import("../components/BlogsPreview"));
const Contact = lazy(() => import("../components/Contact"));
const EasterEgg = lazy(() => import("../components/EasterEgg"));
const ErrorBoundary = lazy(() => import("../components/ErrorBoundary"));
const Experience = lazy(() => import("../components/Experience"));
const Feedbacks = lazy(() => import("../components/Feedbacks"));
const StarsCanvas = lazy(() => import("../components/canvas/Stars"));
const Tech = lazy(() => import("../components/Tech"));
const Works = lazy(() => import("../components/Works"));

const Home = () => (
  <>
    <Seo
      title="Portfolio"
      description="AboTasneem portfolio for 3D visuals, interfaces, web applications, projects, and blogs."
    />
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Hero />
    </div>
    <Suspense fallback={null}>
      <About />
      <Experience />
      <Tech />
      <Works />
      <BlogsPreview />
      <Feedbacks />
      <EasterEgg secretCode="LOVE" mdFilePath="/secres.md" />
      <div className="relative z-0">
        <Contact />
        <ErrorBoundary>
          <StarsCanvas />
        </ErrorBoundary>
      </div>
    </Suspense>
  </>
);

export default Home;
