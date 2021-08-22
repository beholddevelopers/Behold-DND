import React, {Component, ReactNode} from 'react';
//import {resolveImagePath} from '../../Utilities';
import styles from './Stylesheet/style.module.scss';
interface props {
	value:number,
	max?:number,
	defaultValue?:number
}

export default class HPContainer extends Component<props>{
	render():ReactNode{
		return <div className={styles.heartWrapper}>
			<input className={styles.heartText} value={this.props.value || 0} />
			<div className={styles.heartContainer}/>
		</div>
	}
}