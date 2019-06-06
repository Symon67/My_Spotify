import React, { Component } from 'react'
import './Navbar.css'
import axios from 'axios'

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      artists: [],
      ta: true
    }
    this.showArtists = this.showArtists.bind(this);
  }

    showArtists() {
      axios('http://localhost/my_spotify/api/API.php?artists')
      .then(response => { this.setState({artists: response.data})})
      this.setState({ta: false});
    }
  render () {
  if (this.state.ta) {
    return (
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" onClick={this.showArtists}>My_Spotify</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Artists</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Albums</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Genre</a>
          </li>
        </ul>
      </nav>
    )
  }
  else{
    return (
      <div class="show">
      { this.state.artists.map(info => (
      <div class="artist" style={ { backgroundImage: `url(${info.photo.replace(/ /g,"%20")})` } }>
        <a>{info.name}</a>
        <p>{info.descriptionn}</p>
      </div>
      ))}
      </div>
    )
  }
}


}
export default Navbar