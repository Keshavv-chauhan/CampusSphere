import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import TeacherDashboard from './components/TeacherDashboard';
import GeminiChatbot from './components/GeminiChatbot';
import LoginForm from './components/LoginForm';
import { collection, getDocs } from 'firebase/firestore';

import { auth, firestore } from './services/firebase'; // ✅ Named imports

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadEvents = async () => {
const snapshot = await getDocs(collection(firestore, 'events'));
    const fetchedEvents = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setEvents(fetchedEvents);
  };

  useEffect(() => {
    if (user) loadEvents();
  }, [user]);

  const handleLogin = () => {
    setUser(auth.currentUser);
    loadEvents();
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  const handleRegister = async (eventId) => {
    const updatedEvents = [...events];
    const eventIndex = updatedEvents.findIndex(e => e.id === eventId);
    const event = updatedEvents[eventIndex];

    if (!event.registeredStudents.includes(user.email)) {
      event.registeredStudents.push(user.email);
      await firestore.collection('events').doc(eventId).update({
        registeredStudents: event.registeredStudents
      });
      setEvents(updatedEvents);
    }
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setShowForm(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleDeleteEvent = async (eventId) => {
    await firestore.collection('events').doc(eventId).delete();
    setEvents(events.filter(e => e.id !== eventId));
  };

  const handleSaveEvent = async (formData) => {
    if (selectedEvent) {
      await firestore.collection('events').doc(selectedEvent.id).update(formData);
      setEvents(events.map(e => e.id === selectedEvent.id ? { ...e, ...formData } : e));
    } else {
      const newEvent = {
        ...formData,
        registeredStudents: [],
        organizer: user.displayName
      };
      const result = await firestore.collection('events').add(newEvent);
      newEvent.id = result.id;
      setEvents([...events, newEvent]);
    }
    setShowForm(false);
    setSelectedEvent(null);
  };

  if (!user) return <LoginForm onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar user={user} onSignOut={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="transition-all duration-300">
        {activeTab === 'events' && (
          <EventList
            events={events}
            user={user}
            onRegister={handleRegister}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
            onCreateEvent={handleCreateEvent}
          />
        )}

        {activeTab === 'chat' && <GeminiChatbot />}
        
        {activeTab === 'dashboard' && (
          <TeacherDashboard
            user={user}
            events={events.filter(e => e.organizer === user.displayName)}
          />
        )}
      </main>

      {showForm && (
        <EventForm
          event={selectedEvent}
          onSave={handleSaveEvent}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;
