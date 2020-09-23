import { observer, useObserver } from "mobx-react"
import { ListGroup, Card, Row, Col, Form } from "react-bootstrap"
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";

import serverRequests from '../utils/serverRequests'
import useStore from "../stores/useStore";

const ListView = (props) => {
    
    const  notes  = useStore();

    const toggleChecked = (note, item) => {
        notes.toggleItem(note.id, item.id);
    }

    const removeNote = (note =>
        notes.removeNote(note));

    return useObserver(() => (
        <ListGroup style={{margin:20}} variant="flush">
            {notes.noteslist.map((note, key) =>
                < Card key={key} border="primary" style={{ width: '50%' ,margin:6}}>

                    <Card.Header>
                        <Row>
                            <h3 style={{marginLeft:10}}>{note.noteName}</h3>
                            <Col md='auto' className='ml-auto'>
                                <AiOutlineDelete className="icon" onClick={() => removeNote(note)} />
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body style={{paddingLeft:4}}>
                        <ListGroup variant="flush">

                            {note.itemsList.map((item, key) =>
                                <ListGroup.Item key={key}>
                                    <Row>
                                        <Form.Check checked={item.checked} onChange={() => toggleChecked(note, item)} />
                                        {item.itemName}
                                    </Row>
                                </ListGroup.Item>

                            )}
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer>
                        <Col md='auto' className='ml-auto'>
                            {note.dateCreated} </Col>
                    </Card.Footer>
                </Card >
            )}
<style jsx>{`
       .card {
        margin: 20px;
        padding:40px;
    }
       
     `}</style>
        </ListGroup >))

}

export default ListView

