import React from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";

const TableContainer = styled.div`
  margin-top: 20px;
`;

const ActionHeader = styled.th`
  width: 10%;
`;

const ActionContainer = styled.tr`
  & span {
    display: none;
    cursor: pointer;
    text-align: center;
  }

  & span:before {
    content: "\\26D4";
  }

  &:hover {
    & span {
      color: red;
      display: block;
    }
  }
`;

const ItemsTable = ({ items, onRemove }) => {
  return (
    <TableContainer>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tempo</th>
            <th>Tipo</th>
            <th>Date</th>
            <ActionHeader>Actions</ActionHeader>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <ActionContainer key={i}>
              <td>{item.time_spent}</td>
              <td>{item.activity}</td>
              <td>{item.date}</td>
              <td>
                <span onClick={() => onRemove(item)}></span>
              </td>
            </ActionContainer>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
