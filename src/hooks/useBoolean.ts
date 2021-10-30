import { useState } from 'react';

export function useBoolean(start: boolean ) {
  const [state, setState] = useState(start);

  function changeToTrue() {
    setState(true);
  }

  function changeToFalse() {
    setState(false);
  }

  return {
    state,
    setState,
    changeToTrue,
    changeToFalse,
  };
}