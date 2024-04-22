import { useLocation } from "react-router-dom";

export const LogoutSession = () => {
  const navigate = useLocation();
  localStorage.removeItem("ARN-Number");
  localStorage.removeItem("ARN-Name");
  navigate("/thank-you");
  window.location.href = "https://buytrucknbus-osp3dev.home.tatamotors/";
};
