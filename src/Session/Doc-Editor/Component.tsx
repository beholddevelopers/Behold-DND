import React, {Component, ReactNode} from 'react';
import {resolveImagePath} from '../../Utilities';
import './Stylesheet/style.scss';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

interface props{

}

interface state{
	editorState:any
}

export default class WYSIWYG extends Component<props,state>{
	constructor(props) {
		super(props);
		this.state = {editorState: EditorState.createEmpty()};
	  }
	render():ReactNode{
		return <Editor 
			editorState={this.state.editorState} 
			onChange={this.handleChange.bind(this)} 
		/>
	}

	handleChange(editorState){
		this.setState({editorState});
	}
}