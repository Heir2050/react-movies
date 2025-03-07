import React, { useEffect, useState } from "react";
import Search from "./components/search";

const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie'

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
    const [errorMeassage, setErrorMeassage] = useState('')

    // Fonction to fetch movies
    const fetchMovies = async () => {
        try {
            // const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
            const endpoint = `${API_BASE_URL}?sort_by=popularity.desc`;


            const response = await fetch(endpoint, API_OPTIONS)

            // alert("Perfect")  // to test while called this fonction on useEffect()

            //when the response fail
            if (!response.ok) {
                throw new Error("Failed to fetch movies")
            }

            const data = await response.json()
            console.log(data);
            

        } catch (error) {
            console.error(`Error fetching Movies: ${error}`);
            setErrorMeassage('Error fetching movies. Please try again later.') // Now you can display the message error where ever you want
        }
    }

    useEffect(() => {
        // this will help to load or fetching the API datas

        // try to load fetchMovies() fonction to load all movies when the app is running
        fetchMovies()
    }, [])

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
                    <h2>All Movies</h2>
                    {/* Otherwise calling the error message */}
                    {errorMeassage && <p className="text-red-500">{errorMeassage}</p>}
                </section>
            </div>
        </main>
    );
}
 
export default App;