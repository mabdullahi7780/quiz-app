import { useState } from "react";
import "./Modal.css"

function Modal({ onSubmit }){
    const [name, setName] = useState("");

    const handleSubmit = () => {
        if (name.trim()) {
            onSubmit(name);
        }
    };

    return(
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">Enter Your Name</h2>
                <input 
                    type="text" 
                    className="modal-input" 
                    placeholder="Your name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button className="modal-button" onClick={handleSubmit}>
                    Start the Quiz
                </button>
            </div>
        </div>
    )
}
export default Modal;