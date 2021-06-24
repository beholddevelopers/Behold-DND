import React, { Component } from "react";
import { gsap } from "gsap";


interface myProps {
	name: any
}

export default class App extends Component<myProps> {
	render():React.ReactNode {
		return (<h1 onClick={this.handleClick}>Hello {this.props.name}!</h1>);
	}

	handleClick(event):void{
		console.log("hello world")
		gsap.to(event.target,2,{
			marginTop:"100px"
		})
	}
}