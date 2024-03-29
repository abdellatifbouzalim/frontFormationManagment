export class Adherent {
    id: number;
    firstName: string;
    lastName: string;
  
    constructor(id: number, firstName: string, lastName: string, startDate: Date, endDate: Date) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
    }

  }
  