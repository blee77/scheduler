// import axios from "axios";
// import React, { useState, useEffect } from "react";

// import "components/Appointment";
// import "components/Application.scss";
// import DayList from './DayList';
// import Appointment from './Appointment';
// import { getAppointmentsForDay, getInterview } from '../helpers/selectors';

// export default function Application(props) {
//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {}
//   });

//   useEffect(() => {
//     Promise.all([
//       axios.get("/api/days"),
//       axios.get("/api/appointments"),
//       axios.get("/api/interviewers")
//     ])
//       .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
//         setState(prevState => ({
//           ...prevState,
//           days: daysResponse.data,
//           appointments: appointmentsResponse.data,
//           interviewers: interviewersResponse.data
//         }));
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   const setDay = day => {
//     setState(prevState => ({ ...prevState, day }));
//   };

//   const appointments = getAppointmentsForDay(state, state.day);

//   const schedule = appointments.map(appointment => {
//     const interview = getInterview(state, appointment.interview);

//     return (
//       <Appointment
//         key={appointment.id}
//         id={appointment.id}
//         time={appointment.time}
//         interview={interview || null} // Pass null if interview doesn't exist
//     />
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


import axios from "axios";
import React, { useState, useEffect } from "react";

import "components/Appointment";
import "components/Application.scss";
import DayList from './DayList';
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
        setState(prevState => ({
          ...prevState,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const setDay = day => {
    setState(prevState => ({ ...prevState, day }));
  };

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day); // New line

  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview || null}
        interviewers={interviewers} // Pass the interviewers array
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
