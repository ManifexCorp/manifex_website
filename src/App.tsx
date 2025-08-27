import React, { useEffect, useRef, useState } from "react";

/**
 * Manifex — Corporate site
 * Set N8N_BASE to your n8n cloud domain.
 */
const N8N_BASE = "https://stamman.app.n8n.cloud"; // <-- change to your workspace domain
const PAYPAL_JS_CLIENT_ID = ""; // optional later

const brand = {
  primary: "#0f73c7",
  accent: "#59b3ff",
  slate: "#0f172a",
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-6xl mx-auto px-4">{children}</div>;
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-slate-200">
      <Container>
        <div className="py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/manifex-logo.png" alt="Manifex" className="h-7 w-7" />
            <span className="font-semibold tracking-tight">Manifex</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#solutions" className="hover:text-slate-900 text-slate-600">
              Solutions
            </a>
            <a href="#how" className="hover:text-slate-900 text-slate-600">
              How it works
            </a>
            <a href="#pricing" className="hover:text-slate-900 text-slate-600">
              Pricing
            </a>
            <a href="#contact" className="hover:text-slate-900 text-slate-600">
              Contact
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`${N8N_BASE}/webhook/customer-setup`}
              className="px-4 py-2 rounded-xl text-white"
              style={{ background: brand.primary }}
            >
              Get started
            </a>
          </div>
        </div>
      </Container>
    </nav>
  );
}

