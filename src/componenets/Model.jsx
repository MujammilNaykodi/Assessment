import React, { useState } from 'react';
import '../style/modal.css';

const Model = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const [subReasons, setSubReasons] = useState({
    interruptedAborted: '',
    gotDisconnected: false,
  });

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleSubReasonChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSubReasons({
      ...subReasons,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ selectedReason, subReasons });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="radio"
              value="Class completed"
              checked={selectedReason === 'Class completed'}
              onChange={handleReasonChange}
            />
            Class completed
          </label>

          <label>
            <input
              type="radio"
              value="Class interrupted/aborted"
              checked={selectedReason === 'Class interrupted/aborted'}
              onChange={handleReasonChange}
            />
            Class interrupted/aborted
          </label>

          {selectedReason === 'Class interrupted/aborted' && (
            <div className="sub-reasons">
              <label>
                <input
                  type="checkbox"
                  name="studentNoShow"
                  checked={subReasons.studentNoShow}
                  onChange={handleSubReasonChange}
                />
                Student didn't show up for the class.
              </label>
              <label>
                <input
                  type="checkbox"
                  name="studentNoInterest"
                  checked={subReasons.studentNoInterest}
                  onChange={handleSubReasonChange}
                />
                Student didn't show any interest.
              </label>
              <label>
                <input
                  type="checkbox"
                  name="studentDisconnected"
                  checked={subReasons.studentDisconnected}
                  onChange={handleSubReasonChange}
                />
                Student got disconnected.
              </label>
            </div>
          )}

          <label>
            <input
              type="radio"
              value="I got disconnected"
              checked={selectedReason === 'I got disconnected'}
              onChange={handleReasonChange}
            />
            I got disconnected
          </label>

          <label>
            <input
              type="radio"
              value="Other reason"
              checked={selectedReason === 'Other reason'}
              onChange={handleReasonChange}
            />
            Other reason
          </label>

          <div className="actions">
            <button type="submit">End Class</button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Model;