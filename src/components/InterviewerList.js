import React from 'react';
// import classNames from 'classnames';
import InterviewerListItem from './InterviewerListItem';
import "./InterviewerList.scss";

export default function InterviewerList(props) {

  const { interviewers } = props;


  const interviewerItems = (interviewers || []).map((interviewerData) => (
  

    <InterviewerListItem 
  key={interviewerData.id}
  id={interviewerData.id}
  name={interviewerData.name}
  avatar={interviewerData.avatar}
  selected={interviewerData.id === props.value}
  setInterviewer={() => props.onChange(interviewerData.id)}    
/>


  ));


  return (
    <>
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">{interviewerItems}</ul>
      </section>
      
    </>
  )
}


