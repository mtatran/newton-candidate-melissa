import styled from 'styled-components';

export const _pulse = styled.span`
	${props => (props.center ? 'display: flex;' : '')};
	${props => (props.center ? 'align-items: center;' : '')};
	animation: ${props => (props.up ? 'pulse-up 1800ms ease-in' : props.down ? 'pulse-down 1800ms ease-in' : '')};
`;

export const _pulseDark = styled.span`
	animation: ${props =>
		props.up ? 'pulse-up-dark 1800ms ease-in' : props.down ? 'pulse-down-dark 1800ms ease-in' : ''};
`;

export const _pulseOrderbook = styled.span`
	${props => (props.center ? 'display: flex;' : '')};
	${props => (props.center ? 'align-items: center;' : '')};
	animation: ${props => (props.up ? 'pulse-up 1000ms ease-in' : props.down ? 'pulse-down 1000ms ease-in' : '')};

	> span {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		padding: 0 4px;
		width: 25px;
	}
`;
