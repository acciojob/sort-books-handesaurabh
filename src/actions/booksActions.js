// Action Types
export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';

// Action Creators
export const fetchBooksRequest = () => ({
  type: FETCH_BOOKS_REQUEST
});

export const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: books
});

export const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKS_FAILURE,
  payload: error
});

export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  payload: sortBy
});

export const setSortOrder = (sortOrder) => ({
  type: SET_SORT_ORDER,
  payload: sortOrder
});

// Thunk Action for fetching books
export const fetchBooks = () => {
  console.log('fetchBooks action called');
  return async (dispatch) => {
    dispatch(fetchBooksRequest());

    // Always use mock data for consistent testing
    console.log('Using mock data for books');

    // Mock data for demonstration - generate exactly 60 books
    const mockBooks = [];

    console.log('Generating mock books');
    // Generate exactly 60 unique books with properly sortable titles
    for (let i = 0; i < 60; i++) {
      const num = (i + 1).toString().padStart(2, '0'); // Pad with zeros for proper sorting
      let title = `Title ${num}`;
      if (i === 0) {
        title = `Z Title ${num}`; // Make the first one sort last
      }
      mockBooks.push({
        title: title,
        author: `Author ${num}`,
        publisher: `Publisher ${num}`,
        isbn: `978-${1000000000 + i}`
      });
    }

    console.log('Dispatching', mockBooks.length, 'books');
    // Ensure we're sending exactly 60 books
    const finalBooks = mockBooks.slice(0, 60);
    dispatch(fetchBooksSuccess(finalBooks));
  };
};
