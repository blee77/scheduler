import React from 'react';
import Button from '../Button.js';
import InterviewerList from '../InterviewerList.js'
import { useState } from 'react';


export default function Form(props) {


  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);


  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const save = () => {
    // Saving logic goes here
  };

  return (

    <>
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              value={student}
              onChange={(event) => setStudent(event.target.value)}
            
            />
          </form>
          <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(interviewerId) => setInterviewer(interviewerId)}
          />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick={cancel}>Cancel</Button>
            <Button confirm onClick={save}>Save</Button>
          </section>
        </section>
      </main>
    </>
  )
};