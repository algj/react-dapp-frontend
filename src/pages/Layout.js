import { Outlet, Link, useLocation } from "react-router-dom";
import Config from "../Config";
import CLink from "../components/CLink";
import WalletConnection from "../components/WalletConnection";
import WalletConnectButton from "../components/WalletConnectButton";

const Layout = () => {
  const location = useLocation();
  const productsActive = location.pathname === "/";
  const portfolioActive = location.pathname === "/portfolio";

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-dark sticky-top">
        <div className="container-fluid mx-2">
          <div className="navbar-logo-width">
            <Link className="navbar-brand" to="/">
              <img src="/logo192.png" alt="Logo" width="30" height="30" className="d-inline-block align-text-top" />
            </Link>
          </div>
          <span className="d-lg-none my-lg-0">
            <WalletConnectButton integratedMenu/>
          </span>
          <button className="btn btn-outline-light d-lg-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i className="bi bi-list fs-3"></i>
          </button>
          <div className="collapse navbar-collapse justify-content-center text-center" id="navbarNav">
            <ul className="navbar-nav flex-wrap pt-4 pt-lg-0 my-4 my-lg-0 justify-content-center">
              <li className="nav-item me-0">
                <Link className={`nav-link my-2 my-lg-0 ${productsActive ? "active" : ""}`} to="/"><i className="bi bi-grid"></i> Products</Link>
              </li>
              <li className="nav-item me-0">
                <Link className={`nav-link my-2 my-lg-0 ${portfolioActive ? "active" : ""}`} to="/portfolio"><i className="bi bi-briefcase"></i> Portfolio</Link>
              </li>
              {Object.keys(Config.navLinks).map((name, index) => (
                <li key={index} className="nav-item me-0">
                  <CLink className="nav-link my-2 my-lg-0" name={name} data={Config.navLinks[name]} external color="info" />
                </li>
              ))}
            </ul>
          </div>

          <div className="d-none d-lg-flex justify-content-end">
          <WalletConnectButton integratedMenu/>
          </div>
        </div>
      </nav>
      <main className="flex-grow-1 text-white d-flex" id="outlet-page">
        <Outlet />
      </main>
      <footer className="bg-black text-white border-top border-dark mt-auto">
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-lg-6">
              <ul className="list-unstyled d-flex justify-content-lg-start justify-content-center flex-wrap">
                {Object.keys(Config.footerLinks).map((name, index) => (
                  <CLink key={index} name={name} data={Config.footerLinks[name]}/>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <ul className="list-unstyled d-flex justify-content-lg-end justify-content-center flex-wrap">
                {Object.keys(Config.socialLinks).map((name, index) => (
                  <CLink key={index} name={name} data={Config.socialLinks[name]}/>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <WalletConnection/>
    </>
  )
};

export default Layout;
