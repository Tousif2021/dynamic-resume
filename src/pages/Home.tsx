
import { useEffect, useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillBadge } from "@/components/SkillBadge";
import { useGitHubUser, useGitHubRepos, useLanguageStats, Repository, GITHUB_USERNAME, languageColors } from "@/api/github";
import { ArrowRight, Github, ArrowDown, Linkedin, Rocket, ExternalLink, Code, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { motion } from "framer-motion";

const customSkills = [
  { name: "React", color: "#61DAFB" },
  { name: "Tailwind CSS", color: "#38B2AC" },
  { name: "Node.js", color: "#68A063" },
  { name: "Next.js", color: "#000000" },
  { name: "RISC-V", color: "#A6A6A6" },
  { name: "Cisco", color: "#1BA0D7" }
];

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Repository[]>([]);
  const { userData, loading: userLoading } = useGitHubUser(GITHUB_USERNAME);
  const { repositories, loading: reposLoading } = useGitHubRepos(GITHUB_USERNAME);
  const languages = useLanguageStats(repositories);
  
  const [allSkills, setAllSkills] = useState<Array<{name: string, color: string, isGithub: boolean}>>([]);
  
  useEffect(() => {
    if (languages.length > 0) {
      const existingLanguageNames = new Set(languages.map(lang => lang.name));
      
      const combinedSkills = [
        ...languages.map(lang => ({ 
          name: lang.name, 
          color: lang.color, 
          isGithub: true 
        })),
        ...customSkills
          .filter(skill => !existingLanguageNames.has(skill.name))
          .map(skill => ({ 
            name: skill.name, 
            color: skill.color, 
            isGithub: false 
          }))
      ];
      
      setAllSkills(combinedSkills);
    }
  }, [languages]);
  
  const userName = userData?.name || 'Tousif Dewan';
  const { displayText, cursor } = useTypingEffect(userName, {
    typingSpeed: 90,
    delayBeforeStart: 600,
    cursorBlinkSpeed: 500
  });

  const bioParts = [
    "CSE Major @ KTH",
    "Building AI-driven solutions",
    "Passionate about innovation & telecom R&D"
  ];
  
  const { displayText: bioText, cursor: bioCursor } = useTypingEffect(bioParts.join(" | "), {
    typingSpeed: 50,
    delayBeforeStart: 1500,
    cursorBlinkSpeed: 500
  });
  
  useEffect(() => {
    if (repositories.length > 0) {
      setFeaturedProjects(repositories.slice(0, 3));
    }
  }, [repositories]);
  
  const isLoading = userLoading || reposLoading;
  
  return (
    <PageTransition>
      <section className="min-h-[90vh] flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
            <pre className="text-primary font-mono text-[8px] leading-tight">
              {Array(30).fill(0).map(() => 
                Math.random() > 0.5 ? '10101001001010101001' : '01001010100101001010'
              ).join('\n')}
            </pre>
          </div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="w-full lg:w-1/2 animate-fade-in order-2 lg:order-1" style={{ animationDelay: '0.2s' }}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 mb-4"
            >
              <Terminal className="h-4 w-4 text-primary" />
              <p className="text-primary font-mono tracking-wider">Hello, my name is</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mb-4 group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/0 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h1 className="relative text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold tracking-tight">
                <span className="text-foreground hover:text-primary transition-all duration-500 inline-flex items-center bg-gradient-to-r from-primary/90 to-blue-400/90 bg-clip-text text-transparent">
                  {displayText}{cursor}
                </span>
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative mb-6 group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-primary/0 rounded-md blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h2 className="relative text-xl md:text-2xl lg:text-3xl font-display font-semibold bg-gradient-to-r from-primary/80 to-blue-400/70 bg-clip-text text-transparent">
                KTH THE ROYAL INSTITUTE OF TECHNOLOGY
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg font-medium mb-8 max-w-xl relative glass p-3 rounded-md border border-primary/10"
            >
              <div className="absolute top-0 right-0 -mt-2 -mr-2">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary">
                  <Code className="w-3 h-3" />
                </div>
              </div>
              <span className="font-mono text-foreground/90 tracking-tight">{bioText}{bioCursor}</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, staggerChildren: 0.1 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="group bg-gradient-to-r from-primary to-blue-400 hover:from-primary/90 hover:to-blue-400/90 transition-all duration-500 shadow-md hover:shadow-lg hover:shadow-primary/20">
                <Link to="/projects" className="group">
                  <Rocket className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" /> 
                  View Projects 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-primary/20 hover:border-primary/40 backdrop-blur-sm bg-background/30 hover:bg-background/50 transition-all duration-300 shadow-sm hover:shadow-md">
                <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="group">
                  <Github className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" /> 
                  GitHub Profile
                  <ExternalLink className="ml-2 h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-[-2px]" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-primary/20 hover:border-primary/40 backdrop-blur-sm bg-background/30 hover:bg-background/50 transition-all duration-300 shadow-sm hover:shadow-md">
                <a href="https://www.linkedin.com/in/tousifdewan" target="_blank" rel="noopener noreferrer" className="group">
                  <Linkedin className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" /> 
                  LinkedIn
                  <ExternalLink className="ml-2 h-3.5 w-3.5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-[-2px]" />
                </a>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2"
          >
            <div className="relative w-full max-w-[240px] md:max-w-[280px] lg:max-w-md aspect-square mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-full animate-pulse-slow"></div>
              <div className="absolute inset-6 bg-gradient-to-bl from-primary/30 to-blue-500/20 rounded-full rotate-45 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              
              <div className="absolute inset-[-10px] rounded-full border-2 border-dashed border-primary/20 animate-rotate-slow"></div>
              
              <div className="absolute inset-12 glass rounded-full z-10 animate-float-very-slow overflow-hidden flex items-center justify-center group transition-all duration-500 hover:shadow-lg hover:shadow-primary/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <img 
                  src={userData?.avatar_url || "https://via.placeholder.com/300?text=Profile"} 
                  alt={userData?.name || "Developer"}
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105 filter group-hover:contrast-[1.1]"
                />
                
                <div className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-4 md:bottom-10 left-0 right-0 flex justify-center animate-bounce"
        >
          <button
            onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-foreground/60 hover:text-foreground transition-colors group glass p-2 rounded-full"
            aria-label="Scroll down"
          >
            <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </motion.div>
      </section>
      
      <section id="skills" className="py-20 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading 
            heading="Skills & Technologies"
            subheading="What I work with"
          > 
          </SectionHeading>
          
          <div className="mt-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
            >
              {isLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <div 
                    key={index}
                    className="h-8 bg-muted rounded-full w-24 animate-pulse"
                  />
                ))
              ) : (
                allSkills.map((skill, index) => (
                  <motion.div
                    key={`${skill.name}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <SkillBadge 
                      name={skill.name}
                      color={skill.color}
                      isNew={!skill.isGithub}
                      className="text-sm hover:shadow-md transition-all duration-300"
                    />
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading 
            heading="Featured Projects"
            subheading="My recent work"
          >
            <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
              Here are a few of my recent projects. Want to see more? Check out my projects page.
            </p>
          </SectionHeading>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div 
                  key={index}
                  className="h-96 bg-muted rounded-lg animate-pulse"
                />
              ))
            ) : (
              featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard
                    project={project}
                    username={GITHUB_USERNAME}
                    featured={true}
                  />
                </motion.div>
              ))
            )}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button asChild size="lg" className="group">
              <Link to="/projects">
                View All Projects 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
