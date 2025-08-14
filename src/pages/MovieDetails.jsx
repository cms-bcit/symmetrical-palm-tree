import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function MovieDetails() {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);

	useEffect(() => {
		fetch(`https://ghibliapi.vercel.app/films/${id}`)
			.then((response) => response.json())
			.then((data) => setMovie(data))
			.catch((error) => console.error("Error fetching movie details:", error));
	}, []);

	if (!movie) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>{movie.title}</h1>
			<p>{movie.description}</p>
			<p>Director: {movie.director}</p>
			<p>Producer: {movie.producer}</p>
			<p>Release Date: {movie.release_date}</p>
			<p>Rotten Tomatoes Score: {movie.rt_score}%</p>
			<Link to='/'>Back to Home</Link>
		</div>
	);
}

export default MovieDetails;
