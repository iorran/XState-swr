import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useMachine } from '@xstate/react'; 

import { Nomination, NominationStatus } from "../models/nomination"; 
import { AvailableEvents, machine } from "../machines/nomination-machine";
 
interface FormProps {
  initialData?: Nomination
}

// @ts-ignore
const persistedState = JSON.parse(window.localStorage.getItem('some-persisted-state-key')) || machine.initialState;
 
export function Form({ initialData }: FormProps) { 
  const { register, handleSubmit, errors, reset } = useForm<Partial<Nomination>>({ defaultValues: initialData });
 
  const [current, send] = useMachine(machine, { 
    state: persistedState,
    devTools: true 
  });    

  useEffect(() => reset(initialData) , [initialData, reset])

  const onSubmit = (nomination: Partial<Nomination>, event: string) => {   
    switch (event) {
      case AvailableEvents.createDraft: 
        send({ type: AvailableEvents.createDraft, nomination: {...nomination, status: NominationStatus.draft } })
      break;  
      case AvailableEvents.nominate: 
        send({ type: AvailableEvents.nominate, nomination: {...nomination, status: NominationStatus.nominated } })
      break; 
      case AvailableEvents.renominate: 
        send({ type: AvailableEvents.renominate, nomination: {...nomination, status: NominationStatus.renominated } })
      break; 
      case AvailableEvents.cancel:  
        send({ type: AvailableEvents.cancel, nomination: {...nomination, status: NominationStatus.canceled } })
      break; 
    }
  }

  function execute(event: string) {
    handleSubmit((data) => onSubmit(data, event))();
  }
  
  return ( 
    <div> 
      <div>
        Quantity: <input name="quantity" ref={register} />  
        {errors.quantity && <span>This field is required</span>} 
      </div>
      <div> 
        {
          current.nextEvents.map(event => {
            return (
              <React.Fragment key={event}> 
                <button onClick={() => execute(event)}>{event}</button>
              </React.Fragment>
            )
          })
        }
      </div>
    </div>
  );
}