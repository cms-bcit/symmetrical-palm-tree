import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import MovieDetails from "./pages/MovieDetails";
import Favourites from "./pages/Favourites";

function App() {

  return (
		<>
			<BrowserRouter basename='/<name-of-your-repo>'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/movie/:id' element={<MovieDetails />} />
					<Route path='/favourites' element={<Favourites />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App
