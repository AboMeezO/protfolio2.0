import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  BlogsPreview,
  Tech,
  Works,
  StarsCanvas,
  EasterEgg,
  ErrorBoundary,
} from "../components";
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
