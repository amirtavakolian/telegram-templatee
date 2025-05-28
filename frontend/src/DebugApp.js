import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Simple debug component to test if React is working
function DebugApp() {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-primary text-white">
      <div className="text-center">
        <h1>🎉 React is Working!</h1>
        <p>If you see this, React and Bootstrap are loaded correctly.</p>
        <button className="btn btn-light mt-3">
          <i className="bi bi-check-circle me-2"></i>
          Bootstrap Icons Working Too!
        </button>
      </div>
    </div>
  );
}

export default DebugApp;