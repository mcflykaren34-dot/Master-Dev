import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Sidebar, Navbar, CallButton } from "./components";
import ProtectedRoutes from "./components/ProtectedRoutes";

import {
  ProductDetails,
  CreateProduct,
  Home,
  Profile,
  Signup,
  Login,
  CompanyHomepage,
  CompanyProfile,
  UserLogin,
  UserSignup,
  Marketplace,
  Leaderboard,
  Dex,
  About,
  FAQ,
  RouterProtocol,
  CompanyLandingPage,
} from "./pages";

import LandingPage from "./Landing/Home";
import Footer from "./Landing/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useStateAuth } from "./context/StateProvider";
import { useMemo } from "react";

const HIDE_NAV_PATHS = new Set([
  "/",
  "/login",
  "/register",
  "/company/login",
  "/company/register",
  "/about",
  "/faq",
]);

function AppLayout({ showNav, children }) {
  return (
    <>
      <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
        {showNav && <Sidebar />}
        <CallButton />

        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          {showNav && <Navbar />}
          {children}
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
}

function App() {
  const { userData } = useStateAuth();
  const { pathname } = useLocation();

  const isAuthed = Boolean(userData);

  const shouldHideNav = useMemo(() => {
    return HIDE_NAV_PATHS.has(pathname);
  }, [pathname]);

  const showNav = isAuthed && !shouldHideNav;

  // Route definitions grouped for clarity/maintenance
  const publicRoutes = [
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <UserLogin /> },
    { path: "/register", element: <UserSignup /> },
    { path: "/company/register", element: <Signup /> },
    { path: "/company/login", element: <Login /> },
    { path: "/about", element: <About /> },
    { path: "/faq", element: <FAQ /> },
    { path: "/dex", element: <Dex /> },
    { path: "/leaderboard", element: <Leaderboard /> },
    { path: "/abc", element: <CompanyLandingPage /> },
  ];

  const customerProtectedRoutes = [
    { path: "/home", element: <Home /> },
    { path: "/profile", element: <Profile /> },
    { path: "/product-details/:id", element: <ProductDetails /> },
    { path: "/exchange", element: <RouterProtocol /> },
  ];

  const companyProtectedRoutes = [
    { path: "/company", element: <CompanyHomepage /> },
    { path: "/company/profile", element: <CompanyProfile /> },
    { path: "/company/product-details/:id", element: <ProductDetails /> }, // avoid duplicate exact same path
    { path: "/company/exchange", element: <RouterProtocol /> },
    { path: "/company/create-product", element: <CreateProduct /> },
    { path: "/company/marketplace", element: <Marketplace /> },
  ];

  return (
    <AppLayout showNav={showNav}>
      <Routes>
        {/* Public routes */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Customer protected routes */}
        <Route element={<ProtectedRoutes user="customer" />}>
          {customerProtectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Company protected routes */}
        <Route element={<ProtectedRoutes user="company" />}>
          {companyProtectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </AppLayout>
  );
}

export default App;
