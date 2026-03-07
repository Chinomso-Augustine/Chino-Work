import { Link } from "react-router-dom";
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 text-slate-900 px-6 md:px-20 py-16">
      <Hero />

      <div className="grid md:grid-cols-3 gap-12 mt-8">
        <div className="md:col-span-1 space-y-10">
          <Education />
          <Clubs />
          <Contact />
        </div>

        <div className="md:col-span-2 space-y-10">
          <Projects />
          <GroupProject />
          <Services />
          <Tools />
        </div>
      </div>
    </div>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="min-h-[62vh] md:min-h-[46vh] flex flex-col justify-center">
      <h1 className="text-4xl font-semibold mb-10 text-center">
        Chinomso Augustine
      </h1>

      <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row gap-10 items-center md:items-center justify-center md:justify-between">
        <div className="w-72 h-72 bg-blue-100 rounded-xl flex items-center justify-center text-blue-300 md:-ml-10">
          <img
            src="/PP.JPG"
            alt="Chinomso Augustine"
            className="w-72 h-72 object-cover rounded-xl shadow-sm"

          />
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-4">
            Hi there,
          </h2>

          <p className="text-blue-950/85 max-w-xl">
            I’m <span className="font-semibold">Chinomso Augustine</span>, a 3rd
            year UI/UX Designer and UI Engineer at UC Davis.
            What’s on your mind? Let’s figmatize it.
          </p>

          <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
            <Link
              to="/About"
              className="px-4 py-2 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition text-sm"
            >
              About Me
            </Link>

            <Button text="Resume" to="/resume" />
            <Button
              text="LinkedIn"
              href="https://www.linkedin.com/in/chinomso-augustine-ba9a29258/"
            />
            <Button
              text="Github"
              href="https://github.com/Chinomso-Augustine"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- EDUCATION ---------------- */

function Education() {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Education</h3>

      <div className="bg-blue-50 rounded-lg px-4 py-3 text-sm mb-6">
        Design Major & Computer Science Minor
      </div>

      <h4 className="font-semibold mb-3">Skill Set</h4>
      <ul className="space-y-2 text-sm text-blue-950/85 mb-6">
        <li>Prototype</li>
        <li>Wireframe</li>
        <li>Coding — HTML, CSS, JavaScript</li>
        <li>UX Research</li>
      </ul>

      <h4 className="font-semibold mb-3">Certifications</h4>
      <ul className="space-y-2 text-sm text-blue-950/85">
        <li>UI/UX Wireframing — SkillUp</li>
        <li>Intro to Front End Development — Meta</li>
        <li>Programming with JavaScript — Meta</li>
        <li>Object-Oriented Programming in C++</li>
      </ul>
    </Card>
  );
}

/* ---------------- SERVICES ---------------- */

function Services() {
  const services = [
    "Website Designing",
    "Graphic Designing",
    "Photography",
    "Social Media Management",
    "Content Creation",
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-2">
        My Services
      </h3>

      <p className="text-sm text-blue-900/80 mb-6">
        Checkout services offered by me
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-blue-50 px-4 py-3 rounded-lg text-sm hover:bg-blue-100 transition"
          >
            {service}
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------------- TOOLS ---------------- */

function Tools() {
  const tools = [
    { name: "Figma", level: "Intermediate" },
    { name: "Adobe Illustrator", level: "Intermediate" },
    { name: "Adobe Photoshop", level: "Intermediate" },
    { name: "Lightroom", level: "Expert" },
    { name: "Canva", level: "Expert" },
    { name: "Sony a7iii & a7rii", level: "Expert" },
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-6">Tools</h3>

      <div className="grid md:grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white border border-blue-200 rounded-lg p-4"
          >
            <p className="font-medium">{tool.name}</p>

            <span
              className={`inline-block mt-2 text-xs px-2 py-1 rounded 
              ${tool.level === "Expert"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-100 text-blue-800"
                }`}
            >
              {tool.level}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------------- PROJECTS ---------------- */

function Projects() {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-6">
        Case Study and Projects
      </h3>

      <Link
        to="/case1"
        className="block h-44 rounded-lg overflow-hidden relative group ring-1 ring-violet-300/60"
      >
        <img
          src="/PP.JPG"
          alt="CampusConnect case study preview"
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-fuchsia-800/30 to-indigo-950/70 group-hover:from-violet-900/25 group-hover:to-indigo-950/80 transition" />
        <div className="absolute inset-0 flex items-end">
          <p className="text-white text-base font-medium px-4 py-3">CampusConnect</p>
        </div>
      </Link>
    </Card>
  );
}

function GroupProject() {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">
        Group Project
      </h3>

      <Link
        to="/refill"
        className="block h-44 rounded-lg overflow-hidden relative group ring-1 ring-sky-300/70"
      >
        <img
          src="/PP.JPG"
          alt="Re-Fill group project preview"
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/15 via-blue-700/30 to-cyan-950/70 group-hover:from-sky-900/25 group-hover:to-cyan-950/80 transition" />
        <div className="absolute inset-0 flex items-end">
          <p className="text-white text-base font-medium px-4 py-3">Re/Fill</p>
        </div>
      </Link>
    </Card>
  );
}

/* ---------------- CLUBS ---------------- */

function Clubs() {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Clubs</h3>

      <ul className="space-y-3 text-sm text-blue-950/85">
        <li>#Include — Design Cohort & Social Media Manager</li>
        <li>ColorStack — Former Project Manager</li>
        <li>NSBE — Outreach Coordinator</li>
      </ul>
    </Card>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-6">
        Get in touch
      </h3>

      <div className="space-y-4">
        <a
          href="mailto:chinomsoaugustine073@gmail.com"
          className="block w-full bg-purple-200 hover:bg-blue-100 transition px-4 py-3 rounded-lg text-lg text-center text-black"
        >
          Email
        </a>

      </div>
    </Card>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function Card({ children }) {
  return (
    <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm shadow-blue-100/40">
      {children}
    </div>
  );
}

function Button({ text, href, to }) {
  const classes = "px-4 py-2 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition text-sm";

  if (to) {
    return (
      <Link to={to} className={classes}>
        {text}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
      >
        {text}
      </a>
    );
  }

  return (
    <button className={classes}>
      {text}
    </button>
  );
}
