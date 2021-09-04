import React, {Component, ReactNode} from 'react';
//import {resolveImagePath} from '../../Utilities';
import styles from './Stylesheet/style.module.scss';
interface props {
	value:string,
	stateName:string,
	onChange(event: React.ChangeEvent<HTMLInputElement>, stateName: string):VoidFunction,
	max?:number,
	defaultValue?:number
}

export default class HPContainer extends Component<props>{
	illegalCharacters:RegExp = /\D/;

	render():ReactNode {
		return <div className={styles.heartWrapper}>
			<input className={styles.heartText} value={this.props.value} onChange={this.handleChange.bind(this)}/>
			<div className={styles.heartContainer}/>
		</div>
	}

	handleChange(event: React.ChangeEvent<HTMLInputElement>):void {
		if(this.illegalCharacters.test(event.target.value)){
			event.preventDefault();
			return;
		}
		this.props.onChange(event,this.props.stateName);
	}
}