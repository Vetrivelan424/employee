/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import ReactPaginate from 'react-paginate';
function ReactTable(props) {
    const {
        tableData,
        tableColumn,
        needPaginate,
        needCustomSort,
        needCheckbox,
        handleTableSelect,
        conditionalRowStyles,
        id,
        csRowsPerPage,
        csPageCount,
        needRowPerPage,
        onsort,
        classsName
    } = props;

    const [isPaginate, setIsPaginate] = useState(false);
    const [isCustomSort, setIsCustomSort] = useState(false);
    const [isSelectable, SetIsSelectable] = useState(false);
    const [currentPageHigh, setCurrentPageHigh] = useState();
    const [resetPaginate, setResetPaginate] = useState(false);
    const [resetSelector, setResetSelector] = useState('');
    const [tableId, setTableId] = useState('')
    const [showPaginate, setShowPaginate] = useState(true);

    useEffect(() => {
        checkProps();
    }, [])



    const checkProps = () => {
        if (needPaginate !== undefined && needPaginate === true) {
            setIsPaginate(true)
        }
        if (needCustomSort !== undefined && needCustomSort === true) {
            setIsCustomSort(true)
        }
        if (needCheckbox !== undefined && needCheckbox === true) {
            SetIsSelectable(true)
        }
        if (id !== undefined) {
            setTableId(id)
        }
    }




    const customSort = (rows, selector, direction) => {
        var floatRegex = /^-?\d+(?:[.,]\d*?)?$/; // to get floating values
        if (direction === 'desc' || resetSelector !== selector(rows[0])) {
            setResetPaginate(false);
            setResetSelector(selector(rows[0]))
        } else {
            setResetPaginate(true)
            setResetSelector(selector(rows[0]))
        }
        return rows.sort((rowA, rowB) => {
            // use the selector function to resolve your field names by passing the sort comparitors
            if (typeof selector(rowA) === "string" && !floatRegex.test(selector(rowA))) {
                let aField;
                let bField;
                try {
                    aField = selector(rowA).toLowerCase()
                    bField = selector(rowB).toLowerCase()
                } catch (err) {
                    aField = selector(rowA)
                    bField = selector(rowB)
                }
                let comparison = 0;
                if (aField > bField) {
                    comparison = 1;
                } else if (aField < bField) {
                    comparison = -1;
                }
                return direction === 'desc' ? comparison * -1 : comparison;
            } else {
                const aField = selector(rowA)
                const bField = selector(rowB)

                return direction === 'desc' ? (aField - bField) * -1 : aField - bField;
            }
        });
    };




    function getNumberOfPages(rowCount, rowsPerPage) {
        return Math.ceil(rowCount / rowsPerPage);
    }




    function toPages(pages) {
        const results = [];
        for (let i = 1; i <= pages; i++) {
            results.push(i);
        }
        return results;
    }



    const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
        <div className="form-check">
            <input
                htmlFor="booty-check"
                type="checkbox"
                className="table-check-input form-check-input"
                ref={ref}
                onClick={onClick}
                {...rest}
            />
            <label className="form-check-label" id="booty-check" />
        </div>
    ));



    useEffect(() => {
       if(tableData){
        if (Object?.keys(tableData)?.length < 11) {
            setShowPaginate(prev => false);
        } else {
            setShowPaginate(prev => true);
        }
      }
    }, [tableData])

    const customReactPaging = React.useCallback(props => {
        var {
            rowsPerPage,
            rowCount,
            onChangePage,
            onChangeRowsPerPage, // available but not used here
            currentPage,
            paginationTotalRows,

        } = props;
        const pages = parseInt(getNumberOfPages(rowCount, csRowsPerPage));
        const pageItems = toPages(pages);
        const updatedPage = getNumberOfPages(rowCount, csRowsPerPage);
        const nextDisabled = currentPage === pageItems.length;

        const triggerFirst = () => {
            if (tableId != null && tableId != '') {
                let pagination = document.querySelector(`#${tableId} .topic-element-paginate`).childNodes;
                pagination[1].childNodes[0].click();
            } else {
                let pagination = document.querySelector('.topic-element-paginate').childNodes;
                pagination[1].childNodes[0].click();
            }

        }
        const triggerLast = () => {
            if (tableId != null && tableId != '') {
                let pagination = document.querySelector(`#${tableId} .topic-element-paginate`).childNodes;
               
                for (let i = 0; i <= pagination.length; i++) {
                    if (i === pagination.length - 2) {
                        pagination[i].childNodes[0].click();
                        break;
                    }
                }
            } else {
                let pagination = document.querySelector('.topic-element-paginate').childNodes;
                for (let i = 0; i <= pagination.length; i++) {
                    if (i === pagination.length - 2) {
                        pagination[i].childNodes[0].click();
                        break;
                    }
                }
            }
        }
        const handlePageClick = (event) => {
            onChangeRowsPerPage(csRowsPerPage)
            onChangePage((currentPage = event.selected) + 1);
            setCurrentPageHigh((currentPage = event.selected) + 1)
        };


        const paginationRowChange = () => {
            if (needRowPerPage == true || needRowPerPage == undefined || needRowPerPage == null) {
                onChangeRowsPerPage(document.getElementById('super-admin-row-drop').value)
                onChangePage(1);
                setCurrentPageHigh(1)
            } else {
                onChangeRowsPerPage(csRowsPerPage)
                onChangePage(1);
                setCurrentPageHigh(1)
            }
        };


        if (showPaginate == false) {
            return null;
        } else {

            return (
                <div id={tableId} className="d-flex flex-wrap align-items-center justify-content-end mt-4">
                    {/* <select onChange={handleIn}>
                        <option value='10'>10</option>
                        <option value='20'>20</option>
                    </select> */}
                    <div id="pagination_click" onClick={paginationRowChange}></div>
                    <button
                        className={(currentPage == 1) ? "first-pagination last-paginate me-1" : "last-paginate me-1"}
                        aria-label="previous page"
                        onClick={triggerFirst}
                    >
                        <i className='icon-double-left-arrows m-0 p-0'></i>
                    </button>
                    <ReactPaginate
                        previousLabel={<><i className="icon-left"></i></>}

                        nextLabel={<><i className="icon-Right"></i></>}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pages}
                        marginPagesDisplayed={csPageCount === undefined || csPageCount === null ? 2 : 1}
                        pageRangeDisplayed={csPageCount === undefined || csPageCount === null ? 3 : 1}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination topic-element-paginate"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"pagination-active"}
                    />
                    <button
                        className={(pages == currentPage) ? "first-pagination last-paginate  ms-1" : "last-paginate  ms-1"}
                        aria-label="previous page"
                        onClick={triggerLast}
                    >
                        <i className='icon-double-right-arrows m-0 p-0'></i>
                    </button>
                </div>
            );
        }
    }, [showPaginate, csRowsPerPage, resetPaginate, resetSelector])
    // }, [ csRowsPerPage, tableData, resetPaginate, resetSelector])


    // const handlePerRowsChange = (newPerPage, page) => {
    //     console.log(newPerPage)
    // };

    // const BootyPagination = ({
    //     rowsPerPage,
    //     rowCount,
    //     onChangePage,
    //     onChangeRowsPerPage, // available but not used here
    //     currentPage,
    // }) => {
    //     const handleBackButtonClick = () => {
    //         onChangePage(currentPage - 1);
    //     };
    //     const firstButtonClick = () => {
    //         onChangePage(currentPage - (currentPage - 1));
    //     };


    //     const handleNextButtonClick = () => {
    //         onChangePage(currentPage + 1);
    //     };

    //     const lastButtonClick = () => {
    //         onChangePage(pageItems.length);
    //     };

    //     const handlePageNumber = (e) => {
    //         onChangePage(Number(e.target.value));
    //     };

    //     const pages = getNumberOfPages(rowCount, csRowsPerPage);
    //     const pageItems = toPages(pages);
    //     const nextDisabled = currentPage === pageItems.length;
    //     const previosDisabled = currentPage === 1;



    //     if (Object.keys(tableData).length < 1) {
    //         return null;
    //     } else {
    //         return (

    //             <nav id="paging" className='d-flex group-paging justify-content-end mt-5'>
    //                 <ul className="pagination">
    //                     <li className="page-item">
    //                         <button
    //                             className="page-link me-2"
    //                             onClick={firstButtonClick}
    //                             disabled={previosDisabled}
    //                             aria-disabled={previosDisabled}
    //                             aria-label="previous page"
    //                         >
    //                             <i className='icon-back-double-arrow m-0 p-0'></i>
    //                         </button>
    //                     </li>
    //                     <li className="page-item me-2">
    //                         <button
    //                             className="page-link"
    //                             onClick={handleBackButtonClick}
    //                             disabled={previosDisabled}
    //                             aria-disabled={previosDisabled}
    //                             aria-label="previous page"
    //                         >
    //                             <i className='icon-Back m-0 p-0'></i>
    //                         </button>
    //                     </li>
    //                     {pageItems.map((page) => {
    //                         const className = page === currentPage ? "page-item me-2 active" : "page-item me-2";
    //                         return (
    //                             <li key={page} className={className}>
    //                                 <button
    //                                     className="page-link"
    //                                     onClick={handlePageNumber}
    //                                     value={page}
    //                                 >
    //                                     {page}
    //                                 </button>
    //                             </li>
    //                         );
    //                     })}
    //                     <li className="page-item">
    //                         <button
    //                             className="page-link me-2"
    //                             onClick={handleNextButtonClick}
    //                             disabled={nextDisabled}
    //                             aria-disabled={nextDisabled}
    //                             aria-label="next page"
    //                         >
    //                             <i className='icon-right-arrow m-0 p-0'></i>
    //                         </button>
    //                     </li>
    //                     <li className="page-item">
    //                         <button
    //                             className="page-link me-2"
    //                             onClick={lastButtonClick}
    //                             disabled={nextDisabled}
    //                             aria-disabled={nextDisabled}
    //                             aria-label="next page"
    //                         >
    //                             <i className='icon-forward-double-arrow m-0 p-0'></i>
    //                         </button>
    //                     </li>
    //                 </ul>
    //             </nav>
    //         );
    //     }
    // };

    const sortIcon = <svg className="sort-icon" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><rect fill="none" height="24" width="24" /><path d="M8.5,8.62v6.76L5.12,12L8.5,8.62 M10,5l-7,7l7,7V5L10,5z M14,5v14l7-7L14,5z" /></svg>;

    var defaultTable = (
        <DataTable 
            className={classsName}
            fixedHeader // This prop is specific to React Data Table Component
            fixedHeaderScrollHeight="650px" // Adjust this value to your preference
            customStyles={{
                headRow: {
                    className: 'fixed-header',
                },
            }}
            columns={tableColumn}
            data={tableData}
            reorderable={false}
            sortFunction={isCustomSort ? customSort : null}
            sortIcon={sortIcon}
        />
    )


    return (
        <>
            {
                isPaginate && !isSelectable ? (
                    <DataTable 
                    className={classsName}
                        columns={tableColumn}
                        data={tableData}
                        onSort={onsort}
                        pagination
                        fixedHeader // This prop is specific to React Data Table Component
                        fixedHeaderScrollHeight="650px" // Adjust this value to your preference
                        customStyles={{
                            headRow: {
                                className: 'fixed-header',
                            },
                        }}
                        reorderable={false}
                        paginationComponent={customReactPaging}
                        sortFunction={customSort}
                        conditionalRowStyles={conditionalRowStyles}
                        responsive={true}
                        sortIcon={sortIcon}
                    />
                ) : isPaginate && isSelectable ? (
                    <DataTable 
                    className={classsName}
                        columns={tableColumn}
                        data={tableData}
                        pagination
                        paginationComponent={customReactPaging}
                        sortFunction={customSort}
                        conditionalRowStyles={conditionalRowStyles}
                        selectableRows
                        fixedHeader // This prop is specific to React Data Table Component
                        fixedHeaderScrollHeight="650px" // Adjust this value to your preference
                        customStyles={{
                            headRow: {
                                className: 'fixed-header',
                            },
                        }}
                        selectableRowsComponent={BootyCheckbox}
                        onSelectedRowsChange={handleTableSelect}
                        responsive={true}
                        sortIcon={sortIcon}
                    />
                ) : defaultTable
            }
        </>
    )
}

export default React.memo(ReactTable);