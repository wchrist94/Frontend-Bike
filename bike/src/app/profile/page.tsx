"use client";

import React, { useState } from 'react';
import Bikebox from '../components/Bikebox';
import Bike from '../../../type/Bike'; // Adjust the import path based on your project structure
import User from '../../../type/User'; // Adjust the import path based on your project structure
import useUserData from '../../../hook/useUserData';


interface ProfileProps {
  // Add any props if needed
}

const Profile: React.FC<ProfileProps> = () => {
  const { userData, isLoading, errorMessage } = useUserData();
  const [bikes, setBikes] = useState<User['bikes']>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    serialNumber: '',
    model: '',
  });

  const isAdmin = userData?.role === 'admin';

  const handleAddBike = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    // Reset the form data when the dialog is closed
    setFormData({ serialNumber: '', model: '' });
  };

  const handleConfirm = () => {
    // Add logic to generate a unique id for the new bike
    const newBike: Bike = {
      id: Date.now(), // Using timestamp as a simple example; replace with your logic for generating a unique id
      serialNumber: formData.serialNumber,
      model: formData.model,
    };

    setBikes((prevBikes) => [...prevBikes, newBike]);
    setDialogOpen(false);
    // Reset the form data when the dialog is closed
    setFormData({ serialNumber: '', model: '' });
  };

  return (
    <div className='bg-white h-screen flex justify-center items-center'>
      <div className="grid grid-cols-2 gap-4">
        {bikes.map((bike) => (
          <Bikebox key={bike.id} bike={bike} />
        ))}
        {isAdmin && (
          <div className="border border-gray-300 p-4 cursor-pointer" onClick={handleAddBike}>
            + Add Bike
          </div>
        )}
        {isDialogOpen && (
          <div className="dialog-overlay">
            <div className="dialog-content">
              <div className="dialog-header">
                <h2>Add Bike</h2>
                <span className="close" onClick={handleCloseDialog}>
                  &times;
                </span>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                {/* Your form inputs */}
                <input
                  type="text"
                  placeholder="Serial Number"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
                <button type="button" onClick={handleCloseDialog}>
                  Cancel
                </button>
                <button type="button" onClick={handleConfirm}>
                  Confirm
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
