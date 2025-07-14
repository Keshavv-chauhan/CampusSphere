import React from 'react';
import { Calendar, Clock, MapPin, Users, Edit, Trash2 } from 'react-feather';
import './EventCard.css';

const EventCard = ({ event, user, onRegister, onEdit, onDelete }) => {
  const isRegistered = event.registeredStudents.includes(user.email);
  const seatsLeft = event.maxSeats - event.registeredStudents.length;
  const isTeacher = user.email.includes('teacher');

  const tagClass = 
    event.category === 'Technical' ? 'technical' :
    event.category === 'Cultural' ? 'cultural' : 'other';

  return (
    <div className="event-card">
     
      <div className="event-content">
        <div className="event-header">
          <h3 className="event-title">{event.title}</h3>
          <span className={`event-tag ${tagClass}`}>{event.category}</span>
        </div>

        <p className="event-description">{event.description}</p>

        <div className="event-meta">
          <div className="event-meta-item">
            <Calendar />
            <span>{event.date}</span>
          </div>
          <div className="event-meta-item">
            <Clock />
            <span>{event.time}</span>
          </div>
          <div className="event-meta-item">
            <MapPin />
            <span>{event.location}</span>
          </div>
          <div className="event-meta-item">
            <Users />
            <span>{seatsLeft} seats left</span>
          </div>
        </div>

        <div className="event-actions">
          {!isTeacher ? (
            <button
              onClick={() => onRegister(event.id)}
              disabled={isRegistered || seatsLeft === 0}
              className={`register-btn ${
                isRegistered ? 'registered' : seatsLeft === 0 ? 'full' : 'register'
              }`}
            >
              {isRegistered ? 'Registered' : seatsLeft === 0 ? 'Full' : 'Register'}
            </button>
          ) : (
            <div className="teacher-actions">
              <button
                onClick={() => onEdit(event)}
                className="edit-btn"
              >
                <Edit size={16} color="#1d4ed8" />
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="delete-btn"
              >
                <Trash2 size={16} color="#e53935" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
