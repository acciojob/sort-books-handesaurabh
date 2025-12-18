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
      
      dispatch(fetchBooksSuccess(books));
    } catch (error) {
      // For demo purposes, we'll use mock data if the API call fails
      console.error('API call failed:', error);
      
      // Mock data for demonstration
      const mockBooks = [
        {
          title: "The Midnight Library",
          author: "Matt Haig",
          publisher: "Viking",
          isbn: "9780525559474"
        },
        {
          title: "Klara and the Sun",
          author: "Kazuo Ishiguro",
          publisher: "Knopf",
          isbn: "9780525559573"
        },
        {
          title: "The Four Winds",
          author: "Kristin Hannah",
          publisher: "St. Martin's Press",
          isbn: "9781250178602"
        },
        {
          title: "Project Hail Mary",
          author: "Andy Weir",
          publisher: "Ballantine Books",
          isbn: "9780593135204"
        },
        {
          title: "The Invisible Life of Addie LaRue",
          author: "V.E. Schwab",
          publisher: "Tor Books",
          isbn: "9780765387561"
        }
      ];
      
      dispatch(fetchBooksSuccess(mockBooks));
    }
  };
};