import React, { Component } from 'react'
import './App.css'
import axios from 'axios'


class App extends Component {
  constructor () {
    super()
    this.state = {
      albums: [],
      albumsDetail: [],
      genres: [],
      page: 'home',
      tracks: [],
      AllGender: [],
      thegender: [],
      AllArtist: [],
      AlbumArtist: [],
      Artist: []
    }
    this.AlbumDetail = this.AlbumDetail.bind(this);
    this.Home = this.Home.bind(this);
    this.AllAlbum = this.AllAlbum.bind(this);
    this.AllGender = this.AllGender.bind(this);
    this.AlbumGender = this.AlbumGender.bind(this);
    this.AllArtist = this.AllArtist.bind(this);
    this.AlbumArtist = this.AlbumArtist.bind(this);

    axios('http://localhost/my_spotify/api/API.php?random')
    .then(response => { this.setState({albums: response.data})})

  }
    AlbumDetail(id) {
      axios('http://localhost/my_spotify/api/API.php?album=&id=' + id )
    .then(response => { this.setState({albumsDetail: response.data[0],
                                        genres: response.data[1]})})

    axios('http://localhost/my_spotify/api/API.php?tracks=&id=' + id)
    .then(response => { this.setState( {tracks: response.data})})
    this.setState({page: 'albumDetail'});
    }

    Home() {
      axios('http://localhost/my_spotify/api/API.php?random')
      .then(response => { this.setState({albums: response.data})})
      this.setState({page: 'home'})
    }

    AllAlbum() {
      axios('http://localhost/my_spotify/api/API.php?albums')
      .then(response => { this.setState( {albums: response.data} )})
      this.setState({page: 'AllAlbum'})
    }

    AllGender() {
      axios('http://localhost/my_spotify/api/API.php?gender')
      .then(response => { this.setState( {AllGender: response.data})})
      this.setState( {page: 'AllGender'})
    }

    AlbumGender(id) {
      axios('http://localhost/my_spotify/api/API.php?gender&id=' + id)
      .then(response => { this.setState( {albums: response.data,
                                          thegender: response.data[0]})})
      this.setState({page: 'AlbumGender'})
    }

    AllArtist() {
      axios('http://localhost/my_spotify/api/API.php?artists')
      .then(response => { this.setState( {AllArtist: response.data})})
      this.setState( {page: 'AllArtist'})
    }

    AlbumArtist(id) {
      axios('http://localhost/my_spotify/api/API.php?ArtistAlbums&id=' + id)
      .then(response => { this.setState( {AlbumArtist: response.data})})

      axios('http://localhost/my_spotify/api/API.php?artist&id=' + id)
      .then(reponse => { this.setState( {Artist: reponse.data[0]})})
      this.setState( {page: 'AlbumArtist'})
    }

