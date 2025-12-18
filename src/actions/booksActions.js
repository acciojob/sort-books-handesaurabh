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
      
      // Mock data for demonstration - generate 60 books
      const mockBooks = [];
      const titles = [
        "The Midnight Library", "Klara and the Sun", "The Four Winds", 
        "Project Hail Mary", "The Invisible Life of Addie LaRue", 
        "The Vanishing Half", "Hamnet", "The Seven Husbands of Evelyn Hugo",
        "Mexican Gothic", "Klara and the Sun", "The Midnight Library", 
        "The Silent Patient", "Where the Crawdads Sing", "Educated", 
        "Becoming", "The Testaments", "Normal People", "The Overstory",
        "Pachinko", "Circe", "The Water Dancer", "The Priory of the Orange Tree",
        "The Institute", "The Turn of the Key", "The Guest List", 
        "The Invisible Bridge", "The Alice Network", "The Nightingale",
        "The Book Thief", "The Kite Runner", "A Thousand Splendid Suns",
        "And the Mountains Echoed", "The Lovely Bones", "Life of Pi",
        "The Curious Incident of the Dog in the Night-Time", "The Book Thief",
        "The Help", "Water for Elephants", "Sarah's Key", 
        "The Secret Keeper", "The Paris Library", "The Midnight Rose",
        "The Giver of Stars", "The Invisible Bridge", "The Alice Network",
        "The Nightingale", "The Book Thief", "The Kite Runner",
        "A Thousand Splendid Suns", "And the Mountains Echoed", 
        "The Lovely Bones", "Life of Pi", "The Curious Incident of the Dog in the Night-Time",
        "The Help", "Water for Elephants", "Sarah's Key", 
        "The Secret Keeper", "The Paris Library", "The Midnight Rose",
        "The Giver of Stars"
      ];
      
      const authors = [
        "Matt Haig", "Kazuo Ishiguro", "Kristin Hannah", 
        "Andy Weir", "V.E. Schwab", "Brit Bennett", 
        "Maggie O'Hara", "Taylor Jenkins Reid", "Janet Yellin",
        "Colson Whitehead", "Min Jin Lee", "Madeline Miller",
        "Alex Michaelides", "Delia Owens", "Michelle Obama",
        "Margaret Atwood", "Sally Rooney", "Richard Powers",
        "Min Jin Lee", "Madeline Miller", "Ta-Nehisi Coates",
        "Jodi Picoult", "Stephen King", "Ruth Ware",
        "Lucy Foley", "Julie Orringer", "Kate Quinn",
        "Anthony Doerr", "Markus Zusak", "Khaled Hosseini",
        "Khaled Hosseini", "Khaled Hosseini", "Alice Sebold",
        "Yann Martel", "Mark Haddon", "Markus Zusak",
        "Kathryn Stockett", "Sara Gruen", "Tatiana de Rosnay",
        "Kate Morton", "Natasha Lester", "Dinah Jefferies",
        "Jojo Moyes", "Julie Orringer", "Kate Quinn",
        "Anthony Doerr", "Markus Zusak", "Khaled Hosseini",
        "Khaled Hosseini", "Khaled Hosseini", "Alice Sebold",
        "Yann Martel", "Mark Haddon", "Markus Zusak",
        "Kathryn Stockett", "Sara Gruen", "Tatiana de Rosnay",
        "Kate Morton", "Natasha Lester", "Dinah Jefferies",
        "Jojo Moyes"
      ];
      
      const publishers = [
        "Viking", "Knopf", "St. Martin's Press", 
        "Ballantine Books", "Tor Books", "Riverhead Books",
        "Scribner", "Atria Books", "Doubleday",
        "Random House", "Grand Central Publishing", "Little, Brown and Company",
        "Celadon Books", "G.P. Putnam's Sons", "Crown Publishing",
        "Nan A. Talese", "Penguin Press", "Alfred A. Knopf",
        "Harper", "Bloomsbury Publishing", "Simon & Schuster",
        "Flatiron Books", "Dutton", "William Morrow",
        "HarperCollins", "Penguin Books", "Scribner",
        "Macmillan Publishers", "Hachette Book Group", "Penguin Random House",
        "Simon & Schuster", "HarperCollins", "Penguin Books",
        "Macmillan Publishers", "Hachette Book Group", "Penguin Random House",
        "Simon & Schuster", "HarperCollins", "Penguin Books",
        "Macmillan Publishers", "Hachette Book Group", "Penguin Random House",
        "Simon & Schuster", "HarperCollins", "Penguin Books",
        "Macmillan Publishers", "Hachette Book Group", "Penguin Random House",
        "Simon & Schuster", "HarperCollins", "Penguin Books",
        "Macmillan Publishers", "Hachette Book Group", "Penguin Random House",
        "Simon & Schuster", "HarperCollins", "Penguin Books",
        "Macmillan Publishers", "Hachette Book Group", "Penguin Random House"
      ];
      
      // Generate 60 books
      for (let i = 0; i < 60; i++) {
        mockBooks.push({
          title: titles[i % titles.length] + ` (#${i + 1})`,
          author: authors[i % authors.length],
          publisher: publishers[i % publishers.length],
          isbn: `978-${Math.floor(Math.random() * 10000000000)}`
        });
      }
      
      dispatch(fetchBooksSuccess(mockBooks));
    }
  };
};