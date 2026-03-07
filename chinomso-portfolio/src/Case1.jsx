import { Link } from "react-router-dom";

function Section({ id, title, children }) {
  return (
    <section className="rounded-2xl border border-violet-200/70 bg-white/80 p-6 md:p-8 shadow-sm shadow-violet-200/40">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-500">Section {id}</p>
      <h2 className="mt-2 text-2xl font-semibold text-violet-950">{title}</h2>
      <div className="mt-4 space-y-3 text-[15px] leading-7 text-violet-950/90">{children}</div>
    </section>
  );
}

function MetaItem({ label, value }) {
  return (
    <div className="rounded-xl border border-violet-200 bg-white/75 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.16em] text-violet-600">{label}</p>
      <p className="mt-1 text-sm font-medium text-violet-950">{value}</p>
    </div>
  );
}

export default function Case1() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-bl from-violet-300 via-fuchsia-100 to-indigo-100 px-6 py-14 text-slate-900 md:px-20">
      <div className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-violet-500/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-56 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl space-y-8">
        <header className="rounded-2xl border border-violet-300/70 bg-white/85 p-6 shadow-lg shadow-violet-300/20 backdrop-blur-sm md:p-8">
          <p className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
            Case Study
          </p>

          <div className="mt-4 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <h1 className="text-3xl font-semibold leading-tight text-violet-950 md:text-5xl">
                CampusConnect
              </h1>
              <p className="mt-2 text-base text-violet-700 md:text-lg">A student-to-student services marketplace.</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-violet-950/90">
                CampusConnect connects college students who need affordable services with students who offer them.
                It is designed to reduce costs, grow student entrepreneurship, and strengthen campus community trust.
                
              </p>
            </div>

            <div className="h-44 overflow-hidden rounded-xl ring-1 ring-violet-300/70">
              <img
                src="/PP.JPG"
                alt="CampusConnect project cover"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MetaItem label="Role" value="UI/UX Designer" />
            <MetaItem label="Type" value="UX Case Study" />
            <MetaItem label="Audience" value="College Student" />
            <MetaItem label="Focus" value="Affordability + Visibility" />
          </div>

          <div className="mt-6">
            <Link to="/" className="text-sm font-medium text-red-700 transition hover:text-violet-900">
              Back to Home
            </Link>
          </div>
        </header>

        <div className="space-y-6">
          <Section id="1" title="Overview">
            <p>
              CampusConnect is a student-centered platform designed to connect college students who need
              affordable services with other students who offer those services.
            </p>
            <p>
              Many college students operate on tight budgets and struggle to afford services offered by
              nearby businesses. At the same time, many students have valuable skills, such as haircuts,
              nail services, tutoring, and photography, but lack a reliable way to reach clients.
            </p>
            <p>
              CampusConnect bridges this gap by creating a trusted peer-to-peer marketplace within campus
              communities.
            </p>
          </Section>

          <Section id="2" title="Value Proposition">
            <p>
              CampusConnect is more than a platform for finding affordable services. It creates an
              ecosystem where students can both save money and generate income.
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Help students discover affordable services on campus</li>
              <li>Empower student entrepreneurs to monetize their skills</li>
              <li>Increase visibility for student service providers</li>
              <li>Build trust through peer-based campus connections</li>
              <li>Reduce reliance on expensive off-campus businesses</li>
            </ul>
          </Section>

          <Section id="3" title="Problem">
            <h3 className="font-semibold text-violet-900">Students seeking services</h3>
            <p>
              Many college students struggle to find affordable services near campus. Businesses around
              universities often charge prices that exceed student budgets.
            </p>
            <p>
              Students also rely heavily on word-of-mouth or group chats, which can be unreliable and
              time-consuming.
            </p>

            <h3 className="pt-2 font-semibold text-violet-900">Students offering services</h3>
            <p>Students who provide services face a different problem: visibility.</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Friends</li>
              <li>Social media posts</li>
              <li>Past customers</li>
            </ul>
            <p>This makes it difficult to consistently reach new student clients.</p>
          </Section>

          <Section id="4" title="Solution">
            <p>
              CampusConnect provides a student-centered digital platform that connects students seeking
              services with students offering them.
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Affordable student-to-student pricing</li>
              <li>Easy service discovery</li>
              <li>Peer-to-peer connections</li>
              <li>Increased visibility for student service providers</li>
              <li>A trusted community built around shared campus identity</li>
            </ul>
          </Section>

          <Section id="5" title="Design Process">
            <p>
              To develop CampusConnect, I followed the Design Thinking framework so decisions were based
              on real user needs.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                "Empathize",
                "Define",
                "Ideate",
                "Prototype",
                "Test",
              ].map((stage) => (
                <div
                  key={stage}
                  className="rounded-lg border border-violet-200 bg-violet-50/60 px-3 py-2 text-center text-sm font-medium text-violet-900"
                >
                  {stage}
                </div>
              ))}
            </div>
          </Section>

          <Section id="6" title="User Research - Persona: Sean">
            <p>
              Sean is a third-year Computer Science student at UC Davis and also a Teaching Assistant.
              He wants to maintain a professional appearance while managing rent, food, and student loans.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-violet-900">Profile</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Age: 21</li>
                  <li>Location: UC Davis</li>
                  <li>Role: Student and Teaching Assistant</li>
                  <li>Living Situation: Off-campus housing</li>
                  <li>Financial Context: Managing rent, food, and student loans</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-violet-900">Needs</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Find an affordable student barber near campus</li>
                  <li>Discover services quickly without relying on word-of-mouth</li>
                  <li>Maintain a professional appearance without overspending</li>
                </ul>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-violet-900">Frustrations</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Affordable student services exist but are hard to find</li>
                  <li>Searching through friends and group chats is unreliable</li>
                  <li>Paying $40 for a haircut feels financially irresponsible</li>
                  <li>Time pressure during busy academic periods increases stress</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-violet-900">Personality Traits</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Budget-conscious</li>
                  <li>Efficiency-oriented</li>
                  <li>Socially aware</li>
                  <li>Community-driven</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="7" title="Empathy Map">
            <p>
              To better understand Sean's situation, an empathy map was created to analyze his thoughts,
              actions, and feelings.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4">
                <h3 className="font-semibold text-violet-900">Thoughts</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>When I get a fresh haircut, I feel confident.</li>
                  <li>My usual barber is gone. Who can cut my hair now?</li>
                  <li>Downtown Davis haircuts are too expensive.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4">
                <h3 className="font-semibold text-violet-900">Actions</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Calls friends asking for recommendations</li>
                  <li>Searches for student barbers</li>
                  <li>Relies on word-of-mouth without success</li>
                </ul>
              </div>
              <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4">
                <h3 className="font-semibold text-violet-900">Feelings</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Frustrated by limited options</li>
                  <li>Worried about spending too much money</li>
                  <li>Concerned about maintaining a professional appearance</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="8" title="Key Pain Points">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-violet-200 bg-white p-4">
                <h3 className="font-semibold text-violet-900">1. High Service Costs</h3>
                <p className="mt-2">Off-campus businesses charge significantly higher prices.</p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Downtown haircut: $40</li>
                  <li>Student barber: ~ $15</li>
                </ul>
                <p className="mt-2">For students like Sean, this difference creates financial stress.</p>
              </div>
              <div className="rounded-xl border border-violet-200 bg-white p-4">
                <h3 className="font-semibold text-violet-900">2. Limited Visibility for Student Providers</h3>
                <p className="mt-2">Students offering services struggle to advertise their work.</p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Word-of-mouth</li>
                  <li>Social media</li>
                  <li>Personal networks</li>
                </ul>
                <p className="mt-2">These methods limit their ability to consistently reach new clients.</p>
              </div>
            </div>
          </Section>

          <Section id="9" title="Design Opportunity (How Might We)">
            <ul className="list-disc space-y-1 pl-6">
              <li>How might we help students discover affordable services near campus?</li>
              <li>How might we help student service providers increase visibility?</li>
              <li>How might we create a trustworthy peer-to-peer platform for campus communities?</li>
            </ul>
          </Section>

          <Section id="10" title="Ideation">
            <p>
              To explore potential solutions, I created a mind map based on Sean's real-life scenario.
            </p>
            <p>
              When Sean returned for winter quarter, he discovered his usual barber had transferred.
              He needed a haircut before classes started but did not want to pay $40 downtown.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4">
                <h3 className="font-semibold text-violet-900">Decision Path 1: Expensive Haircut</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Visit downtown barbershop</li>
                  <li>Pay $40</li>
                  <li>Feel financial stress</li>
                </ul>
              </div>
              <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4">
                <h3 className="font-semibold text-violet-900">Decision Path 2: Student Barber Search</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Ask friends for recommendations</li>
                  <li>Search for student providers</li>
                  <li>Risk not finding a solution in time</li>
                </ul>
              </div>
            </div>
            <p>This scenario revealed a clear market gap for CampusConnect.</p>
          </Section>

          <Section id="11" title="Prototype">
            <p>The process moved from low-fidelity designs to high-fidelity designs.</p>
            <h3 className="font-semibold text-violet-900">Low-Fidelity Prototype</h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>Core user flows</li>
              <li>Service discovery</li>
              <li>Navigation structure</li>
            </ul>
            <p>
              At this stage, focus remained on functionality and usability instead of visual details,
              allowing faster iteration before polish.
            </p>
          </Section>

          <Section id="13" title="User Journey Map">
            <p>
              A User Journey Map was created to understand the steps Sean takes when trying to find a
              haircut and where frustration occurs. This helped identify opportunities where CampusConnect
              could improve the experience.
            </p>

            <div className="overflow-x-auto rounded-xl border border-violet-200">
              <table className="min-w-full bg-white text-left text-sm">
                <thead className="bg-violet-100/70">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-violet-900">Stage</th>
                    <th className="px-4 py-3 font-semibold text-violet-900">Actions</th>
                    <th className="px-4 py-3 font-semibold text-violet-900">Thoughts</th>
                    <th className="px-4 py-3 font-semibold text-violet-900">Pain Points</th>
                    <th className="px-4 py-3 font-semibold text-violet-900">Opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-violet-100">
                    <td className="px-4 py-3 font-medium text-violet-900">Realization</td>
                    <td className="px-4 py-3">Sean notices his hair has grown out</td>
                    <td className="px-4 py-3">I need a haircut before the quarter starts.</td>
                    <td className="px-4 py-3">Time pressure</td>
                    <td className="px-4 py-3">Provide quick access to nearby services</td>
                  </tr>
                  <tr className="border-t border-violet-100">
                    <td className="px-4 py-3 font-medium text-violet-900">Searching</td>
                    <td className="px-4 py-3">Calls friends and checks group chats</td>
                    <td className="px-4 py-3">Does anyone know a student barber?</td>
                    <td className="px-4 py-3">Information is scattered and unreliable</td>
                    <td className="px-4 py-3">Centralized platform for student services</td>
                  </tr>
                  <tr className="border-t border-violet-100">
                    <td className="px-4 py-3 font-medium text-violet-900">Comparing</td>
                    <td className="px-4 py-3">Looks at downtown barbershop prices</td>
                    <td className="px-4 py-3">$40 is too expensive.</td>
                    <td className="px-4 py-3">High prices for off-campus services</td>
                    <td className="px-4 py-3">Show affordable student options</td>
                  </tr>
                  <tr className="border-t border-violet-100">
                    <td className="px-4 py-3 font-medium text-violet-900">Decision</td>
                    <td className="px-4 py-3">Debates between paying $40 or continuing to search</td>
                    <td className="px-4 py-3">Maybe I should just cut my own hair.</td>
                    <td className="px-4 py-3">Lack of trusted alternatives</td>
                    <td className="px-4 py-3">Verified student providers</td>
                  </tr>
                  <tr className="border-t border-violet-100">
                    <td className="px-4 py-3 font-medium text-violet-900">Solution</td>
                    <td className="px-4 py-3">Finds a student barber through CampusConnect</td>
                    <td className="px-4 py-3">This is exactly what I needed.</td>
                    <td className="px-4 py-3">None</td>
                    <td className="px-4 py-3">Smooth booking experience</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-violet-200 bg-violet-50/70 p-4">
              <h3 className="font-semibold text-violet-900">Key Insight</h3>
              <p className="mt-2">
                Students do not lack service providers. They lack an easy way to find them.
                CampusConnect solves this by creating a centralized marketplace for student services.
              </p>
            </div>
          </Section>

          <Section id="14" title="Feature Breakdown">
            <p>
              Based on user research and pain points, key features were designed to support both service
              seekers and student providers.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-violet-200 bg-white p-4">
                <h3 className="font-semibold text-violet-900">Service Discovery</h3>
                <p className="mt-2">Students can browse services such as:</p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Haircuts</li>
                  <li>Nail services</li>
                  <li>Tutoring</li>
                  <li>Photography</li>
                  <li>Graphic design</li>
                </ul>
                <p className="mt-2">Filters include price, distance, ratings, and category.</p>
              </div>

              <div className="rounded-xl border border-violet-200 bg-white p-4">
                <h3 className="font-semibold text-violet-900">Student Profiles</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Name and photo</li>
                  <li>Services offered</li>
                  <li>Price list</li>
                  <li>Portfolio images</li>
                  <li>Ratings and reviews</li>
                  <li>Availability</li>
                </ul>
                <p className="mt-2">This builds trust and transparency within the community.</p>
              </div>

              <div className="rounded-xl border border-violet-200 bg-white p-4">
                <h3 className="font-semibold text-violet-900">Booking System</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Appointment scheduling</li>
                  <li>Messaging between students</li>
                  <li>Service confirmations</li>
                  <li>Calendar integration</li>
                </ul>
                <p className="mt-2">
                  This removes long text message conversations and social media coordination.
                </p>
              </div>

              <div className="rounded-xl border border-violet-200 bg-white p-4">
                <h3 className="font-semibold text-violet-900">Ratings and Reviews</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Ratings</li>
                  <li>Reviews</li>
                  <li>Feedback</li>
                </ul>
                <p className="mt-2">This helps users make informed decisions about providers.</p>
              </div>
            </div>

            <div className="rounded-xl border border-violet-200 bg-white p-4">
              <h3 className="font-semibold text-violet-900">Student Entrepreneurship Tools</h3>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Create service listings</li>
                <li>Upload portfolios</li>
                <li>Set pricing</li>
                <li>Manage bookings</li>
                <li>Build a customer base</li>
              </ul>
              <p className="mt-2">This helps students turn skills into income opportunities.</p>
            </div>
          </Section>

          <Section id="15" title="UI Concept and Screens">
            <p>
              The interface was designed to be simple, student-friendly, and efficient.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4">
                <h3 className="font-semibold text-violet-900">Home Screen</h3>
                <p className="mt-2">Purpose: Help students quickly discover services near campus.</p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Search bar</li>
                  <li>Featured services</li>
                  <li>Popular categories</li>
                  <li>Recommended student providers</li>
                </ul>
              </div>

              <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4">
                <h3 className="font-semibold text-violet-900">Service Listing Page</h3>
                <p className="mt-2">Purpose: Show options and enable quick comparison.</p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Service cards with price</li>
                  <li>Provider rating</li>
                  <li>Distance from campus</li>
                  <li>Quick booking button</li>
                </ul>
              </div>

              <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4">
                <h3 className="font-semibold text-violet-900">Provider Profile Page</h3>
                <p className="mt-2">Purpose: Build trust and transparency.</p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Profile photo</li>
                  <li>Portfolio of past work</li>
                  <li>Price list</li>
                  <li>Reviews</li>
                  <li>Book appointment button</li>
                </ul>
              </div>

              <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4">
                <h3 className="font-semibold text-violet-900">Booking Page</h3>
                <p className="mt-2">Purpose: Allow students to schedule services easily.</p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Available time slots</li>
                  <li>Service selection</li>
                  <li>Appointment confirmation</li>
                  <li>Messaging option</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="16" title="Impact">
            <p>
              CampusConnect has the potential to create significant value within university communities.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-violet-200 bg-white p-4">
                <h3 className="font-semibold text-violet-900">Benefits for Students Seeking Services</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Access to affordable services</li>
                  <li>Faster service discovery</li>
                  <li>Reduced financial stress</li>
                  <li>Increased confidence and convenience</li>
                </ul>
              </div>
              <div className="rounded-xl border border-violet-200 bg-white p-4">
                <h3 className="font-semibold text-violet-900">Benefits for Student Service Providers</h3>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                  <li>Increased visibility</li>
                  <li>Ability to reach new clients</li>
                  <li>Opportunity to generate income</li>
                  <li>Development of entrepreneurial experience</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="17" title="Future Improvements">
            <ul className="list-disc space-y-1 pl-6">
              <li>Campus verification system (.edu login)</li>
              <li>Integrated payment system</li>
              <li>Map view of nearby providers</li>
              <li>AI-based service recommendations</li>
              <li>In-app promotions for student businesses</li>
            </ul>
          </Section>

          <Section id="18" title="Final Reflection">
            <p>
              CampusConnect demonstrates how user-centered design can solve everyday problems within
              college communities.
            </p>
            <p>
              Through research, empathy mapping, and iterative design, the project revealed an
              overlooked opportunity: students already have the skills and services they need. They
              simply lack a platform to connect.
            </p>
            <p>By enabling peer-to-peer service discovery, CampusConnect:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Promotes affordability</li>
              <li>Encourages student entrepreneurship</li>
              <li>Strengthens campus communities</li>
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}
