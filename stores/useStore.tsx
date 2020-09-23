import { storeContext } from '../pages/index';
import React from 'react';

function useStore() {

  
	const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
}

export default useStore;