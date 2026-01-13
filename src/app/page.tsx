import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ExperienceSection from "@/components/experience";
import Projects from "@/components/projects";
import ContactForm from "@/components/contact";
import Footer from "@/components/footer";
import EducationSection from "@/components/education";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="bg-cyan-950 text-white">
      
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
