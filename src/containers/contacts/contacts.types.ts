export interface IContact {
  [key: string]: string | number | string[];
  id: string;
  email: string;
  ownerId: string;
  name: string;
  phone: number | string;
  tags: string[];
}
