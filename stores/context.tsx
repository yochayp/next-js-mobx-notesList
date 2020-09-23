import React from 'react';
import {notes}  from './notes';
import { useLocalStore } from 'mobx-react';
import axios from 'axios'

export const storeContext = React.createContext({notes} );


export const StoreProvider = ({ children }) => {
    
  const store = useLocalStore(() => ({
    notes,
  }));

  /* axios.get('/notes')
  .then(res => {
     res.data.map(note => {
         store.notes.addNote({
     id: note.id,
     noteName: note.noteName,
     itemsList: note.itemsList,
     dateCreated: note.dateCreated,
     dateUpdated: note.dateUpdated
  })
  console.log(note)
  })
  });*/
  console.log('1')
  console.log(store);
  

  
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export default StoreProvider;