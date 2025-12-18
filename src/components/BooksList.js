import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setSortBy, setSortOrder } from '../actions/booksActions';

const BooksList = () => {
  console.log('BooksList component rendering');
  const dispatch = useDispatch();
  const { books, loading, error, sortBy, sortOrder } = useSelector(state => state);

  useEffect(() => {
    console.log('BooksList useEffect called');
    // Only fetch books if we don't already have them
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch, books.length]);

  const handleSortByChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleSortOrderChange = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  // Sort books based on sortBy and sortOrder
  const sortedBooks = [...books].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Handle case sensitivity
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === 'asc') {
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    } else {
      if (aValue > bValue) return -1;
      if (aValue < bValue) return 1;
      return 0;
    }
  });
  
  console.log('Sorted books length:', sortedBooks.length, 'First book title:', sortedBooks[0] ? sortedBooks[0].title : 'N/A', 'Sort by:', sortBy, 'Sort order:', sortOrder);

  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Books List</h1>
      
      <div>
        <label>
          Sort by:
          <select onChange={handleSortByChange} value={sortBy}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
        </label>
        
        <label>
          Order:
          <select onChange={handleSortOrderChange} value={sortOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;