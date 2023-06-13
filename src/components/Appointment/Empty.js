import React from 'react';
import Button from '../Button.js';

export default function Empty(props) {

  return (
    <>
      <main className="appointment__add">
        <Button onClick={props.onAdd}>
          <img
            className="appointment__add-button"
            src="images/add.png"
            alt="Add"
          />
        </Button>
      </main>
    </>
  )
};
