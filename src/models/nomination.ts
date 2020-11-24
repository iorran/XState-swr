export enum NominationStatus {
    idle = 'idle', 
    draft= 'draft', 
    nominated = 'nominated', 
    renominated = 'renominated', 
    canceled = 'canceled'
  }

export interface Nomination {
    id: number,
    quantity: number,
    status: NominationStatus
}