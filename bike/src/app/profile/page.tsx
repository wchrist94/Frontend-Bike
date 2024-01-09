"use client";
 
import React, { use, useEffect, useState } from 'react';
import Bikebox from '../components/Bikebox';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {

  const [usersList, setUsersList] = useState<any[]>([]); // Provide a type for the usersList state variable

  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ company: session?.user?.company}),
        });
        const data = await res.json();
        const {users} = data;
        console.log(users)
        setUsersList(users);
      } catch (error) {
        console.error(error);
      }
    };
    if (session) fetchUsers();
  }, [session]);

  const handleAddUser = async () => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'test', email: '
    }

  return (
    <div className='grid grid-cols-3 gap-4 mt-20'>
      <div className='col-span-2'>
        Hello {session?.user?.name ?? 'Stranger'} from {session?.user?.company ?? 'Nowhere'}
      </div>
      <div className='sticky top-0 flex flex-col gap-3 border border-2 rounded m-2 '>
        <h2 className='text-center mt-4 font-bold'>Users</h2>
        <ul className='text-center'>
          {usersList.map((user) => (
            <li key={user._id} className='p-4 bg-green-200 rounded m-4'>
              {user.name} - {user.role}
            </li>
          ))}
          <li onClick={test} className='bg-zinc-500 p-4 m-4'>
            + Add User
          </li>
        </ul>
      </div>
    </div>
  );
}
/* interface ProfileProps {
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

export default Profile; */
