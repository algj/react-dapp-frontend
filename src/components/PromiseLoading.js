import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const PromiseLoading = ({ pr, children }) => {
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    pr.then((result) => {
      setValue(result);
      setIsLoading(false);
    });
  }, [pr]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children(value)}</>;
}

export default PromiseLoading;