import { lazy, Suspense, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowDownRight, ArrowRight, Download, ExternalLink, Github, Linkedin, Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ProjectVisual, type ProjectKind } from "./ProjectVisuals";

const CoreScene = lazy(() => import("./CoreScene").then((module) => ({ default: module.CoreScene })));
const LINKEDIN = "https://linkedin.com/in/yogender-singh-957952270/";
const GITHUB = "https://github.com/Yogender-Singh";
const technologies = ["Python", "JavaScript", "PHP", "C", "SQL", "Django", "Laravel", "Deep Learning", "Computer Vision", "AWS", "Azure", "Git", "Linux", "MySQL"];
const projects: Array<{ id: string; kind: ProjectKind; title: string; category: string; description: string; tech: string[]; year: string; details: string }> = [
  { id: "01", kind: "moodsync", title: "MoodSync", category: "AI / Computer Vision", description: "Emotion-adaptive music recommendation using facial-expression recognition, deep learning and computer vision.", tech: ["Python", "Deep Learning", "Computer Vision"], year: "2025", details: "MoodSync studies the path from a live facial signal to an interpretable mood representation, then uses that state to guide music recommendations. The experience is designed around clarity, responsiveness and responsible presentation of inferred emotion." },
  { id: "02", kind: "ovoo", title: "OVOO OTT Platform", category: "Product / Streaming", description: "A cross-platform streaming experience connecting a mobile application with a web platform for live TV and movies.", tech: ["Cross-platform", "Streaming", "Product Design"], year: "2024", details: "OVOO brings film discovery, live channels and playback into one coherent viewing system across web and mobile. The product concept emphasizes fast browsing, legible media hierarchy and a cinematic interface that stays out of the way." },
  { id: "03", kind: "rental", title: "Car & Bike Rental Management", category: "Full-stack", description: "A complete rental operations system for vehicles, availability, bookings, pricing and reservation management.", tech: ["Laravel", "PHP", "MySQL"], year: "2024", details: "A full-stack operations product built to make fleet status immediately understandable. Vehicle inventory, reservation windows, pricing and booking states are connected in a single management workflow." },
  { id: "04", kind: "telegram", title: "Telegram Automation Bot", category: "Automation", description: "A resilient automation service connecting Telegram, external APIs and background processing on a Linux VPS.", tech: ["Python", "APIs", "Linux VPS"], year: "2023", details: "An always-on automation workflow designed around API integration, background jobs and reliable server operation. The system turns incoming Telegram interactions into structured tasks handled by a dedicated worker." },
];
const capabilities = [
  ["AI / ML", "Python · Deep Learning · Intelligent systems"], ["Computer Vision", "Facial analysis · Image pipelines · OpenCV"], ["Backend Development", "Django · Laravel · APIs · SQL"], ["Frontend Development", "JavaScript · Responsive interfaces · Product UI"], ["Mobile Development", "Cross-platform experiences · Connected products"], ["Cloud / Infrastructure", "AWS · Azure · Linux · Deployment"], ["Automation", "Python bots · Workers · API orchestration"],
];
const education = [
  ["M.Tech", "Computer Science & Engineering", "Lovely Professional University", "2025 — Present"], ["B.Tech", "Computer Science & Engineering", "Lovely Professional University", "2022 — 2025"], ["Diploma", "Computer Science & Engineering", "Lovely Professional University", "2019 — 2022"],
];

