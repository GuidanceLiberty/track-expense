// src/component/Labels.jsx
import React from 'react';
import LabelComponent from './LabelComponent';
import { useGetLabelsQuery } from '../store/apiSlice';
import { getLabels } from '../helper/Helper';

const Labels = () => {
  const { data, isFetching, isSuccess, isError } = useGetLabelsQuery();
  let content;

  if (isFetching) {
    content = <div>Fetching...</div>;
  } else if (isSuccess && Array.isArray(data)) {
    const labels = getLabels(data); // sync function
    content = labels.map((v, i) => <LabelComponent key={i} data={v} />);
  } else if (isError) {
    content = <div>Error loading labels</div>;
  }

  return <>{content}</>;
};

export default Labels;
