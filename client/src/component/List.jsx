import React from 'react';
import Transaction from './Transaction';
import { default as api } from '../store/apiSlice';

const List = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery()
  const [deleteTransaction] = api.useDeleteTransactionMutation()

  let Transactions;

  const handleClick = (e) =>{
    if(!e.target.dataset.id) return 0;
    deleteTransaction({_id:e.target.dataset.id})
  }

  if (isFetching) {
    Transactions = <div>Fetching...</div>;
  } else if (isSuccess) {
    Transactions = data.map((v, i) => <Transaction key={i} category={v}  handler={handleClick}></Transaction>);
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  

  return (
    <div className='flex flex-col py-6 gap-3'>
      <h1 className='py-4 font-bold text-xl'>History</h1>
      {Transactions}
    </div>
  );
};

export default List;
