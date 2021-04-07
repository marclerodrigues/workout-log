import React, { useRef } from "react";
import { Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

const FormContainer = styled.fieldset`
  border: 1px solid #000;
  padding: 10px 0 20px 5px;
`;

const FormLegend = styled.legend`
  width: auto;
  margin-left: 25px;
  padding: 0 5px;
`;

const ItemForm = ({ onAdd }) => {
  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(formRef.current);
    const item = Object.fromEntries(data);

    onAdd(item)

    formRef.current.reset()
  };

  return (
    <FormContainer>
      <FormLegend>Insert an Item</FormLegend>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Form.Group controlId="insertItem">
          <Form.Row>
            <Col>
              <Form.Control
                type="text"
                name="time_spent"
                placeholder="Time Spent"
                required
              />
            </Col>
            <Col>
              <Form.Control as="select" name="activity" defaultValue="" required>
                <option value="">Choose an Activity</option>
                <option value="Run">Run</option>
                <option value="Swimming">Swimming</option>
                <option value="Bike">Bike</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Control type="date" name="date" required />
            </Col>
            <Col xl={1}>
              <Button type="submit">Add</Button>
            </Col>
          </Form.Row>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default ItemForm;
