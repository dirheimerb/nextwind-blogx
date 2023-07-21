import React, { useState } from 'react';
import axios from 'axios';
import { BusinessCard } from '@/types/BusinessCard';

export default function BusinessCardForm() {
  const [formState, setFormState] = useState<BusinessCard>({
    id: '',
    userId: '',
    name: '',
    jobTitle: '',
    company: '',
    email: '',
    phoneNumber: '',
    font: '',
    color: '',
    // initialize other fields
  });

  const handleSubmit = async () => {
    await axios.post('/createCard', formState);
    alert('Card created successfully');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formState.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="jobTitle"
        value={formState.jobTitle}
        onChange={handleInputChange}
        placeholder="Job Title"
      />
      <input
        type="text"
        name="company"
        value={formState.company}
        onChange={handleInputChange}
        placeholder="Company"
      />
      <input
        type="text"
        name="email"
        value={formState.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="phoneNumber"
        value={formState.phoneNumber}
        onChange={handleInputChange}
        placeholder="Phone Number"
      />
      <input
        type="text"
        name="font"
        value={formState.font}
        onChange={handleInputChange}
        placeholder="Font"
      />
      <input
        type="text"
        name="color"
        value={formState.color}
        onChange={handleInputChange}
        placeholder="Color"
      />
      {/* Add inputs for other fields */}
      <button type="submit">Create</button>
    </form>
  );
}
