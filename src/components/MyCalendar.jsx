import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs as getDocsQuery,
} from "firebase/firestore";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: new Date(),
    end: new Date(),
    repeat: "No",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEvent, setEditEvent] = useState({
    title: "",
    description: "",
    start: new Date(),
    end: new Date(),
    repeat: "No",
  });

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
    setEditEvent({
      title: event.title,
      description: event.description,
      start: event.start,
      end: event.end,
      repeat: event.repeat ? "Yes" : "No",
      recurrenceId: event.recurrenceId,
    });
    setShowEventModal(true);
  };

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEventModal = () => setShowEventModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleSave = async (e) => {
    e.preventDefault();
    const recurrenceId = uuidv4();
    const event = {
      ...newEvent,
      repeat: newEvent.repeat === "Yes",
      recurrenceId,
    };
    const docRef = await addDoc(collection(db, "events"), event);
    const newEvents = [{ ...event, id: docRef.id }];

    if (newEvent.repeat === "Yes") {
      for (let i = 1; i <= 52; i++) {
        const nextEvent = {
          ...event,
          start: new Date(
            new Date(event.start).setDate(event.start.getDate() + i * 7)
          ),
          end: new Date(
            new Date(event.end).setDate(event.end.getDate() + i * 7)
          ),
          recurrenceId,
        };
        const nextDocRef = await addDoc(collection(db, "events"), nextEvent);
        newEvents.push({ ...nextEvent, id: nextDocRef.id });
      }
    }

    setEvents((prev) => [...prev, ...newEvents]);
    setShowAddModal(false);
  };

  const handleDelete = async () => {
    if (selectedEvent) {
      const q = query(
        collection(db, "events"),
        where("recurrenceId", "==", selectedEvent.recurrenceId)
      );
      const querySnapshot = await getDocsQuery(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setEvents((prev) =>
        prev.filter((e) => e.recurrenceId !== selectedEvent.recurrenceId)
      );
      setShowEventModal(false);
    }
  };

  const handleEdit = () => {
    setShowEventModal(false);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...editEvent,
      repeat: editEvent.repeat === "Yes",
      recurrenceId: selectedEvent.recurrenceId,
    };
    await updateDoc(doc(db, "events", selectedEvent.id), updatedEvent);
    setEvents((prev) =>
      prev.map((e) =>
        e.id === selectedEvent.id ? { ...updatedEvent, id: e.id } : e
      )
    );
    setShowEditModal(false);
  };

  return (
    <div style={{ height: "500pt" }} className="relative">
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

            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label
                  className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                  htmlFor="description"
                >
                  Description
                </label>
              </div>
              <div className="md:w-2/3">
                <textarea
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-[#f6b42c] focus:bg-white focus:outline-none"
                  id="description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  placeholder="Enter event description"
                  required
                />
              </div>
            </div>

            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label
                  className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                  htmlFor="start"
                >
                  Start Time
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-[#f6b42c] focus:bg-white focus:outline-none"
                  id="start"
                  type="datetime-local"
                  value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      start: new Date(e.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label
                  className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                  htmlFor="end"
                >
                  End Time
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-[#f6b42c] focus:bg-white focus:outline-none"
                  id="end"
                  type="datetime-local"
                  value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, end: new Date(e.target.value) })
                  }
                  required
                />
              </div>
            </div>

            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label
                  className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                  htmlFor="repeat"
                >
                  Repeat Weekly
                </label>
              </div>
              <div className="md:w-2/3">
                <select
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-[#f6b42c] focus:bg-white focus:outline-none"
                  id="repeat"
                  value={newEvent.repeat}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, repeat: e.target.value })
                  }
                  required
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
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
              <p>{selectedEvent.description}</p>
              <p>
                <strong>Start:</strong> {selectedEvent.start.toLocaleString()}
              </p>
              <p>
                <strong>End:</strong> {selectedEvent.end.toLocaleString()}
              </p>
              <p>
                <strong>Repeat Weekly:</strong>{" "}
                {selectedEvent.repeat ? "Yes" : "No"}
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
            className="rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700"
            onClick={handleEdit}
          >
            Edit Event
          </button>
          <button
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete Event
          </button>
        </Modal.Footer>
      </Modal>

      {/* Edit Event Modal */}
      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleUpdate}
            id="editEventForm"
            className="w-full max-w-sm"
          >
            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label
                  className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                  htmlFor="editTitle"
                >
                  Event Title
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-[#f6b42c] focus:bg-white focus:outline-none"
                  id="editTitle"
                  type="text"
                  value={editEvent.title}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, title: e.target.value })
                  }
                  placeholder="Enter event title"
                  required
                />
              </div>
            </div>

            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label
                  className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                  htmlFor="editDescription"
                >
                  Description
                </label>
              </div>
              <div className="md:w-2/3">
                <textarea
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-[#f6b42c] focus:bg-white focus:outline-none"
                  id="editDescription"
                  value={editEvent.description}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, description: e.target.value })
                  }
                  placeholder="Enter event description"
                  required
                />
              </div>
            </div>

            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label
                  className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                  htmlFor="editStart"
                >
                  Start Time
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-[#f6b42c] focus:bg-white focus:outline-none"
                  id="editStart"
                  type="datetime-local"
                  value={moment(editEvent.start).format("YYYY-MM-DDTHH:mm")}
                  onChange={(e) =>
                    setEditEvent({
                      ...editEvent,
                      start: new Date(e.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label
                  className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                  htmlFor="editEnd"
                >
                  End Time
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-[#f6b42c] focus:bg-white focus:outline-none"
                  id="editEnd"
                  type="datetime-local"
                  value={moment(editEvent.end).format("YYYY-MM-DDTHH:mm")}
                  onChange={(e) =>
                    setEditEvent({
                      ...editEvent,
                      end: new Date(e.target.value),
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="mb-6 md:flex md:items-center">
              <div className="md:w-1/3">
                <label
                  className="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right"
                  htmlFor="editRepeat"
                >
                  Repeat Weekly
                </label>
              </div>
              <div className="md:w-2/3">
                <select
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-3 py-2 leading-tight text-gray-700 focus:border-[#f6b42c] focus:bg-white focus:outline-none"
                  id="editRepeat"
                  value={editEvent.repeat}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, repeat: e.target.value })
                  }
                  required
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="rounded bg-slate-400 px-4 py-2 font-bold text-white hover:bg-[#fe642a]"
            onClick={handleCloseEditModal}
          >
            Close
          </button>
          <button
            className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]"
            form="editEventForm"
            type="submit"
          >
            Update Event
          </button>
        </Modal.Footer>
      </Modal>

      {/* Add Event Button for Mobile */}
      <div className="absolute bottom-4 flex w-full justify-center pb-8 sm:hidden">
        <button
          className="rounded bg-[#f6b42c] px-4 py-2 font-bold text-white hover:bg-[#fe642a]"
          onClick={() => setShowAddModal(true)}
        >
          Add Event
        </button>
      </div>
    </div>
  );
};

export default MyCalendar;
