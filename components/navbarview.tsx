import React from "react";
import { v4 as uuidv4 } from 'uuid';

import { useState } from 'react'
import { Alert, FormControl, InputGroup, Button, Form, ListGroup, Row, Col, Navbar, Modal } from 'react-bootstrap'
import { AiFillPlusCircle } from 'react-icons/ai'
import useStore from "../stores/useStore";
import { useObserver } from "mobx-react";


const NavbarView = () => {

    const notes = useStore();

    const [notename, setNotename] = useState('');
    const [itemname, setItemname] = useState('');
    const [itemslist, setItemslist] = useState([]);
    const [shownewtask, setShownewtask] = useState(false);
    const [showalert, setShowalert] = useState(false);


    const addItem = (e) => {
        e.preventDefault();

        //check if item is not empty
        if (itemname) {
            // items limit - up to 10 items 
            if (itemslist.length === 10) setShowalert(true);
            else {
                setItemslist([...itemslist, { id: itemslist.length + 1, itemName: itemname, checked: false }])
            };
            setItemname('');
        }
        else
            alert('Item name is empty!')
    }
    // dateCreated: new Date().toLocaleString(),

    const addNote = (e) => {
        e.preventDefault();

        //check if note is not empty

        if (notename) {
            notes.addNote({
                id: uuidv4(),
                noteName: notename,
                itemsList: itemslist,
                dateCreated: new Date().toLocaleString(),
                dateUpdated: new Date().toLocaleString()
            })
            setShownewtask(false);
            setItemname('');
            setNotename('');
            setItemslist([]);
        }
        else
            alert('Note name is empty!')


    }

    return useObserver(() => (

        <div>
            <Navbar bg="light" expand="lg" variant="dark">
                <Col md={{ span: 3, offset: 5 }} > <h1>Notes List</h1></Col>
                <Col md='auto' className='ml-auto'>
                    <Button onClick={() => setShownewtask(true)}>new note</Button>
                </Col>
            </Navbar>

            <Modal show={shownewtask} onHide={() => setShownewtask(false)} animation={false} >
                <Form onSubmit={addNote}>
                    <Modal.Header>
                        <FormControl placeholder="add a new task ..." onChange={(e) => setNotename(e.target.value)} />
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup >
                            <FormControl id='add-item' placeholder="enter new item..." value={itemname} onChange={(e) => setItemname(e.target.value)} />
                            <Button type="submit" onClick={addItem}>
                                <AiFillPlusCircle />
                            </Button>
                        </InputGroup>
                        <Alert show={showalert} variant="danger" onClose={() => setShowalert(false)} dismissible >
                            <Alert.Heading>Limited to 10 items</Alert.Heading>
                        </Alert>
                        <ListGroup variant="flush">
                            {itemslist.map((item, index) =>
                                <ListGroup.Item key={index}>{item.itemName}</ListGroup.Item>)}

                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" >
                            Add Task
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    ));
}

export default NavbarView