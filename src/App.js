import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import ItemForm from "./components/ItemForm";
import ItemsTable from "./components/ItemsTable";

const AppContainer = styled.div`
  max-width: 850px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 50px;
`;

const updateLocalStorage = (items, hours) => {
  localStorage.setItem("workout-log/items", JSON.stringify(items));
  localStorage.setItem("workout-log/totalHours", JSON.stringify(hours));
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE": {
      return { ...state, ...action.state};
    }
    case "ADD": {
      const { items, totalHours } = { ...state };
      const { item } = action;
      const newItems = [...items, item];
      const newHours = totalHours + parseInt(item.time_spent);

      updateLocalStorage(newItems, newHours);

      return {
        ...state,
        items: newItems,
        totalHours: newHours,
      };
    }
    case "REMOVE": {
      const { items, totalHours } = { ...state };
      const { item } = action;
      const indexToRemove = items.indexOf(item);

      const newItems = [
        ...items.slice(0, indexToRemove),
        ...items.slice(indexToRemove + 1, items.length),
      ];
      const newHours = totalHours - item.time_spent;

      updateLocalStorage(newItems, newHours);

      return {
        ...state,
        items: newItems,
        totalHours: newHours,
      };
    }
    default: {
      return state;
    }
  }
};

const initialState = { items: [], totalHours: 0 };

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    let existingState = {};

    if (localStorage.getItem("workout-log/items")) {
      existingState.items = JSON.parse(
        localStorage.getItem("workout-log/items")
      );
    }

    if (localStorage.getItem("workout-log/totalHours")) {
      existingState.totalHours = JSON.parse(
        localStorage.getItem("workout-log/totalHours")
      );
    }

    dispatch({ type: "SET_STATE", state: existingState });
  }, []);


  return (
    <AppContainer>
      <Title>Workout Log</Title>
      <ItemForm onAdd={(item) => dispatch({ type: "ADD", item })} />

      {state.items.length > 0 && (
        <ItemsTable
          items={state.items}
          onRemove={(item) => dispatch({ type: "REMOVE", item })}
        />
      )}

      <Title>{state.totalHours} hour(s) of exercise</Title>
    </AppContainer>
  );
};

export default App;
