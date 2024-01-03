import React from 'react';
import Bike from '../../../type/Bike'; // Adjust the import path based on your project structure

interface BikeboxProps {
  bike: Bike;
}

const Bikebox: React.FC<BikeboxProps> = ({ bike }) => {
  return (
    <div className="border border-gray-300 p-4">
      <h2 className="text-lg font-semibold">{bike.model}</h2>
      <p>Serial Number: {bike.serialNumber}</p>
      {/* Add any other bike details you want to display */}
    </div>
  );
};

export default Bikebox;
