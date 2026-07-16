import React, { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import doctorPhoto from "@/imports/pankaj.png";
import clinicLogo from "@/imports/Dynamic_Running_Grid_CURE_MAX_Logo.png";
import clinicTreatment from "@/imports/WhatsApp_Image_2026-07-02_at_11.26.38.jpeg";
import clinicCertificates from "@/imports/WhatsApp_Image_2026-07-02_at_11.26.39.jpeg";
import clinicTechniques from "@/imports/WhatsApp_Image_2026-07-02_at_11.26.41.jpeg";
import clinicConsultation from "@/imports/WhatsApp_Image_2026-07-02_at_11.26.42__1_.jpeg";
import clinicRoom from "@/imports/WhatsApp_Image_2026-07-02_at_11.26.42.jpeg";
import clinicEntrance from "@/imports/WhatsApp_Image_2026-07-02_at_11.26.43.jpeg";
import clinicSession1 from "@/imports/WhatsApp_Image_2026-07-02_at_11.38.04.jpeg";
import clinicSession2 from "@/imports/WhatsApp_Image_2026-07-02_at_11.38.04__1_.jpeg";
import clinicEquipment from "@/imports/WhatsApp_Image_2026-07-02_at_11.38.04__2_.jpeg";
import clinicCorridor from "@/imports/WhatsApp_Image_2026-07-02_at_11.38.05.jpeg";
import {
  Phone, Mail, MapPin, Clock, Menu, X, Star, Award,
  CheckCircle, ArrowRight, Activity, Brain, Zap, Heart,
  Users, Shield, MessageCircle, Calendar, ChevronDown,
  Navigation2, Languages,
} from "lucide-react";

type Page = "home" | "about" | "services" | "why-us" | "contact" | "privacy" | "terms";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const B = {
  darkGreen: "#0d3d30",
  teal: "#1a7a69",
  aqua: "#2ec4b0",
  red: "#e8192c",
  bg: "#ffffff",
  dark: "#092820",
};

const DISPLAY = { fontFamily: "'Fraunces', Georgia, serif" };
const BODY = { fontFamily: "'Outfit', system-ui, sans-serif" };

// ─── Scroll reveal ─────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

// ─── Small shared components ───────────────────────────────────────────────

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: `linear-gradient(135deg, ${B.teal}, ${B.aqua})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

const CLINIC_MAP_QUERY =
  "Curemax+Advanced+Physiotherapy+and+Fitness,+107-108,+ABC+Complex,+Rabari+Colony+Cross+Road,+Amraiwadi,+Ahmedabad,+Gujarat+380026";

function ClinicLogo({ onNavigate }: { onNavigate: () => void }) {
  return (
    <button onClick={onNavigate} className="shrink-0 flex items-center">
      <ImageWithFallback
        src={clinicLogo}
        alt="Cure Max Physiotherapy & Fitness logo"
        className="h-14 w-auto object-contain"
        style={{ mixBlendMode: "multiply" }}
      />
    </button>
  );
}

// ─── Header ────────────────────────────────────────────────────────────────

const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "hi", label: "हि", name: "Hindi" },
  { code: "gu", label: "ગુ", name: "Gujarati" },
];

function setGoogleTranslateCookie(lang: string) {
  const value = lang === "en" ? "/en/en" : `/en/${lang}`;
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `googtrans=${value}; path=/; max-age=${maxAge}`;

  const host = window.location.hostname;
  if (host.includes(".")) {
    document.cookie = `googtrans=${value}; domain=.${host}; path=/; max-age=${maxAge}`;
  }
}

function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,gu",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate) {
      window.googleTranslateElementInit?.();
    }
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setGoogleTranslateCookie(lang);

    const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={`${compact ? "w-full" : "flex items-center gap-1.5"} notranslate`} translate="no">
      {!compact && <div id="google_translate_element" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" />}
      <div
        className={
          compact
            ? "grid grid-cols-3 gap-1 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-1"
            : "flex items-center gap-1 rounded-xl border border-[#e2e8f0] bg-white p-1"
        }
        aria-label="Select language"
      >
        {!compact && <Languages size={15} className="ml-2 text-[#475569]" />}
        {LANGUAGES.map(({ code, label, name }) => (
          <button
            key={code}
            type="button"
            onClick={() => changeLanguage(code)}
            className="notranslate rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors"
            translate="no"
            style={
              language === code
                ? { backgroundColor: B.teal, color: "white" }
                : { color: "#475569" }
            }
            title={name}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
function Header({
  page,
  setPage,
}: {
  page: Page;
  setPage: (p: Page) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (p: Page) => {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const NAV: { label: string; p: Page }[] = [
    { label: "Home", p: "home" },
    { label: "About", p: "about" },
    { label: "Services", p: "services" },
    { label: "Why Us", p: "why-us" },
    { label: "Contact", p: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/96 backdrop-blur-md shadow-sm border-b border-[#e2e8f0]"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <ClinicLogo onNavigate={() => go("home")} />

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map(({ label, p }) => (
                <button
                  key={p}
                  onClick={() => go(p)}
                  className={
                    page === p
                      ? "nav-link-active px-4 py-2 rounded-lg text-sm font-medium"
                      : "nav-link px-4 py-2 rounded-lg text-sm font-medium"
                  }
                  style={
                    page === p
                      ? { backgroundColor: B.teal, color: "white" }
                      : { color: "#475569" }
                  }
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher />
              <a
                href="tel:+919784877721"
                className="flex items-center gap-1.5 text-sm font-medium text-[#475569] hover:text-[#123d32] transition-colors"
              >
                <Phone size={15} />
                +91 97848 77721
              </a>
              <button
                onClick={() => go("contact")}
                className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md"
                style={{ backgroundColor: B.darkGreen }}
              >
                Book Appointment
              </button>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-[#475569] hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#e2e8f0] bg-white">
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV.map(({ label, p }) => (
                <button
                  key={p}
                  onClick={() => go(p)}
                  className={page === p ? "nav-link-active px-4 py-3 rounded-xl text-left text-sm font-medium" : "nav-link px-4 py-3 rounded-xl text-left text-sm font-medium"}
                  style={page === p ? { backgroundColor: B.teal, color: "white" } : { color: "#0f172a" }}
                >
                  {label}
                </button>
              ))}
              <div className="pt-3 mt-2 border-t border-[#e2e8f0] flex flex-col gap-2">
                <LanguageSwitcher compact />
                <a
                  href="tel:+919784877721"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#475569]"
                >
                  <Phone size={15} />
                  +91 97848 77721
                </a>
                <button
                  onClick={() => go("contact")}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-white text-left"
                  style={{ backgroundColor: B.darkGreen }}
                >
                  Book Appointment →
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-16 lg:h-20" />
    </>
  );
}

// ─── Mobile sticky bar ──────────────────────────────────────────────────────

function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-[#e2e8f0]">
      <div className="grid grid-cols-3">
        <a
          href="tel:+919784877721"
          className="flex flex-col items-center gap-0.5 py-3.5 text-xs font-semibold"
          style={{ color: B.darkGreen }}
        >
          <Phone size={19} />
          Call
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=919784877721" target="_blank" rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 py-3.5 text-xs font-semibold border-x border-[#e2e8f0]"
          style={{ color: "#22c55e" }}
        >
          <MessageCircle size={19} />
          WhatsApp
        </a>
        <a
          href={`https://maps.google.com/?q=${CLINIC_MAP_QUERY}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 py-3.5 text-xs font-semibold"
          style={{ color: B.teal }}
        >
          <Navigation2 size={19} />
          Directions
        </a>
      </div>
    </div>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const svcs = [
    "Sports Rehabilitation",
    "Orthopedic Physiotherapy",
    "Neurological Rehab",
    "Manual Therapy",
    "Dry Needling & Cupping",
    "Geriatric Care",
  ];
  return (
    <footer style={{ backgroundColor: B.darkGreen }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <div className="inline-block rounded-xl overflow-hidden bg-white px-3 py-2">
                <ImageWithFallback
                  src={clinicLogo}
                  alt="Cure Max Physiotherapy & Fitness"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
              Personalized, evidence-based rehabilitation in Amraiwadi, Ahmedabad. Led by Dr. Pankaj Sharma, BPT, MPT, GSCPT.
            </p>
            <div className="flex flex-col gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: B.aqua }} />
                <span>107-108, First Floor, ABC Complex, Rabari Colony Cross Road, Amraiwadi, Ahmedabad 380026</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} style={{ color: B.aqua }} />
                <a href="tel:+919784877721" className="hover:text-white transition-colors">
                  +91 97848 77721
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} style={{ color: B.aqua }} />
                <a
                  href="mailto:drpankajsharma34@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  drpankajsharma34@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-semibold text-xs uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Services
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              {svcs.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => go("services")}
                    className="hover:text-white transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4
              className="font-semibold text-xs uppercase tracking-widest mb-5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Clinic Hours
            </h4>
            <div className="flex flex-col gap-4 text-sm">
              <div>
                <div
                  className="text-[10px] uppercase tracking-wider mb-1 font-semibold"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Morning
                </div>
                <div className="text-white font-semibold">9:00 AM – 1:00 PM</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Monday to Saturday
                </div>
              </div>
              <div>
                <div
                  className="text-[10px] uppercase tracking-wider mb-1 font-semibold"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Evening
                </div>
                <div className="text-white font-semibold">5:00 PM – 9:00 PM</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Monday to Saturday
                </div>
              </div>
              <div
                className="px-3 py-2 rounded-lg text-xs"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Sunday: By appointment only
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)" }}
        >
          <span>© 2026 Curemax Advanced Physiotherapy and Fitness. All rights reserved.</span>
          <div className="flex gap-5">
            <button onClick={() => go("privacy")} className="hover:text-white/60 transition-colors">Privacy Policy</button>
            <button onClick={() => go("terms")} className="hover:text-white/60 transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Services data ──────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "orthopaedic",
    Icon: Shield,
    title: "Orthopaedic Rehabilitation",
    short: "Focused recovery for bones, joints, spine, and post-surgical conditions.",
    full: "Evidence-based rehabilitation for orthopedic conditions affecting the spine, shoulders, knees, hips, and joints, with protocols designed for pain relief and lasting functional restoration.",
    img: "https://images.unsplash.com/photo-1757689314932-bec6e9c39e51?w=600&h=400&fit=crop&auto=format",
    conditions: ["Joint pain", "Post-fracture rehab", "Back & neck pain", "Arthritis care", "Post-surgical recovery"],
  },
  {
    id: "ergonomics",
    Icon: Activity,
    title: "Ergonomics Advisory",
    short: "Workplace and posture guidance for professionals.",
    full: "Practical ergonomic assessment and correction for office workers, desk-based professionals, and active occupations to reduce strain, pain, and repeated injury patterns.",
    img: clinicConsultation as unknown as string,
    conditions: ["Posture correction", "Desk setup advice", "Neck & back strain", "Workplace pain", "Injury prevention"],
  },
  {
    id: "ndt-bobath",
    Icon: Brain,
    title: "NDT & Bobath Therapy",
    short: "Neuro-developmental therapy for movement control and functional recovery.",
    full: "Specialized NDT and Bobath-based treatment for neurological conditions, focusing on movement re-education, posture control, balance, and functional independence.",
    img: "https://images.unsplash.com/photo-1645005513709-77336f075dc8?w=600&h=400&fit=crop&auto=format",
    conditions: ["Stroke recovery", "Motor control", "Balance training", "Posture correction", "Functional movement"],
  },
  {
    id: "mobilization",
    Icon: Heart,
    title: "Mobilization Techniques",
    short: "Hands-on joint and soft tissue techniques to restore mobility.",
    full: "Precise mobilization techniques to reduce stiffness, improve range of motion, and restore comfortable movement in painful or restricted joints.",
    img: clinicTreatment as unknown as string,
    conditions: ["Joint stiffness", "Restricted movement", "Spinal mobility", "Shoulder mobility", "Pain relief"],
  },
  {
    id: "vertigo",
    Icon: Brain,
    title: "Vertigo & Neural Mobilization",
    short: "Targeted care for dizziness, nerve irritation, and neural mobility.",
    full: "Assessment-led physiotherapy for vertigo, balance issues, and nerve-related symptoms using vestibular strategies and neural mobilization techniques.",
    img: clinicSession1 as unknown as string,
    conditions: ["Vertigo", "Balance issues", "Nerve pain", "Neural tension", "Dizziness care"],
  },
  {
    id: "sports",
    Icon: Activity,
    title: "Musculoskeletal & Sports Rehab",
    short: "Return to peak athletic performance with targeted sports rehab protocols.",
    full: "Comprehensive rehabilitation for muscle, joint, and sports injuries including sprains, strains, fractures, and post-surgical recovery. Tailored programs help patients return safely and stronger than before.",
    img: "https://images.unsplash.com/photo-1649751361457-01d3a696c7e6?w=600&h=400&fit=crop&auto=format",
    conditions: ["Ligament tears & sprains", "Muscle strains", "Stress fractures", "Post-surgical rehab", "Overuse injuries"],
  },
  {
    id: "cancer-rehab",
    Icon: Heart,
    title: "Cancer Rehabilitation",
    short: "Supportive rehabilitation for strength, mobility, and quality of life.",
    full: "Gentle, goal-based rehabilitation support for patients recovering during or after cancer care, focused on fatigue, mobility, strength, and daily function.",
    img: clinicRoom as unknown as string,
    conditions: ["Fatigue management", "Mobility recovery", "Strength rebuilding", "Pain support", "Daily function"],
  },
  {
    id: "taping",
    Icon: Shield,
    title: "Taping Techniques",
    short: "Supportive taping for sports injuries and neurological conditions.",
    full: "Therapeutic taping techniques used to support movement, reduce strain, guide posture, and assist recovery in sports and neurological conditions.",
    img: clinicTechniques as unknown as string,
    conditions: ["Sports support", "Joint stability", "Muscle facilitation", "Posture support", "Pain reduction"],
  },
  {
    id: "home-care",
    Icon: Users,
    title: "Home Care Physiotherapy",
    short: "Physiotherapy support for patients who need care at home.",
    full: "Home-based physiotherapy for patients who need convenient, supervised rehabilitation for mobility, post-operative care, neurological recovery, or elderly care.",
    img: clinicEntrance as unknown as string,
    conditions: ["Elderly care", "Post-op rehab", "Mobility training", "Neuro recovery", "Family guidance"],
  },
  {
    id: "neuro",
    Icon: Brain,
    title: "Neuro & Neurosurgical Rehab",
    short: "Restoring function and independence after neurological conditions.",
    full: "Specialized neurological and neurosurgical rehabilitation for patients recovering from stroke, brain injury, surgery, and movement disorders, with focus on functional independence.",
    img: "https://images.unsplash.com/photo-1645005513709-77336f075dc8?w=600&h=400&fit=crop&auto=format",
    conditions: ["Post-stroke recovery", "Brain injury rehab", "Post-surgical rehab", "Balance & coordination", "Functional training"],
  },
  {
    id: "plyometrics",
    Icon: Activity,
    title: "Plyometrics & Fitness",
    short: "Performance training for strength, speed, and functional power.",
    full: "Structured plyometric and fitness programs to improve strength, agility, endurance, and return-to-sport readiness after injury or deconditioning.",
    img: clinicEquipment as unknown as string,
    conditions: ["Power training", "Agility drills", "Return to sport", "Strength building", "Fitness conditioning"],
  },
  {
    id: "manual",
    Icon: Heart,
    title: "MFR & Soft Tissue Manipulation",
    short: "Hands-on techniques to relieve pain and restore joint mobility.",
    full: "Advanced myofascial release, soft tissue manipulation, and hands-on techniques to reduce tightness, improve tissue mobility, and relieve musculoskeletal pain.",
    img: "https://images.unsplash.com/photo-1757689314932-bec6e9c39e51?w=600&h=400&fit=crop&auto=format",
    conditions: ["Myofascial pain", "Muscle tightness", "Soft tissue restriction", "Trigger points", "Movement restoration"],
  },
  {
    id: "pilates",
    Icon: Activity,
    title: "Pilates",
    short: "Controlled movement training for core strength and posture.",
    full: "Physiotherapy-led Pilates to improve core control, posture, flexibility, breathing, and safe movement patterns for daily life and fitness.",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop&auto=format",
    conditions: ["Core strength", "Posture training", "Flexibility", "Spine control", "Body awareness"],
  },
  {
    id: "needling",
    Icon: Zap,
    title: "Dry Needling (Sports/Neuro)",
    short: "Advanced techniques for trigger point release and deep tissue recovery.",
    full: "Precise dry needling techniques for sports injuries and neurological conditions, helping release trigger points, reduce muscle tension, and support recovery.",
    img: "https://images.unsplash.com/photo-1598555763574-dca77e10427e?w=600&h=400&fit=crop&auto=format",
    conditions: ["Trigger point pain", "Sports recovery", "Neuro muscle tone", "Chronic tension", "Pain modulation"],
  },
  {
    id: "chest",
    Icon: Heart,
    title: "Chest Physiotherapy",
    short: "Breathing and airway clearance support for respiratory conditions.",
    full: "Chest physiotherapy focused on breathing exercises, airway clearance, lung expansion, and recovery support for respiratory and post-operative patients.",
    img: clinicCorridor as unknown as string,
    conditions: ["Breathing exercises", "Airway clearance", "Post-op chest care", "Lung expansion", "Respiratory support"],
  },
  {
    id: "cardiothoracic-icu",
    Icon: Heart,
    title: "Cardiothoracic & ICU Care",
    short: "Critical-care rehabilitation for cardiothoracic and ICU patients.",
    full: "Specialized physiotherapy support for cardiothoracic and critical intensive care patients, focusing on breathing, mobility, early rehabilitation, and safe recovery.",
    img: clinicConsultation as unknown as string,
    conditions: ["ICU mobility", "Post-surgical recovery", "Breathing support", "Early rehab", "Critical care"],
  },
  {
    id: "aerobics",
    Icon: Users,
    title: "Aerobics & Fitness",
    short: "Fitness-focused movement programs for endurance and overall health.",
    full: "Guided aerobic and fitness programs designed to improve stamina, mobility, strength, and confidence while respecting individual health and recovery goals.",
    img: "https://images.unsplash.com/photo-1658314755811-73c806249f31?w=600&h=400&fit=crop&auto=format",
    conditions: ["Endurance", "Weight management", "Mobility", "Strength", "General fitness"],
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Shah",
    age: 34,
    condition: "ACL Rehabilitation",
    text: "After my ACL surgery I was worried I would never play football again. Dr. Pankaj's structured rehab had me back on the field in 4 months. His encouragement and precision made all the difference.",
    initials: "PS",
  },
  {
    name: "Rahul Patel",
    age: 47,
    condition: "Chronic Lower Back Pain",
    text: "I had lived with debilitating back pain for 3 years. Within 6 sessions my pain reduced by 80%. The combination of manual therapy and targeted exercises was truly life-changing.",
    initials: "RP",
  },
  {
    name: "Meena Desai",
    age: 61,
    condition: "Post-Stroke Recovery",
    text: "After my stroke I lost mobility in my left side. Dr. Pankaj's patient, expert neurological rehab helped me regain function I thought was permanently gone. The entire CureMax team is exceptional.",
    initials: "MD",
  },
  {
    name: "Arjun Mehta",
    age: 28,
    condition: "Shoulder Impingement",
    text: "As a cricket player I suffered a shoulder impingement that kept me off the pitch for months. Dr. Pankaj identified the exact issue within minutes. Six weeks of treatment and I was back to full bowling strength.",
    initials: "AM",
  },
  {
    name: "Sunita Joshi",
    age: 52,
    condition: "Knee Osteoarthritis",
    text: "My knee pain had become so bad I could barely climb stairs. Dr. Pankaj explained my condition clearly and gave me a plan that actually worked. Within 2 months I was walking without pain for the first time in years.",
    initials: "SJ",
  },
  {
    name: "Deepak Trivedi",
    age: 39,
    condition: "Cervical Spondylosis",
    text: "I had constant neck pain and headaches from sitting at a computer all day. Dr. Pankaj's manual therapy and posture correction program completely resolved the problem. I wish I had come sooner.",
    initials: "DT",
  },
  {
    name: "Kavita Nair",
    age: 45,
    condition: "Frozen Shoulder",
    text: "My frozen shoulder had limited my movement for over a year. After 8 sessions at CureMax I regained almost full range of motion. Dr. Pankaj is incredibly thorough and genuinely cares about your recovery.",
    initials: "KN",
  },
  {
    name: "Vijay Solanki",
    age: 55,
    condition: "Post Hip Replacement",
    text: "My recovery after hip replacement was much faster than expected thanks to Dr. Pankaj. He guided me through every stage of rehab with patience. The clinic is clean, professional, and very well equipped.",
    initials: "VS",
  },
];

