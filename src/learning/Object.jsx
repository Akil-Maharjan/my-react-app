import React from 'react'
import avatar from './assets/avatar.jpg'
function Object() {
    const movie = {
        "Title": "Avatar",
        "Year": "2009",
        "Rated": "PG-13",
        "Released": "18 Dec 2009",
        "Runtime": "162 min",
        "Genre": "Action, Adventure, Fantasy",
        "Director": "James Cameron",
        "Writer": "James Cameron",
        "Actors": "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang",
        "Plot": "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
        "Language": "English, Spanish",
        "Country": "USA, UK",
        "Awards": "Won 3 Oscars. Another 80 wins & 121 nominations.",
        "Poster": avatar
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <div className="bg-white/90 shadow-2xl rounded-3xl p-8 max-w-md w-full flex flex-col items-center">
                <img src={movie.Poster} alt={movie.Title} className="h-32 w-32 rounded-full border-4 border-blue-400 shadow-lg mb-4" />
                <h1 className="text-3xl font-extrabold text-blue-800 mb-2">{movie.Title}</h1>
                <p className="italic text-blue-500 mb-4">{movie.Genre}</p>
                <div className="w-full text-left space-y-2 text-gray-700">
                    <p><span className="font-semibold text-blue-700">Year:</span> {movie.Year}</p>
                    <p><span className="font-semibold text-blue-700">Rated:</span> {movie.Rated}</p>
                    <p><span className="font-semibold text-blue-700">Released:</span> {movie.Released}</p>
                    <p><span className="font-semibold text-blue-700">Runtime:</span> {movie.Runtime}</p>
                    <p><span className="font-semibold text-blue-700">Director:</span> {movie.Director}</p>
                </div>
                <div className="mt-6 bg-blue-50 rounded-xl p-4 text-blue-900 text-sm shadow-inner">
                    <p className="mb-2"><span className="font-semibold">Plot:</span> {movie.Plot}</p>
                    <p><span className="font-semibold">Awards:</span> {movie.Awards}</p>
                </div>
            </div>
        </div>
    )
}

export default Object