import { v4 as uuidv4 } from 'uuid';

// Define types
export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type Sale = {
  id: string;
  customerId: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
};

export type Purchase = {
  id: string;
  supplierId: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
};

export type BankTransaction = {
  id: string;
  amount: number;
  date: string;
  type: 'deposit' | 'withdrawal';
  description: string;
};

export type Employee = {
  id: string;
  name: string;
  position: string;
  salary: number;
};

export type Project = {
  id: string;
  name: string;
  status: 'not-started' | 'in-progress' | 'completed';
  startDate: string;
  endDate: string;
};

// Mock database
let contacts: Contact[] = [];
let sales: Sale[] = [];
let purchases: Purchase[] = [];
let bankTransactions: BankTransaction[] = [];
let employees: Employee[] = [];
let projects: Project[] = [];

// Helper functions
export const addItem = <T extends { id: string }>(items: T[], newItem: Omit<T, 'id'>): T => {
  const item = { ...newItem, id: uuidv4() } as T;
  items.push(item);
  return item;
};

export const updateItem = <T extends { id: string }>(items: T[], id: string, updates: Partial<T>): T | null => {
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updates };
  return items[index];
};

export const deleteItem = <T extends { id: string }>(items: T[], id: string): boolean => {
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
};

// Database operations
export const db = {
  contacts: {
    getAll: () => contacts,
    getById: (id: string) => contacts.find(c => c.id === id) || null,
    add: (contact: Omit<Contact, 'id'>) => addItem(contacts, contact),
    update: (id: string, updates: Partial<Contact>) => updateItem(contacts, id, updates),
    delete: (id: string) => deleteItem(contacts, id),
  },
  sales: {
    getAll: () => sales,
    getById: (id: string) => sales.find(s => s.id === id) || null,
    add: (sale: Omit<Sale, 'id'>) => addItem(sales, sale),
    update: (id: string, updates: Partial<Sale>) => updateItem(sales, id, updates),
    delete: (id: string) => deleteItem(sales, id),
  },
  purchases: {
    getAll: () => purchases,
    getById: (id: string) => purchases.find(p => p.id === id) || null,
    add: (purchase: Omit<Purchase, 'id'>) => addItem(purchases, purchase),
    update: (id: string, updates: Partial<Purchase>) => updateItem(purchases, id, updates),
    delete: (id: string) => deleteItem(purchases, id),
  },
  bankTransactions: {
    getAll: () => bankTransactions,
    getById: (id: string) => bankTransactions.find(t => t.id === id) || null,
    add: (transaction: Omit<BankTransaction, 'id'>) => addItem(bankTransactions, transaction),
    update: (id: string, updates: Partial<BankTransaction>) => updateItem(bankTransactions, id, updates),
    delete: (id: string) => deleteItem(bankTransactions, id),
  },
  employees: {
    getAll: () => employees,
    getById: (id: string) => employees.find(e => e.id === id) || null,
    add: (employee: Omit<Employee, 'id'>) => addItem(employees, employee),
    update: (id: string, updates: Partial<Employee>) => updateItem(employees, id, updates),
    delete: (id: string) => deleteItem(employees, id),
  },
  projects: {
    getAll: () => projects,
    getById: (id: string) => projects.find(p => p.id === id) || null,
    add: (project: Omit<Project, 'id'>) => addItem(projects, project),
    update: (id: string, updates: Partial<Project>) => updateItem(projects, id, updates),
    delete: (id: string) => deleteItem(projects, id),
  },
};

// Initialize with some data
db.contacts.add({ name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' });
db.contacts.add({ name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' });

db.sales.add({ customerId: contacts[0].id, amount: 1000, date: '2023-06-01', status: 'completed' });
db.sales.add({ customerId: contacts[1].id, amount: 1500, date: '2023-06-15', status: 'pending' });

db.purchases.add({ supplierId: contacts[0].id, amount: 500, date: '2023-05-20', status: 'completed' });
db.purchases.add({ supplierId: contacts[1].id, amount: 750, date: '2023-06-10', status: 'pending' });

db.bankTransactions.add({ amount: 1000, date: '2023-06-01', type: 'deposit', description: 'Sale payment' });
db.bankTransactions.add({ amount: 500, date: '2023-05-20', type: 'withdrawal', description: 'Supplier payment' });

db.employees.add({ name: 'Alice Johnson', position: 'Manager', salary: 5000 });
db.employees.add({ name: 'Bob Williams', position: 'Developer', salary: 4000 });

db.projects.add({ name: 'Website Redesign', status: 'in-progress', startDate: '2023-05-01', endDate: '2023-07-31' });
db.projects.add({ name: 'Mobile App Development', status: 'not-started', startDate: '2023-07-01', endDate: '2023-10-31' });

