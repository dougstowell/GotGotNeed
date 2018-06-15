import React, { Component } from 'react';
import { Grid, Navbar, Nav, NavItem, Jumbotron } from 'react-bootstrap';

import SearchBar from './components/search_bar';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;

    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {

        if (response) {
          this.setState({
            nowPlaying: {
                name: response.item.name,
                albumArt: response.item.album.images[0].url
              }
          });
        }
      })
  }

  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Got Got Need</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavItem href="http://localhost:9000/login">
                Log in to Spotify
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Grid>
        </Navbar>

        <Jumbotron>
          <Grid>
            <h1>Welcome to GGN</h1>
            <SearchBar />
            <div>
              Now Playing: { this.state.nowPlaying.name }
            </div>
            <div>
              <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} alt="Album art"/>
            </div>

            { this.state.loggedIn &&
              <button onClick={ () => this.getNowPlaying() }>
                Check Now Playing
              </button>
            }
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;