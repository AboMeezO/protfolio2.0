import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  EasterEgg,
  ErrorBoundary,
} from "./components";

const App = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <EasterEgg secretCode="LOVE" mdFilePath="/secres.md" />
        <div className="relative z-0">
          <Contact />
          <ErrorBoundary>
            <StarsCanvas />
          </ErrorBoundary>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
