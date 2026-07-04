import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './ProfileModal.module.css';

export const ProfileModal = () => {
  const { user, showProfileModal, closeProfileModal, logout } = useAuth();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showProfileModal) return;

      if (e.key === 'Escape') {
        closeProfileModal();
      }

      // Strict Focus Trap
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showProfileModal, closeProfileModal]);

  useEffect(() => {
    if (showProfileModal && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [showProfileModal]);

  const handleProceed = () => {
    closeProfileModal();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div 
      className={`${styles.modalOverlay} ${showProfileModal ? styles.open : ''}`}
      onClick={closeProfileModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      <div 
        className={styles.modalContainer} 
        ref={modalRef} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          ref={closeButtonRef}
          className={styles.closeButton} 
          onClick={closeProfileModal}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <img 
          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3b82f6&color=fff`} 
          alt={`${user.name}'s avatar`} 
          className={styles.avatar} 
        />
        
        <h2 id="profile-modal-title" className={styles.userName}>{user.name}</h2>
        <p className={styles.userEmail}>{user.email}</p>
        
        <div className={styles.userRole}>
          {user.role}
        </div>
        
        <div className={styles.loginTimestamp}>
          Session started at: {new Date(user.loginTime).toLocaleTimeString()}
        </div>
        
        <button className={styles.primaryButton} onClick={handleProceed}>
          Proceed to Homepage
        </button>
        
        <button 
          className={styles.secondaryButton} 
          onClick={() => {
            closeProfileModal();
            logout();
            navigate('/login');
          }}
          style={{ marginTop: '0.75rem', background: 'transparent', color: 'var(--text-secondary, #475569)', border: 'none', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline' }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
