import { useRef } from "react";
import "./EventModal.css";
import { useEffect } from "react";
import moment from "moment/moment";

export default function EventModal({ event, onClose, onSave }) {
    const typeText = event.id === undefined ? 'Add' : 'Edit';
    const titleRef = useRef();
    const notesRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const doneRef = useRef();

    const onSaveClick = () => {
        const title = titleRef.current.value;
        const notes = notesRef.current.value;
        const start = startDateRef.current.value;
        const end = endDateRef.current.value;
        const done = doneRef.current?.checked || false;
        onSave({ ...event, title, notes, start, end, done });
        onClose();
    }

    useEffect(() => {
      titleRef.current.value = event.title || '';
      notesRef.current.value = event.notes || '';
      startDateRef.current.value = event.start || '';
      endDateRef.current.value = event.end || "";
      if (doneRef.current) doneRef.current.checked = event.done || false;
    }, [event]);

    return (
      <div className="modal-container">
        <div className="modal">
          <div className="modal-title">{typeText} Event</div>
          <div className="modal-content">
            <div>
              <label htmlFor="new-event-title">Title</label>
              <input ref={titleRef} id="new-event-title" type="text" />
            </div>
            <div>
              <label htmlFor="new-event-notesv">Notes</label>
              <input ref={notesRef} id="new-event-notesv" type="text" />
            </div>
            <div>
              <label>Start date</label>
              <input ref={startDateRef} type="date" id="start-date" />
            </div>
            <div>
              <label>End date</label>
              <input ref={endDateRef} type="date" id="end-date" />
            </div>
            {event.id !== undefined && (
              <div>
                <label>DONE</label>
                <input
                  ref={doneRef}
                  type="checkbox"
                  disabled={
                    event.done || moment().isBefore(moment(event.start), "D")
                  }
                />
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="button-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="button-save" onClick={onSaveClick}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
}