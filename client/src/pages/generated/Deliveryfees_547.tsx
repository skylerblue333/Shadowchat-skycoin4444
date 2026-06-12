// AUTO-GENERATED DRAFT SCREEN: DeliveryFees
import React from 'react';

interface DeliveryFeesProps {
  baseFee: number;
  distance: number;
  itemCount: number;
  isExpress: boolean;
}

const calculateDeliveryFee = (baseFee: number, distance: number, itemCount: number, isExpress: boolean): number => {
  let fee = baseFee;
  fee += distance * 0.5; // 0.5 per unit of distance
  fee += itemCount * 0.1; // 0.1 per item
  if (isExpress) {
    fee *= 1.2; // 20% extra for express delivery
  }
  return parseFloat(fee.toFixed(2));
};

const DeliveryFees: React.FC<DeliveryFeesProps> = ({ baseFee, distance, itemCount, isExpress }) => {
  const deliveryFee = calculateDeliveryFee(baseFee, distance, itemCount, isExpress);

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Delivery Fee Calculation</h2>
      <div className="flex justify-between items-center">
        <span className="text-gray-700 dark:text-gray-300">Base Fee:</span>
        <span className="font-semibold text-gray-900 dark:text-white">${baseFee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-700 dark:text-gray-300">Distance:</span>
        <span className="font-semibold text-gray-900 dark:text-white">{distance} units</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-700 dark:text-gray-300">Item Count:</span>
        <span className="font-semibold text-gray-900 dark:text-white">{itemCount}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-700 dark:text-gray-300">Express Delivery:</span>
        <span className="font-semibold text-gray-900 dark:text-white">{isExpress ? 'Yes' : 'No'}</span>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900 dark:text-white">Total Delivery Fee:</span>
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">${deliveryFee.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default DeliveryFees;
