"use strict"
const MOVIE_URL = 'https://lyrical-intriguing-othnielia.glitch.me/movies'

$(document).ready(function () {

//FETCH REQUEST AND RENDER HTML*********************************************
//     function loadScreen() {
//
//     }
    const getMovies = () => fetch(MOVIE_URL)
        .then(res => res.json())
        .then(movies => {
            setTimeout(function () {
                $('#loading').css("visibility", "hidden");
                $('#content').css("visibility", "visible");
            }, 3000);
            let html = '';
            let movieList = '';

            movies.forEach(movie => {

                html += `<div class="card mb-1" data-number="${movie.id}" style="width: 24rem">
                    <h3>${movie.title}</h3>
                    <h4>Rating: ${movie.rating}</h4>
                    <button class="delMovie">Delete</button></div>`;

                movieList += `<option data-number="${movie.id}">${movie.title}</option>`
            })

            $('#movies').html(html);
            $('#movie-selection').html(movieList);
        })
        .catch(console.error);

    //ADD MOVIES FUNCTION******************************************************

    const addMovies = (movie) => fetch(`${MOVIE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    })
        .then(res => res.json())
        .then(data => {
            console.log(`Success: created ${JSON.stringify(movie)}`);
            return movie.id; // to access the primary key of the newly created entity
        })
        .then()
        .catch(console.error);

    //DELETE MOVIES FUNCTION******************************************************

    const deleteMovie = id => fetch(`${MOVIE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(() => {
            console.log(`Success: movie with id of ${id}`);
        })
        .catch(console.error);


    // Give users the option to edit an existing movie
    // A form should be pre-populated with the selected movie's details
    // Like creating a movie, this should not involve any page reloads, instead your javascript code should make an ajax request when the form is submitted.








    //EVENT HANDLERS*****************************************************************

    $("#displayMovies").on('click', getMovies);

    $("#submitMovie").on('click', function (e) {
        e.preventDefault();
        let currentMovie = $("#addMovie").val();
        let currentRating = $("#rating").val();
        let movieObj = {title: currentMovie, rating: currentRating};
        addMovies(movieObj);
        $('#movies').append(`<div class="card mb-1" style="width: 24rem">
                    <h3>${currentMovie}</h3>
                    <h4>Rating: ${currentRating}</h4>
                    <button class="delMovie">Delete</button></div>`);
    });


    $(document).on('click', '.delMovie', function (e) {
        e.preventDefault();
        let currentId = $(this).parent().data('number');
        console.log(currentId)
        deleteMovie(currentId);
        $(this).parent().remove();

    });

    getMovies();
});


document.onreadystatechange= function () {
    var state = document.readyState
// window.onload = function () {
    if (state === 'interactive') {
        document.getElementById('someContent').style.visibility = "hidden";
    } else if (state === 'complete') {
        setTimeout(function () {
            document.getElementById('gifLoader').style.visibility = "hidden";
            document.getElementById('someContent').style.visibility = "visible";
        }, 1000);
    }
}


