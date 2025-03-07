import React, { useEffect, useState } from "react";
import Search from "./components/search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";

// const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie'
const API_BASE_URL = 'https://api.themoviedb.org/3'

// Load the api key stored at .env
const API_KEY = import.meta.env.VITE_TMDB_KEY

// Api options that we want
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${API_KEY}`  // The server will know who is making request trough this
    },
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState("")

    // A state that will displaying error from api fetching
    const [errorMeassage, setErrorMeassage] = useState()

    // usestate for our list movies
    const [movieList, setMovieList] = useState([])

    // When you fetch smethings on API it's takes times while showing loading
    const [isLoading, setIsLoading] = useState(false)

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    // debounce the search term to prevent too many API request
    // by waiting by the user to stop tyiping for 500ms
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]) // This is optimize the search

    // Fonction to fetch movies
    const fetchMovies = async (query ='') => {  // query was added when implementing search
        // Before loading anything
        setIsLoading(true)
        setErrorMeassage('')
        try {
            // const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
            const endpoint = query 
            ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS)

            // alert("Perfect")  // to test while called this fonction on useEffect()

            //when the response fail
            if (!response.ok) {
                throw new Error("Failed to fetch movies")
            }

            const data = await response.json()
            console.log(data);
            
            // Sometimes something can happen and we need to handle that error
            if (data.response == false) {
                setErrorMeassage(data.Error || "Failed to Fetch Movies")

                setMovieList([]) // We got error, then the list would be empty
                return;  // exit the fonction
            }

            // But if it's succed
            setMovieList(data.results || [])

        } catch (error) {
            console.error(`Error fetching Movies: ${error}`);
            setErrorMeassage('Error fetching movies. Please try again later.') // Now you can display the message error where ever you want
        } finally {
            // this clause is to close loading data no matter is succed or no
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // this will help to load or fetching the API datas

        // try to load fetchMovies() fonction to load all movies when the app is running
        fetchMovies(debouncedSearchTerm) // searchTerm was added when implementing search
    }, [debouncedSearchTerm])

    return ( 
        <main>
            <div className="pattern"/>

            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="" />
                    <h1>Find <span className="text-gradient">Movies</span> That You'll Enjoy Without The Hassle</h1>
                
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>
                    {/* <h1 className="text-white">{searchTerm}</h1> */}
                <section className="all-movies">
                    <h2 className="mt-[20px]">All Movies</h2>
                    {/* Otherwise calling the error message */}
                    {/* {errorMeassage && <p className="text-red-500">{errorMeassage}</p>} */}

                    {/* Condition for dsiolaying movies */}
                    {isLoading ? (
                        <Spinner/>
                    ) : errorMeassage ? (
                        <p className="text-red-500">{errorMeassage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) =>(
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
}
 
export default App;