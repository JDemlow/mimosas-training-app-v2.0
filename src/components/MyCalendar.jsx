import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
      }));
      setEvents(eventsList);
    };
    fetchEvents();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setShowAddModal(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEventModal = () => setShowEventModal(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const event = { ...newEvent, allDay: false };
    const docRef = await addDoc(collection(db, "events"), event);
    setEvents((prev) => [...prev, { ...event, id: docRef.id }]);
    setShowAddModal(false);
  };

  const handleDelete = async () => {
    if (selectedEvent) {
      await deleteDoc(doc(db, "events", selectedEvent.id));
      setEvents((prev) => prev.filter((e) => e.id !== selectedEvent.id));
      setShowEventModal(false);
    }
  };

  return (
    <div style={{ height: "500pt" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />

      {/* Add Event Modal */}
      <Modal
        show={showAddModal}
        onHide={handleCloseAddModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSave}
            id="addEventForm"
            className="w-full max-w-sm"
          >
            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label
                  className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                  htmlFor="title"
                >
                  Event Title
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-[#f6b42c] focus:bg-white focus:outline-none"
                  id="title"
                  type="text"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  placeholder="Enter event title"
                  required
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="rounded bg-slate-400 px-4 py-2 font-bold text-white hover:bg-[#fe642a]"
            onClick={handleCloseAddModal}
          >
            Close
          </button>
          <button
            className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]"
            form="addEventForm"
            type="submit"
          >
            Save Event
          </button>
        </Modal.Footer>
      </Modal>

      {/* Event Details Modal */}
      <Modal
        show={showEventModal}
        onHide={handleCloseEventModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <h5>{selectedEvent.title}</h5>
              <p>
                <strong>Start:</strong> {selectedEvent.start.toLocaleString()}
              </p>
              <p>
                <strong>End:</strong> {selectedEvent.end.toLocaleString()}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="rounded bg-slate-400 px-4 py-2 font-bold text-white hover:bg-[#fe642a]"
            onClick={handleCloseEventModal}
          >
            Close
          </button>
          <button
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete Event
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyCalendar;
