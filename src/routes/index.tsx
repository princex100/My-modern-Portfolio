import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prince Sharma — Full Stack Developer" },
      { name: "description", content: "Portfolio of Prince Sharma — full stack developer crafting elegant, high-performance web experiences with React, Node and modern tooling." },
      { property: "og:title", content: "Prince Sharma — Full Stack Developer" },
      { property: "og:description", content: "Portfolio of Prince Sharma — full stack developer crafting elegant, high-performance web experiences." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  component: Portfolio,
});

const SKILLS = [
  { name: "C++", level: 85 },
  { name: "JavaScript", level: 90 },
  { name: "HTML5", level: 90 },
  { name: "CSS3", level: 88 },
  { name: "React.js", level: 88 },
  { name: "Redux Toolkit", level: 82 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Express.js", level: 85 },
  { name: "Appwrite", level: 80 },
  { name: "MongoDB", level: 91 },
  { name: "MySQL", level: 40 },
  { name: "Git/GitHub", level: 85 },
  { name: "Postman", level: 88 },
  { name: "JWT", level: 80 },
  { name: "REST APIs", level: 88 },
  { name: "OAuth", level: 82 },
  { name: "DSA", level: 85 },
  { name: "OOP", level: 88 },
  { name: "DBMS", level: 85 },
];

const PROJECTS = [
  {
    title: "Write-Hub",
    desc: "A scalable online blogging application where people can create their personal blogs.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    link: "https://write-hub-your-writing-space.vercel.app/",
    year: "11/2025",
  },
  {
    title: "SuperCare",
    desc: "Exceptional care for discerning patients. Modern healthcare web application providing concierge medical team services.",
    tech: ["React", "Tailwind CSS"],
    link: "https://super-care-multispeciality-hospital-one.vercel.app/",
    year: "2/2026",
  },
  {
    title: "CampusFlow-placement portal",
    desc: "An upcoming project to streamline the placement process. Stay tuned!",
    tech: ["Coming Soon"],
    link: "#",
    year: "5/2026",
  },
];

const CONTACTS = [
  { name: "GitHub", link: "https://github.com/princex100" },
  { name: "LinkedIn", link: "https://www.linkedin.com/feed/" },
  { name: "Email", link: "mailto:princeshrm002@gmail.com" },
  { name: "Call", link: "tel:+916397345571" },
];

const MARQUEE_ITEMS = [
  "C++", "JavaScript", "HTML5", "CSS3",
  "React.js", "Redux Toolkit", "Tailwind CSS",
  "Node.js", "Express.js", "Appwrite",
  "MongoDB", "MySQL", "Git/GitHub", "Postman", "JWT", "REST APIs", "OAuth",
  "DSA", "OOP", "DBMS"
];

const NAV_ITEMS = ["About", "Skills", "Projects", "Contact"];

const STATS = [
  { num: "2", label: "Projects deployed" },
  { num: "1", label: "Project ongoing" },
  { num: "2+", label: "Years coding exp." },
];

function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ensure the page always starts at the top when landing/reloading
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  /* ---------- Hero parallax + typewriter ---------- */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const TITLES = ["Frontend Developer", "Backend Developer", "Problem Solver", "Full Stack Developer"];
  const [titleIndex, setTitleIndex] = useState(0);
  const [nameText, setNameText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    let timer: ReturnType<typeof setTimeout>;
    
    if (!isDeleting && nameText === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && nameText === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
      }, 500);
    } else {
      const next = isDeleting
        ? currentTitle.substring(0, nameText.length - 1)
        : currentTitle.substring(0, nameText.length + 1);
      timer = setTimeout(() => setNameText(next), isDeleting ? 40 : 80);
    }
    return () => clearTimeout(timer);
  }, [nameText, isDeleting, titleIndex]);

  /* ---------- Hero CTA magnetic buttons ---------- */
  const ghBtnRef = useRef<HTMLAnchorElement>(null);
  const ghX = useMotionValue(0);
  const ghY = useMotionValue(0);
  const ghSX = useSpring(ghX, { stiffness: 200, damping: 15 });
  const ghSY = useSpring(ghY, { stiffness: 200, damping: 15 });

  const rzBtnRef = useRef<HTMLAnchorElement>(null);
  const rzX = useMotionValue(0);
  const rzY = useMotionValue(0);
  const rzSX = useSpring(rzX, { stiffness: 200, damping: 15 });
  const rzSY = useSpring(rzY, { stiffness: 200, damping: 15 });

  const makeMagneticHandlers = (
    btnRef: React.RefObject<HTMLAnchorElement | null>,
    mx: ReturnType<typeof useMotionValue<number>>,
    my: ReturnType<typeof useMotionValue<number>>,

  ) => ({

    onMouseMove: (e: React.MouseEvent) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      mx.set((e.clientX - rect.left - rect.width / 2) * 0.3);
      my.set((e.clientY - rect.top - rect.height / 2) * 0.3);
    },
    onMouseLeave: () => {
      mx.set(0);
      my.set(0);
    },
  });

  const ghHandlers = makeMagneticHandlers(ghBtnRef, ghX, ghY);
  const rzHandlers = makeMagneticHandlers(rzBtnRef, rzX, rzY);

  /* ---------- Scroll-triggered section refs ---------- */
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });

  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" });

  const projectsRef = useRef(null);
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" });

  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  /* ---------- Project hover state ---------- */
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  /* ---------- Split text helper (inline) ---------- */
  const splitText = (text: string, delay = 0) => (
    <span className="inline-block overflow-hidden align-bottom">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );

  const sectionLabel = (number: string, label: string, center = false) => (
    <div className={`flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground ${center ? "justify-center" : ""}`}>
      <span className="text-primary">{number}</span>
      <span className="w-8 h-px bg-border" />
      <span>{label}</span>
    </div>
  );

  return (
    <div className="grain min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ============ NAV ============ */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 backdrop-blur-md bg-background/40 border-b border-border"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#top" className="font-display font-bold text-xl tracking-tight">
            PRINCE<span className="text-primary">.</span>
          </a>
          
          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider hover:scale-105 transition"
            >
              Let's Talk →
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <ul className="flex flex-col gap-4 font-mono text-sm uppercase tracking-widest pb-4">
                <li>
                  <a
                    href="#top"
                    className="block hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      setTimeout(() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                  >
                    Home
                  </a>
                </li>
                {NAV_ITEMS.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="block hover:text-primary transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        setTimeout(() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }), 100);
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-full bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider hover:scale-105 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    }}
                  >
                    Let's Talk →
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ============ HERO ============ */}
      <section ref={heroRef} id="top" className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute -top-20 -left-32 w-[500px] h-[500px] rounded-full bg-primary/30 blur-3xl blob" />
        <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] rounded-full bg-accent/30 blur-3xl blob" style={{ animationDelay: "-5s" }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-secondary/20 blur-3xl blob" style={{ animationDelay: "-9s" }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/60 backdrop-blur font-mono text-[10px] uppercase tracking-widest"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for work · 2026
            </motion.div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Hello, I'm</p>
              <h1 className="font-display font-bold leading-[0.9] tracking-tighter text-[clamp(3rem,10vw,9rem)]">
                {splitText("PRINCE")}
                <span className="block text-primary">{splitText("SHARMA.", 0.4)}</span>
              </h1>
              <p className="mt-4 font-mono text-sm md:text-base text-muted-foreground">
                <span className="text-primary">→</span> {nameText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              Full-stack developer crafting <span className="text-foreground font-medium">elegant, high-performance</span> web experiences — from pixel-perfect interfaces to scalable backends.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                ref={ghBtnRef}
                href="https://github.com/princex100"
                target="_blank"
                rel="noreferrer"
                style={{ x: ghSX, y: ghSY }}
                {...ghHandlers}
                className="relative inline-flex items-center gap-2 px-7 py-4 rounded-full font-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                View GitHub
              </motion.a>
              <motion.a
                ref={rzBtnRef}
                href="https://drive.google.com/file/d/1CB87_5yYud-mK2mfXdlFrYPQudzbQdRE/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                style={{ x: rzSX, y: rzSY }}
                {...rzHandlers}
                className="relative inline-flex items-center gap-2 px-7 py-4 rounded-full font-mono text-xs uppercase tracking-widest border border-border bg-surface/40 backdrop-blur hover:bg-surface transition-colors"
              >
                Get Resume ↗
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              <div className="absolute -inset-6 spin-slow opacity-60">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <path id="circle" d="M 100, 100 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0" />
                  </defs>
                  <text className="fill-foreground font-mono text-[9px] tracking-[0.4em] uppercase">
                    <textPath href="#circle">FULL STACK · REACT · NODE · DESIGN · BUILD · SHIP · </textPath>
                  </text>
                </svg>
              </div>

              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-primary/40 bg-surface group">
                <img src="/assets/prince.jpeg" alt="Prince" className="absolute inset-0 w-full h-full object-cover z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 z-20 mix-blend-overlay" />
                
                <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-foreground/80 z-20 bg-background/50 backdrop-blur px-2 py-1 rounded">● REC</div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-foreground/80 z-20 bg-background/50 backdrop-blur px-2 py-1 rounded">26°N · IND</div>
              </div>

            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex flex-col items-center gap-2"
        >
          Scroll
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-8 bg-foreground/40" />
        </motion.div>
      </section>

      {/* ============ MARQUEE ============ */}
      <section className="border-y border-border bg-surface/30 py-6 overflow-hidden">
        <div className="flex marquee-track gap-12 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-12 font-display font-bold text-3xl md:text-5xl tracking-tight">
              <span className={i % 2 === 0 ? "text-foreground" : "text-stroke"}>{item}</span>
              <span className="text-primary text-2xl">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" ref={aboutRef} className="relative px-6 md:px-12 py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">{sectionLabel("01", "About")}</div>
          <div className="lg:col-span-8 space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="font-display font-bold text-4xl md:text-6xl leading-tight tracking-tight"
            >
              I build <span className="text-primary italic">elegant</span> products that solve real problems — fast, accessible, and built to scale.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              I'm an Information Technology undergraduate at JSS Academy of Technical Education, passionate about building full-stack web applications. With a strong foundation in Data Structures, Algorithms, and the MERN stack, I focus on engineering secure, scalable solutions with elegant designs. When I'm not developing, I'm actively solving competitive programming problems on platforms like LeetCode.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-border">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="font-display font-bold text-4xl text-primary">{s.num}</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SKILLS ============ */}
      <section id="skills" ref={skillsRef} className="relative px-6 md:px-12 py-32 bg-surface/40 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-4">{sectionLabel("02", "Skills")}</div>
            <div className="lg:col-span-8">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="font-display font-bold text-4xl md:text-6xl tracking-tight"
              >
                My skills.
              </motion.h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.04, duration: 0.6 }}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 hover:border-primary transition-colors"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-display font-bold text-base md:text-lg">{skill.name}</h3>
                  <span className="font-mono text-[10px] text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={skillsInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-primary"
                  />
                </div>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section id="projects" ref={projectsRef} className="relative px-6 md:px-12 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-4">{sectionLabel("03", "Work")}</div>
            <div className="lg:col-span-8">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="font-display font-bold text-4xl md:text-6xl tracking-tight"
              >
                My <span className="text-primary italic">projects.</span>
              </motion.h2>
            </div>
          </div>

          <div className="space-y-6">
            {PROJECTS.map((p, i) => (
              <motion.a
                key={p.title}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 40 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative block rounded-3xl border border-border bg-card overflow-hidden hover:border-primary/60 transition-colors"
              >
                <div className="grid md:grid-cols-12 gap-6 p-6 md:p-10 items-center">
                  <div className="md:col-span-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {p.year}
                  </div>
                  <div className="md:col-span-6 space-y-3">
                    <h3 className="font-display font-bold text-3xl md:text-5xl tracking-tight group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground max-w-lg">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {p.tech.map((t) => (
                        <span key={t} className={`px-3 py-1 rounded-full border text-xs font-mono ${t === "Coming Soon" ? "bg-primary text-primary-foreground border-primary animate-pulse font-bold" : "border-border"}`}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-4 flex md:justify-end">
                    <motion.div
                      animate={{ rotate: hoveredProject === i ? -45 : 0, scale: hoveredProject === i ? 1.1 : 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl"
                    >
                      →
                    </motion.div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-primary transition-all duration-700" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" ref={contactRef} className="relative px-6 md:px-12 py-32 bg-surface/40 border-t border-border overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          {sectionLabel("04", "Contact", true)}

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mt-8 font-display font-bold tracking-tighter leading-[0.9] text-[clamp(3rem,12vw,10rem)]"
          >
            Let's <span className="text-primary italic">build.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto"
          >
            I'm currently open for new opportunities. Got a project, a question, or just want to say hi? Pick your channel.
          </motion.p>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {CONTACTS.map((c, i) => (
              <motion.a
                key={c.name}
                href={c.link}
                target={c.link.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={contactInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="group relative p-6 rounded-2xl border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <div className="font-display font-bold text-xl">{c.name}</div>
                <div className="mt-2 font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">→ Reach out</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="px-6 md:px-12 py-10 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <div>© {new Date().getFullYear()} Prince Sharma</div>
          <div>Designed & built with React</div>
          <a href="#top" className="hover:text-primary transition">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
