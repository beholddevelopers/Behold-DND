import React, {Component, ReactNode} from 'react';
import {resolveImagePath} from '../Utilities';
import './Stylesheet/style.scss';
interface props {
	value:number,
	max?:number,
	defaultValue?:number
}

export default class HPContainer extends Component<props>{
	render():ReactNode{
		return <div className="heart-container text-center"/>
	}
}