import { useReducer, createContext } from "react";

export const StateContext = createContext();

const stateReducer = (state, action) => {
    let newState = [...state];

    if (action.type === 'ADD_EVENT') {
        if (action.event.id === undefined) {
            action.event.id =
              Math.random().toString(36).substring(2, 15) +
              Math.random().toString(36).substring(2, 15);
        }

        newState = [
            ...state,
            action.event
        ];
    }

    else if (action.type === 'UPDATE_EVENT') {
        newState = state.map((event) => {
            if (event.id === action.event.id) {
                return {
                    ...event,
                    ...action.event
                };
            }

            return event;
        })
    }

    else if (action.type === 'DELETE_EVENT') {
        newState = state.filter((event) => event.id !== action.id);
    }

    localStorage.setItem('calendar-events', JSON.stringify(newState));

    return newState;
}

const getDefaultState = () => {
    return JSON.parse(localStorage.getItem("calendar-events")) || [];
}

export function StateProvider({ children }) {
  const [eventsData, dispatch] = useReducer(stateReducer, getDefaultState());

    return (
        <StateContext.Provider value={{ eventsData, dispatch }}>
            {children}
        </StateContext.Provider>
    )
} 