function Hero() {
  return (
    <header className="bg-gradient-to-b from-white to-sky-50/60">
      <Container>
        <div className="py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
              Automation that answers, schedules, and scales.
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Manifex builds practical automations for growing teams — from AI
              voice receptionists to scheduling, lead intake, and data sync.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`${N8N_BASE}/webhook/customer-setup`}
                className="px-5 py-3 rounded-xl text-white"
                style={{ background: brand.primary }}
              >
                Get started
              </a>
              <a
                href="#solutions"
                className="px-5 py-3 rounded-xl border border-slate-300 bg-white"
              >
                Explore solutions
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl p-8 border border-slate-200 bg-white shadow-sm">
              <svg viewBox="0 0 400 220" className="w-full h-auto">
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor={brand.accent} />
                    <stop offset="100%" stopColor={brand.primary} />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="400" height="220" rx="16" fill="#f8fafc" />
                <rect x="20" y="28" width="110" height="12" rx="6" fill="#cbd5e1" />
                <rect x="20" y="54" width="360" height="8" rx="4" fill="#e2e8f0" />
                <rect x="20" y="70" width="300" height="8" rx="4" fill="#e2e8f0" />
                <rect x="20" y="102" width="360" height="36" rx="8" fill="url(#g)" />
                <rect x="20" y="154" width="200" height="8" rx="4" fill="#e2e8f0" />
                <rect x="20" y="170" width="160" height="8" rx="4" fill="#e2e8f0" />
              </svg>
              <div className="mt-3 text-xs text-slate-500">
                A clean, neutral hero graphic. No stock people.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

function Solutions() {
  const items = [
    {
      title: "AI Voice Receptionist",
      desc: "Answers calls, books to Google Calendar, handles FAQs. 24/7.",
      cta: (
        <div className="flex gap-2">
          <a
            href="#receptionist"
            className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
          >
            Learn more
          </a>
          <a
            href={`${N8N_BASE}/webhook/customer-setup`}
            className="px-3 py-2 rounded-lg text-white text-sm"
            style={{ background: brand.primary }}
          >
            Start
          </a>
        </div>
      ),
    },
    {
      title: "Lead Intake & Qualification",
      desc: "Capture leads from web/phone, qualify with AI, route to CRM.",
      cta: <span className="text-xs text-slate-500">Coming soon</span>,
    },
    {
      title: "Smart Scheduling",
      desc: "Share booking links, enforce rules, auto-reminders and rescheduling.",
      cta: <span className="text-xs text-slate-500">Coming soon</span>,
    },
    {
      title: "Data Sync & Reporting",
      desc: "Keep sheets, CRMs and tools in sync; dashboards that matter.",
      cta: <span className="text-xs text-slate-500">Coming soon</span>,
    },
  ];
  return (
    <section id="solutions" className="py-16">
      <Container>
        <h2 className="text-3xl font-bold text-slate-900">Solutions</h2>
        <p className="text-slate-600 mt-2">Start with one, add more as you grow.</p>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {items.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <h3 className="font-semibold text-lg text-slate-900">{s.title}</h3>
              <p className="text-slate-600 mt-2 text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-4">{s.cta}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Receptionist() {
  const [clientId, setClientId] = useState("");
  const [replyUrl, setReplyUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [rec, setRec] = useState(false);

  async function startRec() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const r = new MediaRecorder(stream);
    chunksRef.current = [];
    r.ondataavailable = (e) => chunksRef.current.push(e.data);
    r.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const fd = new FormData();
      fd.append("file", blob, "say.webm");
      if (clientId) fd.append("client_id", clientId);
      const res = await fetch(`${N8N_BASE}/webhook/test-voice`, {
        method: "POST",
        body: fd,
      });
      const audio = await res.blob();
      setReplyUrl(URL.createObjectURL(audio));
    };
    mediaRecorderRef.current = r;
    r.start();
    setRec(true);
  }
  function stopRec() {
    mediaRecorderRef.current?.stop();
    setRec(false);
  }

  return (
    <section
      id="receptionist"
      className="py-16 bg-sky-50/50 border-t border-b border-slate-200"
      >
      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">AI Voice Receptionist</h2>
            <p className="text-slate-600 mt-2">
              A neutral, brand-aligned agent that answers calls, understands
              intent, and confirms bookings directly on your calendar.
            </p>
            <ul className="mt-4 text-sm text-slate-700 list-disc list-inside space-y-1">
              <li>Google Calendar (primary) integration</li>
              <li>FAQ & policy guidance via your form</li>
              <li>Trial by voice in the browser — no phone needed</li>
              <li>Optional Twilio number when you go live</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href={`${N8N_BASE}/webhook/customer-setup`}
                className="px-4 py-2 rounded-xl text-white"
                style={{ background: brand.primary }}
              >
                Get started
              </a>
              <a
                href="#pricing"
                className="px-4 py-2 rounded-xl border border-slate-300 bg-white"
              >
                See pricing
              </a>
            </div>
          </div>
          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="text-sm font-semibold text-slate-700">Try the voice demo</div>
            <div className="mt-2 text-xs text-slate-500">
              Enter your Client ID from signup (or leave blank to try a generic demo):
            </div>
            <input
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="e.g. abc123"
              className="mt-2 w-full px-3 py-2 rounded-xl border border-slate-300 outline-none"
            />
            <div className="mt-3 flex gap-2">
              {!rec ? (
                <button
                  onClick={startRec}
                  className="px-4 py-2 rounded-xl text-white"
                  style={{ background: brand.accent }}
                >
                  Start talking
                </button>
              ) : (
                <button
                  onClick={stopRec}
                  className="px-4 py-2 rounded-xl text-white bg-rose-600"
                >
                  Stop
                </button>
              )}
              <a
                href={`${N8N_BASE}/webhook/customer-setup`}
                className="px-4 py-2 rounded-xl border border-slate-300"
              >
                I need a Client ID
              </a>
            </div>
            {replyUrl && (
              <div className="mt-4">
                <audio src={replyUrl} controls autoPlay className="w-full" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function How() {
  const steps = [
    { t: "Define the outcome", d: "We clarify the task you want automated and the data you have." },
    { t: "Configure & connect", d: "Connect Google/Twilio and map your business rules." },
    { t: "Trial & refine", d: "Test in the browser; we adjust prompts and flows." },
    { t: "Go live", d: "Add a phone number and start taking real calls and bookings." },
  ];
  return (
    <section id="how" className="py-16">
      <Container>
        <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {steps.map((s, i) => (
            <div key={i} className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="text-sm font-semibold text-slate-500">Step {i + 1}</div>
              <div className="text-lg font-semibold mt-1">{s.t}</div>
              <div className="text-sm text-slate-600 mt-2">{s.d}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-sky-50/50">
      <Container>
        <h2 className="text-3xl font-bold text-slate-900">Pricing</h2>
        <p className="text-slate-600 mt-2">Start small. Scale when ready.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="text-sm font-semibold text-slate-500">Starter</div>
            <div className="text-3xl font-bold mt-1">
              €49<span className="text-base font-normal">/mo</span>
            </div>
            <ul className="mt-3 text-sm text-slate-600 list-disc list-inside">
              <li>AI Receptionist (web demo)</li>
              <li>Google Calendar booking</li>
              <li>Email support</li>
            </ul>
            <div className="mt-4">
              <a
                href={`${N8N_BASE}/webhook/customer-setup`}
                className="px-4 py-2 rounded-xl text-white inline-block"
                style={{ background: brand.primary }}
              >
                Get started
              </a>
            </div>
          </div>

          <div
            className="p-6 rounded-3xl border-2 shadow-sm"
            style={{ borderColor: brand.accent, background: "white" }}
          >
            <div className="text-sm font-semibold text-slate-500">Business</div>
            <div className="text-3xl font-bold mt-1">
              €99<span className="text-base font-normal">/mo</span>
            </div>
            <ul className="mt-3 text-sm text-slate-600 list-disc list-inside">
              <li>Everything in Starter</li>
              <li>Phone line (Twilio fees separate)</li>
              <li>Priority support</li>
            </ul>
            <div className="mt-4">
              <a
                href={`${N8N_BASE}/webhook/paypal-demo?client_id=yourClientId`}
                className="px-4 py-2 rounded-xl text-white inline-block"
                style={{ background: brand.primary }}
              >
                Buy with PayPal
              </a>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="text-sm font-semibold text-slate-500">Custom</div>
            <div className="text-3xl font-bold mt-1">Let’s talk</div>
            <ul className="mt-3 text-sm text-slate-600 list-disc list-inside">
              <li>Multi-location workflows</li>
              <li>Advanced integrations</li>
              <li>Dedicated support</li>
            </ul>
            <div className="mt-4">
              <a
                href="mailto:hello@manifex.ai"
                className="px-4 py-2 rounded-xl border border-slate-300 inline-block bg-white"
              >
                Contact sales
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="py-10 border-t border-slate-200">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <img src="/manifex-logo.png" className="h-5 w-5" alt="Manifex" />
            <span>© {new Date().getFullYear()} Manifex</span>
          </div>
          <div className="text-sm text-slate-600">hello@manifex.ai</div>
        </div>
      </Container>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.body.style.background = "#fff";
  }, []);
  return (
    <div>
      <Nav />
      <Hero />
      <Solutions />
      <Receptionist />
      <How />
      <Pricing />
      <Footer />
    </div>
  );
}
