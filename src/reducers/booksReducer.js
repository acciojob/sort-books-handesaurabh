const initialState = {
  books: [],
  loading: false,
  error: null,
  sortBy: 'title', // title, author, publisher
  sortOrder: 'asc' // asc, desc
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case 'FETCH_BOOKS_SUCCESS':
      console.log('Setting books in reducer, length:', action.payload.length);
      // Ensure we're not accumulating data - replace the books array
      // Also ensure we don't have more than 60 books
      const booksData = Array.isArray(action.payload) ? action.payload : [];
      const limitedBooks = booksData.slice(0, 60);
      return {
        ...state,
        loading: false,
        books: limitedBooks
      };
    
    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.payload
      };
    
    case 'SET_SORT_ORDER':
      return {
        ...state,
        sortOrder: action.payload
      };
    
    default:
      return state;
  }
};

export default booksReducer;