export interface Credential {
  id: number;
  username: string;
  password: string;
  name: string;
}

export const testCredentials: Credential[] = [
  { id: 1, username: 'emilys', password: 'emilyspass', name: 'Emily Smith' },
  { id: 2, username: 'michaelc', password: 'michaelcpass', name: 'Michael Chen' },
  { id: 3, username: 'sophiar', password: 'sophiarpass', name: 'Sophia Rodriguez' },
  { id: 4, username: 'johnd', password: 'johndpass', name: 'John Doe' },
  { id: 5, username: 'olivial', password: 'olivialpass', name: 'Olivia Lopez' },
  { id: 6, username: 'liamp', password: 'liamppass', name: 'Liam Patel' },
  { id: 7, username: 'emmaj', password: 'emmajpass', name: 'Emma Johnson' },
  { id: 8, username: 'noahw', password: 'noahwpass', name: 'Noah Williams' },
  { id: 9, username: 'isabellat', password: 'isabellatpass', name: 'Isabella Thompson' },
  { id: 10, username: 'jamesm', password: 'jamesmpass', name: 'James Miller' }
];