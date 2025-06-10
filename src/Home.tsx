import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to My App</h1>
      <nav className="nav">
        <ul className="nav-ul">
          <li>
            <Link to="/contact">Contact Page</Link>
          </li>
          <li>
            <Link to="/github">GitHub Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
