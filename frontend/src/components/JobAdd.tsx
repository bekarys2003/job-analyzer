// src/pages/AddJob.tsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface AddJobProps {
    onJobAdded: () => void;
}

export const AddJob = ({ onJobAdded }: AddJobProps) => {
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [dateApplied, setDateApplied] = useState('');
    const [status, setStatus] = useState('');
    const [link, setLink] = useState('');
    const [notes, setNotes] = useState('');

    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let finalLink = link.trim();
            if (finalLink !== '' && !finalLink.startsWith('http://') && !finalLink.startsWith('https://')) {
                finalLink = 'https://' + finalLink;
            }
            await axios.post('jobs/add/', {
                company_name: companyName,
                position: position,
                date_applied: dateApplied,
                status: status,
                link: finalLink === '' ? null : finalLink,
                notes:  notes.trim() === '' ? null : notes,
                });

            onJobAdded(); // after success, redirect to home (you can customize)
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add New Job</h2>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Company Name</label>
                    <input type="text" className="form-control"
                        value={companyName} onChange={e => setCompanyName(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label>Position</label>
                    <input type="text" className="form-control"
                        value={position} onChange={e => setPosition(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label>Date Applied</label>
                    <input type="date" className="form-control"
                        value={dateApplied} onChange={e => setDateApplied(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label>Status</label>
                    <select
                        className="form-control"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        required>
                        <option value="" disabled>Select status</option> {/* 🔥 disabled empty option */}
                        <option value="applied">Applied</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Job Link</label>
                    <input
                        type="text"
                        className="form-control"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Notes</label>
                    <textarea className="form-control"
                        value={notes} onChange={e => setNotes(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Add Job</button>
            </form>
        </div>
    );
};
