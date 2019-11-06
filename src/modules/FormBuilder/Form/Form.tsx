import React, { ReactChild, FormEvent } from 'react';

type Props = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactChild;
};
export default ({ onSubmit, children }: Props) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};
