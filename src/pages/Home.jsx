import About from "../components/About";
import BlogsPreview from "../components/BlogsPreview";
import Contact from "../components/Contact";
import EasterEgg from "../components/EasterEgg";
import ErrorBoundary from "../components/ErrorBoundary";
import Experience from "../components/Experience";
import Feedbacks from "../components/Feedbacks";
import Hero from "../components/Hero";
import Tech from "../components/Tech";
import Works from "../components/Works";
import StarsCanvas from "../components/canvas/Stars";
import Seo from "../components/Seo";

const Home = () => (
  <>
    <Seo
      title="Portfolio"
      description="AboTasneem portfolio for 3D visuals, interfaces, web applications, projects, and blogs."
    />
    <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <Hero />
    </div>
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
  </>
);

export default Home;