function usePageEffects(reduced: boolean) {
  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    let lastY = window.scrollY;
    let timer = 0;
    const onPointer = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    };
    const onScroll = () => {
      const velocity = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      document.documentElement.style.setProperty("--scroll-blur", `${Math.min(velocity * 0.035, 1.8)}px`);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => document.documentElement.style.setProperty("--scroll-blur", "0px"), 70);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.clearTimeout(timer); window.removeEventListener("pointermove", onPointer); window.removeEventListener("scroll", onScroll); };
  }, [reduced]);
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { if (dot.current) dot.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`; }); };
    const over = (event: PointerEvent) => setLabel((event.target as HTMLElement).closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "");
    window.addEventListener("pointermove", move, { passive: true }); window.addEventListener("pointerover", over, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); };
  }, []);
  return <div ref={dot} className={`custom-cursor ${label ? "cursor-active" : ""}`} aria-hidden="true"><span>{label}</span></div>;
}

function Navigation() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false); const [hidden, setHidden] = useState(false);
  useEffect(() => { let previous = window.scrollY; const update = () => { const y = window.scrollY; setScrolled(y > 24); setHidden(y > previous && y > 160 && !open); previous = y; }; window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, [open]);
  const nav = ["Work", "About", "Research", "Contact"];
  return <header className={`site-nav ${scrolled ? "is-scrolled" : ""} ${hidden ? "is-hidden" : ""}`}><a className="nav-mark" href="#top" aria-label="Yogender Singh home">YS</a><nav aria-label="Primary navigation">{nav.map(item => <a key={item} href={`#${item.toLowerCase()}`} data-cursor="OPEN">{item}</a>)}</nav><a className="nav-resume" href="/Yogender-Singh-Resume.pdf" download data-cursor="OPEN">Résumé <ArrowDownRight /></a><Button variant="ghost" size="icon" className="menu-button" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></Button>{open && <div className="mobile-menu"><Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setOpen(false)}><X /></Button><nav>{nav.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}<a href="/Yogender-Singh-Resume.pdf" download>Résumé</a></nav><span>AI/ML · SOFTWARE · RESEARCH</span></div>}</header>;
}

