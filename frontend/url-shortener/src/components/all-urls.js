import React, { Component, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UrlShortenerService from "../services/url-shortener.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default class AllUrl extends Component {
    constructor(props) {
        super(props);

        this.handleChange.bind(this);

        this.state = {
            id: null,
            urls: [],
            copied: false,
            copiedId: 0
        };
    }

    componentDidMount() {
        this.retrieveUrls();
    }

    openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    retrieveUrls() {
        UrlShortenerService.getAll()
            .then(response => {
                this.setState({
                    urls: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteUrl(id) {
        UrlShortenerService.delete(id)
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveUrls();
    }

    handleChange = () => {
        this.props.changeState(false, 'url');
    };

    render() {

        const { urls, copied, copiedId } = this.state;

        return (
            <Modal dialogClassName="modal-width" show={true} onHide={this.handleChange} centered>
                <Modal.Header closeButton>
                    <h3>List of created short urls</h3>
                </Modal.Header>
                <Modal.Body>
                    {urls &&
                        <Row xs={1} md={2} className="g-4">
                            {urls.map((url, idx) => (
                                <Col key={idx}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Text>
                                                <h5 class="card-subtitle mb-2 text-muted">Original Url:</h5>
                                                {url.url}
                                            </Card.Text>

                                            <Card.Text>
                                                <h5 class="card-subtitle mb-2 text-muted">Short Url:</h5>
                                                {url.fullUrl}
                                            </Card.Text>

                                            <Card.Text>
                                                <h5 class="card-subtitle mb-2 text-muted">Description of website:</h5>
                                                {url.description}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button
                                                variant="outline-success me-1"
                                                role="link"
                                                onClick={() => this.openInNewTab(url.url)}>
                                                View Website
                                            </Button>

                                            <CopyToClipboard text={url.fullUrl}
                                                onCopy={() => this.setState({ copied: true, copiedId: idx + 1 })}>
                                                <Button variant="outline-primary me-1">{copied && copiedId == idx + 1 ? "Copied" : "Copy Short Url"}</Button>
                                            </CopyToClipboard>

                                            <Button variant="outline-danger me-1" onClick={() => this.deleteUrl(url.id)}>Delete</Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    }
                </Modal.Body>
            </Modal>
        );
    }
}