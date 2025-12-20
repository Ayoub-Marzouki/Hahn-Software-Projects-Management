import './ConfirmationModal.css';

function ConfirmationModal({ message, onConfirm, onCancel }) {
	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h3>Confirm Action</h3>
				<p>{message}</p>
				<div className="modal-actions">
					<button className="confirm-btn" onClick={onConfirm}>Confirm</button>
					<button className="cancel-btn" onClick={onCancel}>Cancel</button>
				</div>
			</div>
		</div>
	);
}

export default ConfirmationModal;
