import Head from 'next/head'
import React from "react";
import axios from 'axios';
import { useLocalStore } from 'mobx-react' // 6.x or mobx-react-lite@1.4.0
import { TStore } from '../stores/notesStore'
import ServerRequests from '../utils/serverRequests'

import NavbarView from '../components/navbarview'
import ListView from '../components/listview'
import { toJS } from 'mobx';


export const storeContext = React.createContext<TStore | null>(null)


const Index = (props) => {
    const StoreProvider = ({ children }) => {

        const value = useLocalStore(
            source => ({

                noteslist: props.notes
                ,
                addNote(note) {
                    ServerRequests.addNote(note);
                    this.noteslist.push(note);
                },

                toggleItem(lastnote, lastitem) {

                    this.noteslist.forEach((item, noteIndex) => {
                        if (item.id == lastnote) {
                            this.noteslist[noteIndex].itemsList.forEach((item, itemIndex) => {
                                if (item.id == lastitem) {
                                    this.noteslist[noteIndex].itemsList[itemIndex].checked = !this.noteslist[noteIndex].itemsList[itemIndex].checked
                                    const newNote = toJS(this.noteslist[noteIndex]);
                                    ServerRequests.updateNote(newNote);
                                }
                            })
                        }
                    })

                },
                removeNote(selectedNote) {
                    this.noteslist = this.noteslist.filter(note => note.id !== selectedNote.id);
                    ServerRequests.deleteNote(selectedNote.id);

                }
            }), props,
        )
        return <storeContext.Provider value={value}>{children}</storeContext.Provider>;
    };
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                />
            </Head>
            <StoreProvider>
                <NavbarView />
                <ListView />
            </StoreProvider>
        </>
    )
}

Index.getInitialProps = async () => {
    const res = await axios('http://localhost:3000/notes');
    res.data.forEach(element => {
        delete element._id;
        delete element.__v;
    });
    return { notes: res.data }
}

export default Index;




