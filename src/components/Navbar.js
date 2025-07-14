import React, { useState } from "react";
import { User, LogOut, X, Menu } from "react-feather";
import './Navbar.css';

const Navbar = ({ user, onSignOut, activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-title">CampusSphere</div>

        {/* Desktop Menu */}
        <div className="navbar-links hide-on-mobile">
          <button
            className={`navbar-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button
            className={`navbar-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            AI Assistant
          </button>
          {user?.email.includes('teacher') && (
            <button
              className={`navbar-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
          )}
          <div className="navbar-user">
            <User size={16} />
            <span>{user?.displayName}</span>
            <button onClick={onSignOut} title="Sign Out">
              <LogOut size={14} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="show-on-mobile">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-btn"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu show-on-mobile">
          <button
            className={activeTab === 'events' ? 'active' : ''}
            onClick={() => { setActiveTab('events'); setIsMenuOpen(false); }}
          >
            Events
          </button>
          <button
            className={activeTab === 'chat' ? 'active' : ''}
            onClick={() => { setActiveTab('chat'); setIsMenuOpen(false); }}
          >
            AI Assistant
          </button>
          {user?.email.includes('teacher') && (
            <button
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => { setActiveTab('dashboard'); setIsMenuOpen(false); }}
            >
              Dashboard
            </button>
          )}
          <div className="user-section">
            <div className="navbar-user">
              <User size={14} />
              <span>{user?.displayName}</span>
            </div>
            <div className="signout-btn" onClick={onSignOut}>
              <LogOut size={14} />
              <span>Sign Out</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
