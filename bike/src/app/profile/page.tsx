"use client";
 
import React, { use, useEffect, useState } from 'react';
import Bikebox from '../components/Bikebox';
import { useSession } from 'next-auth/react';
import { Card, Image, CardBody, CardFooter, RadioGroup, Radio, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { set } from 'mongoose';

export default function ProfilePage() {

  const [usersList, setUsersList] = useState<any[]>([]); 

  const { data: session } = useSession();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const [selectedRole, setSelectedRole] = useState('');

  const selectedValue = React.useMemo(() => Array.from(selectedRole).join(', ').replaceAll("_", " "), [selectedRole]
  );

  const list = [
    {
      title: "Bike A",
      img: "https://www.creativefabrica.com/wp-content/uploads/2021/03/07/Cute-hand-drawn-Bicycle-or-bike-icon-Graphics-9292804-1-580x387.jpg",
      status: "Active",
    },
    {
      title: "Bike B",
      img: "https://www.creativefabrica.com/wp-content/uploads/2021/03/07/Cute-hand-drawn-Bicycle-or-bike-icon-Graphics-9292804-1-580x387.jpg",
      status: "Active",
    },
    {
      title: "Bike C",
      img: "https://www.creativefabrica.com/wp-content/uploads/2021/03/07/Cute-hand-drawn-Bicycle-or-bike-icon-Graphics-9292804-1-580x387.jpg",
      status: "Active",
    },
    {
      title: "Bike D",
      img: "https://www.creativefabrica.com/wp-content/uploads/2021/03/07/Cute-hand-drawn-Bicycle-or-bike-icon-Graphics-9292804-1-580x387.jpg",
      status: "Active",
    },
  ];

  const getBackgroundColorClass = (role :String) => {
    switch (role) {
      case 'Manager':
        return 'bg-red-500';
      case 'Developer':
        return 'bg-blue-500';
      case 'Tester':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

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

  useEffect(() => {
    if (session) fetchUsers();
  }, [session]);

  const handleAddUser = async (name : String, email : String, password : String) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, company: session?.user?.company, role: selectedRole}),
      });
      onOpenChange();
      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='grid grid-cols-4 gap-4 mt-20'>
      <div className='col-span-3'>
        <div className='grid grid-cols-2 gap-4'>
          {list.map((item, index) => (
            <Card shadow='sm' key={index} isPressable onPress={() => console.log("Pressed")}>
              <CardBody className='overflow-visible p-0'>
                <Image
                  shadow='sm'
                  radius='lg'
                  width = "100%"
                  alt = {item.title}
                  className="w-full object-cover h-[140px]"
                  src = {item.img}
                />
              </CardBody>
              <CardFooter className='text-small justify-between'>
                <b>{item.title}</b>
                <p className='text-default-500'>{item.status}</p>
              </CardFooter>
            </Card>
          ))}
          <Card shadow='sm' isPressable onPress={() => console.log("Pressed")}>
          <CardBody className='overflow-visible p-0'>
              <span className="shadow-sm radius-lg width-100% w-full object-cover h-[140px] flex justify-center items-center text-xl font-bold">+ Add Bike</span>
          </CardBody>
          </Card>
        </div>
      </div>
      <div className='sticky top-0 flex flex-col gap-3 border border-2 rounded m-2 '>
        <h2 className='text-center mt-4 font-bold'>Users</h2>
        <ul className='text-center'>
          {usersList.map((user) => (
            <li key={user._id} className={`p-4 ${getBackgroundColorClass(user.role)} rounded m-4`}>
              {user.name} - {user.role}
            </li>
          ))}
          <Button onPress={onOpen} className='p-4 mb-2' color='primary' variant='ghost'>
            + Add User
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
            <ModalContent>
              {(onClose) => (
                <>
                <div className='items-center'>
                  <ModalHeader>Add User</ModalHeader>
                </div>
                <ModalBody>
                  <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                    <input type='text' placeholder='Name' className='rounded' onChange={(e) => setName(e.target.value)}/>
                    <input type='text' placeholder='Email'className='rounded' onChange={(e) => setEmail(e.target.value)}/>
                    <input type='text' placeholder='Password'className='rounded' onChange={(e) => setPassword(e.target.value)} />
                    <RadioGroup
                      value={selectedRole}
                      onValueChange={setSelectedRole}
                      orientation='horizontal'
                    >
                      <Radio value="Manager">Manager</Radio>
                      <Radio value="Developer">Developer</Radio>
                      <Radio value="Tester">Tester</Radio>
                    </RadioGroup>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose} color='danger'>Cancel</Button>
                  <Button onClick={() => handleAddUser(name,email,password)}  color="primary">Confirm</Button>
                </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
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
