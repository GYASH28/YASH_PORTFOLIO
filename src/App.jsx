import { SmoothScroll } from "./components/layout/SmoothScroll";
import { BackToTop } from "./components/ui/BackToTop";
import { CustomCursor } from "./components/layout/CustomCursor";
import { Navbar } from "./components/layout/Navbar";
import { Preloader } from "./components/layout/Preloader";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { Hero } from "./components/sections/01_Hero";
import { About } from "./components/sections/02_About";
import { Skills } from "./components/sections/03_Skills";
import { Projects } from "./components/sections/04_Projects";
import { Journey } from "./components/sections/05_Journey";
import { Contact } from "./components/sections/06_Contact";

export default function App() {
  return (
    <SmoothScroll>
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <BackToTop />
    </SmoothScroll>
  );
}
