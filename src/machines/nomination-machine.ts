import { Machine, EventObject  } from 'xstate';  

import { Nomination, NominationStatus } from "../models/nomination";
  
export enum AvailableEvents {
  createDraft= 'createDraft', 
  nominate = 'nominate', 
  renominate = 'renominate', 
  cancel = 'cancel'
}
export interface Event extends EventObject {
  type: keyof typeof AvailableEvents;
  nomination: Partial<Nomination>;
} 

export interface State {
  states: {
    [NominationStatus.idle]: {
      states: { 
        [NominationStatus.draft]: {} 
      }
    };
    [NominationStatus.draft]: {
      states: { 
        [NominationStatus.nominated]: {}, 
        [NominationStatus.canceled]: {} 
      }
    };
    [NominationStatus.nominated]: {
      states: { 
        [NominationStatus.renominated]: {}, 
        [NominationStatus.canceled]: {} 
      }
    };
    [NominationStatus.renominated]: { 
      states: { 
        [NominationStatus.canceled]: {} 
      }
    }; 
    [NominationStatus.canceled]: {
      states: {}
    };
  };
}; 
 
export interface Context {
  nomination?: Nomination
}
  
export const machine = Machine<Context, State, Event>(
  {
    id: `nomination`,
    initial: NominationStatus.idle, 
    states: {  
      idle: {  
        on: {  
          [AvailableEvents.createDraft]: {
            target: NominationStatus.draft,
            actions: ['createNomination'],
            cond: canCreateDraft
          }
        }
      },
      draft: {
        on: { 
          [AvailableEvents.nominate]: { 
            target: NominationStatus.nominated,
            actions: ['updateNomination'],
            cond: canNominate 
          }, 
          [AvailableEvents.cancel]: { 
            target: NominationStatus.canceled,
            actions: ['updateNomination'],
            cond: canCancel 
          } 
        }
      },
      nominated: { 
        on: { 
          [AvailableEvents.renominate]: { 
            target: NominationStatus.renominated,
            actions: ['updateNomination'],
            cond: canRenominate
          }, 
          [AvailableEvents.cancel]: { 
            target: NominationStatus.canceled,
            actions: ['updateNomination'],
            cond: canCancel
          } 
        }
      },
      renominated: {
        on: { 
          [AvailableEvents.renominate]: { 
            target: NominationStatus.renominated,
            actions: ['updateNomination'],
            cond: canRenominate
          }, 
          [AvailableEvents.cancel]: { 
            target: NominationStatus.canceled,
            actions: ['updateNomination'],
            cond: canCancel
          } 
        }
      },
      canceled: {
        type: 'final'
      }
    },
  },
  {
    actions: {  
      createNomination: async (context: Context, event: Event) => {    
        await fetch('/api/nominations', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ nomination: event.nomination})
        });    
        // TODO: mutate cache
      }, 
      updateNomination: async (context: Context, event: Event) => {  
        await fetch('/api/nominations', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ nomination: event.nomination})
        });    
        // TODO: mutate cache
      }, 
    }
  }
); 

function canCreateDraft (context: Context, event: Event) { 
  return true;
  //return !event.nomination.id && event.nomination.status === NominationStatus.idle; 
}

function canRenominate (context: Context, event: Event) { 
  return true;
//return !!event.nomination.id && !!event.nomination.status &&
 // [NominationStatus.nominated, NominationStatus.renominated].includes(event.nomination.status);
}

function canNominate (context: Context, event: Event) { 
  return true;
  //return !!event.nomination.id && event.nomination.status === NominationStatus.draft;
}

function canCancel (context: Context, event: Event) {
  return true;
  //return !!event.nomination.id && !!event.nomination.status &&
 // [NominationStatus.draft, NominationStatus.nominated, NominationStatus.renominated].includes(event.nomination.status);
}