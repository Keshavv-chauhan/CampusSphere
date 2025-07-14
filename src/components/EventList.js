import React from 'react';
import { Plus } from 'react-feather';
import EventCard from './EventCard';

const EventList = ({ events, user, onRegister, onEdit, onDelete, onCreateEvent }) => {
  const isTeacher = user.email.includes('teacher');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Campus Events</h2>
        {isTeacher && (
          <button
            onClick={onCreateEvent}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            user={user}
            onRegister={onRegister}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;