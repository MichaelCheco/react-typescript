import * as React from 'react';

export interface IProps {
	name: string;
	enthusiasmLevel?: number;
}

interface State {
	currentEnthusiasm: number;
}

class Hello extends React.Component<IProps, State> {
	constructor(props: IProps) {
		super(props);
		this.state = { currentEnthusiasm: props.enthusiasmLevel || 1 };
	}
	onIncrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm + 1);
	onDecrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm - 1);
	render() {
		const { name } = this.props;

		return (
			<div>
				Hello {name + getExclamationMarks(this.state.currentEnthusiasm)}
				<button onClick={this.onDecrement}>-</button>
				<button onClick={this.onIncrement}>+</button>
			</div>
		);
	}
	updateEnthusiasm(currentEnthusiasm: number) {
		this.setState({ currentEnthusiasm });
	}
}
export default Hello;

function getExclamationMarks(numChars: number) {
	return Array(numChars + 1).join('!');
}
