import React, { Component, ReactNode } from 'react';
import Paths from '../components/Session/Path/Component';
import Editor from '../components/Session/Doc-Editor/Component'
import HPContainer from '../components/Initiative-Tracker/Hitpoints-Containers/Component';
import DiceRoller from '../components/Dice-Roller/Dice-Roller-Lg/Component';
interface props {

}

interface state {
  testValue1 : string,
  testValue2 : string
}
export default class Home extends Component<props,state>{

  constructor(props){
    super(props);
    this.state = {
      testValue1 : "",
      testValue2 : ""
    }
  }
  //console.log(styles)
  render():ReactNode{

    return <div>
    <DiceRoller/>
    <Paths data={[{start:{x:0,y:0},end:{x:100,y:100}}]}></Paths>
    <Paths data={[{start:{x:100,y:100},end:{x:200,y:200}}]}></Paths>
    <Editor/>
    <HPContainer value={this.state.testValue1} stateName="testValue1" onChange={this.handleChange.bind(this)}/>
    <HPContainer value={this.state.testValue2} stateName="testValue2" onChange={this.handleChange.bind(this)} />
  </div>
  }

  handleChange(event, containerName){
    let tempState = {};
    tempState[containerName] = event.target.value;
    this.setState(tempState);
  }
}
