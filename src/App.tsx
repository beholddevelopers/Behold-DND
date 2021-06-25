import React, { Component } from "react";
import { gsap } from "gsap";
import { rollDice } from './Utilities';
import HPContainer from './Hitpoints_Containers/Component'

interface myProps {
	name: any
}

export default class App extends Component<myProps> {
	render():React.ReactNode {
		return <HPContainer value={12} defaultValue={50}/>
	}

	handleClick(event):void{
		gsap.to(event.target,2,{
			marginTop: event.target.style.marginTop === "100px" ? "0px" : "100px"
		})
	}
}