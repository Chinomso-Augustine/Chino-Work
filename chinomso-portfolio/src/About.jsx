import { Link } from "react-router-dom";


export default function About() {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 px-6 md:px-20 py-16 flex justify-center">
     
      {/* Back Link */}
        <div className="mt-16">
          <Link
            to="/"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition"
          >
            ← Back to Home
          </Link>
        </div>
    <div className="w-full max-w-3xl">

        {/* Page Title */}
        <h1 className="text-4xl font-semibold mb-12">
          About Me
        </h1>

        {/* Section 1 */}
        <Section
          title="Hi There"
          content={
            <>
              I’m <strong>Chinomso Augustine</strong>, a UI/UX Designer and UI Engineer studying at the{" "}
              <strong>University of California, Davis</strong>, majoring in Design with a minor in Computer Science.
              I focus on designing intuitive, user-centered applications that prioritize clarity, usability, and purpose.
              I’m currently seeking internships and am open to relocation.
            </>
          }
        />

        {/* Section 2 */}
        <Section
          title="Photography/Videographer"
          content={
            <>
              Outside of school, I am a <strong>photographer and videographer</strong>.
              My work includes graduation events, professional photos, and sports photography.
              I’ve collaborated with UC Davis Athletics and support my church’s media team with my own equipment.
            </>
          }
        />

        {/* Section 3 */}
        <Section
          title="Athletics and Fitness"
          content={
            <>
              I am a former <strong>marathon runner</strong>, captain of my high school
              soccer and <strong>cross-country</strong> teams, and competed in track and field
              (100m, 200m, 4x100m, and 4x400m relays).
            </>
          }
        />

        {/* Section 4 */}
        <Section
          title="Research & Collaboration"
          content={
            <>
              In Fall 2024, my team and I refined a design project and presented it at the
              <strong> 26th UC Davis Undergraduate Research Conference</strong>.
              This experience strengthened my understanding of the design process and collaboration—
              particularly working within teams of different age groups and backgrounds.
            </>
          }
        />

        {/* Section 5 */}
        <Section
          title="Healthcare Experience"
          content={
            <>
              In addition to my design and research work, I am a
              <strong> Certified Nursing Assistant (CNA)</strong>.
              I completed a three-month nursing program including two state exams.
              This experience has deeply influenced how I approach empathy,
              responsibility, and human-centered problem solving.
            </>
          }
        />

        {/* Back Link */}
        <div className="mt-16">
          <Link
            to="/"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable Section Component ---------- */

function Section({ title, content }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">
        {title}
      </h2>

      <p className="text-neutral-600 leading-relaxed">
        {content}
      </p>

      <div className="border-b border-neutral-200 mt-8"></div>
    </div>
  );
}
