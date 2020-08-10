import React, { useState } from 'react';
import { Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const styles = {
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'right'
    }
}

const PaginationControl = (props) => {
    const [activePage, setActivePage] = useState(1);

    let {
        totalItems,
        currentPage,
        pageSize = 10,
        maxPages = 15,
        onPageChanged
    } = props

    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage, endPage;
    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    // return {
    //     totalItems: totalItems,
    //     currentPage: currentPage,
    //     pageSize: pageSize,
    //     totalPages: totalPages,
    //     startPage: startPage,
    //     endPage: endPage,
    //     startIndex: startIndex,
    //     endIndex: endIndex,
    //     pages: pages
    // };

    const onPageChangeHandler = (e) => {
        setActivePage(e);
        onPageChanged(e);
    };

    const nextClickHandler = () => {
        setActivePage(activePage + 1);
        onPageChanged(activePage + 1);
    };
    const prevClickHandler = () => {
        setActivePage(activePage - 1);
        onPageChanged(activePage - 1);
    };

    const firstClickHandler = () => {
        setActivePage(startPage);
        onPageChanged(startPage);
    };
    const lastClickHandler = () => {
        setActivePage(endPage);
        onPageChanged(endPage);
    };

    return (
        <Row style={{ ...styles.container }}>
            <Col>
                <Pagination aria-label="Page navigation example">
                    <PaginationItem disabled={activePage === 1 ? true : false}>
                        <PaginationLink first
                            onClick={firstClickHandler}
                        />
                    </PaginationItem>
                    <PaginationItem disabled={activePage === 1 ? true : false}>
                        <PaginationLink previous
                            onClick={prevClickHandler}
                        />
                    </PaginationItem>
                    {pages.map((item, index) => {
                        return <PaginationItem key={index} active={activePage === index + 1 ? true : false}>
                            <PaginationLink onClick={() => onPageChangeHandler(item)}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    })}

                    <PaginationItem disabled={activePage === endPage ? true : false}>
                        <PaginationLink next
                            onClick={nextClickHandler}
                        />
                    </PaginationItem>
                    <PaginationItem disabled={activePage === endPage ? true : false}>
                        <PaginationLink last
                            onClick={lastClickHandler}
                        />
                    </PaginationItem>
                </Pagination>
            </Col>
        </Row >
    )
}

export default PaginationControl;


