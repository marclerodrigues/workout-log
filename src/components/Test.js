import React, { useState, useEffect, useReducer } from "react";
// Life Cycle
//
// unmounted
// will mount
// will update
// did update
// did mount - did render
// will unmount
// unmounted

/*
  classes
    constructor -> state

    render -> setState


  useState

  const [users, setUsers] = useState([])

  useEffect


 */

const initialUsersState = [
  { name: "Alternativa", last_name: "Nerd" },
  { name: "Marcle", last_name: "Rodrigues" },
];

const initialMusicState = [
  { owner: "Alternativa", name: "Flamingos" },
  { owner: "Marcle", name: "Storiezin" },
];

const initialState = { users: initialUsersState, musics: initialMusicState };

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_MUSIC": {
      const { music } = action;
      return {
        ...state,
        musics: [...state.musics, music],
      };
    }
    case "ADD_USER": {
      const { user } = action;
      return {
        ...state,
        users: [...state.users, user],
      };
    }
    case "REMOVE_USER": {
      const { user } = action;
      const { users } = state;
      const index = users.indexOf(user);

      // splice -> Side Effects
      // slice -> No Side Effects

      const newUsers = [
        ...users.slice(0, index),
        ...users.slice(index+1, users.length)
      ]
      return { ...state, users: newUsers };
    }
    default: {
      return state;
    }
  }
};
const Test = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    // if (localStorage.getItem("workout-log/users")) {
    //   setUsers(JSON.parse(localStorage.getItem("workout-log/users")));
    // } else {
    //   setUsers(initialState);
    // }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    //[["key", "value"]] => { "key": "value"}
    const obj = Object.fromEntries(formData);
    dispatch({ type: "ADD_USER", user: obj });
    // const usersList = [...state.users, obj];

    // localStorage.setItem("workout-log/users", JSON.stringify(usersList));

    form.reset();

    // setUsers(usersList);
  };

  const onSubmitMusic = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    //[["key", "value"]] => { "key": "value"}
    const obj = Object.fromEntries(formData);
    dispatch({ type: "ADD_MUSIC", music: obj });
    // const usersList = [...state.users, obj];

    // localStorage.setItem("workout-log/users", JSON.stringify(usersList));

    form.reset();

    // setUsers(usersList);
  };

  const removeUser = (user) => {
    dispatch({ type: "REMOVE_USER", user: user })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>First Name</label>
        <input type="text" name="name" required />
        <label>Last Name</label>

        <input type="text" name="last_name" required />
        <button type="submit">Add User</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {state.users.map((user, index) => (
            <tr key={index} onClick={() => removeUser(user)}>
              <td>{user.name}</td>
              <td>{user.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={onSubmitMusic}>
        <label>Owner</label>
        <input type="text" name="owner" required />
        <label>Name</label>

        <input type="text" name="name" required />
        <button type="submit">Add Music</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Owner</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {state.musics.map((music, index) => (
            <tr key={index}>
              <td>{music.owner}</td>
              <td>{music.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Test;
