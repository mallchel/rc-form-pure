import React from 'react';

export default ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};
