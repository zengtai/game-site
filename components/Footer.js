import { SITE_NAME } from "../lib/constants";
import Link from "next/link";
export default function Footer(params) {
  return (
    <div className="mt-3 text-xs text-center text-cyan-100/40 bg-cyan-600">
      <nav className="bg-cyan-800/60 p-3 space-x-5">
        <Link href={`/t/privacy-policy`}>
          <a className="after-content-[|]">Privacy Policy</a>
        </Link>
        <Link href={`/t/terms-of-use`}>
          <a>Terms of Use</a>
        </Link>
      </nav>
      <p className="py-7 opacity-90">
        Copyright &copy; {SITE_NAME}. All Rights Reserved
      </p>
    </div>
  );
}
