import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center my-4">
      <div className="text-center">
        <i className="bi bi-exclamation-triangle text-danger mb-3 fs-1" />
        <h2 className="mb-3 text-white">404 - Page Not Found</h2>
        <p className="lead">Sorry, it looks like the page you were looking for has gone off to join the blockchain revolution or been kidnapped by crypto whales.</p>
        <Link to="/" className="btn btn-dark mt-3"><i className="bi bi-house-door"></i> Go to Home</Link>
      </div>
    </div>
  );
};

export default NoPage;