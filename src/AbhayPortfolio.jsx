import { useState, useEffect, useRef } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────
const DATA = {
  name: "Abhay Sahu",
  title: "Full-Stack Developer",
  location: "Jhansi, UP",
  email: "abhaysahugit@gmail.com",
  phone: "+91-8810811257",
  linkedin: "https://linkedin.com/in/YOUR_LINKEDIN", // ← update
  github: "https://github.com/abhaysahugit",

  about:
    "I'm a Computer Science student at Roorkee Institute of Technology, building full-stack applications that are fast, scalable, and thoughtfully designed. From real-time chat systems to finance dashboards with role-based access, I work across the entire stack — from system design to deployment on AWS and Vercel.",

  stats: [
    { num: "3+", label: "Production Projects" },
    { num: "10+", label: "Technologies" },
    { num: "1yr", label: "Industry Experience" },
    { num: "∞", label: "Curiosity" },
  ],

  skills: [
    {
      icon: "⟨⟩",
      category: "Languages",
      tags: [
        { label: "JavaScript", color: "purple" },
        { label: "TypeScript", color: "purple" },
        { label: "Python", color: "neutral" },
        { label: "C++", color: "neutral" },
      ],
    },
    {
      icon: "◈",
      category: "Frontend",
      tags: [
        { label: "React", color: "purple" },
        { label: "Next.js", color: "purple" },
        { label: "Tailwind CSS", color: "teal" },
        { label: "Redux", color: "teal" },
        { label: "HTML5 / CSS3", color: "neutral" },
        { label: "Recharts", color: "neutral" },
      ],
    },
    {
      icon: "⬡",
      category: "Backend",
      tags: [
        { label: "Node.js", color: "purple" },
        { label: "Express", color: "purple" },
        { label: "GraphQL", color: "teal" },
        { label: "Apollo Server", color: "teal" },
        { label: "Socket.io", color: "amber" },
        { label: "REST APIs", color: "neutral" },
      ],
    },
    {
      icon: "◎",
      category: "Databases & Tools",
      tags: [
        { label: "MongoDB", color: "purple" },
        { label: "Prisma ORM", color: "teal" },
        { label: "Firebase", color: "neutral" },
        { label: "AWS", color: "amber" },
        { label: "JWT / Bcrypt", color: "neutral" },
        { label: "Git / CI/CD", color: "neutral" },
        { label: "RBAC", color: "neutral" },
      ],
    },
  ],

  experience: [
    {
      role: "Full Stack Development Intern",
      company: "Explorin Academy",
      location: "Moradabad",
      date: "Jul – Aug 2025",
      bullets: [
        "Built and deployed full-stack features using React, Node.js, and MongoDB in an agile sprint environment",
        "Collaborated with cross-functional teams on system design, implementation, and production deployments",
        "Maintained code quality through peer reviews, linting standards, and structured sprint cycles",
      ],
    },
  ],

  projects: [
    {
      num: "01",
      name: "DevZoo",
      stack: [
        "MongoDB",
        "Express",
        "React",
        "Node.js",
        "Socket.io",
        "JWT",
        "AWS",
      ],
      desc: "Tinder-style developer networking platform with swipe-based match UI, real-time chat via Socket.io, and an interest-based feed algorithm. Engineered an optimized Feed API with server-side filtering, pagination, and connection-state logic.",
      github: "https://github.com/abhaysahu1008/Connect_Us", // ← update
      live: "https://devzoo.in", // ← update
    },
    {
      num: "02",
      name: "Idealoop",
      stack: ["Next.js", "App Router", "NextAuth", "Prisma", "TypeScript"],
      desc: "Community discussion platform enabling users to create topics, publish posts, and engage through nested comments. Built with Next.js App Router for SSR, NextAuth for OAuth, and a normalized Prisma data model.",
      github: "https://github.com/abhaysahu1008/DiscussApp", // ← update
      live: null,
    },
    {
      num: "03",
      name: "FinTrack Dashboard",
      stack: ["React", "Redux", "Recharts", "RBAC", "Vercel"],
      desc: "Personal finance tracker with dynamic dashboards visualizing income, expenses, and savings via Recharts. Features Admin/Viewer role-based access control with permission-gated UI and real-time KPI cards.",
      github: "https://github.com/abhaysahu1008/Fintrack-Dashboard", // ← update
      live: "https://fintrack-dashboard-tyzp.vercel.app/", // ← update
    },
  ],

  education: {
    degree: "B.Tech in Computer Science",
    school: "Roorkee Institute of Technology",
    date: "Sept 2022 – Present",
  },
};

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useFadeUp() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0 }) {
  const [ref, visible] = useFadeUp();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ${delay}ms, transform 0.7s ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Tag({ label, color }) {
  const colors = {
    purple: {
      bg: "rgba(124,106,247,0.12)",
      color: "#a89cf7",
      border: "rgba(124,106,247,0.25)",
    },
    teal: {
      bg: "rgba(78,205,196,0.12)",
      color: "#4ecdc4",
      border: "rgba(78,205,196,0.25)",
    },
    amber: {
      bg: "rgba(247,201,72,0.12)",
      color: "#f7c948",
      border: "rgba(247,201,72,0.25)",
    },
    neutral: {
      bg: "rgba(255,255,255,0.05)",
      color: "#8888a8",
      border: "rgba(255,255,255,0.1)",
    },
  };
  const c = colors[color] || colors.neutral;
  return (
    <span
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.7rem",
        padding: "0.3rem 0.7rem",
        borderRadius: 4,
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
      }}
    >
      {label}
    </span>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ── SECTIONS ─────────────────────────────────────────────────────────────────

function Nav({ active }) {
  const links = ["about", "skills", "experience", "projects", "contact"];
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.2rem 4rem",
        background: "rgba(10,10,15,0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <a
        href="#hero"
        style={{
          fontFamily: "'Syne',sans-serif",
          fontWeight: 800,
          fontSize: "1.05rem",
          letterSpacing: "-0.02em",
          color: "#e8e8f0",
          textDecoration: "none",
        }}
      >
        A<span style={{ color: "#7c6af7" }}>.</span>Sahu
      </a>
      <ul
        style={{
          display: "flex",
          gap: "2.5rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {links.map((l) => (
          <li key={l}>
            <a
              href={`#${l}`}
              style={{
                fontSize: "0.78rem",
                fontWeight: 400,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: active === l ? "#e8e8f0" : "#8888a8",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
      <a
        href={`mailto:${DATA.email}`}
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: "0.75rem",
          padding: "0.5rem 1.1rem",
          border: "1px solid #7c6af7",
          color: "#7c6af7",
          background: "transparent",
          borderRadius: 4,
          cursor: "pointer",
          textDecoration: "none",
          transition: "all 0.2s",
        }}
      >
        hire me
      </a>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "8rem 4rem 5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(124,106,247,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,106,247,0.04) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* glow */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "8%",
          width: "55vw",
          height: "55vw",
          maxWidth: 750,
          maxHeight: 750,
          background:
            "radial-gradient(circle,rgba(124,106,247,0.13) 0%,transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
        {/* badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.72rem",
            fontWeight: 500,
            color: "#4ecdc4",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            border: "1px solid rgba(78,205,196,0.3)",
            padding: "0.38rem 0.9rem",
            borderRadius: 50,
            marginBottom: "1.8rem",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4ecdc4",
              animation: "pulse 2s infinite",
              display: "inline-block",
            }}
          />
          Available for opportunities
        </div>
        <h1
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: "clamp(3.4rem,7vw,5.8rem)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            margin: "0 0 1.4rem",
          }}
        >
          Abhay <span style={{ color: "#7c6af7" }}>Sahu</span>
          <span
            style={{
              display: "block",
              background: "linear-gradient(135deg,#e8e8f0 0%,#8888a8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Full-Stack Developer
          </span>
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "#8888a8",
            maxWidth: 560,
            lineHeight: 1.85,
            marginBottom: "2.2rem",
            fontWeight: 300,
          }}
        >
          Building{" "}
          <strong style={{ color: "#e8e8f0", fontWeight: 400 }}>
            scalable, production-ready
          </strong>{" "}
          web applications with React, Next.js &amp; Node.js. Passionate about{" "}
          <strong style={{ color: "#e8e8f0", fontWeight: 400 }}>
            clean architecture
          </strong>
          , AI integration, and seamless UX.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              padding: "0.85rem 2rem",
              borderRadius: 6,
              background: "#7c6af7",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            View Projects →
          </a>
          <a
            href={`mailto:${DATA.email}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              padding: "0.85rem 2rem",
              borderRadius: 6,
              background: "transparent",
              color: "#e8e8f0",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "7rem 4rem", background: "#12121a" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
        }}
      >
        <FadeUp>
          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#7c6af7",
              marginBottom: "0.6rem",
            }}
          >
            / About Me
          </div>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(1.9rem,3.2vw,2.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "1.2rem",
              color: "#e8e8f0",
            }}
          >
            Crafting digital experiences from front to back
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#8888a8",
              lineHeight: 1.9,
              fontWeight: 300,
            }}
          >
            {DATA.about}
          </p>
        </FadeUp>
        <FadeUp delay={100}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.2rem",
            }}
          >
            {DATA.stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#1e1e2e",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "1.5rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "linear-gradient(90deg,#7c6af7,#4ecdc4)",
                  }}
                />
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "2.1rem",
                    fontWeight: 800,
                    color: "#e8e8f0",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: "0.35rem",
                  }}
                >
                  <span style={{ color: "#7c6af7" }}>{s.num}</span>
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#8888a8",
                    fontWeight: 300,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      style={{ padding: "7rem 4rem", background: "#0a0a0f" }}
    >
      <FadeUp>
        <div
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#7c6af7",
            marginBottom: "0.6rem",
          }}
        >
          / Technical Stack
        </div>
        <h2
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: "clamp(1.9rem,3.2vw,2.8rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#e8e8f0",
            marginBottom: "3rem",
          }}
        >
          What I work with
        </h2>
      </FadeUp>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "1.4rem",
        }}
      >
        {DATA.skills.map((s, i) => (
          <FadeUp key={s.category} delay={i * 60}>
            <div
              style={{
                background: "#1e1e2e",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "1.75rem",
                height: "100%",
              }}
            >
              <div style={{ fontSize: "1.3rem", marginBottom: "0.9rem" }}>
                {s.icon}
              </div>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "#8888a8",
                  marginBottom: "1.1rem",
                }}
              >
                {s.category}
              </div>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}
              >
                {s.tags.map((t) => (
                  <Tag key={t.label} {...t} />
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      style={{ padding: "7rem 4rem", background: "#12121a" }}
    >
      <FadeUp>
        <div
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#7c6af7",
            marginBottom: "0.6rem",
          }}
        >
          / Experience
        </div>
        <h2
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: "clamp(1.9rem,3.2vw,2.8rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#e8e8f0",
            marginBottom: "3.5rem",
          }}
        >
          Where I've worked
        </h2>
      </FadeUp>
      <div style={{ position: "relative", paddingLeft: 0 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 1,
            background: "linear-gradient(to bottom,#7c6af7,transparent)",
          }}
        />
        {DATA.experience.map((e, i) => (
          <FadeUp key={i} delay={i * 80}>
            <div
              style={{
                paddingLeft: "2.5rem",
                paddingBottom: "3rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -5,
                  top: 5,
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: "#7c6af7",
                  border: "2px solid #12121a",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "0.7rem",
                    color: "#4ecdc4",
                    letterSpacing: "0.08em",
                    border: "1px solid rgba(78,205,196,0.25)",
                    padding: "0.18rem 0.6rem",
                    borderRadius: 3,
                  }}
                >
                  {e.date}
                </span>
                <span style={{ fontSize: "0.83rem", color: "#8888a8" }}>
                  {e.company}, {e.location}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#e8e8f0",
                  marginBottom: "1rem",
                }}
              >
                {e.role}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.55rem",
                }}
              >
                {e.bullets.map((b, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: "0.93rem",
                      color: "#8888a8",
                      paddingLeft: "1.2rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        color: "#7c6af7",
                        fontSize: "0.6rem",
                        top: "0.3rem",
                      }}
                    >
                      ▸
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      style={{ padding: "7rem 4rem", background: "#0a0a0f" }}
    >
      <FadeUp>
        <div
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#7c6af7",
            marginBottom: "0.6rem",
          }}
        >
          / Projects
        </div>
        <h2
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: "clamp(1.9rem,3.2vw,2.8rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#e8e8f0",
            marginBottom: "3.5rem",
          }}
        >
          Things I've built
        </h2>
      </FadeUp>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "1.5rem",
        }}
      >
        {DATA.projects.map((p, i) => (
          <FadeUp key={p.name} delay={i * 80}>
            <div
              style={{
                background: "#1e1e2e",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.68rem",
                  color: "#4a4a6a",
                  marginBottom: "1.1rem",
                }}
              >
                {p.num} / {p.stack.join(" • ")}
              </div>
              <div
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#e8e8f0",
                  marginBottom: "0.7rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {p.name}
              </div>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "#8888a8",
                  lineHeight: 1.75,
                  marginBottom: "1.5rem",
                  flex: 1,
                }}
              >
                {p.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.4rem",
                  marginBottom: "1.6rem",
                }}
              >
                {p.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "0.63rem",
                      padding: "0.22rem 0.55rem",
                      borderRadius: 3,
                      background: "rgba(255,255,255,0.04)",
                      color: "#4a4a6a",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1.2rem" }}>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "0.73rem",
                    fontWeight: 500,
                    color: "#7c6af7",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <GitHubIcon /> GitHub
                </a>
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "0.73rem",
                      fontWeight: 500,
                      color: "#4ecdc4",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <ExternalIcon /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "7rem 4rem",
        background: "#12121a",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <FadeUp>
          <div
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#7c6af7",
              marginBottom: "0.6rem",
            }}
          >
            / Get In Touch
          </div>
          <h2
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(1.9rem,3.2vw,2.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#e8e8f0",
              marginBottom: "1rem",
            }}
          >
            Let's work together
          </h2>
          <p style={{ fontSize: "1rem", color: "#8888a8", lineHeight: 1.8 }}>
            I'm actively looking for full-stack roles and exciting projects.
            Whether you have an opportunity or just want to say hello — my inbox
            is open.
          </p>
          <a
            href={`mailto:${DATA.email}`}
            style={{
              display: "inline-block",
              margin: "2.2rem 0 1.5rem",
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(1.1rem,2.5vw,1.6rem)",
              fontWeight: 700,
              color: "#e8e8f0",
              textDecoration: "none",
              letterSpacing: "-0.02em",
              borderBottom: "2px solid #7c6af7",
              paddingBottom: "0.2rem",
            }}
          >
            {DATA.email}
          </a>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "LinkedIn", href: DATA.linkedin },
              { label: "GitHub", href: DATA.github },
              { label: DATA.phone, href: `tel:${DATA.phone}` },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.75rem",
                  color: "#8888a8",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "skills",
      "experience",
      "projects",
      "contact",
    ];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { threshold: 0.4 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0f; color: #e8e8f0; font-family: 'DM Sans', sans-serif; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @media (max-width: 860px) {
          nav { padding: 1.1rem 1.5rem !important; }
          nav ul { display: none !important; }
          section { padding: 5rem 1.5rem !important; }
          #hero { padding: 7rem 1.5rem 4rem !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
      <Nav active={activeSection} />
      <Hero />
      <div className="about-grid" style={{ display: "contents" }}>
        <About />
      </div>
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <footer
        style={{
          padding: "2.2rem 4rem",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0a0a0f",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            color: "#4a4a6a",
            fontFamily: "'DM Mono',monospace",
          }}
        >
          © 2026 Abhay Sahu — {DATA.location}
        </p>
        <p
          style={{
            fontSize: "0.75rem",
            color: "#4a4a6a",
            fontFamily: "'DM Mono',monospace",
          }}
        >
          Built with ♥ and clean code
        </p>
      </footer>
    </>
  );
}
