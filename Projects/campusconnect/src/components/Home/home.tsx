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
    <div className="bg-purple-50/40 text-slate-900">
      <section className="bg-gradient-to-br from-purple-50 via-white to-violet-100 h-auto py-16 px-6 mt-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-500">CampusConnect</p>
          <h1 className="mt-4 text-3xl md:text-6xl font-semibold tracking-tight">
            Connect with campus services, instantly.
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            Find tutoring, tech support, creative services, and more from fellow students on campus.
            Quality services at student-friendly prices.
          </p>

          <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-purple-200/70 bg-white px-4 py-3 shadow-sm">
              <Search className="h-5 w-5 text-purple-300" />
              <input
                type="text"
                placeholder="Search for haircuts, tutoring, photography..."
                className="w-full bg-transparent text-sm text-slate-700 focus:outline-none"
              />
              <button className="cursor-pointer rounded-xl bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-800">
                Search
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
            <Link to="/Services">
              <button className="cursor-pointer rounded-xl bg-purple-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800">
                Browse Services
              </button>
            </Link>

            <Link to="/Providers">
              <button className="cursor-pointer rounded-xl border border-purple-200/70 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-purple-300 hover:text-purple-900">
                View All Providers
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 flex flex-wrap items-center md:flex-row sm:flex-row justify-center gap-3 border-y border-purple-200/60">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl border border-purple-200/60 bg-purple-50 px-6 py-5 text-center shadow-sm text-slate-900 w-lg md:w-56"
          >
            <div className="text-3xl font-bold">
              {stat.value}
              {stat.icon && stat.icon}
            </div>
            <div className="text-sm mt-2 text-purple-500">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h3 className="text-2xl font-semibold">Featured Services</h3>
              <p className="mt-2 text-sm text-slate-600">
                Student-led services with flexible scheduling and campus-friendly pricing.
              </p>
            </div>
            <Link to="/Services" className="text-sm font-semibold text-purple-900">
              View all services
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredServices.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-amber-200/60 bg-white p-6 shadow-sm"
              >
                <h4 className="text-lg font-semibold">{service.title}</h4>
                <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                <Link to="/Services" className="mt-4 inline-flex text-sm font-semibold text-purple-900">
                  Explore options
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-purple-100/50 py-12 px-6">
        <div className="mx-auto max-w-5xl">
          <h3 className="text-2xl font-semibold">Popular Categories</h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {popularCategories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-amber-200/60 bg-white px-4 py-2 text-sm font-medium text-slate-700"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-5xl">
          <h3 className="text-2xl font-semibold">Recommended Student Providers</h3>
          <p className="mt-2 text-sm text-slate-600">
            Top-rated providers based on recent student reviews.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {recommendedProviders.map((provider) => (
              <div
                key={provider.id}
                className="rounded-2xl border border-amber-200/60 bg-white p-6 shadow-sm"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-purple-500">Top Rated</p>
                <h4 className="mt-3 text-lg font-semibold">{provider.name}</h4>
                <p className="text-sm text-slate-600">{provider.service_title}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-700">
                  <Star className="h-4 w-4 text-purple-600" />
                  {provider.rating} rating
                </div>
                <Link
                  to="/Providers"
                  className="mt-4 inline-flex text-sm font-semibold text-purple-900"
                >
                  View profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6 border-t border-purple-200/60">
        <h3 className="text-3xl font-semibold text-center mb-4 text-slate-900">Why Choose CampusConnect?</h3>
        <p className="text-base text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          We make it easy to find trusted services from fellow students on your campus.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {reason.map((whyUs, index) => (
            <div
              key={index}
              className="bg-purple-50 p-6 rounded-2xl border border-purple-200/60 shadow-sm transition-shadow duration-100 ease-in hover:shadow-md"
            >
              <div className="flex gap-3">
                <div className="bg-purple-700 w-12 h-12 text-white text-center rounded-xl flex items-center justify-center">
                  {whyUs.icon}
                </div>
                <div className="text-lg font-semibold text-slate-900 mb-2 mt-3">{whyUs.value}</div>
              </div>
              <div className="text-sm text-slate-600 mt-4">{whyUs.label}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-purple-900 py-12">
        <h2 className="text-3xl font-semibold text-center mb-4 text-white">Ready to Connect?</h2>

        <p className="text-slate-300 text-base font-medium flex text-center justify-center m-4">
          Join our community of students helping students. Find the services you need or offer your
          skills to others.
        </p>

        <div className="flex lg:flex-row md:flex-row justify-center gap-6 flex-wrap font-bold mt-9 mb-7">
          <Link to="/Services">
            <button className="bg-white text-purple-900 text-sm rounded-xl px-5 py-3 cursor-pointer">
              Find Services
            </button>
          </Link>

          <Link to="/Providers">
            <button className="border border-white text-white text-sm rounded-xl px-5 py-3 hover:bg-white hover:text-purple-900 cursor-pointer">
              Browse Providers
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Home;
