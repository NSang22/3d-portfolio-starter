import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ExperienceSection from "@/components/experience";
import Projects from "@/components/projects";
import ContactForm from "@/components/contact";
import Footer from "@/components/footer";
import EducationSection from "@/components/education";
import Skills from "@/components/skills";

/** Original single-page portfolio (also available at `/classic`). */
export default function ClassicPortfolioHome() {
  return (
    <main className="text-white">
      <Navbar />
      <Hero />
      <ExperienceSection />
      <Projects />
      <Skills />
      <EducationSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
