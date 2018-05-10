import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
	color: '#FFF'
};

class Aggregate extends Component {
	render() {
		return (
			<div style={{ ...defaultStyle, width: "40%", display: 'inline-block' }}>
				<h2 style={defaultStyle}>Number Text</h2>
			</div>
		);
	}
}

class Filter extends Component {
	render() {
		return (
			<div style={defaultStyle}>
				<img />
				<input type="text" />
			</div>
		);
	}
}

class Playlist extends Component {
	render() {
		return (
			<div style={{ ...defaultStyle, display: 'inline-block', width: '25%' }}>
				<img />
				<h3>Playlist Name</h3>
				<ul>
					<li>Song 1</li>
					<li>Song 2</li>
					<li>Song 3</li>
				</ul>
			</div>
		);
	}
}

class App extends Component {
	render() {
		let name = 'Vince'
		let headerStyle = { ...defaultStyle, 'font-size': '50px' }
		return (
			<div className="App">
				<h1 style={headerStyle}>Title</h1>
				<Aggregate />
				<Aggregate />
				<Filter />
				<Playlist />
				<Playlist />
				<Playlist />
				<Playlist />
			</div>
		);
	}
}

export default App;