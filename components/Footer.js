import { SITE_META } from "../lib/constants";
import Link from "next/link";
export default function Footer(params) {
  return (
    <div className="mt-3 text-xs text-center text-sky-100/60 bg-sky-700/80">
      <nav className="group bg-sky-600/80 p-3 space-x-5 shadow">
        <Link href={`/t/privacy-policy`}>
          <a className="group-hover:text-white/70 transition duration-500">
            Privacy Policy
          </a>
        </Link>
        <Link href={`/t/terms-of-use`}>
          <a className="group-hover:text-white/70 transition duration-500">
            Terms of Use
          </a>
        </Link>
      </nav>
      <p className="py-7 opacity-90">
        Copyright &copy; {new Date().getFullYear()} {SITE_META.name}. All Rights
        Reserved
      </p>
    </div>
  );
}
