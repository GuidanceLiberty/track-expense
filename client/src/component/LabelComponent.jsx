import React from 'react';

const LabelComponent = ({ data }) => {
  if (!data) return null;

  return (
    <div className='labels flex justify-between items-center mb-2'>
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded-full"
          style={{ background: data.color ?? '#f9c74f' }}
        ></div>
        <h3 className='text-md text-gray-700'>{data.type ?? ''}</h3>
      </div>
      <h3 className='font-bold text-gray-900'>{Math.round(data.percent) ?? 0}%</h3>
    </div>
  );
};

export default LabelComponent;
