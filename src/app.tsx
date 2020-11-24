import React, { useState } from 'react';

import { Nomination } from './models/nomination';

import { useNomination } from './hooks/useNomination';
import { Form } from './components/form'; 
import { List } from './components/list';    

export default function App() {
  const [selectedNomination, setSelectedNomination] = useState<Nomination>(); 
  const { isError, isLoading, data } = useNomination<Nomination[]>();      

  if(isError){
    return <h1>Something wrong :(</h1>
  }

  if(isLoading){
    return <h1>Loading...</h1>
  }

  return (
    <div>  
      <Form initialData={selectedNomination} />
      <List data={data} onClick={setSelectedNomination} />
    </div>
  );
}