import React from 'react';
import Button from "../Button";


export default function Confirm(props) {
  return (
    <div className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <Button danger onClick={props.onCancel}>Cancel</Button>
      <Button danger onClick={props.onConfirm}>Confirm</Button>

    </div>
  );
}


// export default function Confirm(props) {

//   return (
//     <>
//       <main className="appointment__card appointment__card--confirm">
//         <h1 className="text--semi-bold">Delete the appointment?</h1>
//         <section className="appointment__actions">
//           <button danger>Cancel</button>
//           <button danger>Confirm</button>
//         </section>
//       </main>
//     </>
//   )
// };