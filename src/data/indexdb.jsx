import Dexie from 'dexie';

export const indexdb = new Dexie('myDatabase');
indexdb.version(1).stores({
  videos: 'id, chunks', // Primary key and indexed props
});