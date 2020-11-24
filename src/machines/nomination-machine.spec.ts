import { createMachine } from './nomination-machine'; 

describe('Nomination State Machine', () => {  
  
  
  describe('Idle State', () => {  
    it(`should reach "draft" given "idle" when the createDraft event occurs`, () => { 
      const actualState = createMachine().transition('idle', 'createDraft');
      expect(actualState.matches('draft')).toBeTruthy();
    }); 
  });

  describe('Draft State', () => {  
    it(`should reach "nominated" given "draft" when the nominate event occurs`, () => { 
      const actualState = createMachine().transition('draft', 'nominate');
      expect(actualState.matches('nominated')).toBeTruthy();
    });
    
    it(`should reach "cancelled" given "draft" when the cancel event occurs`, () => { 
      const actualState = createMachine().transition('draft', 'cancel');
      expect(actualState.matches('canceled')).toBeTruthy();
    });  
  });
  describe('Nominated State', () => {  
    it(`should reach "renominated" given "draft" when the renominate event occurs`, () => { 
      const actualState = createMachine().transition('nominated', 'renominate');
      expect(actualState.matches('renominated')).toBeTruthy();
    });
    
    it(`should reach "canceled" given "draft" when the nominate event occurs`, () => { 
      const actualState = createMachine().transition('nominated', 'cancel');
      expect(actualState.matches('canceled')).toBeTruthy();
    });  
  }); 

  describe('Renominated State', () => {  
    it(`should reach "renominated" given "renominated" when the renominate event occurs`, () => { 
      const actualState = createMachine().transition('renominated', 'renominate');
      expect(actualState.matches('renominated')).toBeTruthy();
    });
    
    it(`should reach "cancelled" given "renominated" when the cancel event occurs`, () => { 
      const actualState = createMachine().transition('renominated', 'cancel');
      expect(actualState.matches('canceled')).toBeTruthy();
    });  
  });
});
