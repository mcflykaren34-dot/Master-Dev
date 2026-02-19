import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateAuth } from "../context/StateProvider";

const LOGIN_ROUTE_BY_ROLE = {
  customer: "customer",
  company: "company",
};

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-t-[4px] border-[#2c2f32] rounded-full animate-spin" />
    </div>
  );
}

const ProtectedRoutes = ({ user }) => {
  const { userData } = useStateAuth();
  const location = useLocation();

  // Treat "no userData yet" as loading (common when auth hydrates from storage/api)
  if (!userData) return <Spinner />;

  const isAllowed = userData?.type === user;
  if (isAllowed) return <Outlet />;

  const to = LOGIN_ROUTE_BY_ROLE[user] ?? "/login";
  return <Navigate to={to} replace state={{ from: location }} />;
};

export default ProtectedRoutes;
