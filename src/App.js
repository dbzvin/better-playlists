import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string'

let defaultStyle = {
	color: '#FFF'
};
let fakeServerData = {
	user: {
		name: 'Vince',
		playlists: [
			{
				name: 'My favorites',
				songs: [
					{name: 'Beat It', duration: 4613}, 
					{name: 'Cannelloni Makaroni', duration: 78231}, 
					{name: 'Rosa helikopter', duration: 1227}]
			},
			{
				name: 'Discover Weekly',
				songs: [
					{name: 'Le song', duration: 1712},
					{name: 'Helle', duration: 12051},
					{name: 'Bohemian Rhapsody', duration: 16170}
				]
			},
			{
				name: 'Another playlist - the best!',
				songs: [
					{name: 'Le song',  duration: 1461},
					{name: 'The song',  duration: 1460},
					{name: 'Sangen', duration: 6109}
				]
			},
			{
				name: 'Playlist - yeah!',
				songs: [
					{name: 'Le song',  duration: 5610},
					{name: 'The song',  duration: 6810},
					{name: 'Sangan', duration: 2100}
				]
			}
		]
	}
};
class PlaylistCounter extends Component {
	render() {
		return (
			<div style={{ ...defaultStyle, width: "40%", display: 'inline-block' }}>
				<h2 style={defaultStyle}>{this.props.playlists.length} playlists</h2>
			</div>
		);
	}
}
class HoursCounter extends Component {
	render() {
		let allSongs = this.props.playlists.reduce( (songs, eachPlaylist)=>{
			return songs.concat(eachPlaylist.songs)
		}, [])
		let totalDuration = allSongs.reduce((sum, eachSong)=> {
			return sum + eachSong.duration
		}, 0)
		return (
			<div style={{ ...defaultStyle, width: "40%", display: 'inline-block' }}>
				<h2>{Math.round(totalDuration/60)} hours</h2>
			</div>
		);
	}
}

class Filter extends Component {
	render() {
		return (
			<div style={defaultStyle}>
				<img />
				<input type="text" onKeyUp={event => 
					this.props.onTextChange(event.target.value)} />
			</div>
		);
	}
}

class Playlist extends Component {
	render() {
		let playlist = this.props.playlist
		return (
			<div style={{ ...defaultStyle, display: 'inline-block', width: '25%' }}>
				<img src={playlist.imageUrl} style={{width: '60px'}} />
				<h3>{playlist.name}</h3>
				<ul>
					{playlist.songs.map(song =>
						<li>{song.name}</li>
					)}
				</ul>
			</div>
		);
	}
}
// this is the comment that i decided to add 
class App extends Component {
	constructor () {
		super();
		this.state = {
			serverData: {},
			filterString: ''
		}
	}
	componentDidMount () {
		let parsed = queryString.parse(window.location.search)
		let accessToken = parsed.access_token
		if (!accessToken)
			return;
		fetch('https://api.spotify.com/v1/me', {
			headers: {'Authorization': 'Bearer ' + accessToken}
			})
			.then(response => response.json())
			.then(data => 
				this.setState({
					user: {
						name: data.display_name
					}
				})
			)
		fetch('https://api.spotify.com/v1/me/playlists', {
			headers: {'Authorization': 'Bearer ' + accessToken}
		})
			.then(response => response.json())
			.then(data => this.setState({
				playlists: data.items.map(item => {
					console.log(item)
					return {
						name: item.name,
						imageUrl: item.images[0].url,
						songs: []
					}
				})
			}))
	}
	render() {
		let playlistToRender = 
			this.state.user && 
			this.state.playlists 
				? this.state.playlists.filter(
					playlist => playlist.name.toLowerCase().includes(
						this.state.filterString.toLowerCase()))
				: []
		return (
			<div className="App">
				{this.state.user ?
					<div>
						<h1 style={{...defaultStyle, 'font-size': '54px'}}>
							{this.state.user.name}'s Playlists 
						</h1>
						<PlaylistCounter playlists={playlistToRender} />
						<HoursCounter playlists={playlistToRender} />
						<Filter onTextChange={
							text => this.setState({filterString: text})
						} />
						{playlistToRender.map(
							playlist => <Playlist playlist={playlist} />
						)}
					</div> : 
					<button 
						onClick={() => window.location = 'http://localhost:8888/login'} 
						style={{padding: '20px', 'font-size': '50px', 'margin-top': '20px'}}>
						Sign in to Spotify
					</button>
				}
			</div>
		);
	}
}

export default App;