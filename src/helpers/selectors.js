
export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(item => item.name === day);
 
  if (!selectedDay) {
    return [];
  }

  const appointments = selectedDay.appointments.map(id => state.appointments[id]);

  return appointments;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const { student, interviewer } = interview;
  const interviewerData = state.interviewers[interviewer];

  return {
    student,
    interviewer: interviewerData
  };
}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find((d) => d.name === day);

  if (!selectedDay || !selectedDay.interviewers) {
    return [];
  }

  const interviewers = selectedDay.interviewers.map((id) => state.interviewers[id]);

  return interviewers;
}
