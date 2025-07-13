import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import Labels from './Labels';
import { chart_Data, getTotal } from '../helper/Helper';
import { default as api } from '../store/apiSlice';

Chart.register(ArcElement);

const Graph = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  let graphContent;

  if (isFetching) {
    graphContent = <div>Fetching...</div>;
  } else if (isError) {
    graphContent = <div>Error loading chart</div>;
  } else if (isSuccess && Array.isArray(data)) {
    graphContent = (
      <div className='w-[200px] h-[200px] mx-auto'>
        <Doughnut {...chart_Data(data)} options={{ cutout: '70%' }} />
      </div>
    );
  }

  return (
    <div className='flex justify-center max-w-xs mx-auto'>
      <div className='item'>
        <div className='chart relative'>
          {graphContent}
          <h3 className='mb-4 font-bold title text-center'>
            Total
            <span className='block text-3xl text-emerald-400'>
              ${getTotal(data) ?? 0}
            </span>
          </h3>
        </div>

        <div className='flex flex-col py-10 gap-4'>
          <Labels />
        </div>
      </div>
    </div>
  );
};

export default Graph;
