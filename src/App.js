import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Link, useLocation } from 'react-router-dom'
import { Route, Routes, Navigate } from 'react-router';
import DayView from './components/DayView';
import CalendarView from './components/CalendarView';
import { useContext } from 'react';
import { StateContext } from './StateContext';
import EventModal from './components/EventModal';
import moment from 'moment/moment';

function Header({ onAdd }) {
  const location = useLocation();
  const pageName = location.pathname.split('/')[1];

  return (
    <nav>
      <ul>
        <li className={pageName === "calendar" ? "selected" : ""}>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li className={pageName === "day" ? "selected" : ""}>
          <Link to="/day">Table</Link>
        </li>

        <li>
          <button className='button' onClick={onAdd}>
            Add Event
          </button>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  const { eventsData, dispatch } = useContext(StateContext);
  const [editingEvent, setEditingEvent] = useState();

  return (
    <BrowserRouter>
      <div className="App">
        <Header
          onAdd={() => setEditingEvent({ start: moment().format('YYYY-MM-DD'), end: moment().format('YYYY-MM-DD'), done: false })}
        />
        <div className="main-content">
          <Routes>
            <Route
              path="/day"
              element={
                <DayView
                  eventsData={eventsData}
                  onAdd={() =>
                    setEditingEvent({ start: moment().format('YYYY-MM-DD'), end: moment().format('YYYY-MM-DD'), done: false })
                  }
                  onEdit={(event) => setEditingEvent(event)}
                  onDelete={(id) => dispatch({ type: 'DELETE_EVENT', id })}
                />
              }
            />
            <Route
              path="/calendar"
              element={
                <CalendarView
                  eventsData={eventsData}
                  onAdd={(event) => setEditingEvent(event)}
                  onEdit={(event) => setEditingEvent(event)}
                />
              }
            />
            <Route exact path="/" element={<Navigate to="/calendar" />} />
          </Routes>
        </div>
        {editingEvent !== undefined && (
          <EventModal
            event={editingEvent}
            onClose={() => setEditingEvent()}
            onSave={(newEvent) => {
              const dispatchType = newEvent.id === undefined ? 'ADD_EVENT' : 'UPDATE_EVENT'
              dispatch({ type: dispatchType, event: newEvent })
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
