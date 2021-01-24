import React, { Component } from 'react';
import InputForm from '../common/inputForm';
import axios from 'axios';
import noPoster from '../../images/noposter.jpg';

class SecondTab extends Component {
  state = {
    movies: [],
    error: null,
  };

  handleSubmit = async (movie, year) => {
    this.setState({ movies: [], error: null });
    const { data } = await axios.get(
      `http://www.omdbapi.com/?s=${movie}&y=${year}&apikey=4d604b6c`
    );
    const { Search, Error } = data;
    if (Error) {
      this.setState({ error: true });
    } else this.setState({ movies: Search });
  };

  render() {
    const { movies, error } = this.state;
    return (
      <div className='secondTab'>
        <p className='tab'>Second tab</p>
        <div className='container'>
          <InputForm handleSubmit={this.handleSubmit} />
          {error && <p className='notfound'>Movies not found!</p>}
          <ul className='movie-posters'>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <figure>
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : noPoster}
                    alt={movie.Title}
                  />
                  <figcaption>{movie.Title}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SecondTab;
