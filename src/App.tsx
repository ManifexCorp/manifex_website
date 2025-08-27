import React, { useEffect, useRef, useState } from "react";

/**
 * Manifex – AI Receptionist website (single-file React app)
 * --------------------------------------------------------
 * Fill these before deploy:
 * 1) Set N8N_BASE to your domain (HTTPS) where n8n runs.
 * 2) (Optional for live payments) Replace PAYPAL_JS_CLIENT_ID with your PayPal Client ID.
 * 3) Place your logo at /public/manifex-logo.png (or adjust <img src>).
 */

const N8N_BASE = "https://stamman.app.n8n.cloud"; // <-- CHANGE THIS
const PAYPAL_JS_CLIENT_ID = "YOUR_LIVE_OR_SANDBOX_CLIENT_ID"; // optional for now

const lightBlue = "#59b3ff";
const darkerBlue = "#0f73c7";

function Nav() {
  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/manifex-logo.png" alt="Manifex" className="h-8 w-8 object-contain"/>
          <span className="font-semibold text-slate-800">Manifex</span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-slate-900 text-slate-600">Features</a>
          <a href="#how" className="hover:text-slate-900 text-slate-600">How it works</a>
          <a href="#pricing" className="hover:text-slate-900 text-slate-600">Pricing</a>
        </div>
        <div className="flex items-center gap-2">
          <a href={`${N8N_BASE}/webhook/customer-setup`} className="px-4 py-2 rounded-xl text-white" style={{background: darkerBlue}}>Sign up</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-28 pb-16 bg-gradient-to-b from-white to-sky-50">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Meet your <span style={{color: darkerBlue}}>AI Receptionist</span>.
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Manifex answers calls, books appointments in Google Calendar, and handles FAQs — 24/7. Try it in your browser, no phone number required.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`${N8N_BASE}/webhook/customer-setup`} className="px-5 py-3 rounded-2xl text-white shadow" style={{background: darkerBlue}}>Sign up free</a>
            <a href="#voice" className="px-5 py-3 rounded-2xl border border-slate-300 text-slate-700 bg-white">Try voice demo</a>
          </div>
          <div className="mt-4 text-xs text-slate-500">Works with your Google Calendar. No coding needed.</div>
        </div>
        <div className="relative">
          <div className="rounded-3xl shadow-xl p-6 bg-white border border-slate-100">
            <img src="/hero-illustration.png" alt="AI Receptionist" className="w-full h-auto rounded-2xl"/>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({title, text, icon}:{title:string;text:string;icon:React.ReactNode}){
  return (
    <div className="p-6 rounded-3xl border border-slate-200 shadow-sm bg-white">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-slate-600 mt-2 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900">Everything you need</h2>
        <p className="text-slate-600 mt-2">Bookings in Google Calendar, trial by voice, and phone support when you’re ready.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Feature title="Calendar booking" text="Confirmed appointments go right into your primary Google Calendar." icon={"📆"} />
          <Feature title="Voice demo (no phone)" text="Try the receptionist with your mic in the browser — instant experience." icon={"🎤"} />
          <Feature title="Phone-ready" text="Add a Twilio number later for real inbound calls to your AI receptionist." icon={"☎️"} />
          <Feature title="Admin tools" text="Update settings, hours, services with admin endpoints (secured)." icon={"🛠️"} />
          <Feature title="Secure & private" text="You control your data; integrations are scoped to your account." icon={"🔒"} />
          <Feature title="Fast to launch" text="Start with browser voice demo and card payments, expand as you grow." icon={"⚡"} />
        </div>
      </div>
    </section>
  );
}

