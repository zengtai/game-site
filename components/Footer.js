import { SITE_NAME } from "../lib/constants";
export default function Footer(params) {
  return (
    <div className="mt-3 text-xs text-center text-slate-100/40 p-6 bg-yellow-900">
      <p>Copyright &copy; {SITE_NAME}</p>
    </div>
  );
}
