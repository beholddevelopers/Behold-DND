import React, { ReactNode } from "react";
import styles from '../Stylesheet/style.module.scss';

interface Props {
	text: string
	route: string
	onClick: (event: React.MouseEvent<HTMLButtonElement>, route: string) => void
}

class NavButton extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render():ReactNode {
		return (
			<div className={styles.btnWrapper}>
				<div className={styles.btnContainer}></div>
				<div className={styles.btnText}>{this.props.text}</div>
			</div>
		);
	}
}

export default NavButton;