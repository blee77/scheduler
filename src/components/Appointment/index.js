
// import React from 'react';
// import Header from './Header';
// import Show from './Show';
// import Empty from './Empty';
// import Form from './Form';
// import Status from './Status';
// import Confirm from './Confirm';

// import './styles.scss';
// import useVisualMode from "../../hooks/useVisualMode";

// export default function Appointment(props) {
//   const EMPTY = "EMPTY";
//   const SHOW = "SHOW";
//   const CREATE = "CREATE";
//   const SAVING = "SAVING";
//   const DELETING = "DELETING";
//   const CONFIRM = "CONFIRM";
//   const ERROR_SAVE = "ERROR_SAVE";

//   const { mode, transition, back } = useVisualMode(
//     props.interview ? SHOW : EMPTY
//   );

//   const save = (name, interviewer) => {
//     const interview = {
//       student: name,
//       interviewer
//     };

//     transition(SAVING);

//     props.bookInterview(props.id, interview)
//       .then(() => {
//         transition(SHOW);
//       })
//       .catch(() => {
//         transition(ERROR_SAVE, true);
//       });
//   };

//   const onDelete = () => {
//     transition(CONFIRM);
//   };

//   const onConfirmDelete = () => {
    
//     transition(DELETING);
//     props.cancelInterview(props.id)
//     .then(() => {
//       transition(EMPTY);
//     })
    
//   };

//   return (
//     <article className="appointment">
//       <Header time={props.time} />

//       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
//       {mode === CREATE && <Form onSave={save} onCancel={back} interviewers = {props.interviewers} />}
//       {mode === SAVING && <Status message="Saving..." />}
//       {mode === DELETING && <Status message="Deleting..." />}
//       {mode === CONFIRM && (
//         <Confirm
//           message="Are you sure you want to delete this interview?"
//           onCancel={back}
//           onConfirm={onConfirmDelete}
//         />
//       )}
//       {mode === SHOW && (
//         <Show
//           student={props.interview.student}
//           interviewer={props.interview.interviewer}
//           onDelete={onDelete}
//         />
//       )}
//     </article>
//   );
// }


// import React, { useState } from 'react';
// import Header from './Header';
// import Show from './Show';
// import Empty from './Empty';
// import Form from './Form';
// import Status from './Status';
// import Confirm from './Confirm';
// import './styles.scss';
// import useVisualMode from "../../hooks/useVisualMode";

// export default function Appointment(props) {
//   const EMPTY = "EMPTY";
//   const SHOW = "SHOW";
//   const CREATE = "CREATE";
//   const SAVING = "SAVING";
//   const DELETING = "DELETING";
//   const CONFIRM = "CONFIRM";
//   const EDIT = "EDIT"; // New mode for editing
//   const ERROR_SAVE = "ERROR_SAVE";

//   const { mode, transition, back } = useVisualMode(
//     props.interview ? SHOW : EMPTY
//   );

//   const [interviewData, setInterviewData] = useState({
//     student: props.interview ? props.interview.student : "",
//     interviewer: props.interview ? props.interview.interviewer.id : null
//   });
// console.log(interviewData);

//   const save = (name, interviewer) => {
//     const interview = {
//       student: name,
//       interviewer
//     };

//     transition(SAVING);

//     props.bookInterview(props.id, interview)
//       .then(() => {
//         transition(SHOW);
//       })
//       .catch(() => {
//         transition(ERROR_SAVE, true);
//       });
//   };

//   const onDelete = () => {
//     transition(CONFIRM);
//   };

//   const onConfirmDelete = () => {
//     transition(DELETING);
//     props.cancelInterview(props.id)
//       .then(() => {
//         transition(EMPTY);
//       });
//   };

//   const onEdit = () => {
//     // setInterviewData({
//     //   student: props.interview.student,
//     //   interviewer: props.interview.interviewer
//     // });
//     transition(EDIT);
//   };

//   return (
//     <article className="appointment">
//       <Header time={props.time} />