function How() {
  const steps = [
    {n:1, t:"Sign up", d:"Complete a short form so the receptionist knows your business and services."},
    {n:2, t:"Connect Google", d:"Authorize Google Calendar so bookings land in your primary calendar."},
    {n:3, t:"Try it by voice", d:"Talk to your receptionist in the browser — no phone required."},
    {n:4, t:"Go live", d:"Add a phone number later (Twilio) when you’re ready for real calls."}
  ];
  return (
    <section id="how" className="py-16 bg-sky-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {steps.map(s=> (
            <div key={s.n} className="p-6 rounded-3xl bg-white border border-slate-200">
              <div className="text-sm font-semibold text-slate-500">Step {s.n}</div>
              <div className="text-lg font-semibold mt-1">{s.t}</div>
              <div className="text-sm text-slate-600 mt-2">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VoiceDemo() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [clientId, setClientId] = useState("");
  const [replyUrl, setReplyUrl] = useState<string | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRec(){
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const rec = new MediaRecorder(stream);
    chunksRef.current = [];
    rec.ondataavailable = (e)=> chunksRef.current.push(e.data);
    rec.onstop = async ()=>{
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const fd = new FormData();
      fd.append("file", blob, "say.webm");
      if (clientId) fd.append("client_id", clientId);
      const res = await fetch(`${N8N_BASE}/webhook/test-voice`, { method: "POST", body: fd });
      const audio = await res.blob();
      setReplyUrl(URL.createObjectURL(audio));
    };
    mediaRecorderRef.current = rec;
    rec.start();
    setIsRecording(true);
  }
  function stopRec(){
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }

  return (
    <section id="voice" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Try the AI receptionist (voice)</h2>
        <p className="text-slate-600 mb-4">Speak into your mic — we’ll reply with synthesized voice.</p>
        <div className="p-6 rounded-3xl border border-slate-200 bg-sky-50/50">
          <div className="flex flex-col gap-3">
            <label className="text-sm text-slate-700">Your Client ID (from sign up)</label>
            <input value={clientId} onChange={e=>setClientId(e.target.value)} placeholder="e.g. abc123" className="px-3 py-2 rounded-xl border border-slate-300 outline-none"/>
            <div className="flex gap-3 mt-2">
              {!isRecording ? (
                <button onClick={startRec} className="px-4 py-2 rounded-xl text-white" style={{background: lightBlue}}>Start talking</button>
              ) : (
                <button onClick={stopRec} className="px-4 py-2 rounded-xl text-white bg-rose-500">Stop</button>
              )}
              <a href={`${N8N_BASE}/webhook/customer-setup`} className="px-4 py-2 rounded-xl border border-slate-300 bg-white">I need a Client ID</a>
            </div>
            {replyUrl && (
              <div className="mt-4">
                <audio src={replyUrl} controls autoPlay className="w-full"/>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [cid, setCid] = useState("");
  useEffect(()=>{
    const qs = new URLSearchParams(location.search);
    const c = qs.get("client_id");
    if (c) setCid(c);
  },[]);

  return (
    <section id="pricing" className="py-16 bg-sky-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900">Simple pricing</h2>
        <p className="text-slate-600 mt-2">Start with the browser demo. Add a phone number when you’re ready.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 rounded-3xl border border-slate-200 bg-white">
            <div className="text-sm font-semibold text-slate-500">Starter</div>
            <div className="text-3xl font-bold mt-1">€49<span className="text-base font-normal">/mo</span></div>
            <ul className="mt-3 text-sm text-slate-600 list-disc list-inside">
              <li>Google Calendar bookings</li>
              <li>Web voice demo</li>
              <li>Email support</li>
            </ul>
            <div className="mt-4">
              <a href={`${N8N_BASE}/webhook/customer-setup`} className="px-4 py-2 rounded-xl text-white w-full inline-block text-center" style={{background: darkerBlue}}>Sign up</a>
            </div>
          </div>

          <div className="p-6 rounded-3xl border-2" style={{borderColor: lightBlue, background:"white"}}>
            <div className="text-sm font-semibold text-slate-500">Business</div>
            <div className="text-3xl font-bold mt-1">€99<span className="text-base font-normal">/mo</span></div>
            <ul className="mt-3 text-sm text-slate-600 list-disc list-inside">
              <li>Everything in Starter</li>
              <li>Phone line (Twilio, billed separately)</li>
              <li>Priority support</li>
            </ul>
            <div className="mt-4">
              <div id="paypal-button-container" className="w-full"/>
              <div className="text-xs text-slate-500 mt-2">Use your Client ID in URL: <code>?client_id=abc123</code></div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 bg-white">
            <div className="text-sm font-semibold text-slate-500">Custom</div>
            <div className="text-3xl font-bold mt-1">Let’s talk</div>
            <ul className="mt-3 text-sm text-slate-600 list-disc list-inside">
              <li>Advanced workflows</li>
              <li>Multi-location</li>
              <li>Custom integration</li>
            </ul>
            <div className="mt-4">
              <a href="mailto:hello@manifex.ai" className="px-4 py-2 rounded-xl border border-slate-300 bg-white inline-block">Contact sales</a>
            </div>
          </div>
        </div>

        <PayPalInjector paypalClientId={PAYPAL_JS_CLIENT_ID} clientId={cid} />
      </div>
    </section>
  );
}

function PayPalInjector({ paypalClientId, clientId }:{ paypalClientId: string; clientId: string; }){
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if (!paypalClientId || !clientId) return;
    const s = document.createElement('script');
    s.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=EUR`;
    s.onload = () => {
      // @ts-ignore
      if (window.paypal) {
        // @ts-ignore
        window.paypal.Buttons({
          createOrder: (_d: any, actions: any) => actions.order.create({
            purchase_units: [{ amount: { value: "99.00" }, custom_id: clientId }]
          }),
          onApprove: (_d: any, actions: any) => actions.order.capture().then(() => {
            alert("Payment completed. You’ll get an email shortly.");
          })
        }).render('#paypal-button-container');
      }
    };
    document.body.appendChild(s);
    return ()=> { s.remove(); };
  }, [paypalClientId, clientId]);
  return <div ref={containerRef}/>;
}

function Footer(){
  return (
    <footer className="py-10 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <img src="/manifex-logo.png" alt="Manifex" className="h-5 w-5"/>
          <span>© {new Date().getFullYear()} Manifex</span>
        </div>
        <div className="text-xs text-slate-500">Made with love in light blue 💙</div>
      </div>
    </footer>
  );
}

export default function App(){
  useEffect(()=>{
    document.body.style.background = '#ffffff';
  },[]);

  return (
    <div>
      <Nav/>
      <Hero/>
      <Features/>
      <How/>
      <VoiceDemo/>
      <Pricing/>
      <Footer/>
    </div>
  );
}
