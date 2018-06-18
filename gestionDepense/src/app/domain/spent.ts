

export class Spent {
  id: number;
  name: string;
  description: string;
  amount: number;
  date: string;
  spents: any[];

  constructor( id: number, name: string, description: string, amount: number, date: string, spents: any[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.spents = spents;
    this.date = date;
  }
}
