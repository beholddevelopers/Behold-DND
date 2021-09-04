import React, {Component, ReactNode} from 'react';
import {resolveImagePath} from '../../Utilities';
import './Stylesheet/style.scss';


export default class CardBody extends Component{
	render():ReactNode{
		return <div className="card-body">
			{this.props.children}
		</div>
	}
}