function MagneticLink({ href, children, secondary = false, download = false }: { href: string; children: React.ReactNode; secondary?: boolean; download?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null); const reduced = useReducedMotion();
  const move = (event: ReactMouseEvent<HTMLAnchorElement>) => { if (reduced || !ref.current) return; const rect = ref.current.getBoundingClientRect(); ref.current.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .12}px, ${(event.clientY - rect.top - rect.height / 2) * .16}px)`; };
  return <a ref={ref} href={href} download={download} onMouseMove={move} onMouseLeave={() => { if (ref.current) ref.current.style.transform = "translate(0,0)"; }} className={`hero-cta ${secondary ? "secondary" : ""}`} data-cursor="OPEN">{children}</a>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: .18 }} transition={{ duration: .85, ease: [.22, .61, .36, 1] }}>{children}</motion.div>;
}

export default function Portfolio() {
  const reduced = useReducedMotion() ?? false; const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  usePageEffects(reduced);
  return <><Cursor /><Navigation /><main id="top">
    <section className="hero section-shell" aria-labelledby="hero-title"><div className="hero-copy"><motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}>AI/ML · SOFTWARE ENGINEER</motion.p><h1 id="hero-title"><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: .9, ease: [.22,.61,.36,1] }}>Yogender</motion.span><motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: .9, delay: .08, ease: [.22,.61,.36,1] }}>Singh.</motion.span></h1><motion.p className="hero-lede" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .4 }}>Building intelligent software across AI/ML, computer vision and full-stack engineering.</motion.p><motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }}><MagneticLink href="#work">Explore my work <ArrowDownRight /></MagneticLink><MagneticLink href="/Yogender-Singh-Resume.pdf" secondary download>Download résumé <Download /></MagneticLink></motion.div></div>
    <motion.div className="core-wrap" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: .15 }}><div className="core-halo" /><Suspense fallback={<div className="core-fallback"><i /><i /><i /></div>}><CoreScene reduced={reduced} /></Suspense>{[["PYTHON","label-a"],["AI / ML","label-b"],["COMPUTER VISION","label-c"],["FULL STACK","label-d"]].map(([label, cls]) => <span className={`core-label ${cls}`} key={label}>{label}</span>)}</motion.div><div className="scroll-cue"><span>Scroll to explore</span><i /></div></section>

    <section id="about" className="about section-shell"><Reveal><p className="section-index">01 / ABOUT</p><div className="about-grid"><h2>Engineering<br />with curiosity.</h2><div><p>I work across intelligent systems and product engineering—connecting research-minded exploration with software that people can actually use.</p><div className="disciplines"><span>AI / ML</span><span>Computer Vision</span><span>Full-stack</span><span>Mobile</span><span>Automation</span></div></div></div></Reveal><div className="ticker" aria-label={`Technologies: ${technologies.join(", ")}`}><div>{[...technologies,...technologies].map((tech, i) => <span key={`${tech}-${i}`}>{tech}<b>✦</b></span>)}</div></div></section>

    <section id="work" className="work section-shell"><Reveal className="section-heading"><p className="section-index">02 / SELECTED WORK</p><h2>Selected Work</h2><p>Systems where intelligence, infrastructure and considered interfaces meet.</p></Reveal><div className="project-list">{projects.map(project => <Reveal key={project.id}><article className="project" data-cursor="VIEW"><button className="project-hit" onClick={() => setSelected(project)} aria-label={`View ${project.title} project details`} /><div className="project-meta"><span>{project.id}</span><span>{project.category}</span><span>{project.year}</span></div><div className="project-visual"><ProjectVisual kind={project.kind} /></div><div className="project-copy"><div><h3>{project.title}</h3><p>{project.description}</p><ul>{project.tech.map(item => <li key={item}>{item}</li>)}</ul></div><span className="project-arrow"><ArrowRight /></span></div></article></Reveal>)}</div></section>

    <section id="research" className="research section-shell"><Reveal><p className="section-index">03 / RESEARCH</p><div className="research-grid"><div><h2>From expression<br />to sound.</h2><p>A research direction exploring how visible expression can become an interpretable emotional state and guide context-aware music recommendation.</p><span className="submission">Submitted to BEDAIMIL Conference · 2025</span></div><div className="research-flow" role="img" aria-label="Facial expression to emotion recognition to mood representation to music recommendation">{["Facial expression", "Emotion recognition", "Mood representation", "Music recommendation"].map((item, i) => <div key={item}><span>{String(i+1).padStart(2,"0")}</span><strong>{item}</strong>{i < 3 && <i />}</div>)}</div></div></Reveal></section>

    <section className="capabilities section-shell"><Reveal><p className="section-index">04 / CAPABILITIES</p><h2>Built across<br />the stack.</h2></Reveal><div className="capability-list">{capabilities.map(([title, tech], i) => <Reveal key={title}><div className="capability-row" tabIndex={0}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{tech}</p><ArrowRight /></div></Reveal>)}</div></section>

    <section className="education section-shell"><Reveal><p className="section-index">05 / EDUCATION</p><h2>A foundation<br />in computer science.</h2><div className="timeline">{education.map(([degree, field, university, period]) => <div key={degree}><i /><span>{period}</span><h3>{degree}</h3><p>{field}</p><small>{university}</small></div>)}</div></Reveal></section>

    <section id="contact" className="contact section-shell"><Reveal><div className="contact-surface"><span className="contact-light" /><p className="section-index">06 / CONTACT</p><h2>Let&apos;s build<br />something real.</h2><a className="contact-email" href="mailto:yogendersingh257@gmail.com" data-cursor="OPEN">yogendersingh257@gmail.com <ArrowUpRightIcon /></a><div className="contact-links"><a href={LINKEDIN} target="_blank" rel="noreferrer" data-cursor="OPEN"><Linkedin /> LinkedIn</a><a href={GITHUB} target="_blank" rel="noreferrer" data-cursor="OPEN"><Github /> GitHub</a></div></div></Reveal></section>
  </main><footer><a href="#top">YOGENDER SINGH</a><span>AI/ML · SOFTWARE · RESEARCH</span><nav><a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a><a href="/Yogender-Singh-Resume.pdf" download>Résumé</a></nav><small>© 2026</small></footer>
  <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>{selected && <DialogContent className="project-dialog"><div className="dialog-visual"><ProjectVisual kind={selected.kind} /></div><div className="dialog-copy"><span>{selected.category} · {selected.year}</span><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{selected.details}</DialogDescription><ul>{selected.tech.map(item => <li key={item}>{item}</li>)}</ul></div></DialogContent>}</Dialog></>;
}

function ArrowUpRightIcon() { return <ExternalLink aria-hidden="true" />; }
