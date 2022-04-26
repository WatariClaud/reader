import {
    useQuery,
    gql
  } from "@apollo/client";

  const GET_BOOKS = gql`
    query getBook{
      book { pages { content, tokens { position, value } } }
    }
  `;
  
  function GetBook() {
    const { loading, error, data } = useQuery(GET_BOOKS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error.message}`;

    console.log(data.book.pages);
  
    return data.book.pages.map(({ content, tokens }, index) => 
      (
        
        <div key={index}>
          <p>
            {content} : {tokens.map((token, index) => <a key={index} href ={ token.value}>{token.value} </a>)}
          </p>
        </div>
      ));
    
  }

  export default GetBook;