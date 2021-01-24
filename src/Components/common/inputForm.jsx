import React, { Component } from 'react';

class InputForm extends Component {
  state = {
    movie: '',
    year: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmit(this.state.movie, this.state.year);
  };

  render() {
    return (
      <form className='form-container' onSubmit={this.handleSubmit}>
        <label>
          Movie Title: <br />
          <input
            type='text'
            id='movie'
            value={this.state.movieName}
            onChange={this.handleChange}
            required
          />
        </label>
        <br />
        <label>
          Release Year: <br />
          <input
            type='number'
            id='year'
            value={this.state.year}
            onChange={this.handleChange}
            required
          />
        </label>
        <br />
        <button className='submit-button'>Submit</button>
      </form>
    );
  }
}

export default InputForm;
