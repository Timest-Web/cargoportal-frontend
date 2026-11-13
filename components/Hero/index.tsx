"use client";
import { useState } from "react";
import Link from "next/link";

/**
 * HERO MEDIA
 * Drop your files in /public:
 *   /public/videos/hero.mp4     (short looping clip, 1080p, under ~8 MB)
 *   /public/images/hero.jpg     (poster shown while the video loads)
 * If the video is missing or fails, the animated route scene underneath shows instead.
 */
const VIDEO_SRC = "/videos/hero.mp4";
const POSTER_SRC = "/images/hero.jpg";

const STAGES = ["Shipment created", "Package received", "Warehouse check-in", "In transit", "Arrived Nigeria", "Out for delivery", "Delivered"];

export default function Hero() {
  const [at, setAt] = useState(3);
  const [tn, setTn] = useState("CP-240913");
  const [videoOk, setVideoOk] = useState(true);

  return (
    <header className="hero" id="top">
      <svg className="scene" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0B1B3A" /><stop offset=".55" stopColor="#2B3A8C" />
            <stop offset=".85" stopColor="#C9708A" /><stop offset="1" stopColor="#FFA630" />
          </linearGradient>
          <path id="rUK" d="M250 190 Q560 20 880 420" />
          <path id="rUS" d="M110 380 Q480 640 880 420" />
          <path id="rCN" d="M1090 140 Q1180 380 880 420" />
        </defs>
        <rect width="1200" height="700" fill="url(#sky)" />
        <g fill="none" stroke="#FFD28A" strokeWidth="2" opacity=".85">
          <use href="#rUK" className="dash" /><use href="#rUS" className="dash" /><use href="#rCN" className="dash" />
        </g>
        <circle r="5" fill="#FFA630"><animateMotion dur="7s" repeatCount="indefinite"><mpath href="#rUK" /></animateMotion></circle>
        <circle r="5" fill="#FFA630"><animateMotion dur="9s" begin="-4s" repeatCount="indefinite"><mpath href="#rCN" /></animateMotion></circle>
        <path fill="#fff" d="M-14 0l8-3 6-14 4 0-3 14 9 1 3-4 3 0-2 6 2 6-3 0-3-4-9 1 3 14-4 0-6-14-8-3z">
          <animateMotion dur="9s" begin="-2s" repeatCount="indefinite" rotate="auto"><mpath href="#rUK" /></animateMotion>
        </path>
        <g fontFamily="DM Sans, sans-serif" fontSize="14" fontWeight="700" fill="#fff">
          <circle cx="250" cy="190" r="6" fill="#FFA630" /><text x="262" y="186">London</text>
          <circle cx="110" cy="380" r="6" fill="#FFA630" /><text x="122" y="376">New York</text>
          <circle cx="1090" cy="140" r="6" fill="#FFA630" /><text x="1000" y="136">Shenzhen</text>
          <circle className="pulse" cx="880" cy="420" r="8" fill="#FFA630" /><circle cx="880" cy="420" r="8" fill="#FFA630" /><text x="896" y="446">Lagos</text>
        </g>
      </svg>

      {videoOk && (
        <video className="bgvideo" autoPlay muted loop playsInline preload="auto" poster={POSTER_SRC} onError={() => setVideoOk(false)}>
          <source src={VIDEO_SRC} type="video/mp4" onError={() => setVideoOk(false)} />
        </video>
      )}
      <div className="shade" />

      <div className="wrap herogrid">
        <div>
          <h1>Move freight to Nigeria. Run it from one portal.</h1>
          <p className="lead">Cargo Portal is the management platform for companies shipping from the UK, USA and China. Take bookings, check packages into warehouses, bill customers and show them live tracking.</p>
          <div className="cta">
            <Link className="btn sun" href="/signup">Start free trial</Link>
            <Link className="btn ghost" href="/login">Log in</Link>
          </div>
        </div>
        <aside className="glass" aria-label="Track a shipment">
          <h3>Track a shipment</h3>
          <form className="trk" onSubmit={(e) => { e.preventDefault(); setAt((a) => (a + 1) % STAGES.length); }}>
            <input value={tn} onChange={(e) => setTn(e.target.value)} aria-label="Tracking number" placeholder="Enter tracking number" />
            <button className="btn sun sm" type="submit">Track</button>
          </form>
          <ul className="steps">
            {STAGES.map((s, i) => (
              <li key={s} className={i < at ? "done" : i === at ? "now" : ""}>
                {s}{i === at && <small>London to Lagos, air cargo</small>}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </header>
  );
}