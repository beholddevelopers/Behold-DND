import React, { Component, ReactNode } from "react";
import { gsap } from "gsap";
import { rollDice } from './Utilities';
import HPContainer from './initiative-tracker/Hitpoints-Containers/Component'
import CardBody from './Session/Card-Body/Component'
import Paths from './Session/Path/Component'
import WYSIWYG from './Session/Doc-Editor/Component'
interface props {
	name: any
}



export default class App extends Component<props> {
	constructor(props){
		super(props);
		this.state = {
			startX:0,

		}
	}

	render():ReactNode{
		return <div>
			<WYSIWYG/>
		</div>
	}

	renderDIS():ReactNode {
		return <div>
				<Paths 
					data={[
						{start:{x:10,y:12},end:{x:100,y:120}},
						{start:{x:10,y:12},end:{x:100,y:120}},
						{start:{x:10,y:12},end:{x:100,y:120}},
						{start:{x:10,y:12},end:{x:100,y:120}},
						{start:{x:10,y:12},end:{x:100,y:120}},
						{start:{x:10,y:12},end:{x:100,y:120}}
					]}
				/>
			</div>
	}

	handleClick(event):void{
		gsap.to(event.target,2,{
			marginTop: event.target.style.marginTop === "100px" ? "0px" : "100px"
		});
	}
}