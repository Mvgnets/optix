Our developer was part way through developing the following feature but left the company and you are tasked with picking up where they left off.

The aim is to complete the piece of work by refactoring and improving the current code to get it to a working state that passes all A/C. Use material UI components and a form library where desirable.

Please return as a link to a public GIT store of your choice. e.g. Github

***A/C***
Must have(s)
* Display total number of movies.
* Table must show movie title, average review score to 1 decimal place and company that produces the film.
    * Movie company data comes from movieCompanies GET request.
    * Movies data comes from movies GET request.
* User must be able to select table row to leave a review with form appearing when there is a selected movie.
    * POST request to submitReview endpoint and display message returned on response.
    * Form must restrict message to 100 characters and show an error message if over 100 and not allow for submission in this instance.
* Highlight selected movie row when clicked.
* Handle error and loading states.

Should have(s)
* Review column should be sortable.
* Submit review form should appear in a modal on mobile devices or small breakpoints.

Could have(s)
* Add a button (or other mechanism) to refresh movies and movie companies.
* Containerise application using docker.


The three endpoints to be used are:
* GET movie companies: http://localhost:3000/movieCompanies
* GET movies: http://localhost:3000/movies
* POST review: http://localhost:3000/submitReview
    * body {review: message}

Please run server locally from https://github.com/michaelOptix1/starter-express-api