//       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
//       {mode === CREATE && (
//         <Form
//           onSave={save}
//           onCancel={back}
//           interviewers={props.interviewers}
//         />
//       )}
//       {mode === SAVING && <Status message="Saving..." />}
//       {mode === DELETING && <Status message="Deleting..." />}
//       {mode === CONFIRM && (
//         <Confirm
//           message="Are you sure you want to delete this interview?"
//           onCancel={back}
//           onConfirm={onConfirmDelete}
//         />
//       )}
//       {mode === SHOW && (
//         <Show
//           student={props.interview.student}
//           interviewer={props.interview.interviewer}
//           onDelete={onDelete}
//           onEdit={onEdit}
//         />
//       )}
//       {mode === EDIT && (
//         <Form
//           onSave={save}
//           onCancel={back}
//           interviewers={props.interviewers}
//           student={interviewData.student}
//           interviewer={interviewData.interviewer}
//           mode={EDIT}
//         />
//       )}
//     </article>
//   );
// }


// import React from 'react';
// import Header from './Header';
// import Show from './Show';
// import Empty from './Empty';
// import Form from './Form';
// import Status from './Status';
// import Confirm from './Confirm';
// import Error from './Error';
// import './styles.scss';
// import useVisualMode from "../../hooks/useVisualMode";

// export default function Appointment(props) {
//   const EMPTY = "EMPTY";
//   const SHOW = "SHOW";
//   const CREATE = "CREATE";
//   const SAVING = "SAVING";
//   const DELETING = "DELETING";
//   const CONFIRM = "CONFIRM";
//   const EDIT = "EDIT"; // New mode for editing
//   const ERROR_SAVE = "ERROR_SAVE";
//   const ERROR_DELETE = "ERROR_DELETE";

//   const { mode, transition, back } = useVisualMode(
//     props.interview ? SHOW : EMPTY
//   );

//   const save = (name, interviewer) => {
//     const interview = {
//       student: name,
//       interviewer
//     };

//     transition(SAVING);

//     props.bookInterview(props.id, interview)
//       .then(() => {
//         transition(SHOW);
//       })
//       .catch(() => {
//          //student name should not be blank and interviewer should exists
//         transition(ERROR_SAVE, true);
//       });
//   };

//   const onDelete = () => {
//     transition(CONFIRM);
//   };

//   const onConfirmDelete = () => {
//     transition(DELETING, true);

//     props.cancelInterview(props.id)
//       .then(() => {
//         transition(EMPTY);
//       })
//       .catch(() => {
//         transition(ERROR_DELETE, true);
//          //student name should not be blank and interviewer should exists
//       });
//   };

//   const onEdit = () => {
//     transition(EDIT);
//   };

//   return (
//     <article className="appointment">
//       <Header time={props.time} />

//       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
//       {mode === CREATE && (
//         <Form
//           onSave={save}
//           onCancel={back}
//           interviewers={props.interviewers}
//         />
//       )}
//       {mode === SAVING && <Status message="Saving..." />}
//       {mode === DELETING && <Status message="Deleting..." />}

     
//       {mode === ERROR_DELETE && <Error onClose={()=> transition(SHOW)} message="Error: Could not cancel appointment" />}
//       {mode === ERROR_SAVE && <Error onClose={()=> transition(CREATE)} message="Unable to save" />}
//       {mode === CONFIRM && (
//         <Confirm
//           message="Are you sure you want to delete this interview?"
//           onCancel={back}
//           onConfirm={onConfirmDelete}
//         />
//       )}
//       {mode === SHOW && (
//         <Show
//           student={props.interview.student}
//           interviewer={props.interview.interviewer}
//           onDelete={onDelete}
//           onEdit={onEdit}
//         />
//       )}
//       {mode === EDIT && (
//         <Form
//           onSave={save}
//           onCancel={back}
//           interviewers={props.interviewers}
//           mode={EDIT}
//         />
//       )}
//     </article>
//   );
// }

import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import './styles.scss';
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"; // New mode for editing
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    if (name.trim() === '') {
      transition(ERROR_SAVE, true);
      return;
    }

    if (!interviewer) {
      transition(ERROR_SAVE, true);
      return;
    }

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };

  const onDelete = () => {
    transition(CONFIRM);
  };

  const onConfirmDelete = () => {
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  };

  const onEdit = () => {
    transition(EDIT);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          onSave={save}
          onCancel={back}
          interviewers={props.interviewers}
        />
      )}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === ERROR_DELETE && <Error onClose={()=> transition(SHOW)} message="Error: Could not cancel appointment" />}
      {mode === ERROR_SAVE && <Error onClose={()=> transition(CREATE)} message="Unable to save" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this interview?"
          onCancel={back}
          onConfirm={onConfirmDelete}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === EDIT && (
        <Form
          onSave={save}
          onCancel={back}
          interviewers={props.interviewers}
          mode={EDIT}
        />
      )}
    </article>
  );
}
