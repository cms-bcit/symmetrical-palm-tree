import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
    const [favourites, setFavourites] = useState(() => {
			const savedFavourites = localStorage.getItem("favourites");
			return savedFavourites ? JSON.parse(savedFavourites) : [];
		});
        
    const toggleFavourite = (movie) => {
            const updatedFavourites = favourites.includes(movie.id)
                ? favourites.filter((favId) => favId !== movie.id)
                : [...favourites, movie.id];
            setFavourites(updatedFavourites);
            localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
        };       

	const searchMovies = () => {
		fetch(`https://ghibliapi.vercel.app/films?title=${searchTerm}`)
			.then((response) => response.json())
			.then((data) => {
				const filteredMovies = data.filter((movie) =>
					movie.title.toLowerCase().includes(searchTerm.toLowerCase())
				);

				setMovies(filteredMovies);
			})
			.catch((error) => console.error("Error searching movies:", error));
	};

	useEffect(() => {
		fetch("https://ghibliapi.vercel.app/films")
			.then((response) => response.json())
			.then((data) => setMovies(data))
			.catch((error) => console.error("Error fetching movies:", error));
	}, []);

	return (
		<div>
			<h1>Studio Ghibli Movies</h1>
			<label htmlFor='searchBox'>Search for a movie:</label>
			<input
				id='searchBox'
				type='text'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<button onClick={searchMovies}>Search</button>
			<ul>
				{movies.map((movie) => (
					<li key={movie.id}>
						<Link to={`/movie/${movie.id}`}>{movie.title} </Link>
						<button onClick={() => toggleFavourite(movie)}>
							{favourites.includes(movie.id) ? "Unfavourite" : "Favourite"}
						</button>
					</li>
				))}
			</ul>
			<Link to='/favourites'>View Favourites</Link>
		</div>
	);
}

export default Home;
