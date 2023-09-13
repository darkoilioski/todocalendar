import React from "react";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
// Show all of the events and allow the user to add new events and edit existing events

const getEventStatus = (event) => {
  if (event.done) {
      return {
        icon: icon({ name: "check", style: "solid" }),
        color: 'green'
      }
  }
  console.log(moment().isBefore());
  if (moment().isAfter(moment(event.end))) {
    return {
      icon: icon({ name: "clock", style: "solid" }),
      color: "#ea3864",
    };
  }

  if (moment().isBefore(moment(event.start))) {
    return {
      icon: icon({ name: "hourglass-start", style: "solid" }),
      color: 'blue'
    }
  }

  return{
    icon: icon({ name: "spinner", style: "solid" }),
    color: 'orange'
  }
}

function DayView({ eventsData, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th className="project-name">Project name</th>
          <th className="start-date">Start date</th>
          <th className="end-date">End date</th>
          <th className="notes">Notes</th>
          <th className="edit">Actions</th>
          <th className="status">Status</th>
        </tr>
      </thead>

      <tbody>
        {eventsData.map((event, index) => {
          const eventStatus = getEventStatus(event);

          return (
            <tr key={event.id || index}>
              <td>{event.title}</td>
              <td>{event.start}</td>
              <td>{event.end}</td>
              <td>{event.notes}</td>
              <td>
                <div className="actions-column">
                  <FontAwesomeIcon
                    onClick={() => onEdit(event)}
                    icon={icon({ name: "pen-to-square", style: "regular" })}
                  />
                  <FontAwesomeIcon
                    color='red'
                    onClick={() => {
                      const shouldDelete = window.confirm(
                        `Are you sure you want to delete the "${event.title}" event?`
                      );
                      if (shouldDelete) onDelete(event.id);
                    }}
                    icon={icon({ name: "trash", style: "solid" })}
                  />
                </div>
              </td>
              <td className='status-column'>
                <FontAwesomeIcon color={eventStatus.color} icon={eventStatus.icon} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default DayView;
