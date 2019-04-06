import React, { Component } from 'react';
import Artist from './Artist'
import Tracks from './Tracks'
import Search from './Search'
const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com'

class App extends Component {
    state = {
        artist : null,
        tracks : []
    }

    componentDidMount () {
        this.searchArtist('John Legend')
    }

    searchArtist = artistQuery => {
        fetch(`${API_ADDRESS}/artist/${ artistQuery}`)
        .then(res => res.json())
        .then(json => {
            if(json.artists.total > 0) {
                const artist = json.artists.items[0]
                this.setState({artist})

                fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
                .then(res => res.json())
                .then(json => this.setState({tracks : json.tracks}))
                .catch(err => alert(err.message))
            }
        })
        .catch(err => alert(err.message))
    }

    

    render() {
        console.log('state  : ', this.state)
        
        return (
            <div >
                <Search  searchArtist = {this.searchArtist} />
                <h2>Music Master</h2>
                 <Artist artist = {this.state.artist}/>
                <Tracks tracks = {this.state.tracks} />
            </div>
        )
    }
}



export default App;