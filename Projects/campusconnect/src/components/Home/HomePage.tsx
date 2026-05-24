import { Clock, Search, Star, User } from "lucide-react";
import { Link } from "react-router-dom";
import { MockProviders, ServiceCategory } from "../Mock Data/MockUserData";

function Home() {
  const stats = [
    { value: "500+", label: "Active Students" },
    { value: "4.5", label: "Average Rating", icon: <Star className="inline w-8 h-7 ml-1" /> },
    { value: "2000+", label: "Services Completed" },
  ];

  const reason = [
    {
      icon: <User className="w-6 h-6" />,
      value: "Student-to-Student",
      label: "Connect directly with fellow students who understand your needs and schedule. ",
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: "Trusted Review",
      label: "Read reviews from other students to find the best service providers.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: "Flexible scheduling",
      label: "Book services that fit your busy student schedule.",
    },
  ];

  const featuredServices = [
    { title: "Haircuts", description: "Affordable cuts and styling from fellow students." },
    { title: "Tutoring", description: "On-demand help for STEM, writing, and language courses." },
    { title: "Photography", description: "Portraits, events, and social content for campus life." },
  ];

  const popularCategories = Object.keys(ServiceCategory);
  const recommendedProviders = MockProviders.slice(0, 3);

  return (
    <div className="page-shell">
      <section className="app-hero mx-auto mt-2 max-w-6xl">
        <div className="mx-auto max-w-5xl text-center">
          <p className="app-badge">Campus services, redesigned</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
            Find trusted campus help with a cleaner, smarter flow.
          </h1>

          <p className="app-subtle mx-auto mt-6 max-w-3xl text-lg">
            Find tutoring, tech support, creative services, and more from fellow students on campus.
            Book faster, browse with confidence, and connect through a design language inspired by
            modern Google product experiences.
          </p>

          <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="mx-auto flex w-full max-w-2xl items-center gap-3 rounded-full border border-blue-100 bg-white/95 px-4 py-3 shadow-lg">
              <Search className="h-5 w-5 text-blue-500" />
              <input
                type="text"
                placeholder="Search for haircuts, tutoring, photography..."
                className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
              />
              <button className="app-btn-primary px-5 py-2.5">
                Search
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
            <Link to="/Services">
              <button className="app-btn-primary px-7">
                Browse Services
              </button>
            </Link>

            <Link to="/Providers">
              <button className="app-btn-secondary px-7">
                View All Providers
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="app-kpi w-full md:w-56"
          >
            <div className="text-3xl font-bold text-slate-900">
              {stat.value}
              {stat.icon && stat.icon}
            </div>
            <div className="mt-2 text-sm text-slate-500">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-1 pt-8">
        <div className="app-card">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">Featured Services</h3>
              <p className="app-subtle mt-2 text-sm">
                Student-led services with flexible scheduling and campus-friendly pricing.
              </p>
            </div>
            <Link to="/Services" className="app-link">
              View all services
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredServices.map((service) => (
              <div
                key={service.title}
                className="app-card app-card-hover border-blue-50 p-6"
              >
                <h4 className="text-lg font-semibold text-slate-900">{service.title}</h4>
                <p className="app-subtle mt-2 text-sm">{service.description}</p>
                <Link to="/Services" className="app-link mt-4 inline-flex">
                  Explore options
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-1 pt-8">
        <div className="app-card">
          <h3 className="text-2xl font-semibold text-slate-900">Popular Categories</h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {popularCategories.map((category) => (
              <span key={category} className="app-chip">
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-1 pt-8">
        <div className="app-card">
          <h3 className="text-2xl font-semibold text-slate-900">Recommended Student Providers</h3>
          <p className="app-subtle mt-2 text-sm">
            Top-rated providers based on recent student reviews.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {recommendedProviders.map((provider) => (
              <div
                key={provider.id}
                className="app-card app-card-hover border-blue-50 p-6"
              >
                <p className="app-badge">Top Rated</p>
                <h4 className="mt-4 text-lg font-semibold text-slate-900">{provider.name}</h4>
                <p className="app-subtle text-sm">{provider.service_title}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-700">
                  <Star className="h-4 w-4 text-blue-600" />
                  {provider.rating} rating
                </div>
                <Link to="/Providers" className="app-link mt-4 inline-flex">
                  View profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-1 pt-8">
        <div className="app-card">
          <h3 className="text-center text-3xl font-semibold text-slate-900">Why Choose CampusConnect?</h3>
          <p className="app-subtle mx-auto mt-4 mb-12 max-w-2xl text-center text-base">
            We make it easy to find trusted services from fellow students on your campus.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {reason.map((whyUs, index) => (
              <div
                key={index}
                className="app-card app-card-hover border-blue-50 bg-[rgba(255,255,255,0.98)] p-6"
              >
                <div className="flex gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                    {whyUs.icon}
                  </div>
                  <div className="mb-2 mt-3 text-lg font-semibold text-slate-900">{whyUs.value}</div>
                </div>
                <div className="app-subtle mt-4 text-sm">{whyUs.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-1 pt-8">
        <div className="app-card overflow-hidden bg-slate-900 text-white">
          <div className="rounded-[28px] bg-[radial-gradient(circle_at_top_right,rgba(66,133,244,0.42),transparent_32%),linear-gradient(135deg,#1f2937_0%,#0f172a_100%)] px-6 py-12">
            <h2 className="text-center text-3xl font-semibold">Ready to Connect?</h2>

            <p className="mx-auto mt-4 flex max-w-2xl justify-center text-center text-base font-medium text-slate-300">
              Join our community of students helping students. Find the services you need or offer your
              skills to others.
            </p>

            <div className="mt-9 mb-2 flex flex-wrap justify-center gap-4 font-bold">
              <Link to="/Services">
                <button className="app-btn-primary bg-white px-6 text-blue-700 hover:bg-slate-100">
                  Find Services
                </button>
              </Link>

              <Link to="/Providers">
                <button className="rounded-full border border-white/30 px-6 py-3 text-sm text-white transition hover:bg-white/10">
                  Browse Providers
                </button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
