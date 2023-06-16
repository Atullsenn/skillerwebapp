import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import '../Pagination.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className={classnames('pagination-container', { [className]: className })}
        >
            <button className='btn btn-primary btn-lg btn-block make-an-offer-btn px-3' disabled={currentPage === 1} onClick={onPrevious} >
                <ArrowBackIcon />
            </button>
            {paginationRange.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return <button className="pagination-item dots">&#8230;</button>;
                }

                return (
                    <button
                        className={classnames('pagination-item', {
                            selected: pageNumber === currentPage
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button className='btn btn-primary btn-lg btn-block make-an-offer-btn px-3' disabled={currentPage === lastPage} onClick={onNext} >
                <ArrowForwardIcon />
            </button>
        </ul>
    );
};

export default Pagination;
