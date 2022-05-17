import { SITE_META } from "../lib/constants";
import Link from "next/link";
export default function Footer(params) {
  return (
    <div className="mt-3 text-xs text-center text-yellow-100/50 bg-emerald-700/80">
      <nav className="group bg-emerald-600/80 p-3 space-x-5 shadow">
        <Link href={`/t/privacy-policy`}>
          <a title={`Privacy Policy`}>Privacy Policy</a>
        </Link>
        <Link href={`/t/terms-of-use`}>
          <a title={`Terms of Use`}>Terms of Use</a>
        </Link>
      </nav>
      <p className="py-7 opacity-90">
        Copyright &copy; {new Date().getFullYear()} {SITE_META.name}
        <br />
        All Rights Reserved
      </p>
    </div>
  );
}
