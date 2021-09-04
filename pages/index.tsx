import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Paths from '../components/Session/Path/Component';
import Editor from '../components/Session/Doc-Editor/Component'
import HPContainer from '../components/Initiative-Tracker/Hitpoints-Containers/Component';
import DiceRoller from '../components/Dice-Roller/Dice-Roller-Lg/Component';
import { changeName } from '../redux/reducers/UserReducer';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { RootState } from '../redux/Store';
interface props {
	name: string,
	changeName: ActionCreatorWithPayload<any, string>
}
class Home extends React.Component<props>{

	constructor(props: props){
		super(props);
	}

	changeName() {
		this.props.changeName("Bob is your uncle");
	}
	//console.log(styles)
	render():ReactNode{
		return <div>
			<h1>{this.props.name} <button onClick={this.changeName.bind(this)}>test</button></h1>
			<DiceRoller id="rol1"/>
			<Paths data={[{start:{x:0,y:0},end:{x:100,y:100}}]}></Paths>
			<Paths data={[{start:{x:100,y:100},end:{x:200,y:200}}]}></Paths>
			<Editor/>
			<HPContainer value={""} stateName="testValue1" onChange={this.handleChange.bind(this)}/>
			<HPContainer value={""} stateName="testValue2" onChange={this.handleChange.bind(this)} />
		</div>
	}

	handleChange(event: React.ChangeEvent<HTMLInputElement>, containerName: string){
		let tempState = new Object();
		tempState[containerName] = event.target.value;
		this.setState(tempState);
	}
}

const mapStateToProps = (state: RootState) => ({
	name:state.user.name
});

const mapDispatchToProps = {changeName};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
