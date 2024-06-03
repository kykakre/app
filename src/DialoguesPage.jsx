import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DialoguesPage = () => {
  const [dialogues, setDialogues] = useState([]);
  const [filteredDialogues, setFilteredDialogues] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [companyFilter, setCompanyFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [selectedDialogue, setSelectedDialogue] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/dialogues')
      .then(response => {
        setDialogues(response.data);
        setFilteredDialogues(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the dialogues!', error);
      });
  }, []);

  const filterDialogues = () => {
    let filtered = dialogues;
    if (startDate) {
      filtered = filtered.filter(dialogue => new Date(dialogue.start_time) >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter(dialogue => new Date(dialogue.start_time) <= endDate);
    }
    if (companyFilter) {
      filtered = filtered.filter(dialogue => dialogue.company.includes(companyFilter));
    }
    if (employeeFilter) {
      filtered = filtered.filter(dialogue => dialogue.employee.includes(employeeFilter));
    }
    setFilteredDialogues(filtered);
  };

  const handleDialogueClick = (dialogue) => {
    setSelectedDialogue(dialogue);
    setShowModal(true);
  };

  const sortedDialogues = [...filteredDialogues].sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

  const dialoguesByDate = dialogues.reduce((acc, dialogue) => {
    const date = dialogue.start_time.split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(dialoguesByDate).map(date => ({
    date,
    count: dialoguesByDate[date],
  }));

  return (
    <div>
      <h1>Dialogues</h1>
      <div className="filters">
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} placeholderText="Start Date" />
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} placeholderText="End Date" />
        <input
          type="text"
          placeholder="Filter by company"
          value={companyFilter}
          onChange={e => setCompanyFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by employee"
          value={employeeFilter}
          onChange={e => setEmployeeFilter(e.target.value)}
        />
        <Button onClick={filterDialogues}>Apply Filters</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={() => setFilteredDialogues([...sortedDialogues].reverse())}>Start Time</th>
            <th>Last Message Time</th>
            <th>Company</th>
            <th>Employee</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {sortedDialogues.map(dialogue => (
            <tr key={dialogue.id} onClick={() => handleDialogueClick(dialogue)}>
              <td>{dialogue.id}</td>
              <td>{new Date(dialogue.start_time).toLocaleString()}</td>
              <td>{new Date(dialogue.last_message_time).toLocaleString()}</td>
              <td>{dialogue.company}</td>
              <td>{dialogue.employee}</td>
              <td>{dialogue.comments}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Dialogue Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDialogue && (
            <div>
              <p><strong>ID:</strong> {selectedDialogue.id}</p>
              <p><strong>Start Time:</strong> {new Date(selectedDialogue.start_time).toLocaleString()}</p>
              <p><strong>Last Message Time:</strong>                {new Date(selectedDialogue.last_message_time).toLocaleString()}</p>
              <p><strong>Company:</strong> {selectedDialogue.company}</p>
              <p><strong>Employee:</strong> {selectedDialogue.employee}</p>
              <p><strong>Comments:</strong> {selectedDialogue.comments}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <h2>Dialogues Over Time</h2>
      <LineChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default DialoguesPage;