const FAQS = [
  {
    q: "What conditions does Dr. Pankaj Sharma treat?",
    a: "Dr. Sharma treats a wide range of conditions including sports injuries, post-surgical rehabilitation, neurological conditions, orthopedic pain, chronic back and neck pain, and age-related mobility issues. If you are unsure whether physiotherapy is right for you, call us for a quick consultation.",
  },
  {
    q: "How many sessions will I need?",
    a: "The number of sessions depends on your condition, severity, and recovery goals. Most acute conditions improve significantly within 4–8 sessions. Chronic or post-surgical cases may require 10–16 sessions. Dr. Sharma provides a clear treatment plan after your initial assessment.",
  },
  {
    q: "Do I need a referral from a doctor?",
    a: "No referral is needed. You can book directly with Dr. Pankaj Sharma. However, if you have a referral letter or previous reports, please bring them to your first appointment — they help plan your treatment more precisely.",
  },
  {
    q: "What should I bring to my first appointment?",
    a: "Please bring any relevant medical reports, X-rays, MRI scans, and doctor prescriptions. Wear comfortable, loose-fitting clothing that allows access to the area being treated.",
  },
  {
    q: "Is physiotherapy painful?",
    a: "Physiotherapy should not be painful. Some manual techniques may cause mild temporary discomfort in inflamed areas, but Dr. Sharma always works within your comfort level. Communication during treatment is encouraged so therapy can be adjusted accordingly.",
  },
];

