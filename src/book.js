import React, { useEffect,  useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import {
    useQuery,
    gql
} from "@apollo/client";

const GET_BOOKS = gql`
  query getBook{
    book { pages { content, tokens { position, value } } }
  }
`;
const notify = (data) => toast(data.target.id, { transition: Slide });
function Items({ currentItems }) {
  return (
    <><div className="items">
      {currentItems && currentItems.map((item, index_) => (
        <p key={index_} className="res-p" style={{ textAlign: 'center' }}>
          {item.tokens?.map((token, _index_) => {
            return item.content.substring(token.position[0] - 1, token.position[1] + 1) === item.content.substring(token.position[0], token.position[1])
              ? null :
              <span key={_index_}>
                <span>{(/[a-zA-Z]/).test(item.content.substring(token.position[0] - 1, token.position[1] + 1).charAt(0)) ? null :
                item.content.substring(token.position[0] - 1, token.position[1] + 1).charAt(0)}</span>
                <span id={token.value} aria-label={token.value} className="book-links" onClick={notify}>
                  {item.content.substring(token.position[0], token.position[1])}
                </span><span>{(/[a-zA-Z ]/).test(item.content.substring(token.position[0] - 1, token.position[1] + 1).charAt(
                  item.content.substring(token.position[0] - 1, token.position[1] + 1).length - 1)) ? null : (item.content.substring(token.position[0] - 1, token.position[1] + 1).charAt(
                    item.content.substring(token.position[0] - 1, token.position[1] + 1).length - 1), 
                    item.content.substring(token.position[0] - 1, token.position[1] + 1).charAt(
                      item.content.substring(token.position[0] - 1, token.position[1] + 1).length - 1) ?
                      item.content.substring(token.position[0] - 1, token.position[1] + 2).charAt(
                        item.content.substring(token.position[0] - 1, token.position[1] + 2).length - 1) ?
                        item.content.substring(token.position[0] - 1, token.position[1] + 2).charAt(
                          item.content.substring(token.position[0] - 1, token.position[1] + 2).length - 1) :  item.content.substring(token.position[0] - 1, token.position[1] + 1).charAt(
                            item.content.substring(token.position[0] - 1, token.position[1] + 1).length - 1) : null
                    )}</span></span>;
          })}
        </p>
      ))}
    </div><ToastContainer  autoClose={1000}/></>
  );
}
const GetBook = ({itemsPerPage}) => {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [value, setValue] = useState(0);
    const { loading, error, data } =  useQuery(GET_BOOKS);
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(!loading ? data?.book.pages.slice(itemOffset, endOffset) : [0, 2]);
        setPageCount(Math.ceil(data?.book.pages.length / itemsPerPage));
        setTimeout(() => {
          setValue(1);
        }, 1000);
        clearTimeout();
    }, [itemOffset, itemsPerPage, value]);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...! {` ${error.message}`}</p>; 
    const handlePageClick = (event) => {
      const newOffset = event.selected * itemsPerPage % data.book.pages.length;
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <Items currentItems={currentItems} />
        <div className='ul'>
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={0}
          marginPagesDisplayed={0}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        /></div>
      </>
    );
    
  };
  export default GetBook;
