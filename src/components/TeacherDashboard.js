import React, { useState } from 'react';

const TeacherDashboard = ({ events, user }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendance, setAttendance] = useState({});

  const markAttendance = (eventId, studentEmail) => {
    setAttendance(prev => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [studentEmail]: !prev[eventId]?.[studentEmail]
      }
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Teacher Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event List */}
        <div className="lg:col-span-1">
          <h3 className="text-xl font-semibold mb-4">Your Events</h3>
          <div className="space-y-4">
            {events.map(event => (
              <div
                key={event.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedEvent?.id === event.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.registeredStudents.length} registered</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Event Details */}
        <div className="lg:col-span-2">
          {selectedEvent ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">{selectedEvent.title}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedEvent.registeredStudents.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Registered</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {Object.values(attendance[selectedEvent.id] || {}).filter(Boolean).length}
                  </div>
                  <div className="text-sm text-gray-600">Present</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {selectedEvent.maxSeats - selectedEvent.registeredStudents.length}
                  </div>
                  <div className="text-sm text-gray-600">Seats Left</div>
                </div>
              </div>
              
              <h4 className="font-semibold mb-3">Registered Students</h4>
              <div className="space-y-2">
                {selectedEvent.registeredStudents.map(studentEmail => (
                  <div key={studentEmail} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">{studentEmail}</span>
                    <button
                      onClick={() => markAttendance(selectedEvent.id, studentEmail)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        attendance[selectedEvent.id]?.[studentEmail]
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {attendance[selectedEvent.id]?.[studentEmail] ? 'Present' : 'Mark Present'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              Select an event to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;