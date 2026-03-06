import { Link } from "react-router-dom";

export default function Refill() {
  const team = [
    { name: "Devin Bangayan", role: "Engineer" },
    { name: "Marilyn Bangayan", role: "Designer" },
    { name: "Chinomso Augustine", role: "3rd Year Design & Computer Science Minor" },
    { name: "Crow Raya", role: "3rd Year Design Major" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* HERO */}
      <div className="bg-sky-200 py-14 px-6 md:px-20">
        <div className="mb-6">
          <Link to="/" className="text-sm text-sky-900/80 hover:text-sky-950 transition">
            Back to Home
          </Link>
        </div>

        <div className="grid md:grid-cols-2 items-center gap-10">
          <div>
            <h1 className="text-6xl font-bold text-red-500">Re/Fill</h1>

            <p className="mt-4 text-lg">
              Upgrade existing drinking fountains with bottle filling access.
            </p>

            <div className="mt-6 font-semibold text-blue-800">
              <p>Accessible</p>
              <p>Sustainable</p>
              <p>Renewable</p>
            </div>
          </div>

          {/* HERO IMAGE PLACEHOLDER */}
          <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center">
            Fountain Graphic
          </div>
        </div>
      </div>

      <div className="px-6 md:px-20 py-14 space-y-20">
        {/* OUR STORY */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">Our Story</h2>

          <p className="mb-4">
            Our journey with Re/Fill began in UC Davis Design 01, where we were tasked with
            collaboratively designing a spatial, communication, or physical product that engages
            with social systems and facilitates person-to-person interaction.
          </p>

          <p className="mb-4">
            Recognizing that water accessibility is an increasing concern tied to social equity and
            public health, our research focused on mitigating the effects of limited access to
            drinking water in the greater Sacramento metropolitan area.
          </p>

          <p className="mb-4">
            In response, our team designed a retrofit mouthpiece for existing water fountains that
            preserves traditional drinking while adding a spout for bottle filling.
          </p>

          <p>
            By utilizing existing filtered water infrastructure and prioritizing sustainability, our
            design revitalizes current fountain systems rather than replacing them.
          </p>
        </section>

        {/* TEAM */}
        <section>
          <h2 className="text-3xl font-semibold mb-10">Meet the Team</h2>

          <div className="grid md:grid-cols-4 gap-10">
            {team.map((member, i) => (
              <div key={i} className="text-center">
                {/* IMAGE PLACEHOLDER */}
                <div className="h-52 bg-gray-300 rounded-lg mb-4"></div>

                <p className="font-semibold">{member.name}</p>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INFOGRAPHICS */}
        <section>
          <h2 className="text-3xl font-semibold mb-8">Infographics of our Process</h2>

          <h3 className="text-xl font-medium mb-4">Crazy 8s</h3>

          {/* IMAGE PLACEHOLDER */}
          <div className="h-96 bg-gray-300 rounded-lg flex items-center justify-center">
            Crazy 8 Sketch Image
          </div>
        </section>

        {/* PROTOTYPING */}
        <section>
          <h2 className="text-3xl font-semibold mb-10">Prototyping</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="bg-blue-600 text-white p-6 rounded-lg">
                <h3 className="text-xl mb-4">Prototype #{num}</h3>

                <div className="grid grid-cols-2 gap-3">
                  {/* IMAGE PLACEHOLDERS */}
                  <div className="h-24 bg-blue-300"></div>
                  <div className="h-24 bg-blue-300"></div>
                  <div className="h-24 bg-blue-300"></div>
                  <div className="h-24 bg-blue-300"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECT LOCATION */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">Project Location</h2>

          <p>
            ReFill will be implemented at UC Davis to increase water accessibility and encourage the
            use of reusable bottles across campus. UC Davis is an ideal environment for ReFill due
            to the outdated condition of many existing water fountains and the limited water access
            in certain buildings.
          </p>
        </section>

        {/* EVOLUTION */}
        <section>
          <h2 className="text-3xl font-semibold mb-8">Evolution of ReFill and the Team</h2>

          <p className="mb-10">
            Early development of ReFill began with Devin Bangayan, Marilyn Bangayan, Chinomso
            Augustine, and Luc Maho during the first prototype stage. The project continued evolving
            through multiple iterations, presentations, and research conferences.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* IMAGE PLACEHOLDERS */}
            <div className="h-64 bg-gray-300 rounded-lg"></div>
            <div className="h-64 bg-gray-300 rounded-lg"></div>
            <div className="h-64 bg-gray-300 rounded-lg"></div>
          </div>
        </section>
      </div>
    </div>
  );
}
