//@ts-nocheck
import React from 'react';

const Pagination = ({ data,currentPage, totalPages, setItemsPerPage, itemsPerPage, onPageChange }) => {
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        onPageChange(1); // Reset to first page
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
             <div className="border-[1px] ml-[36px] p-2 flex flex-row justify-between ">
            <div className="flex flex-row items-center gap-[6px]">
                <h2>Items Per Page:</h2>
                <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="outline-none border-none">
                    {[5,10, 20, 50].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>

            <div>
                <span>{currentPage*itemsPerPage-(itemsPerPage-1)}-{currentPage*itemsPerPage} of {data.length} items</span>
            </div>


                 <div className="flex flex-row items-center gap-[35px]">
                     <div className="flex flex-row items-center gap-[6px]">

                         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <g opacity={(currentPage ===1) ?"0.3":"1"}>
                                 <path
                                     d="M4.64622 8.35403L9.64622 13.354C9.69267 13.4005 9.74782 13.4373 9.80852 13.4625C9.86921 13.4876 9.93427 13.5006 9.99997 13.5006C10.0657 13.5006 10.1307 13.4876 10.1914 13.4625C10.2521 13.4373 10.3073 13.4005 10.3537 13.354C10.4002 13.3076 10.437 13.2524 10.4622 13.1917C10.4873 13.131 10.5002 13.066 10.5002 13.0003C10.5002 12.9346 10.4873 12.8695 10.4622 12.8088C10.437 12.7481 10.4002 12.693 10.3537 12.6465L5.70684 8.00028L10.3537 3.35403C10.4475 3.26021 10.5002 3.13296 10.5002 3.00028C10.5002 2.8676 10.4475 2.74035 10.3537 2.64653C10.2599 2.55271 10.1326 2.5 9.99997 2.5C9.86728 2.5 9.74004 2.55271 9.64622 2.64653L4.64622 7.64653C4.59973 7.69296 4.56285 7.74811 4.53769 7.80881C4.51252 7.86951 4.49957 7.93457 4.49957 8.00028C4.49957 8.06599 4.51252 8.13105 4.53769 8.19175C4.56285 8.25245 4.59973 8.30759 4.64622 8.35403Z"
                                     fill={(currentPage ===1) ? "#007BFF" : "#007BFF"}/>
                             </g>
                         </svg>

                         <p>Prev</p>
                     </div>
                     <div className="flex gap-2">
                         {pageNumbers.map(number => (
                             <button
                                 key={number}
                                 onClick={() => onPageChange(number)}
                                 className={`px-[9px] py-[4px] rounded-[4px] ${currentPage === number ? 'bg-[#EEEEEE] text-[#007BFF]' : 'bg-white'}`}
                             >
                                 {number}
                             </button>
                         ))}
                     </div>
                     <div className="flex flex-row items-center gap-[6px]">
                         <p>Next</p>
                         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <g opacity={(currentPage === totalPages) ? "0.3" : "1"}>
                                 <path
                                     d="M11.3538 8.35403L6.35378 13.354C6.30733 13.4005 6.25218 13.4373 6.19148 13.4625C6.13079 13.4876 6.06573 13.5006 6.00003 13.5006C5.93434 13.5006 5.86928 13.4876 5.80859 13.4625C5.74789 13.4373 5.69274 13.4005 5.64628 13.354C5.59983 13.3076 5.56298 13.2524 5.53784 13.1917C5.5127 13.131 5.49976 13.066 5.49976 13.0003C5.49976 12.9346 5.5127 12.8695 5.53784 12.8088C5.56298 12.7481 5.59983 12.693 5.64628 12.6465L10.2932 8.00028L5.64628 3.35403C5.55246 3.26021 5.49976 3.13296 5.49976 3.00028C5.49976 2.8676 5.55246 2.74035 5.64628 2.64653C5.7401 2.55271 5.86735 2.5 6.00003 2.5C6.13272 2.5 6.25996 2.55271 6.35378 2.64653L11.3538 7.64653C11.4003 7.69296 11.4372 7.74811 11.4623 7.80881C11.4875 7.86951 11.5004 7.93457 11.5004 8.00028C11.5004 8.06599 11.4875 8.13105 11.4623 8.19175C11.4372 8.25245 11.4003 8.30759 11.3538 8.35403Z"
                                     fill={"#007BFF"}/>
                             </g>
                         </svg>

                     </div>

                 </div>
             </div>
        </div>
    );
};

export default Pagination;
