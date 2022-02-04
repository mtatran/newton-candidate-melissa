import React, { useEffect, useState } from 'react';
import usePrevious from '../../../../../global/hooks/helpers/usePrevious';
import { useTranslation } from 'react-i18next';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Timings } from '../../../../../global/utils/timings';
import { getLogout } from '../../../../actions/fetch/auth';
import { toggleMenu } from '../../../../actions/state/state';
import { PRIVATE_SETTINGS, PUBLIC_LOGIN } from '../../../../actions/state/routes';
import TaxReport from './tax-report/TaxReport';
import Tooltip from '../../../shared/Tooltip';
import PrivatePage from '../../../shared/PrivatePage';
import { toggleMenuReport, toggleReport, toggleServerError } from '../../../../actions/state/forms';
import { chevron, exitIcon, svgIcon, svgIconMenu } from '../../../../../global/assets/vectors/icons';
import {
	_info,
	_icon,
	_icon_nav,
	_icon_nav_menu,
	_list,
	_list_container,
	_list_item,
	_settings,
	_settings_close,
	_settings_menu,
	_settings_container,
	_section,
	_section_value,
	_section_inline,
	_section_label
} from './Settings.styled';

const Settings = ({ open, drawer, tabGroup, closing, click, close, singleMenu }) => {
	const prevOpen = usePrevious(open);
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const email = useSelector(({ user }) => user.email);
	const fullName = useSelector(({ user }) => user.fullName);
	const firstName = useSelector(({ user }) => user.firstName);
	const activeToggleTFA = useSelector(({ activeForm }) => activeForm.activeToggleTFA);

	const [copy, setCopy] = useState(false);
	const [hover, setHover] = useState(false);
	const [active, setActive] = useState(open);
	const name = fullName ?? firstName.charAt(0).toUpperCase() + firstName.slice(1);

	useEffect(() => {
		return () =>
			batch(() => {
				dispatch(toggleReport(false));
				dispatch(toggleMenuReport(false));
			});
	}, []);

	useEffect(() => {
		if (copy) {
			setTimeout(() => {
				setCopy(false);
			}, Timings.copy);
		}
	}, [copy]);

	useEffect(() => {
		if ((open && !prevOpen) || (!open && prevOpen)) {
			setActive(true);
		}
	}, [open, prevOpen]);

	const handleLogout = () => {
		history.push(PUBLIC_LOGIN);
	};

	const closeMenu = callback => {
		if (window.zE) {
			window.zE('webWidget', 'hide');
			window.zE('webWidget', 'close');
		}
		dispatch(toggleMenu(false));
		close(callback);
	};

	return (
		<_settings>
			<_settings_menu $singleMenu={singleMenu}>
				{open || closing ? (
					<_settings_container $hidden={activeToggleTFA} $tabGroup={tabGroup} $closing={closing}>
						{active && <PrivatePage title={t('settings')} virtualUrl={PRIVATE_SETTINGS} closing={closing} />}
						<_list id="scrollable">
							<_settings_close>
								<span onClick={() => closeMenu()}>{svgIcon('icon-close')}</span>
							</_settings_close>
							<_list_container $unverified={!name}>
								{name ? (
									<>
										<_info>
											<_section>
												<_section_label>{t('nameLabel')}</_section_label>
												<_section_value>{name}</_section_value>
											</_section>
											<_section>
												<_section_label>{t('emailLabel')}</_section_label>
												<_section_value>{email}</_section_value>
											</_section>
											<_section
												onClick={() => {
													setActive(false);
													dispatch(toggleReport(true));
												}}>
												<_section_inline>
													<span>{t('reportHeader')}</span>
													{chevron()}
												</_section_inline>
											</_section>
											<_section
												$bottomless
												onClick={() =>
													closeMenu(() =>
														dispatch(
															getLogout(
																() => {
																	handleLogout();
																},
																(_data, status) => {
																	if (parseFloat(status) >= 400 && parseFloat(status) < 500) {
																		handleLogout();
																	} else if (parseFloat(status) >= 500 && parseFloat(status) < 600) {
																		dispatch(toggleServerError(true));
																	}
																}
															)
														)
													)
												}>
												<_section_inline $logout>
													<span>{t('logout')}</span>
													{exitIcon()}
												</_section_inline>
											</_section>
										</_info>
									</>
								) : null}
							</_list_container>
							{!name ? (
								<_list_item
									$tabGroup={tabGroup}
									$closing={closing}
									onClick={() =>
										closeMenu(() =>
											dispatch(
												getLogout(
													() => {
														handleLogout();
													},
													(data, status) => {
														if (parseFloat(status) >= 400 && parseFloat(status) < 500) {
															handleLogout();
														} else if (parseFloat(status) >= 500 && parseFloat(status) < 600) {
															dispatch(toggleServerError(true));
														}
													}
												)
											)
										)
									}>
									{t('logout')}
									<span>{exitIcon()}</span>
								</_list_item>
							) : null}
						</_list>
						{name && <TaxReport onClose={() => setActive(true)} />}
					</_settings_container>
				) : null}
			</_settings_menu>
			<_icon $singleMenu={singleMenu} $active={open}>
				<_icon_nav $active={open}>
					<_icon_nav_menu
						$active={open}
						$singleMenu={singleMenu}
						$drawer={drawer}
						$closing={closing}
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
						onClick={e => (open ? closeMenu() : click(e))}>
						<Tooltip title={t('settings')} hover={hover && !drawer && !singleMenu} />
						<_icon>{svgIconMenu()}</_icon>
					</_icon_nav_menu>
				</_icon_nav>
			</_icon>
		</_settings>
	);
};

export default Settings;
