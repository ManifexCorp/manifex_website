import React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

const N8N_BASE = "https://stamman.app.n8n.cloud"; // your n8n instance
const SITE = "https://manifex.netlify.app";       // ✅ live site only

const FORM_URL = `${N8N_BASE}/webhook/customer-setup`;
const toBuy = `${FORM_URL}?action=buy&redirect=${encodeURIComponent(
  SITE + "#pricing"
)}`;
const toTrial = `${FORM_URL}?action=trial&redirect=${encodeURIComponent(
  SITE + "#services"
)}`;

function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-2">
          <img src="/manifex-logo.png" alt="Manifex" className="h-8 w-8" />
          <span className="font-semibold text-slate-900">Manifex</span>
        </a>
        <div className="flex items-center gap-6 text-sm">
          <a href="#services" className="hover:text-slate-900 text-slate-600">Services</a>
          <a href="#pricing" className="hover:text-slate-900 text-slate-600">Pricing</a>
          {isAuthenticated && (
            <a href="#automations" className="hover:text-slate-900 text-slate-600">My Automations</a>
          )}
          {!isAuthenticated ? (
            <button
              onClick={() => loginWithRedirect()}
              className="px-4 py-1.5 rounded-xl text-white bg-black hover:bg-neutral-900 transition"
            >
              Log in / Sign up
            </button>
          ) : (
            <button
              onClick={() => logout({ logoutParams: { returnTo: SITE } })}
              className="px-4 py-1.5 rounded-xl text-slate-700 border border-slate-300 hover:bg-slate-50 transition"
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header id="hero" className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
      <div className="max-w-6xl mx-auto px-4 py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold">
          Automation that answers, schedules, and scales.
        </h1>
        <p className="mt-4 text-lg text-blue-50">
          Manifex builds AI-powered automations — starting with your AI Receptionist.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="#services" className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-neutral-900 transition">
            Explore Services
          </a>
          <a href={toTrial} className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-neutral-900 transition">
            Try our receptionist for free
          </a>
        </div>
      </div>
    </header>
  );
}

function Services() {
  return (
    <section id="services" className="py-20 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-slate-900">Our Services</h2>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-slate-900">AI Receptionist</h3>
          <p className="mt-2 text-slate-600">
            Answers calls, books to Google Calendar, handles FAQs. 24/7 availability.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={toTrial} className="px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-900 transition">
              Try your own AI receptionist for free
            </a>
            <a href={toBuy} className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:shadow transition">
              Buy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-sky-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900">Pricing</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-slate-900">AI Receptionist</h3>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              $299<span className="text-lg font-normal">/mo</span>
            </p>
            <div className="mt-4">
              <a href={toBuy} className="px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-900 transition">
                Buy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Automations() {
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) return null;
  return (
    <section id="automations" className="py-20 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-slate-900">My Automations</h2>
      <div className="mt-6 p-6 border rounded-3xl bg-white shadow text-slate-600">
        You do not have any automation purchased yet.
        <div className="mt-3">
          <a href="#services" className="px-4 py-2 rounded-xl bg-black text-white hover:bg-neutral-900 transition">
            Buy
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t border-slate-200 text-center text-slate-600 text-sm">
      © {new Date().getFullYear()} Manifex. All rights reserved.
    </footer>
  );
}

function AppInner() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Pricing />
      <Automations />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN || ""}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || ""}
      authorizationParams={{ redirect_uri: SITE }}
    >
      <AppInner />
    </Auth0Provider>
  );
}