  render () {
  if (this.state.page == 'home') {
    return (
      <div>
         <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item ">
            <a class="nav-link" href="#" onClick={this.Home}>Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={this.AllArtist}>Artists</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={this.AllAlbum}>Albums</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={this.AllGender}>Genre</a>
          </li>
        </ul>
      </nav>
      <h1 class="degauss4">My_Spotif<span class="dash">Y</span></h1>
      <p class="presentation">Welcome to my spotify ! here is a choice of albums just for you !</p>
      <div class="show">
      { this.state.albums.map(info => (
      <div class="album" style={ { backgroundImage: `url(${info.albumCover.replace(/ /g,"%20")})` } }>
        <a onClick={this.AlbumDetail.bind(this,info.albumid)}>{info.albumName}</a>
        <p>{info.artistName}</p>
      </div>
      ))}
      </div>
      </div>
    )
  }
  else if (this.state.page == 'albumDetail'){
    return (
      <div>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
     <ul class="navbar-nav">
       <li class="nav-item ">
         <a class="nav-link" href="#" onClick={this.Home}>Home</a>
       </li>
       <li class="nav-item">
         <a class="nav-link" href="#" onClick={this.AllArtist}>Artists</a>
       </li>
       <li class="nav-item">
         <a class="nav-link" href="#" onClick={this.AllAlbum}>Albums</a>
       </li>
       <li class="nav-item">
         <a class="nav-link" href="#" onClick={this.AllGender}>Genre</a>
       </li>
     </ul>
   </nav>
      <div class="col-sm-12 description">
        <div>
          <div class="descdiv">
          <img class="cover" src={this.state.albumsDetail.cover_small}></img>
				<p class="describ">Sorti le : {this.state.albumsDetail.release_date}</p>
				<p class="describ">Genre : {this.state.genres.genres}</p>
				<p class="describ">Popularité : {this.state.albumsDetail.popularity}</p>
				<p class="describ">{this.state.albumsDetail.description}</p>
          </div>
        { this.state.tracks.map(info => (
          <div>
          <p class="describ">{info.name}</p>
          <audio controls="controls"><source src={info.mp3}></source></audio>
          </div>
        ))}
           <p>{this.state.tracks.mp3}</p>
        </div>
					</div>
          </div>
    )
  }
  else if (this.state.page == 'AllAlbum') {
    return (
                  <div>
                    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                      <ul class="navbar-nav">
                <li class="nav-item ">
                  <a class="nav-link" href="#" onClick={this.Home}>Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={this.AllArtist}>Artists</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={this.AllAlbum}>Albums</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={this.AllGender}>Genre</a>
                </li>
              </ul>
            </nav>
            <h1 class="degauss4">My_Spotif<span class="dash">Y</span></h1>
            <p class="presentation">See all the albums avaible on my spotify !</p>
            <div class="show">
            { this.state.albums.map(info => (
            <div class="album" style={ { backgroundImage: `url(${info.albumCover.replace(/ /g,"%20")})` } }>
              <a onClick={this.AlbumDetail.bind(this,info.albumid)}>{info.albumName}</a>
              <p>{info.artistName}</p>
            </div>
            ))}
            </div>
            </div>
    )
  }
  else if (this.state.page == 'AllGender') {
  return (
                  <div>
                    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                      <ul class="navbar-nav">
                <li class="nav-item ">
                  <a class="nav-link" href="#" onClick={this.Home}>Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={this.AllArtist}>Artists</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={this.AllAlbum}>Albums</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" onClick={this.AllGender}>Genre</a>
                </li>
              </ul>
            </nav>
            <h1 class="degauss4">My_Spotif<span class="dash">Y</span></h1>
            <p class="presentation">See our large choice of Music Style !</p>
            <div class="show">
            { this.state.AllGender.map(info => (
              <div class="gender" onClick={this.AlbumGender.bind(this,info.id)}><p>{info.name}</p></div>
            ))}
            </div>
            </div>
    )

  }
  else if (this.state.page == 'AlbumGender') {
    return (
      <div>
         <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item ">
            <a class="nav-link" href="#" onClick={this.Home}>Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={this.AllArtist}>Artists</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={this.AllAlbum}>Albums</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={this.AllGender}>Genre</a>
          </li>
        </ul>
      </nav>
      <h1 class="degauss4">My_Spotif<span class="dash">Y</span></h1>
      <p class="presentation">Wow, {this.state.thegender.genreName}, nice choice ! Here is All of our  {this.state.thegender.genreName} Albums</p>
      <div class="show">
      { this.state.albums.map(info => (
      <div class="album" style={ { backgroundImage: `url(${info.albumCover.replace(/ /g,"%20")})` } }>
        <a onClick={this.AlbumDetail.bind(this,info.albumid)}>{info.albumName}</a>
        <p>{info.artistName}</p>
      </div>
      ))}
      </div>
      </div>
    )
  }
  else if (this.state.page == 'AllArtist') {
    return (
      <div>
         <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item ">
            <a class="nav-link" href="#" onClick={this.Home}>Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={this.AllArtist}>Artists</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={this.AllAlbum}>Albums</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={this.AllGender}>Genre</a>
          </li>
        </ul>
      </nav>
      <h1 class="degauss4">My_Spotif<span class="dash">Y</span></h1>
      <p class="presentation">See all the talented Artists on My_Spotify !</p>
      <div class="show">
      { this.state.AllArtist.map(info => (
      <div class="album" style={ { backgroundImage: `url(${info.photo.replace(/ /g,"%20")})` } }>
        <a onClick={this.AlbumArtist.bind(this,info.id)}></a>
        <p>{info.name}</p>
      </div>
      ))}
      </div>
      </div>
    )
  }
  else if (this.state.page == 'AlbumArtist') {
    return (
      <div>
         <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item ">
            <a class="nav-link" href="#" onClick={this.Home}>Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={this.AllArtist}>Artists</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={this.AllAlbum}>Albums</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={this.AllGender}>Genre</a>
          </li>
        </ul>
      </nav>
      <h1 class="degauss4">My_Spotif<span class="dash">Y</span></h1>
<div class="card">
        <div class="card-image">
            <img src={this.state.Artist.photo}
            alt="Orange" />
        </div>
        <div class="card-body">
            <div class="card-date">
                <time>
                    {this.state.Artist.description}
                </time>
            </div>
            <div class="card-title">
                <h3>
                    {this.state.Artist.name}
                </h3>
            </div>
        </div>
</div>
      <div class="show">
      <p class="presentation">All albums of {this.state.Artist.name}</p>
      { this.state.AlbumArtist.map(info => (
      <div class="album" style={ { backgroundImage: `url(${info.cover.replace(/ /g,"%20")})` } }>
        <a onClick={this.AlbumDetail.bind(this,info.id)}>{info.name}</a>
        <p>{info.artistName}</p>
      </div>
      ))}
      </div>
      </div>
    )
  }
}


}
export default App