import axios from "./../axios";
import { Fragment, useEffect, useState } from "react";
import { Form, Col, Row, Button, Table} from "react-bootstrap";
import './styles.css';


const SearchPage = (props) => {

    const [restaurants, setRestaurants] = useState([]);
    const [liked, setLiked] = useState([]);
    const [payload, setPayload] = useState("");

    useEffect(()=>{
        handleLoadData();
    }, [])

    const handleLoadData = () => {
        axios.get(`/get-restaurants?cuisine&location&person=${props.userName}`)
        .then(res => {
            setLiked(res.data.restaurants.map(res => res.restaurant))
        }).catch(err => {
            console.log(err.message)
        })
    }

    const handleRemoveRestaurant = (name) => {
        axios.post("/dislike", {person: props.userName, restaurant: name})
        .then(res => {
            handleRefreshSfterChange()
        }).catch(err => {
            console.log(err.message)
        })
    }

    const handleAddRestaurant = (name) => {
        axios.post("/like", {person: props.userName, restaurant: name})
        .then(res => {
            handleRefreshSfterChange()
        }).catch(err => {
            console.log(err.message)
        })
    }

    const handleSubmitForm = (event) => {
        event.preventDefault()
        var param = event.target[0].value;
        var value = event.target[1].value;
        var payload = "";
        switch(param){
            case("cui"):
                payload = `?cuisine=${value}&location&person`;
                break;
            case("loc"):
                payload = `?cuisine&location=${value}&person`;
                break;
            case("lik"):
                payload = `?cuisine&location&person=${value}`;
                break;
            default:
        }
        setPayload(payload)
        axios.get(`/get-restaurants${payload}`)
        .then(res => {
            console.log(res.data.restaurants)
            setRestaurants(res.data.restaurants)
        }).catch(err => {
            console.log(err.message)
        })
    }

    const handleRefreshSfterChange = () => {
        console.log(payload)
        axios.get(`/get-restaurants${payload}`)
        .then(res => {
            console.log(res.data.restaurants)
            handleLoadData()
            setRestaurants(res.data.restaurants)
        }).catch(err => {
            console.log(err.message)
        })
    }

    let rows = restaurants.map((res, index) => {
        return (
            <tr>
                <td>{index+1}</td>
                <td>{res.restaurant}</td>
                <td>{res.location}</td>
                <td>{res.cuisine}</td>
                <td>{liked.includes(res.restaurant) 
                ? <Button variant="dark" onClick={() => handleRemoveRestaurant(res.restaurant)} >Cofnij polubienie</Button>
                : <Button variant="dark" onClick={() => handleAddRestaurant(res.restaurant)} >Polub</Button>}</td>
            </tr>)
    })
    
    return (
        <Fragment>
            <Form className="SearchForm" onSubmit={handleSubmitForm}>
                <Form.Group as={Row} controlId="formHorizontalType">
                    <Form.Label>
                    Wyszukaj filtrując po: 
                    </Form.Label>
                    <Col sm={2}>
                        <Form.Select required >
                            <option value="loc">Lokalizacja</option>
                            <option value="cui">Typ kuchni</option>
                            <option value="lik">Polubione przez</option>
                        </Form.Select>
                    </Col>
                    <Col sm={3}>
                        <Form.Control placeholder="Wpisz szukaną wartość parametru..." type="text" required/>
                    </Col>
                    <Col sm={1}>
                        <Button variant="dark" type="submit" >
                            Szukaj
                        </Button>
                    </Col>
                </Form.Group>
            </Form>

            <Table striped bordered hover className="RestaurantTable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nazwa</th>
                        <th>Lokalizacja</th>
                        <th>Typ kuchni</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </Fragment>
    );
}

export default SearchPage;