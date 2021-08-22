import React, {Component, ReactNode} from 'react';
import styles from './Stylesheet/style.module.scss';
import { 
	Scene, 
	PerspectiveCamera, 
	WebGLRenderer,
	BoxGeometry,
	MeshBasicMaterial,
	Mesh,
	sRGBEncoding
} from 'three';
import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap'
//import * as THREE from 'three';
interface props {

}

interface state {

}

export default class DiceRoller extends Component<props,state>{	
	element:any
	scene:Scene
	cube:Mesh
	camera:PerspectiveCamera
	renderer:WebGLRenderer
	loader:GLTFLoader
	dice:any

	constructor(props:props){
		super(props);
		this.state = {

		};
		this.element = React.createRef();
		
	}

	componentDidMount():void {
		this.loader = new GLTFLoader();
		this.setScene();
		this.createCube();
		this.createD20();
		this.update();
		window.addEventListener("resize",this.resize.bind(this))
	}


	resize(){
		this.renderer.setSize(window.innerWidth/2, window.innerHeight/2);
	}

	createD20(){
		this.loadModel('/Models/D20/scene.gltf').then(gtlf => {
			this.dice = gtlf;
			this.scene.add(this.dice.scene)
			console.log(this.dice,this.scene)
			this.camera.position.z = 5;
		}).catch(console.warn);

	}

	loadModel(url):Promise<any>{
		return new Promise((res,rej)=>{
			this.loader.load( url, ( gltf )=>{
				res(gltf);
			}, 	function ( xhr ) {

				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		
			}, ( error ) => {
				console.error(error);
				rej(error);
			} );
		})
	}

	createCube(){
		var geometry = new BoxGeometry( 1, 1, 1 );
		var material = new MeshBasicMaterial( { color: ~~(Math.random() * 0xffffff) } );
		this.cube = new Mesh( geometry, material );
		this.scene.add(this.cube);
		
		this.camera.position.z = 5;
		setInterval(()=>{
			gsap.to(this.cube.position,1,{
				x:(Math.random()-0.5)*5,
				y:(Math.random()-0.5)*5,
				z:(Math.random()-0.5)*5
			})
			
			gsap.to(this.cube.rotation,1,{
				x:(Math.random()-0.5)*5,
				y:(Math.random()-0.5)*5,
				z:(Math.random()-0.5)*5
			})
		},2000)
	}

	update():void {
		requestAnimationFrame(this.update.bind(this));

		if(this.dice){
			this.dice.scene.children.forEach(child=>{
				child.rotation.x += 0.01;
				child.rotation.y += 0.01;
			})
			//this.camera.position.z = 3 + Math.sin(Date.now()/ 1000);
			//this.camera.position.x = Math.sin(Date.now()/ 10000)*2;
			//this.camera.position.y = Math.sin(Date.now()/ 1000)*2;
			//this.cube.rotation.y += 0.01;

			//this.cube.rotation.z = Math.sin(Date.now()/1000)/2;

		}/**/
		this.renderer.render( this.scene, this.camera );
	}

	setScene():void{
		this.scene = new Scene();
		this.camera = new PerspectiveCamera( 75, (window.innerWidth/2)/(window.innerHeight/2), 0.1, 1000 );

		this.renderer = new WebGLRenderer();
		this.renderer.outputEncoding = sRGBEncoding;
		this.renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
		this.element.current.appendChild( this.renderer.domElement );
	}

	render():ReactNode {
		return <div ref={this.element}></div>
	}

	static roll(faces:number):number{
		return Math.ceil(Math.random() * faces);
	}

	
}