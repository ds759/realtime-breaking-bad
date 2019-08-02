import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
	state = {
		title: "Loading..."
	};

	componentDidMount() {
		fetch("/breaking_bad").then(res => {
			res.json();
			console.log(res.title);
			let title = res.title;
			alert("here");
			this.setState({ title });
		});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">{this.state.title}</h1>
					<h2>My App!</h2>
				</header>
			</div>
		);
	}
}

export default App;
