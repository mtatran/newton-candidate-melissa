import React from 'react';
import {
	svgIconBackArrow,
	svgIconForwardArrow,
	svgSkipArrowBack,
	svgSkipArrowForward
} from '../../../../../../global/assets/vectors/icons';
import { isDesktop } from '../../../../../../global/utils/helpers';
import { _pagination, _arrow, _pages, _skip_arrow } from './Pagination.styled';

const Pagination = props => {
	const { count, offset, limit, setOffset } = props;

	const totalPages = count && Math.ceil(count / limit);
	const currentPage = offset / limit + 1;
	let startPage = currentPage - 2 > 0 ? currentPage - 2 : 1;
	let endPage = startPage + 4 < totalPages ? startPage + 4 : totalPages;

	while (endPage - 4 < startPage && endPage - 4 > 0) {
		// We are at the end, so rewind startPage until we have 5 pages or reach the beginning
		startPage--;
	}

	if (!isDesktop()) {
		startPage = currentPage;
		endPage = currentPage;
	}

	const numPages = endPage - startPage + 1;

	const pages =
		totalPages &&
		Array.from({ length: numPages }, (_, i) => i + startPage).map((pageNum, i) => {
			const isActive = pageNum === currentPage;

			return (
				<_pages
					key={`${i}: page-number`}
					$active={isActive}
					onClick={() => !isActive && setOffset((pageNum - 1) * limit)}>
					{pageNum}
				</_pages>
			);
		});

	return (
		<_pagination>
			<_skip_arrow $hide={!(startPage > 1 && currentPage > 2)} onClick={() => startPage > 1 && setOffset(0)}>
				{svgSkipArrowForward()}
			</_skip_arrow>
			<_arrow
				$hide={!(startPage > 1)}
				onClick={() => {
					if (isDesktop()) startPage > 1 && setOffset(0);
					else currentPage > 1 && setOffset((currentPage - 2) * limit);
				}}>
				{svgIconBackArrow()}
			</_arrow>
			{pages}
			<_arrow
				$hide={!(endPage < totalPages)}
				onClick={() => {
					if (isDesktop()) endPage < totalPages && setOffset((totalPages - 1) * limit);
					else currentPage >= 1 && setOffset(currentPage * limit);
				}}
				$last>
				{svgIconForwardArrow()}
			</_arrow>
			<_skip_arrow
				$hide={!(endPage < totalPages - 1)}
				onClick={() => endPage < totalPages && setOffset((totalPages - 1) * limit)}
				$last>
				{svgSkipArrowBack()}
			</_skip_arrow>
		</_pagination>
	);
};

export default Pagination;
