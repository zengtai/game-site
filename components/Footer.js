import { SITE_NAME } from "../lib/constants";
export default function Footer(params) {
  return (
    <div className="footer">
      <p>Copyright &copy; {SITE_NAME}</p>
    </div>
  );
}
