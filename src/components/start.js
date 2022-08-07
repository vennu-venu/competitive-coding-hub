import "../styles/start.css";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div>
      <div className="front-page l-1">
        <div className="head-title">
          <p>
            <span></span>
            <span className="custom-letter">C</span>ompetitive
            <br />
            <span className="custom-letter">C</span>oding{" "}
            <span className="custom-letter">H</span>ub
          </p>
        </div>
        <div className="button-area">
          <p>
            Platform which can be exclusively used as a means to share the
            doubts related to programming.
          </p>
          <Link class="login-link" to="/login">
            <button className="login-btn">Get Started</button>
          </Link>
        </div>
      </div>
      <div className="quote">
        <p>#ask</p>
        <p>#learn</p>
        <p>#code</p>
      </div>
      <div className="o-item l-2">
        <div className="o-content">
          <p>
            Share your doubts anonymously, so that your identity won't be
            revealed.
          </p>
        </div>
        <div className="o-idea">
          <p>#include</p>
        </div>
      </div>
      <div className="e-item l-3">
        <div className="e-idea">
          <p>import</p>
        </div>
        <div className="e-content">
          <p>Interact with the expert coders available on the platform.</p>
        </div>
      </div>
      <div className="o-item l-4">
        <div className="o-content">
          <p>Best resource to get good knowledge in Competitive Coding</p>
        </div>
        <div className="o-idea">
          <p>return</p>
        </div>
      </div>
      <div className="last-quote">
        <p># Start posting your doubts..</p>
      </div>
    </div>
  );
}

export default Start;
