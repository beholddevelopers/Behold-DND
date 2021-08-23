import styles from './Stylesheet/style.module.scss';
import {Component, ReactNode, RefObject, createRef} from 'react';
import { 
	Scene, 
	PerspectiveCamera, 
	WebGLRenderer,
	BoxGeometry,
	Mesh,
	sRGBEncoding,
	IcosahedronGeometry,
	TetrahedronGeometry,
	DodecahedronGeometry,
	MeshStandardMaterial,
	PointLight,
	AmbientLight
} from 'three';
import { GLTFLoader } from '../../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap'
//import * as THREE from 'three';
interface props {
	id:string
}

interface state {

}

export default class DiceRoller extends Component<props,state>{	
	
	element:RefObject<HTMLCanvasElement>
	scene:Scene
	cube:Mesh
	camera:PerspectiveCamera
	renderer:any
	loader:GLTFLoader
	dice:any
	light:PointLight
	ambientLight:AmbientLight

	constructor(props:props){
		super(props);
		this.state = {

		};
		this.element = createRef();
		
	}

	componentDidMount():void {
		this.loader = new GLTFLoader();
		this.setScene();
		this.createLights();
		//this.positionCamera(500,500,500)
		//this.createCSSContent();
		this.createShape();
		//this.createD20();
		this.update();
		window.addEventListener("resize",this.resize.bind(this))
	}
	
	render():ReactNode {
		return <canvas id={this.props.id} ref={this.element} className={styles.diceRoller}/>
	}

	setScene():void{
		this.scene = new Scene();
		this.camera = new PerspectiveCamera( 75, (window.innerWidth)/(window.innerHeight), 0.1, 2000 );

		this.renderer = new WebGLRenderer({
			canvas: this.element.current,
			alpha:true
		});
		this.renderer.outputEncoding = sRGBEncoding;
		this.renderer.setSize( window.innerWidth, window.innerHeight);
		this.renderer.setClearColor( 0x000000, 0);
		//this.element.current.appendChild( this.renderer.domElement );
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

	resize(){
		this.renderer.setSize(window.innerWidth, window.innerHeight);
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

	createLights(){
		this.light = new PointLight(0x999999);
		this.light.position.z = 2;
		this.light.position.x = 1;
		this.light.position.y = 1;
		this.ambientLight = new AmbientLight(0x111111)
		this.scene.add(this.light,this.ambientLight)
	}

	createShape(){
		var geometry = this.generateRandomShape();
		var material = new MeshStandardMaterial( { color: ~~(Math.random() * 0xffffff), wireframe:false } );
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

	generateRandomShape(){
		switch(~~(Math.random() * 4)){
			case 0: return new IcosahedronGeometry(1,0);
			case 1: return new BoxGeometry(1,1,1);
			case 2: return new TetrahedronGeometry(1,0);
			case 3: return new DodecahedronGeometry();
		}
	}

	positionCamera(x:number,y:number,z:number){
		x && (this.camera.position.x = x);
		y && (this.camera.position.y = y);
		z && (this.camera.position.z = z);
		this.camera.lookAt(this.scene.position);
	}

	//	testContent(){
	//		return  `
	//		<div style="width:370px;height:370px;opacity:0.5;background-color:blue;">
	//			<h1>This is an H1 Element.</h1>
	//			<span class="large">Hello Three.js cookbook</span>
	//			<textarea> And this is a textarea</textarea>
	//	  	</div>`;
	//	}

	//cssElement:any
	//createCSSContent(){
	//	this.cssElement = this.createCSS3DObject(this.testContent());
	//	this.cssElement.position.set(100, 100, 100);
	//	this.scene.add(this.cssElement);
	//}

	//createCSS3DObject(content) 
    //{
    //  // convert the string to dome elements
    //  var wrapper = document.createElement('div');
    //  wrapper.innerHTML = content;
    //  var div = wrapper.firstChild;

    //  // set some values on the div to style it.
    //  // normally you do this directly in HTML and 
    //  // CSS files.
	//  console.log(div, wrapper);
    //  //div.style.width = '370px';
    //  //div.style.height = '370px';
    //  //div.style.opacity = 0.7;
    //  //div.style.background = new Color(Math.random() * 0xffffff).getStyle();

    //  // create a CSS3Dobject and return it.
    //  var object = new CSS3DObject(wrapper);
    //  return object;
    //}


	static roll(faces:number):number{
		return Math.ceil(Math.random() * faces);
	}

	
}