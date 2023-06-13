// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   getAppointmentsForDay,
//   getInterview,
//   getInterviewersForDay,
// } from "../helpers/selectors";

// export default function useApplicationData() {
//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: {},
//   });

//   const setDay = (day) => {
//     setState((prevState) => ({ ...prevState, day }));
//   };

//   const bookInterview = (id, interview) => {
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview },
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment,
//     };

//     return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
//       setState((prevState) => ({
//         ...prevState,
//         appointments,
//       }));
//     });
//   };

//   const cancelInterview = (id) => {
//     const appointment = {
//       ...state.appointments[id],
//       interview: null,
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment,
//     };

//     return axios.delete(`/api/appointments/${id}`).then(() => {
//       setState((prevState) => ({
//         ...prevState,
//         appointments,
//       }));
//     });
//   };

//   useEffect(() => {
//     Promise.all([
//       axios.get("/api/days"),
//       axios.get("/api/appointments"),
//       axios.get("/api/interviewers"),
//     ])
//       .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
//         setState((prevState) => ({
//           ...prevState,
//           days: daysResponse.data,
//           appointments: appointmentsResponse.data,
//           interviewers: interviewersResponse.data,
//         }));
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const interviewers = getInterviewersForDay(state, state.day);
//   const appointments = getAppointmentsForDay(state, state.day).map(
//     (appointment) => {
//       return {
//         ...appointment,
//         interview: getInterview(state, appointment.interview),
//       };
//     }
//   );

//   return {
//     state,
//     setDay,
//     bookInterview,
//     cancelInterview,
//   };
// }


import { useState, useEffect } from "react";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    setState((prevState) => ({ ...prevState, day }));
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prevState) => ({
        ...prevState,
        appointments,
      }));
      updateSpots(appointments);
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState((prevState) => ({
        ...prevState,
        appointments,
      }));
      updateSpots(appointments);
    });
  };

  const updateSpots = (appointments) => {
    const updatedDays = state.days.map((day) => {
      const spots = getAppointmentsForDay({ ...state, appointments }, day.name).filter(
        (appointment) => !appointment.interview
      ).length;
      return {
        ...day,
        spots,
      };
    });

    setState((prevState) => ({
      ...prevState,
      days: updatedDays,
    }));
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then(([daysResponse, appointmentsResponse, interviewersResponse]) => {
        setState((prevState) => ({
          ...prevState,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      return {
        ...appointment,
        interview: getInterview(state, appointment.interview),
      };
    }
  );

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
