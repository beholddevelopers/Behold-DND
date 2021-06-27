import React, {Component, ReactNode} from 'react';
import gsap from 'gsap';
import {resolveImagePath} from '../../Utilities';
//import './Stylesheet/style.scss';

interface props{
	data:Array<itemProps>
}
export default class Paths extends Component<props>{
	render():ReactNode{
		return <svg width={"100vw"/*`${width}px`*/} height={"100vh"/*`${height}px`*/}>
			{this.renderPaths()}
		</svg>
	}

	renderPaths():Array<ReactNode>{
		return this.props.data.map((data)=>{
			return <PathItem 
				start={data.start} 
				end={data.end} 
				color={this.randomColor()}
				width={12}
			/>
		})
	}
	
	randomColor():string{
		return "#"+Math.floor(Math.random() * 16777215).toString(16);
	}

}

interface itemProps {
	start: {x:number,y:number}
	end:{x:number,y:number}
	color?:string
	width?:number
}
class PathItem extends Component<itemProps>{
	myRef:any

	constructor(props){
		super(props);
		this.myRef = React.createRef();
	}

	componentDidMount(){
		setInterval(()=>{
			console.log("interval",this.myRef.current)
			gsap.to(this.myRef.current,5,{
				attr:{d:this.getPathCoordinates(
					{x:Math.floor(Math.random() * innerWidth) - 16,y:Math.floor(Math.random() * innerHeight) - 16},
					{x:Math.floor(Math.random() * innerWidth) - 16,y:Math.floor(Math.random() * innerHeight) - 16}
				)}
			})
		},5000)
	}

	render():ReactNode{
		let width = Math.max(this.props.start.x,this.props.end.x) + 16;
		let height = Math.max(this.props.start.y,this.props.end.y) + 16;
		return <path d={this.getPathCoordinates(this.props.start,this.props.end)} 
			ref={this.myRef}
			stroke={this.props.color||"black"} 
			fill="transparent"
			strokeWidth={this.props.width || "1px"}
			/>
	}

	getPathCoordinates(start,end):string{
		let c1 = this.calculateC1(start,end)
		let c2 = this.calculateC2(start,end)
		return `M ${Math.round(start.x)} ${Math.round(start.y)} 
			C ${Math.round(c1.x)} ${Math.round(c1.y)}, 
			${Math.round(c2.x)} ${Math.round(c2.y)}, 
			${Math.round(end.x)} ${Math.round(end.y)}`
	}

	calculateMidPoint(start,end):{x:number,y:number}{
		return {
			x: (start.x + end.x) / 2,
			y: (start.y + end.y) / 2
		}
	}

	calculateC1(start,end):{x:number,y:number}{
		const mid = this.calculateMidPoint(start,end);
		return {
			x: end.x + mid.x / 2 * (start.x > end.x ? 1: 1),
			y:start.y
		}
	}

	calculateC2(start,end):{x:number,y:number}{
		const mid = this.calculateMidPoint(start,end);
		return {
			x: start.x - mid.x / 2 * (start.x > end.x ? 1: 1),
			y:end.y,
		}
	}
}