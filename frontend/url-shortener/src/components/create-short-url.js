import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import urlShortenerService from "../services/url-shortener.service";
//import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

export default class CreateShortUrl extends Component {
    constructor(props) {
        super(props);

        this.handleChange.bind(this);

        this.onChangeUrl = this.onChangeUrl.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.createUrl = this.createUrl.bind(this);

        this.state = {
            validate: false,
            showModal: props.getShowModal,
            url: "",
            description: "",
            isCreateNew: true,
            isCreated: false,
            copied: false,
            response: [],
            error: "",
            createdUrl: ""
        };
    }

    handleChange = () => {
        this.props.changeState(false, 'create');
    };

    onChangeUrl(e) {
        this.setState({
            url: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    createUrl() {
        var data = {
            url: this.state.url,
            description: this.state.description
        };

        urlShortenerService.create(data)
            .then(response => {
                this.setState({
                    response: response.data,
                    isCreateNew: false,
                    isCreated: true,
                    createdUrl: response.data.fullUrl
                });
            })
            .catch(e => {
                this.setState({
                    error: e.response.data.message
                });
            });
    }

    render() {

        const { isCreateNew, isCreated, copied, createdUrl, error } = this.state;

        return (
            <Modal show={true} onHide={this.handleChange} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isCreateNew ? "Create Short Url" : "Short Url Created"}</Modal.Title>
                </Modal.Header>
                {isCreateNew && <Modal.Body>
                    <FloatingLabel
                        controlId="url"
                        label="Url"
                        className="mb-3"
                    >
                        <Form.Control
                            name="url"
                            type="text"
                            placeholder="Url of the website"
                            value={this.state.url}
                            onChange={this.onChangeUrl}
                            required />
                    </FloatingLabel>

                    <FloatingLabel controlId="description" label="Description">
                        <Form.Control
                            name="description"
                            as="textarea"
                            placeholder="A description of this website"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            style={{ height: '100px' }}
                            required
                        />
                    </FloatingLabel>

                    <p className="text-danger">{error}</p>
                </Modal.Body>
                }

                {isCreated &&
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder={createdUrl}
                                aria-label="Short Url"
                                aria-describedby="basic-addon2"
                                disabled
                            />

                            <CopyToClipboard text={createdUrl}
                                onCopy={() => this.setState({ copied: true })}>
                                <Button variant={copied ? "warning" : "success"} id="button-addon2">
                                    {copied ? "Copied" : "Copy"}
                                </Button>
                            </CopyToClipboard>
                        </InputGroup>

                    </Modal.Body>
                }

                {
                    isCreateNew &&
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleChange}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.createUrl}>
                            Create
                        </Button>
                    </Modal.Footer>
                }
            </Modal >
        );
    }
}