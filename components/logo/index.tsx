import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="logo">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <rect width="28" height="28" rx="7" fill="#FFA630" />
        <path d="M5 18c4-9 14-9 18 0M5 18h18" stroke="#0B1B3A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
      Cargo Portal
    </Link>
  );
}