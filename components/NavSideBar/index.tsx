import React, { ReactNode } from "react";
import { connect } from 'react-redux';
import styles from './Stylesheet/style.module.scss';
import NavButton from './NavButton';

interface Props {
	
}

class NavSideBar extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render():ReactNode {
		return (
			<div className={styles.navSideBar}>
				<NavButton text="Test 1" route="Test 1" onClick={this.handleClick.bind(this)} />
				<NavButton text="Test 2" route="Test 2" onClick={this.handleClick.bind(this)} />
				<NavButton text="Test 2" route="Test 2" onClick={this.handleClick.bind(this)} />
				<NavButton text="Test 2" route="Test 2" onClick={this.handleClick.bind(this)} />
				<NavButton text="Test 2" route="Test 2" onClick={this.handleClick.bind(this)} />
				<NavButton text="Test 2" route="Test 2" onClick={this.handleClick.bind(this)} />
			</div>
		);
	}

	handleClick(event: React.MouseEvent<HTMLButtonElement>, route: string) {

	}
}

export default connect()(NavSideBar);