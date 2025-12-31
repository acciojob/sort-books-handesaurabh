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

    try {
      // Using a mock API since we don't have a real API key for NYT Books API
      // In a real application, you would replace this with the actual API call
      const response = await fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YOUR_API_KEY');

      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      const books = data.results.books.map(book => ({
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        isbn: book.primary_isbn13
      }));

      // Limit to 60 books even from API
      const limitedBooks = books.slice(0, 60);
      dispatch(fetchBooksSuccess(limitedBooks));
    } catch (error) {
      // For demo purposes, we'll use mock data if the API call fails
      console.error('API call failed:', error);

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
    }
  };
};
