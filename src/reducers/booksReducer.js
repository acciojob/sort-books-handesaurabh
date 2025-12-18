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
      return {
        ...state,
        loading: false,
        books: action.payload
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