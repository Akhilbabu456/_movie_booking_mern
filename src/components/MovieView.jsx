import "./MovieView.css";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

const MovieView = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const id = useParams().id;

    // useEffect(() => {

    //   getData(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
    //     .then((data) => {
    //       setMovie(data.movie);
    //     })
    //     .catch((error) => {
    //       setError(error);
    //     });
    // }, []);

//   const formatMoney = (value) => {
//     if (value <= 500) {
//       return "Not provided";
//     } else {
//       return value.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//     }
//   };

  return (
    <>
      <article className="details-page">
        <img
          src="https://images.hdqwalls.com/wallpapers/bthumb/avatar-the-way-of-the-water-2022-5k-u1.jpg"
          //alt={`Backdrop Image for ${movie.title}`}
          className="backdrop-image"
        />
        <div className="info">
          <img
            src="https://images.hdqwalls.com/wallpapers/bthumb/avatar-the-way-of-the-water-2022-5k-u1.jpg"
            //alt={`Cover Image for ${movie.title}`}
            className="cover-image"
          />
          <div className="movie-overview-section">
            <h1 className="movie-title">Avatar</h1>
            <div className="date-and-runtime">
              <p>2024</p>
              <p>2hr 45min</p>
            </div>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo ipsa vitae voluptatem. Impedit soluta explicabo corrupti omnis reiciendis deleniti! Fugiat quas aliquid mollitia. Hic, impedit distinctio. Provident dolores neque dolorum assumenda, laudantium, facere quaerat tenetur molestiae aut, voluptas esse eligendi in incidunt necessitatibus qui consequatur dolor sint modi numquam sed alias. Hic, ea? Explicabo, quas quaerat! Voluptas, quisquam saepe. Exercitationem dolores accusantium sint non sapiente optio dignissimos voluptate a dicta?</p>
          <a href="/user/view/book" className="btn btn-primary">Book Ticket</a>
          </div>
          <div className="movie-rating-section">
            <h3>✩ 8/10</h3>
            
          </div>
        </div>
      </article>
      <footer></footer>
    </>
  );
};

export default MovieView;
