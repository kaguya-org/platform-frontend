import { useState } from 'react';

export function useLoading(start: boolean ) {
  const [state, setState] = useState(start);

  function startLoading() {
    setState(true);
  }

  function stopLoading() {
    setState(false);
  }

  return {
    state,
    setState,
    startLoading,
    stopLoading,
  };
}