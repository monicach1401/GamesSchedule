import React from 'react';

function ListOfMessages({ author, message }) {
  return (
    <div className="chat-message">
      <strong>{author}:</strong> {message}
    </div>
  );
}

export default ListOfMessages;
