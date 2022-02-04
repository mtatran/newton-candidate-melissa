import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { duplicate } from '../../../../../../global/utils/logic';
import { withRouter } from 'react-router-dom';
import { postCheckToken, postRequest2FA } from '../../../../../actions/fetch/auth';
import { PRIVATE_DASHBOARD } from '../../../../../actions/state/routes';
import { toggleServerError } from '../../../../../actions/state/forms';
import { LoadSwitch } from '../../../../../../design/animations/lottie/loading/load';
import isValid from '../../../../../../global/utils/validation';
import i18n from '../../../../../i18n';
import { parseError } from '../../../../../../global/utils/helpers';
import { each } from 'lodash';
import { Timings } from '../../../../../../global/utils/timings';
import { SMS } from '../../../../../../global/utils/values';

const refs = [];
let interval;

class FormTwoFactor extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			1: { value: '', focus: false, touched: false, errorMessage: '' },
			2: { value: '', focus: false, touched: false, errorMessage: '' },
			3: { value: '', focus: false, touched: false, errorMessage: '' },
			4: { value: '', focus: false, touched: false, errorMessage: '' },
			5: { value: '', focus: false, touched: false, errorMessage: '' },
			6: { value: '', focus: false, touched: false, errorMessage: '' },
			7: { value: '', focus: false, touched: false, errorMessage: '' },
			enterSubmit: false,
			fetching: false,
			serverMessage: '',
			resent: false,
			count: 0
		};
	}

	componentDidMount() {
		if (this.props.method === SMS) {
			refs[7].current.focus();
		} else {
			interval = setInterval(() => {
				this.props.postCheckToken('0000000', () => {
					this.props.history.replace(PRIVATE_DASHBOARD);
				});
			}, Timings.check2faInterval);
		}
	}

	componentWillUnmount() {
		clearInterval(interval);
	}

	handlePaste(value) {
		let valueChars = value.split('');

		if (valueChars.length <= 7) {
			let indexInput = 6;
			let replaceArray = [
				{ value: '' },
				{ value: '' },
				{ value: '' },
				{ value: '' },
				{ value: '' },
				{ value: '' },
				{ value: '' }
			];
			valueChars.forEach(char => {
				replaceArray[indexInput].value = char;
				indexInput--;
			});

			replaceArray.forEach((el, i) => {
				const errorMessage = this.validation('input', el.value);

				this.setState({
					[i + 1]: { ...this.state[i + 1], value: el.value, errorMessage }
				});
			});
		}
	}

	validation(field, value) {
		const fullNumber = i18n.t('fullNumber');
		const noLetters = i18n.t('noLetters');
		const fillFull = i18n.t('fillFull');

		let errorMessage = '';
		switch (field) {
			case 'input': {
				errorMessage = isValid(value)
					.number(noLetters)
					.min(1, fillFull)
					.required(fullNumber)
					.print();
				break;
			}
			default:
				break;
		}

		return errorMessage;
	}

	handleFocus(field) {
		this.setState({ [field]: { ...this.state[field], focus: true } });
	}

	handleBlur(field) {
		const errorMessage = this.validation('input', this.state[field].value);
		this.setState({
			[field]: {
				...this.state[field],
				focus: false,
				touched: this.state[field].value !== '' ? true : false,
				errorMessage: this.state[field].value !== '' ? errorMessage : ''
			}
		});
	}

	handleKeyDown(field, e, canSubmit, value) {
		if (e.key === 'Enter' && canSubmit) {
			this.setState({ enterSubmit: true });
		} else if (e.key === 'Backspace') {
			if (field < 7 && field >= 1 && value.length === 0) {
				refs[field + 1].current.focus();
			}
		} else if (e.key === 'Delete') {
			if (field > 1 && field <= 7 && value.length === 0) {
				refs[field - 1].current.focus();
			}
		} else if (e.key === 'ArrowRight') {
			if (value.length === 0) {
				if (field > 1 && field <= 7) {
					refs[field - 1].current.focus();
				}
			} else {
				if (field > 1 && field <= 7 && refs[field].current.selectionStart === value.length) {
					refs[field - 1].current.focus();
				}
			}
		} else if (e.key === 'ArrowLeft') {
			if (value.length === 0) {
				if (field < 7 && field >= 1) {
					refs[field + 1].current.focus();
				}
			} else {
				if (field < 7 && field >= 1 && refs[field].current.selectionStart === 0) {
					refs[field + 1].current.focus();
				}
			}
		}
	}

	handleKeyUp(e, canSubmit) {
		if (e.key === 'Enter' && canSubmit) {
			e.target.blur();
			this.handleSubmit(e);
		}
	}

	handleChange(field, value) {
		if (isNaN(value)) {
			value = this.state[field].value;
		}
		const errorMessage = this.validation('input', value);
		this.setState(
			{
				[field]: {
					...this.state[field],
					value,
					errorMessage
				},
				serverMessage: ''
			},
			() => {
				if (field > 1 && field <= 7 && this.state[field].value.length === 1) refs[field - 1].current.focus();
			}
		);
	}

	handleSubmit(canSubmit) {
		let accessCode = '';
		duplicate(7)(num => {
			accessCode += this.state[num].value;
		});

		if (canSubmit) {
			this.setState({ fetching: true }, () => {
				this.props.postCheckToken(
					accessCode,
					() => {
						this.props.history.replace(PRIVATE_DASHBOARD);
					},
					(data, status) => {
						if (parseFloat(status) >= 500 && parseFloat(status) < 600) {
							this.props.toggleServerError(true);
						} else {
							let serverMessage = parseError(data, status);

							if (!serverMessage) serverMessage = i18n.t('error.sms');

							this.setState({
								enterSubmit: false,
								fetching: false,
								serverMessage
							});
						}
					}
				);
			});
		}
	}

	header(field) {
		switch (field) {
			case 'server': {
				return this.state.serverMessage ? (
					<p className="error side small" style={{ marginBottom: 16 }}>
						{this.state.serverMessage}
					</p>
				) : null;
			}
			default: {
				let message = this.getMessage();

				return message ? <span style={{ color: '#df5454' }}>{message}</span> : null;
			}
		}
	}

	getMessage() {
		let fields = ['', '', '', '', '', '', ''].map((el, i) => {
			return this.state[i + 1];
		});

		const length = fields.length - 1;
		const value = fields[length] ? fields[length].value : '';

		let anyFocus =
			fields.filter(el => {
				return el.focus;
			}).length !== 0;

		if (anyFocus) {
			fields = fields.filter(el => {
				return el.focus;
			});
		} else {
			fields = fields.filter(el => {
				return el.errorMessage !== '';
			});
		}

		let error = false;
		each(fields, field => {
			if (field.errorMessage) error = field.errorMessage;
		});

		return value && error ? error : null;
	}

	hasError() {
		return this.getMessage();
	}

	canSubmit() {
		const isNotFetching = !this.state.fetching;

		const isNotError = !refs
			.map((el, i) => {
				return this.state[i].errorMessage;
			})
			.some(el => el !== '');

		const isValue = !refs
			.map((el, i) => {
				return this.state[i].value;
			})
			.some(el => el === '');

		return isNotFetching && isNotError && isValue;
	}

	inputs(canSubmit) {
		let list = [];
		duplicate(7)(num => {
			refs[num] = React.createRef();
			list.push(
				<div
					key={num + ':phone-code-input'}
					className={`form-numbers-input mini ${this.state[num].focus || this.state[num].value ? 'focus' : ''} ${
						this.hasError() ? 'error' : ''
					}`}>
					<input
						aria-label="Number"
						autoComplete="off"
						autoCorrect="off"
						autoCapitalize="off"
						spellCheck="off"
						data-lpignore="true"
						name="number"
						maxLength="1"
						placeholder=""
						type="tel"
						value={this.state[num].value}
						onFocus={() => {
							this.handleFocus(num);
						}}
						onBlur={() => {
							this.handleBlur(num);
						}}
						onKeyDown={e => {
							this.handleKeyDown(num, e, canSubmit, e.target.value);
						}}
						onKeyUp={e => {
							this.handleKeyUp(e, canSubmit);
						}}
						onChange={e => {
							this.handleChange(num, e.target.value);
						}}
						onPaste={e => {
							this.handlePaste(e.clipboardData.getData('text'));
						}}
						ref={refs[num]}
					/>
				</div>
			);
		});
		return list;
	}

	render() {
		const enterAccessCode = i18n.t('enterAccessCode');
		const enterAuthCode = i18n.t('enterAuthCode');
		const visitAuthy = i18n.t('visitAuthy');
		const verify = i18n.t('verify');
		const resendCode = i18n.t('resend');
		const expire = i18n.t('2faExpire');
		const sent = i18n.t('sent');

		const canSubmit = this.canSubmit();

		return (
			<form
				className="twofaForm form"
				onSubmit={e => {
					e.preventDefault();
				}}>
				<div className="form-titles sides">
					<h4>{this.props.method === SMS ? enterAccessCode : enterAuthCode}</h4>
					<h5>{this.props.method === SMS ? expire : visitAuthy}</h5>
					{this.header() ? <h6>{this.header()}</h6> : null}
				</div>
				{this.props.method === SMS ? (
					<div className="form-section">
						<div className={`form-numbers`}>
							<div className="form-numbersContainer">{this.inputs(canSubmit)}</div>
						</div>
					</div>
				) : null}
				<div className="form-error-wrapper tfa">
					{this.header('server')}
					<div className="form-section-actions twofaForm-actions change">
						<button
							className={`form-section-actions-secondary secondary ${this.props.method !== SMS ? 'single' : ''} ${
								this.state.resent ? 'noClick' : ''
							}`}
							type="button"
							onClick={() => {
								this.props.postRequest2FA(
									() => {
										this.setState(
											{
												resent: true
											},
											() => {
												if (this.props.method === SMS) {
													this.setState({ count: this.state.count + 1 }, () => {
														if (this.state.count === 2) {
															this.setState({ serverMessage: `1 ${i18n.t('error.last.attempt')}` });
														} else if (this.state.count === 3) {
															this.setState({ serverMessage: `0 ${i18n.t('error.last.attempts')}` });
														}
														setTimeout(() => {
															this.setState({
																resent: false
															});
														}, Timings.feedback);
													});
												} else {
													setTimeout(() => {
														this.setState({
															resent: false
														});
													}, Timings.feedback);
												}
											}
										);
									},
									(data, status) => {
										if (this.props.method === SMS) {
											this.setState({
												serverMessage: i18n.t('error.throttle')
											});
										} else {
											let serverMessage = parseError(data, status);
											this.setState({
												serverMessage
											});
										}
									}
								);
							}}>
							{this.state.resent ? sent : resendCode}
						</button>

						{this.props.method === SMS ? (
							<button
								type="button"
								title={this.getMessage()}
								disabled={!canSubmit}
								className={`form-section-actions-primary primary ${!canSubmit ? ' disabled' : ''}${
									this.state.enterSubmit ? ' enter' : ''
								}${this.state.fetching ? ' active' : ''}`}
								onClick={() => {
									this.handleSubmit(canSubmit);
								}}>
								{this.state.fetching ? LoadSwitch() : verify}
							</button>
						) : null}
					</div>
				</div>
			</form>
		);
	}
}

const mapStateToProps = ({ user }) => {
	return {
		method: user.twoFAMethod
	};
};

export default withRouter(
	connect(mapStateToProps, { postRequest2FA, postCheckToken, toggleServerError })(FormTwoFactor)
);
