import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-2  col-sm-6 col-xs-12">
          <div className="movie-card">
            <img
              src="https://images.hdqwalls.com/wallpapers/bthumb/avatar-the-way-of-the-water-2022-5k-u1.jpg"
              alt="Avatar wallpaper"
            />
            <h3>Avatar: The Way of Water</h3>
            <div className="content">
              <h1>Avatar: The Way of Water</h1>

              <div className="infos">
                <span>·&nbsp;&nbsp;2022&nbsp;&nbsp;·&nbsp;&nbsp;3h12</span>
              </div>

              <p className="synopsis">
                Jake Sully lives with his newfound family formed on the
                extrasolar moon Pandora. Once a familiar threat returns to
                finish what was previously started, Jake must work with Neytiri
                and the army of the Navi race to protect their home.
              </p>

              <Link to="/user/view" className="btn">
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
