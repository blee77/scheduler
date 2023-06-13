// import axios from "axios";
// import React, { useState, useEffect } from "react";

// import "components/Appointment";
// import "components/Application.scss";
// import DayList from './DayList';
// import Appointment from './Appointment';
// import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';


// export default function Application(props) {
//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {}

//   });

//     useEffect(() => {
//       Promise.all([
//         axios.get("/api/days"),
//         axios.get("/api/appointments"),
//         axios.get("/api/interviewers")
//       ])
//         .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
//           setState(prevState => ({
//             ...prevState,
//             days: daysResponse.data,
//             appointments: appointmentsResponse.data,
//             interviewers: interviewersResponse.data
//           }));
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   const setDay = day => {
//     setState(prevState => ({ ...prevState, day }));
//   };


//   //Problem is the cancel interview function, it has to refresh
//   const cancelInterview = (id) => {
//     // Update the local state optimistically
//     const appointment = {
//       ...state.appointments[id],
//       interview: null
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
  
//     // setState(prevState => ({
//     //   ...prevState,
//     //   appointments
//     // }));
  
//     // Make a DELETE request to remove the appointment from the database
  
//     return axios.delete(`/api/appointments/${id}`)
//       .then(response => {
//         setState(prevState => ({
//       ...prevState,
//       appointments
//     }));
//         console.log("Appointment deleted successfully");
//       })
     
//   };
  
      

//   const bookInterview = (id, interview) => {
//     // Update the local state optimistically
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
      
//     };

    


//     // Make a PUT request to update the appointment in the database
//     return axios.put(`/api/appointments/${id}`, { interview })
//       .then(response => {
//         // Transition to SHOW mode after the request is complete 
//         setState(prevState => ({
//           ...prevState,
//           appointments
//         }));
//         console.log("Appointment booked successfully");
//       })
      
//   };


//   const appointments = getAppointmentsForDay(state, state.day);
//   const interviewers = getInterviewersForDay(state, state.day);

//   const schedule = appointments.map(appointment => {
//     const interview = getInterview(state, appointment.interview);

//     return (
//       <Appointment
//         key={appointment.id}
//         id={appointment.id}
//         time={appointment.time}
//         interview={interview || null}
//         interviewers={interviewers}
//         bookInterview={bookInterview}
//         cancelInterview={cancelInterview}   
//       />
//     );
//   });

//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList
//             days={state.days}
//             day={state.day}
//             setDay={setDay}
//           />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">
//         {schedule}
//       </section>
//     </main>
//   );
// }


import React from "react";
import DayList from './DayList';
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';
import useApplicationData from '../hooks/useApplicationData'; // Import the useApplicationData hook

import "components/Appointment";
import "components/Application.scss";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData(); // Use the useApplicationData hook

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview || null}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
