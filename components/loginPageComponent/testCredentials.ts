export interface Credential {
  id: number;
  username: string;
  password: string;
  name: string;
}

export const testCredentials: Credential[] = [
  { id: 1, username: 'emilys', password: 'emilyspass', name: 'Emily Smith' },
  { id: 2, username: 'michaelw', password: 'michaelwpass', name: 'Michael Chen' },
  { id: 3, username: 'sophiab', password: 'sophiabpass', name: 'Sophia Rodriguez' },
  { id: 4, username: 'jamesd', password: 'jamesdpass', name: 'John Doe' },
  { id: 7, username: 'emmaj', password: 'emmajpass', name: 'Emma Johnson' },
  { id: 5, username: 'oliviaw', password: 'oliviawpass', name: 'Olivia Lopez' },
  { id: 6, username: 'alexanderj', password: 'alexanderjpass', name: 'Liam Patel' },
  { id: 8, username: 'avat', password: 'avatpass', name: 'Noah Williams' },
  { id: 9, username: 'isabellad', password: 'isabelladpass', name: 'Isabella Thompson' },
  { id: 11, username: 'charlottem', password: 'charlottempass', name: 'Charlotte King' },
  { id: 20, username: 'williamg', password: 'williamgpass', name: 'William Turner' },
  { id: 17, username: 'evelyns', password: 'evelynspass', name: 'Evelyn Green' },
  { id: 12, username: 'elijahs', password: 'elijahspass', name: 'Elijah Baker' },
  { id: 15, username: 'harpere', password: 'harperepass', name: 'Harper Harris' },

  // these credentials are wrong
  // { id: 10, username: 'jamesm', password: 'jamesmpass', name: 'James Miller' },
  // { id: 13, username: 'ameliac', password: 'ameliacpass', name: 'Amelia Carter' },
  // { id: 14, username: 'lucasw', password: 'lucaswpass', name: 'Lucas White' },
  // { id: 16, username: 'benjamins', password: 'benjaminspass', name: 'Benjamin Scott' },
  // { id: 18, username: 'henryp', password: 'henryppass', name: 'Henry Phillips' },
  // { id: 19, username: 'avagr', password: 'avagrpass', name: 'Ava Gray' },
];