// ─── HERO SLIDESHOW ──────────────────────────────────────────────────────────

const SLIDES = [
  { src: clinicTreatment as unknown as string,  alt: "Dr. Pankaj Sharma treating a patient at CureMax", label: "Treatment Session" },
  { src: clinicSession1 as unknown as string,   alt: "Dr. Sharma with patient in exercise room", label: "Exercise Therapy" },
  { src: clinicSession2 as unknown as string,   alt: "Dr. Sharma treating patient on therapy bed", label: "Hands-On Therapy" },
  { src: clinicRoom as unknown as string,        alt: "CureMax physiotherapy treatment room", label: "Treatment Room" },
  { src: "https://images.unsplash.com/photo-1598555763574-dca77e10427e?w=1000&h=900&fit=crop&auto=format", alt: "Dry needling therapy", label: "Dry Needling" },
  { src: "https://images.unsplash.com/photo-1706353399656-210cca727a33?w=1000&h=900&fit=crop&auto=format", alt: "Manual therapy treatment", label: "Manual Therapy" },
];

function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((cur) => {
        setPrev(cur);
        return (cur + 1) % SLIDES.length;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => {
    setPrev(active);
    setActive(i);
  };

  return (
    <div className="relative hidden lg:block overflow-hidden" style={{ backgroundColor: B.teal }}>
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === active ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: i === active ? 2 : i === prev ? 1 : 0,
          }}
        />
      ))}

      {/* Gradient bridge */}
      <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(to right, ${B.darkGreen} 0%, transparent 25%)` }} />
      {/* Bottom overlay */}
      <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(to top, ${B.darkGreen}80 0%, transparent 45%)` }} />

      {/* Slide label */}
      <div className="absolute top-8 right-8 z-20 px-4 py-2 rounded-full text-xs font-semibold text-white backdrop-blur-sm border"
        style={{ backgroundColor: "rgba(18,61,50,0.75)", borderColor: B.aqua + "50" }}>
        🏅 {SLIDES[active].label}
      </div>

      {/* Floating review card — cycles with slides */}
      {TESTIMONIALS.map((t, i) => (
        <div
          key={t.name}
          className="absolute bottom-16 right-8 z-20 bg-white rounded-2xl shadow-2xl p-5 max-w-[210px] border border-white/20"
          style={{
            opacity: i === active % TESTIMONIALS.length ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        >
          <div className="flex gap-0.5 mb-2">
            {[1,2,3,4,5].map(n => <Star key={n} size={13} fill="#f59e0b" className="text-amber-400"/>)}
          </div>
          <div className="text-sm font-semibold text-[#0f172a] leading-snug">
            &ldquo;{t.text.slice(0, 60)}…&rdquo;
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: B.teal }}>{t.initials}</div>
            <div className="text-xs text-[#475569]">{t.name} · Google Review</div>
          </div>
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 24 : 8,
              height: 8,
              backgroundColor: i === active ? B.aqua : "rgba(255,255,255,0.4)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main style={BODY} className="overflow-x-hidden">
      {/* ══════════════════════════════════════════════
          HERO — split canvas, dark green left panel
      ══════════════════════════════════════════════ */}
      <section className="min-h-[92vh] grid grid-cols-1 lg:grid-cols-2">
        {/* Left — dark green panel */}
        <div
          className="relative flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-0"
          style={{ backgroundColor: B.darkGreen }}
        >
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(ellipse 70% 60% at 20% 80%, ${B.teal}55 0%, transparent 70%)`,
            }}
          />
          <div className="relative max-w-[520px]">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-8 border"
              style={{ color: B.aqua, borderColor: B.aqua + "40", backgroundColor: B.aqua + "12" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: B.aqua }} />
              Amraiwadi · Ahmedabad
            </div>

            <h1
              className="text-5xl sm:text-6xl xl:text-7xl font-bold text-white leading-[1.0] tracking-tight mb-7"
              style={DISPLAY}
            >
              Restore
              <br />
              <span style={{
                background: `linear-gradient(90deg, ${B.aqua}, #7dd3c8)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Movement.
              </span>
              <br />
              Reclaim Life.
            </h1>

            <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.68)" }}>
              Personalized, evidence-based rehab for pain relief, recovery, and
              performance — led by Dr. Pankaj Sharma at Cure Max Physiotherapy.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <div className="btn-pulse-wrap rounded-xl">
                <button
                  onClick={() => go("contact")}
                  className="btn-primary px-7 py-4 rounded-xl font-bold text-sm text-white shadow-xl"
                  style={{ backgroundColor: B.red }}
                >
                  Book Appointment
                </button>
              </div>
              <button
                onClick={() => go("services")}
                className="btn-outline px-7 py-4 rounded-xl font-semibold text-sm border"
                style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.25)" }}
              >
                View Services
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              {[
                { n: "12+", label: "Years Experience" },
                { n: "1000+", label: "Patients Treated" },
                { n: "5.0★", label: "Google Rating" },
              ].map(({ n, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white" style={DISPLAY}>{n}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — auto slideshow */}
        <HeroSlideshow />
      </section>

      {/* ══════════════════════════════
          SERVICES GRID — image cards
      ══════════════════════════════ */}
      <section style={{ backgroundColor: "#f0faf8" }} className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: B.aqua }}>
                What We Treat
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0f172a]" style={DISPLAY}>
                Our <GradientText>Specializations</GradientText>
              </h2>
            </div>
            <button
              onClick={() => go("services")}
              className="btn-ghost shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: B.teal }}
            >
              View all services <ArrowRight size={14} />
            </button>
          </div>

          {/* 2 large + 4 small grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-4">
            {/* Large card 1 */}
            <Reveal className="group col-span-2 row-span-1 lg:row-span-2 relative rounded-2xl overflow-hidden cursor-pointer" delay={0}>
            <div
              className="group col-span-2 row-span-1 lg:row-span-2 relative rounded-2xl overflow-hidden cursor-pointer w-full h-full"
              style={{ minHeight: 320, backgroundColor: B.teal }}
              onClick={() => go("services")}
            >
              <ImageWithFallback
                src={clinicTreatment}
                alt="Dr. Pankaj Sharma providing physiotherapy treatment at CureMax"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${B.darkGreen}e0 0%, ${B.darkGreen}20 60%, transparent 100%)` }} />
              <div className="absolute inset-0 flex flex-col justify-end p-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: B.aqua + "30", backdropFilter: "blur(8px)" }}>
                  <Activity size={20} style={{ color: B.aqua }} />
                </div>
                <div className="text-xl font-bold text-white mb-1.5" style={DISPLAY}>Sports Rehabilitation</div>
                <div className="text-sm text-white/65 leading-relaxed">Return to peak athletic performance with targeted rehab protocols.</div>
                <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold" style={{ color: B.aqua }}>Explore <ArrowRight size={12}/></div>
              </div>
            </div>
            </Reveal>

            {/* Small cards */}
            {[
              { id: "ortho", Icon: Shield, title: "Orthopedic Physiotherapy", img: clinicRoom },
              { id: "neuro", Icon: Brain, title: "Neurological Rehab", img: clinicConsultation },
              { id: "needling", Icon: Zap, title: "Dry Needling & Cupping", img: clinicTechniques },
              { id: "geriatric", Icon: Users, title: "Geriatric Care", img: clinicEntrance },
            ].map(({ id, Icon, title, img }, i) => (
              <Reveal key={id} delay={(i + 1) * 80}>
              <div
                className="group relative rounded-2xl overflow-hidden cursor-pointer w-full h-full"
                style={{ minHeight: 150, backgroundColor: B.teal }}
                onClick={() => go("services")}
              >
                <ImageWithFallback
                  src={img}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${B.darkGreen}d0 0%, transparent 60%)` }} />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <Icon size={16} style={{ color: B.aqua }} className="mb-1.5" />
                  <div className="text-sm font-bold text-white leading-tight" style={DISPLAY}>{title}</div>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DOCTOR — bold dark split section
      ══════════════════════════════════════ */}
      <section style={{ backgroundColor: B.dark }} className="py-16 lg:py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
            {/* Text panel */}
            <div className="px-8 sm:px-12 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
              <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: B.aqua }}>
                Meet Your Specialist
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-5" style={DISPLAY}>
                Dr. Pankaj
                <br />
                <span style={{
                  background: `linear-gradient(90deg, ${B.aqua}, #7dd3c8)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Sharma</span>
              </h2>
              <div className="text-sm font-semibold mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                BPT &nbsp;·&nbsp; MPT &nbsp;·&nbsp; GSCPT
              </div>
              <p className="text-sm leading-relaxed mb-8 max-w-md" style={{ color: "rgba(255,255,255,0.62)" }}>
                Over 12 years of clinical expertise in sports rehabilitation, neurological
                recovery, orthopedic care, and manual therapy. Dr. Sharma personally
                leads every session — no assistants, no shortcuts.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8 max-w-sm">
                {[
                  { abbr: "BPT", label: "Bachelor of Physiotherapy" },
                  { abbr: "MPT", label: "Master of Physiotherapy" },
                  { abbr: "GSCPT", label: "Sports Conditioning" },
                  { abbr: "12+ Yrs", label: "Clinical Practice" },
                ].map(({ abbr, label }) => (
                  <div
                    key={abbr}
                    className="px-4 py-3 rounded-xl border"
                    style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)" }}
                  >
                    <div className="font-bold text-white text-sm" style={DISPLAY}>{abbr}</div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => go("about")}
                className="self-start px-6 py-3.5 rounded-xl font-semibold text-sm text-white hover:opacity-90 transition-all"
                style={{ backgroundColor: B.teal }}
              >
                Full Profile &amp; Philosophy →
              </button>
            </div>

            {/* Photo panel */}
            <div className="relative min-h-[420px] lg:min-h-0" style={{ backgroundColor: B.teal + "30" }}>
              <ImageWithFallback
                src={doctorPhoto}
                alt="Dr. Pankaj Sharma — Curemax Physiotherapy Ahmedabad"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to right, ${B.dark} 0%, transparent 30%)` }}
              />
              {/* Credential badge */}
              <div
                className="absolute top-8 right-8 rounded-2xl px-5 py-4 border backdrop-blur-sm"
                style={{ backgroundColor: "rgba(13,46,37,0.85)", borderColor: B.aqua + "40" }}
              >
                <div className="flex gap-0.5 mb-1.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#f59e0b" className="text-amber-400"/>)}
                </div>
                <div className="text-white font-bold text-sm">5.0 · Google</div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Verified Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          GALLERY — real clinic photos
      ══════════════════════════════ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: B.aqua }}>Our Clinic</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0f172a]" style={DISPLAY}>
              Inside <GradientText>CureMax</GradientText>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
            {[
              { img: clinicTreatment,    label: "Treatment Session",    alt: "Dr. Pankaj Sharma treating a patient" },
              { img: clinicSession1,     label: "Exercise Therapy",     alt: "Dr. Sharma with patient in exercise room" },
              { img: clinicSession2,     label: "Hands-On Therapy",     alt: "Dr. Sharma treating patient on therapy bed" },
              { img: clinicEquipment,    label: "Rehab Equipment",      alt: "Physiotherapy equipment at CureMax" },
              { img: clinicRoom,         label: "Treatment Room",       alt: "CureMax physiotherapy treatment room" },
              { img: clinicConsultation, label: "Consultation Room",    alt: "Doctor consultation room at CureMax" },
              { img: clinicCorridor,     label: "Clinic Interior",      alt: "CureMax clinic corridor" },
              { img: clinicCertificates, label: "Credentials & Awards", alt: "Dr. Sharma certificates and awards" },
              { img: clinicTechniques,   label: "Advanced Techniques",  alt: "Advanced physiotherapy techniques" },
              { img: clinicEntrance,     label: "Clinic Entrance",      alt: "CureMax physiotherapy clinic Ahmedabad" },
            ].map(({ img, label, alt }, i) => (
              <Reveal key={label} delay={i * 60} className="group relative rounded-2xl overflow-hidden aspect-[4/3]" style={{ backgroundColor: B.teal + "20" }}>
                <ImageWithFallback src={img} alt={alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${B.darkGreen}99 0%, transparent 55%)` }} />
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs font-semibold text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">{label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA — full-width bold banner
      ══════════════════════════════ */}
      <section
        className="py-20 lg:py-24 relative overflow-hidden"
        style={{ backgroundColor: "#f0faf8" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div
            className="rounded-3xl px-10 py-14 lg:px-16 lg:py-20 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${B.darkGreen} 0%, ${B.teal} 100%)` }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(ellipse 80% 60% at 5% 95%, ${B.aqua}35 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 95% 5%, ${B.aqua}25 0%, transparent 50%)`,
              }}
            />
            {/* Large decorative text */}
            <div
              className="absolute -bottom-6 -right-4 text-[120px] lg:text-[180px] font-bold leading-none select-none pointer-events-none opacity-[0.06]"
              style={{ ...DISPLAY, color: "white" }}
            >
              Heal.
            </div>
            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: B.aqua }}>
                Start Today
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight" style={DISPLAY}>
                Your Recovery Begins
                <br />
                with One Call.
              </h2>
              <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
                Dr. Pankaj Sharma is ready to help you move better, feel stronger, and
                reclaim the life you deserve. Book your first consultation today.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => go("contact")}
                  className="px-8 py-4 bg-white rounded-xl font-bold text-base hover:bg-white/90 hover:shadow-xl transition-all hover:-translate-y-0.5"
                  style={{ color: B.darkGreen }}
                >
                  Book Appointment
                </button>
                <a
                  href="tel:+919784877721"
                  className="px-8 py-4 rounded-xl font-semibold text-base border-2 text-white flex items-center gap-2 hover:bg-white/10 transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.35)" }}
                >
                  <Phone size={16} /> +91 97848 77721
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── ABOUT PAGE ─────────────────────────────────────────────────────────────

function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main style={BODY}>
      {/* Hero + Profile — single unified section */}
      <section style={{ backgroundColor: "#f0faf8" }} className="pt-10 pb-16 lg:pt-14 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page heading — compact, sits right above the grid */}
          <div className="mb-10 lg:mb-12">
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: B.aqua }}
            >
              About the Doctor
            </div>
            <h1
              className="text-3xl lg:text-4xl font-bold text-[#0f172a] leading-tight mb-3"
              style={DISPLAY}
            >
              About <GradientText>Dr. Pankaj Sharma</GradientText>
            </h1>
            <p className="text-base text-[#475569] leading-relaxed max-w-2xl">
              Specialist physiotherapist with advanced qualifications in sports rehabilitation
              and neurological care — committed to a patient-first, evidence-based approach
              at Curemax, Ahmedabad.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            {/* Image column */}
            <div className="lg:col-span-2">
              <div
                className="relative rounded-3xl overflow-hidden shadow-xl lg:sticky lg:top-28"
                style={{ backgroundColor: B.teal + "20" }}
              >
                <ImageWithFallback
                  src={doctorPhoto}
                  alt="Dr. Pankaj Sharma — Curemax Physiotherapy Ahmedabad"
                  className="w-full h-[480px] object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${B.darkGreen}7a 0%, transparent 55%)` }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div
                    className="text-2xl font-bold"
                    style={DISPLAY}
                  >
                    Dr. Pankaj Sharma
                  </div>
                  <div
                    className="text-sm mt-1"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    BPT &nbsp;·&nbsp; MPT &nbsp;·&nbsp; GSCPT
                  </div>
                  <div className="flex items-center gap-1.5 mt-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={13} fill="#f59e0b" className="text-amber-400" />
                    ))}
                    <span
                      className="text-xs ml-1"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      5.0 · Google Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content column */}
            <div className="lg:col-span-3">
              <h2
                className="text-2xl font-bold text-[#0f172a] mb-5"
                style={DISPLAY}
              >
                A Passion for{" "}
                <GradientText>Restoring Human Potential</GradientText>
              </h2>
              <div className="space-y-4 text-[#475569] leading-relaxed mb-8">
                <p>
                  Dr. Pankaj Sharma is a qualified physiotherapist and the founder of Curemax
                  Advanced Physiotherapy and Fitness in Amraiwadi, Ahmedabad. With a Bachelor of
                  Physiotherapy (BPT), Master of Physiotherapy (MPT), and Graduate Sports
                  Conditioning and Performance Training certification (GSCPT), he brings a
                  comprehensive, multi-disciplinary approach to every patient encounter.
                </p>
                <p>
                  Over more than 12 years of clinical practice, Dr. Sharma has worked with a
                  diverse patient population — from professional athletes recovering from injuries
                  to stroke survivors rebuilding their independence. His philosophy centers on
                  identifying the root cause of a condition, not just managing its symptoms.
                </p>
                <p>
                  Dr. Sharma personally conducts every assessment and treatment session at
                  Curemax. He believes strongly in the therapeutic relationship — taking time to
                  listen, explain, and genuinely partner with each patient throughout their
                  recovery journey.
                </p>
              </div>

              <h3
                className="text-xl font-bold text-[#0f172a] mb-4"
                style={DISPLAY}
              >
                Qualifications &amp; Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { abbr: "BPT", full: "Bachelor of Physiotherapy", detail: "Undergraduate foundation in physiotherapy science" },
                  { abbr: "MPT", full: "Master of Physiotherapy", detail: "Advanced clinical specialization" },
                  { abbr: "GSCPT", full: "Graduate Sports Conditioning", detail: "Sports performance & rehabilitation" },
                  { abbr: "12+ Yrs", full: "Clinical Experience", detail: "Orthopedic, neuro & sports rehab" },
                ].map(({ abbr, full, detail }) => (
                  <div
                    key={abbr}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#e2e8f0]"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-white text-[10px] font-bold text-center leading-tight"
                      style={{ backgroundColor: B.teal }}
                    >
                      {abbr}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#0f172a]">{full}</div>
                      <div className="text-xs text-[#475569] mt-0.5">{detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h3
                className="text-xl font-bold text-[#0f172a] mb-4"
                style={DISPLAY}
              >
                Treatment Philosophy
              </h3>
              <div className="space-y-3 mb-8">
                {[
                  {
                    title: "Root-Cause Focus",
                    body: "Every diagnosis goes beyond symptoms to identify and address the underlying cause of your condition.",
                  },
                  {
                    title: "Evidence-Based Practice",
                    body: "All treatments are grounded in the latest clinical research and peer-reviewed physiotherapy guidelines.",
                  },
                  {
                    title: "Patient Education",
                    body: "Patients who understand their condition recover faster. Dr. Sharma ensures you understand every step of your treatment.",
                  },
                  {
                    title: "Goal-Oriented Recovery",
                    body: "Whether returning to sport, managing pain, or daily independence — your plan is built around your personal goals.",
                  },
                ].map(({ title, body }) => (
                  <div
                    key={title}
                    className="flex gap-3 p-4 bg-white rounded-xl border border-[#e2e8f0]"
                  >
                    <CheckCircle
                      size={18}
                      className="shrink-0 mt-0.5"
                      style={{ color: B.aqua }}
                    />
                    <div>
                      <div className="font-semibold text-sm text-[#0f172a]">{title}</div>
                      <div className="text-sm text-[#475569] mt-0.5">{body}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => go("contact")}
                className="btn-primary px-7 py-3.5 rounded-xl font-semibold text-white shadow-md"
                style={{ backgroundColor: B.darkGreen }}
              >
                Book a Consultation with Dr. Sharma
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates gallery on About page */}
      <section style={{ backgroundColor: "#f4f9f8" }} className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: B.aqua }}>Credentials</div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#0f172a]" style={DISPLAY}>
              Certifications &amp; <GradientText>Awards</GradientText>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Reveal>
              <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-sm">
                <ImageWithFallback src={clinicCertificates} alt="Dr. Pankaj Sharma certificates and awards"
                  className="w-full h-72 object-cover object-top" />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-sm">
                <ImageWithFallback src={clinicTreatment} alt="Dr. Pankaj Sharma treating a patient at CureMax"
                  className="w-full h-72 object-cover object-top" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── WHY US PAGE ─────────────────────────────────────────────────────────────

function WhyUsPage({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const pillars = [
    {
      Icon: Award,
      title: "Expert, Qualified Leadership",
      body: "Dr. Pankaj Sharma holds a Bachelor of Physiotherapy (BPT), Master of Physiotherapy (MPT), and Graduate Sports Conditioning & Performance Training certification (GSCPT). Every assessment and every treatment is personally led by him — not delegated to assistants or technicians.",
      stat: "BPT · MPT · GSCPT",
      statLabel: "Triple-qualified specialist",
    },
    {
      Icon: Heart,
      title: "Genuine One-on-One Care",
      body: "At most clinics, the doctor sees you for 5 minutes and an assistant does the rest. At Curemax, Dr. Sharma spends the entire session with you — listening, assessing, adjusting, and explaining. Your recovery gets undivided expert attention from start to finish.",
      stat: "100%",
      statLabel: "Sessions led by Dr. Sharma",
    },
    {
      Icon: CheckCircle,
      title: "Evidence-Based Treatment",
      body: "Every protocol at Curemax is grounded in current clinical research and peer-reviewed guidelines. We don't use outdated or unproven methods. Your treatment plan is built on what the science says actually works for your specific condition.",
      stat: "Evidence",
      statLabel: "Based practice always",
    },
    {
      Icon: Zap,
      title: "Root-Cause Diagnosis",
      body: "We don't just treat your pain — we find out why it's there. A thorough physical assessment identifies the underlying cause of your condition, not just the surface symptoms. This means fewer sessions, better outcomes, and lower chance of recurrence.",
      stat: "Root",
      statLabel: "Cause always addressed",
    },
    {
      Icon: Shield,
      title: "Modern Clinic & Equipment",
      body: "Our Amraiwadi facility is equipped with contemporary physiotherapy tools and technology. From electrotherapy and ultrasound to advanced manual therapy tables and exercise equipment, you receive care in a clean, professional, well-equipped environment.",
      stat: "Modern",
      statLabel: "Equipment & facility",
    },
    {
      Icon: Users,
      title: "Patient Education First",
      body: "We believe informed patients recover faster. Dr. Sharma takes time to explain your diagnosis, your treatment plan, and your home exercise program in plain language. You'll leave every session understanding exactly what's happening and why.",
      stat: "Informed",
      statLabel: "Patients recover faster",
    },
  ];

  return (
    <main style={BODY}>
      {/* Hero */}
      <section style={{ backgroundColor: B.darkGreen }} className="py-16 lg:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(ellipse 60% 70% at 80% 50%, ${B.teal}55 0%, transparent 65%)` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: B.aqua }}>
              Why Choose Curemax
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-[1.08] mb-6" style={DISPLAY}>
              Not All Physio
              <br />
              <span style={{ background: `linear-gradient(90deg, ${B.aqua}, #7dd3c8)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Clinics Are Equal.
              </span>
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.7)" }}>
              Curemax is built on a simple belief: every patient deserves expert, personalised,
              evidence-based care — every single session. Here is what sets us apart.
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#e2e8f0]">
            {[
              { n: "12+", label: "Years of Clinical Experience" },
              { n: "1000+", label: "Patients Successfully Treated" },
              { n: "6", label: "Specialized Treatment Areas" },
              { n: "5.0 ★", label: "Google Rating — Verified" },
            ].map(({ n, label }, i) => (
              <Reveal key={label} delay={i * 100} className="px-6 py-8 text-center">
                <div className="text-4xl font-bold mb-1" style={{ ...DISPLAY, color: B.darkGreen }}>{n}</div>
                <div className="text-xs text-[#475569] font-medium">{label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vs comparison */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: B.aqua }}>
              The Difference
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0f172a]" style={DISPLAY}>
              Curemax vs. <GradientText>Typical Clinic</GradientText>
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#e2e8f0]">
            <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-wider">
              <div className="px-5 py-4 text-[#475569] bg-[#f0faf8]">What matters</div>
              <div className="px-5 py-4 text-white text-center" style={{ backgroundColor: B.darkGreen }}>Curemax</div>
              <div className="px-5 py-4 text-[#475569] text-center bg-[#f0faf8]">Typical Clinic</div>
            </div>
            {[
              { aspect: "Who treats you", us: "Dr. Sharma — every session", them: "Often a junior or assistant" },
              { aspect: "Treatment approach", us: "Root-cause diagnosis", them: "Symptom management" },
              { aspect: "Session time with doctor", us: "Full session, undivided", them: "5–10 min consult" },
              { aspect: "Protocol basis", us: "Current clinical evidence", them: "Routine or habit-based" },
              { aspect: "Home program", us: "Personalised & explained", them: "Generic printout" },
              { aspect: "Patient education", us: "Every session, in detail", them: "Rarely prioritised" },
            ].map(({ aspect, us, them }, i) => (
              <div
                key={aspect}
                className="grid grid-cols-3 border-t border-[#e2e8f0] text-sm"
                style={{ backgroundColor: i % 2 === 0 ? "white" : B.bg }}
              >
                <div className="px-5 py-4 font-medium text-[#0f172a]">{aspect}</div>
                <div className="px-5 py-4 text-center font-semibold flex items-center justify-center gap-1.5" style={{ color: B.teal }}>
                  <CheckCircle size={14} style={{ color: B.aqua }} />{us}
                </div>
                <div className="px-5 py-4 text-center text-[#94a3b8]">{them}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six pillars */}
      <section style={{ backgroundColor: "#f0faf8" }} className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: B.aqua }}>
              Our Commitments
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0f172a]" style={DISPLAY}>
              Six Reasons Patients <GradientText>Choose Curemax</GradientText>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map(({ Icon, title, body, stat, statLabel }, i) => (
              <Reveal key={title} delay={i * 80}>
              <div
                className="card-hover bg-white rounded-2xl border border-[#e2e8f0] p-7 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: B.aqua + "18" }}>
                    <Icon size={21} style={{ color: B.teal }} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ ...DISPLAY, color: B.darkGreen }}>{stat}</div>
                    <div className="text-[10px] text-[#94a3b8]">{statLabel}</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-3" style={DISPLAY}>{title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed flex-1">{body}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ backgroundColor: "#f0faf8" }} className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: B.aqua }}>
              Patient Stories
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0f172a]" style={DISPLAY}>
              Hear It from <GradientText>Our Patients</GradientText>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
              <div className="card-hover bg-white p-7 rounded-2xl border border-[#e2e8f0] h-full">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(n => <Star key={n} size={14} fill="#f59e0b" className="text-amber-400"/>)}
                </div>
                <blockquote className="text-sm text-[#0f172a] leading-relaxed italic mb-6">&ldquo;{t.text}&rdquo;</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ backgroundColor: B.teal }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#0f172a]">{t.name}</div>
                    <div className="text-xs text-[#475569]">{t.condition} · Age {t.age}</div>
                  </div>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl p-10 lg:p-14 text-white text-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${B.darkGreen} 0%, ${B.teal} 100%)` }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(ellipse 70% 60% at 10% 90%, ${B.aqua}30 0%, transparent 50%)` }} />
            <div className="relative">
              <h2 className="text-2xl lg:text-4xl font-bold mb-4" style={DISPLAY}>
                Experience the Curemax Difference
              </h2>
              <p className="mb-8 max-w-lg mx-auto text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                Book your first consultation and discover what genuinely expert, personalised physiotherapy feels like.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => go("contact")}
                  className="px-8 py-4 bg-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  style={{ color: B.darkGreen }}
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => go("services")}
                  className="px-8 py-4 rounded-xl font-semibold border-2 text-white hover:bg-white/10 transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.4)" }}
                >
                  View Our Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── SERVICES PAGE ───────────────────────────────────────────────────────────

function ServicesPage({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main style={BODY}>
      {/* Hero */}
      <section style={{ backgroundColor: B.darkGreen }} className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: B.aqua }}
          >
            Treatments &amp; Specializations
          </div>
          <h1
            className="text-4xl lg:text-[60px] font-bold text-white leading-[1.08] mb-6"
            style={DISPLAY}
          >
            Our Services
          </h1>
          <p
            className="text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Comprehensive physiotherapy care from sports injuries to neurological recovery,
            delivered with clinical precision and genuine compassion.
          </p>
        </div>
      </section>

      {/* Services grid — dark premium */}
      <section style={{ backgroundColor: B.dark }} className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ id, Icon, title, short, img, conditions }) => (
              <div
                key={id}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                onClick={() => go("contact")}
              >
                <div
                  className="relative h-44 overflow-hidden"
                  style={{ backgroundColor: B.teal + "30" }}
                >
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${B.dark} 0%, transparent 60%)` }}
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: B.aqua + "20" }}
                    >
                      <Icon size={18} style={{ color: B.aqua }} />
                    </div>
                    <h3
                      className="text-lg font-bold text-white"
                      style={DISPLAY}
                    >
                      {title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {short}
                  </p>
                  <div className="space-y-1.5 mb-4">
                    {conditions.slice(0, 3).map((c) => (
                      <div
                        key={c}
                        className="flex items-center gap-2 text-xs"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        <span
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ backgroundColor: B.aqua }}
                        />
                        {c}
                      </div>
                    ))}
                  </div>
                  <span
                    className="text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200"
                    style={{ color: B.aqua }}
                  >
                    Book this service <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: "#f0faf8" }} className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: B.aqua }}
            >
              FAQ
            </div>
            <h2
              className="text-3xl lg:text-4xl font-bold text-[#0f172a]"
              style={DISPLAY}
            >
              Common <GradientText>Questions</GradientText>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#0f172a] text-sm leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className="shrink-0 transition-transform duration-200"
                    style={{
                      color: B.teal,
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 pt-0 text-[#475569] text-sm leading-relaxed border-t border-[#e2e8f0]">
                    <div className="pt-4">{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-[#475569] mb-4 text-sm">
              Still have questions? We are happy to help.
            </p>
            <button
              onClick={() => go("contact")}
              className="btn-primary px-7 py-3.5 rounded-xl font-semibold text-white"
              style={{ backgroundColor: B.darkGreen }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── CONTACT PAGE ────────────────────────────────────────────────────────────

function ContactPage() {
  // ⚠️ Replace with your Formspree form ID from formspree.io
  const FORMSPREE_ID = "mlgkyozn";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Full Name": form.name,
          "Phone Number": form.phone,
          "Email": form.email,
          "Service Required": form.service,
          "Preferred Date": form.date,
          "Preferred Time": form.time,
          "Message / Symptoms": form.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please call us directly at +91 97848 77721.");
      }
    } catch {
      setError("Could not send. Please call us at +91 97848 77721.");
    } finally {
      setLoading(false);
    }
  };

  const field =
    "w-full px-4 py-3 rounded-xl border border-[#e2e8f0] bg-[#f0faf8] text-[#0f172a] text-sm placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#4aa59d] transition-all";

  return (
    <main style={BODY}>
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: B.aqua }}
            >
              Contact &amp; Appointments
            </div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-[#0f172a] leading-[1.1] mb-4"
              style={DISPLAY}
            >
              Book Your{" "}
              <GradientText>Appointment</GradientText>
            </h1>
            <p className="text-xl text-[#475569]">
              Reach out to schedule a consultation with Dr. Pankaj Sharma at Curemax,
              Amraiwadi, Ahmedabad.
            </p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#f0faf8" }} className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              {
                Icon: Phone,
                label: "Call Us",
                value: "+91 97848 77721",
                sub: "Mon–Sat, 9 AM – 9 PM",
                href: "tel:+919784877721",
                color: B.teal,
              },
              {
                Icon: MessageCircle,
                label: "WhatsApp",
                value: "+91 97848 77721",
                sub: "Quick responses",
                href: "https://api.whatsapp.com/send?phone=919784877721",
                color: "#22c55e",
              },
              {
                Icon: Mail,
                label: "Email",
                value: "drpankajsharma34@gmail.com",
                sub: "Reply within 24 hours",
                href: "mailto:drpankajsharma34@gmail.com",
                color: B.red,
              },
            ].map(({ Icon, label, value, sub, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-5 border border-[#e2e8f0] hover:shadow-lg transition-all duration-300 flex items-start gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: color + "18" }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <div>
                  <div
                    className="text-[10px] uppercase tracking-wider font-semibold mb-1"
                    style={{ color: B.aqua }}
                  >
                    {label}
                  </div>
                  <div className="font-semibold text-sm text-[#0f172a] break-all">{value}</div>
                  <div className="text-xs text-[#475569] mt-0.5">{sub}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Booking form */}
            <div className="bg-white rounded-3xl p-8 border border-[#e2e8f0] shadow-sm">
              <h2
                className="text-2xl font-bold text-[#0f172a] mb-2"
                style={DISPLAY}
              >
                Request an Appointment
              </h2>
              <p className="text-[#475569] text-sm mb-7">
                Fill the form and our team will confirm your slot within a few hours.
              </p>

              {submitted ? (
                <div className="text-center py-10">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: B.teal + "18" }}
                  >
                    <CheckCircle size={32} style={{ color: B.teal }} />
                  </div>
                  <h3
                    className="text-xl font-bold text-[#0f172a] mb-2"
                    style={DISPLAY}
                  >
                    Appointment Requested!
                  </h3>
                  <p className="text-[#475569] text-sm">
                    Thank you, {form.name || "there"}. We will call you at{" "}
                    {form.phone || "your number"} to confirm your appointment with Dr. Pankaj Sharma.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", service: "", date: "", time: "", message: "" }); }}
                    className="mt-6 text-sm font-semibold"
                    style={{ color: B.teal }}
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Your full name"
                        className={field}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className={field}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className={field}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                      Service Required
                    </label>
                    <select
                      className={field}
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                      <option value="general">General Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      className={field}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                      Preferred Time Slot
                    </label>
                    <select
                      className={field}
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                    >
                      <option value="">Select preferred time...</option>
                      <option value="morning">Morning (9:00 AM – 1:00 PM)</option>
                      <option value="evening">Evening (5:00 PM – 9:00 PM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                      Message / Symptoms
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe your condition or symptoms..."
                      className={field + " resize-none"}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-white text-base transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ backgroundColor: B.darkGreen }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                        </svg>
                        Sending…
                      </>
                    ) : "Submit Appointment Request"}
                  </button>
                  {error && (
                    <p className="text-xs text-center font-medium" style={{ color: B.red }}>{error}</p>
                  )}
                  {!error && (
                    <p className="text-xs text-center text-[#94a3b8]">
                      We confirm within a few hours on working days.
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Info column */}
            <div className="space-y-5">
              {/* Address */}
              <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0]">
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: B.teal + "18" }}
                  >
                    <MapPin size={20} style={{ color: B.teal }} />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-[#0f172a]"
                      style={DISPLAY}
                    >
                      Clinic Address
                    </h3>
                    <p className="text-sm text-[#475569] mt-1.5 leading-relaxed">
                      107-108, First Floor, ABC Complex,<br />
                      Rabari Colony Cross Road,<br />
                      Near Shubham Hospital, Above Bank of Baroda,<br />
                      Rabari Colony, Amraiwadi,<br />
                      Ahmedabad, Gujarat 380026
                    </p>
                  </div>
                </div>
                {/* Map embed */}
                <div className="rounded-xl overflow-hidden h-52 bg-[#e2e8f0]">
                  <iframe
                    title="Curemax Physiotherapy location"
                    src={`https://www.google.com/maps?q=${CLINIC_MAP_QUERY}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  href={`https://maps.google.com/?q=${CLINIC_MAP_QUERY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mt-3 py-2.5 rounded-xl text-sm font-semibold border hover:text-white hover:bg-[#2f6f63] transition-all duration-200"
                  style={{ color: B.teal, borderColor: B.teal + "50" }}
                >
                  <Navigation2 size={15} />
                  Get Directions on Google Maps
                </a>
              </div>

              {/* Clinic hours */}
              <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0]">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: B.teal + "18" }}
                  >
                    <Clock size={20} style={{ color: B.teal }} />
                  </div>
                  <h3
                    className="font-bold text-[#0f172a]"
                    style={DISPLAY}
                  >
                    Clinic Hours
                  </h3>
                </div>
                <div className="space-y-0">
                  {[
                    { day: "Monday – Saturday", slots: ["9:00 AM – 1:00 PM", "5:00 PM – 9:00 PM"] },
                    { day: "Sunday", slots: ["By appointment only"] },
                  ].map(({ day, slots }) => (
                    <div
                      key={day}
                      className="flex items-start justify-between py-3 border-b border-[#e2e8f0] last:border-0"
                    >
                      <span className="text-sm font-medium text-[#0f172a]">{day}</span>
                      <div className="text-right">
                        {slots.map((s) => (
                          <div key={s} className="text-sm font-medium" style={{ color: B.teal }}>
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://api.whatsapp.com/send?phone=919784877721&text=Hi%20Dr.%20Pankaj%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20CureMax%20Physiotherapy." target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
                style={{ backgroundColor: "#22c55e" }}
              >
                <MessageCircle size={20} />
                Book via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── PRIVACY POLICY PAGE ─────────────────────────────────────────────────────

function PrivacyPage({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const sections = [
    {
      title: "Information We Collect",
      body: `When you submit an appointment request through our website, we collect the following personal information: your full name, phone number, email address, preferred appointment date and time, and a brief description of your symptoms or condition. This information is provided voluntarily by you and is necessary to process your appointment request.

We do not collect any information automatically through cookies, tracking pixels, or analytics tools beyond what is standard to website hosting.`,
    },
    {
      title: "How We Use Your Information",
      body: `The personal information you provide is used solely for the following purposes:

• To confirm and schedule your physiotherapy appointment
• To contact you regarding your appointment via phone, WhatsApp, or email
• To follow up on your treatment progress if you have previously visited the clinic
• To respond to any queries you submit through the website

We do not use your information for marketing campaigns, newsletters, or any automated communications without your explicit consent.`,
    },
    {
      title: "How We Store and Protect Your Data",
      body: `Appointment requests submitted through our website are received via Formspree, a third-party form processing service, and delivered to our clinic email. We do not store your data on our own servers.

Your information is handled with strict confidentiality in accordance with standard medical record-keeping practices. Physical and digital records at the clinic are accessible only to Dr. Pankaj Sharma and authorised clinic staff.`,
    },
    {
      title: "Sharing of Information",
      body: `We do not sell, rent, trade, or share your personal information with any third parties for commercial purposes.

Your information may be shared only in the following limited circumstances:

• With other healthcare professionals involved in your care, with your consent
• Where required by law or by a regulatory authority
• In an emergency situation where sharing is necessary to protect your health or safety`,
    },
    {
      title: "Your Rights",
      body: `You have the right to:

• Access the personal information we hold about you
• Request correction of any inaccurate information
• Request deletion of your personal information, subject to legal obligations
• Withdraw consent for any communications at any time

To exercise any of these rights, please contact us directly at drpankajsharma34@gmail.com or call +91 97848 77721.`,
    },
    {
      title: "Third-Party Links",
      body: `Our website may contain links to third-party platforms such as Google Maps and WhatsApp. We are not responsible for the privacy practices of these external services. We encourage you to review their respective privacy policies before providing any personal information on those platforms.`,
    },
    {
      title: "Children's Privacy",
      body: `Our website is not directed at children under the age of 18. We do not knowingly collect personal information from minors. If a parent or guardian believes that their child has submitted personal information through our website, please contact us immediately and we will delete it promptly.`,
    },
    {
      title: "Changes to This Policy",
      body: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised effective date. We encourage you to review this policy periodically.`,
    },
    {
      title: "Contact Us",
      body: `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:

Curemax Advanced Physiotherapy and Fitness
Dr. Pankaj Sharma
107-108, First Floor, ABC Complex, Rabari Colony Cross Road,
Amraiwadi, Ahmedabad, Gujarat 380026
Phone: +91 97848 77721
Email: drpankajsharma34@gmail.com`,
    },
  ];

  return (
    <main style={BODY}>
      <section style={{ backgroundColor: B.darkGreen }} className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: B.aqua }}>Legal</div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4" style={DISPLAY}>Privacy Policy</h1>
          <p style={{ color: "rgba(255,255,255,0.6)" }} className="text-sm">Effective date: 1 January 2024 &nbsp;·&nbsp; Curemax Advanced Physiotherapy and Fitness</p>
        </div>
      </section>

      <section style={{ backgroundColor: "#f0faf8" }} className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#475569] leading-relaxed mb-10 text-sm">
            At Curemax Advanced Physiotherapy and Fitness, we are committed to protecting your personal
            information and your right to privacy. This Privacy Policy explains how we collect, use,
            store, and protect the information you provide when you visit our website or submit an
            appointment request.
          </p>

          <div className="space-y-8">
            {sections.map(({ title, body }, i) => (
              <div key={title} className="bg-white rounded-2xl border border-[#e2e8f0] p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: B.teal }}>
                    {i + 1}
                  </span>
                  <h2 className="text-lg font-bold text-[#0f172a]" style={DISPLAY}>{title}</h2>
                </div>
                <div className="text-sm text-[#475569] leading-relaxed whitespace-pre-line">{body}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => go("terms")}
              className="btn-outline px-6 py-3 rounded-xl text-sm font-semibold border-2"
              style={{ color: B.teal, borderColor: B.teal }}
            >
              Read Terms of Service
            </button>
            <button
              onClick={() => go("contact")}
              className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: B.darkGreen }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── TERMS OF SERVICE PAGE ────────────────────────────────────────────────────

function TermsPage({ setPage }: { setPage: (p: Page) => void }) {
  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const sections = [
    {
      title: "Acceptance of Terms",
      body: `By accessing and using the Curemax Advanced Physiotherapy and Fitness website (the "Site"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.

These terms apply to all visitors, patients, and anyone who accesses or uses the Site.`,
    },
    {
      title: "Nature of Information on This Website",
      body: `The content on this website is provided for general informational purposes only. It is not intended to constitute medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare professional — such as Dr. Pankaj Sharma — with any questions you may have regarding a medical condition.

Do not disregard professional medical advice or delay seeking it because of something you have read on this website.`,
    },
    {
      title: "Appointment Requests",
      body: `Submitting an appointment request form on this website does not guarantee a confirmed appointment. All appointment requests are subject to availability and will be confirmed by our clinic team via phone or WhatsApp within a few hours on working days.

You are responsible for providing accurate and complete information when submitting an appointment request. Inaccurate information may result in delays or inability to schedule your appointment.`,
    },
    {
      title: "Clinic Policies",
      body: `The following policies apply to all patients at Curemax:

• Please arrive 5 minutes before your scheduled appointment time
• Bring any relevant medical reports, prescriptions, or imaging (X-rays, MRI scans)
• Wear loose, comfortable clothing appropriate for physical examination
• Cancellations should be made at least 24 hours in advance
• Repeated no-shows may result in appointment privileges being withdrawn
• The clinic reserves the right to refuse service in cases of inappropriate behaviour`,
    },
    {
      title: "Limitation of Liability",
      body: `Curemax Advanced Physiotherapy and Fitness makes no warranties or representations regarding the accuracy, completeness, or suitability of the information on this website for any particular purpose.

To the maximum extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or reliance on any information provided herein.`,
    },
    {
      title: "Intellectual Property",
      body: `All content on this website — including text, images, the Curemax logo, graphics, and design — is the property of Curemax Advanced Physiotherapy and Fitness and is protected by applicable intellectual property laws.

You may not reproduce, distribute, modify, or republish any content from this website without our prior written consent.`,
    },
    {
      title: "Third-Party Services",
      body: `This website uses third-party services including Google Maps for location information and Formspree for form submissions. Use of these embedded services is subject to their respective terms of service and privacy policies. We are not responsible for the practices of these third-party services.`,
    },
    {
      title: "Governing Law",
      body: `These Terms of Service are governed by and construed in accordance with the laws of India, specifically applicable in the State of Gujarat. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat.`,
    },
    {
      title: "Changes to These Terms",
      body: `We reserve the right to update or modify these Terms of Service at any time without prior notice. Changes will be effective immediately upon posting to the website. Your continued use of the Site following any changes constitutes your acceptance of the revised terms.`,
    },
    {
      title: "Contact",
      body: `For any questions about these Terms of Service, please contact us:

Curemax Advanced Physiotherapy and Fitness
Dr. Pankaj Sharma
107-108, First Floor, ABC Complex, Rabari Colony Cross Road,
Amraiwadi, Ahmedabad, Gujarat 380026
Phone: +91 97848 77721
Email: drpankajsharma34@gmail.com`,
    },
  ];

  return (
    <main style={BODY}>
      <section style={{ backgroundColor: B.darkGreen }} className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: B.aqua }}>Legal</div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4" style={DISPLAY}>Terms of Service</h1>
          <p style={{ color: "rgba(255,255,255,0.6)" }} className="text-sm">Effective date: 1 January 2024 &nbsp;·&nbsp; Curemax Advanced Physiotherapy and Fitness</p>
        </div>
      </section>

      <section style={{ backgroundColor: "#f0faf8" }} className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#475569] leading-relaxed mb-10 text-sm">
            Please read these Terms of Service carefully before using the Curemax Advanced
            Physiotherapy and Fitness website. These terms govern your use of our website and
            the services we offer through it.
          </p>

          <div className="space-y-8">
            {sections.map(({ title, body }, i) => (
              <div key={title} className="bg-white rounded-2xl border border-[#e2e8f0] p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: B.teal }}>
                    {i + 1}
                  </span>
                  <h2 className="text-lg font-bold text-[#0f172a]" style={DISPLAY}>{title}</h2>
                </div>
                <div className="text-sm text-[#475569] leading-relaxed whitespace-pre-line">{body}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => go("privacy")}
              className="btn-outline px-6 py-3 rounded-xl text-sm font-semibold border-2"
              style={{ color: B.teal, borderColor: B.teal }}
            >
              Read Privacy Policy
            </button>
            <button
              onClick={() => go("contact")}
              className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: B.darkGreen }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground pb-16 lg:pb-0"
      style={BODY}
    >
      <Header page={page} setPage={navigate} />

      {page === "home" && <HomePage setPage={navigate} />}
      {page === "about" && <AboutPage setPage={navigate} />}
      {page === "services" && <ServicesPage setPage={navigate} />}
      {page === "why-us" && <WhyUsPage setPage={navigate} />}
      {page === "contact" && <ContactPage />}
      {page === "privacy" && <PrivacyPage setPage={navigate} />}
      {page === "terms" && <TermsPage setPage={navigate} />}

      <Footer setPage={navigate} />
      <MobileStickyBar />
    </div>
  );
}
