// Mock data — delete once services/api.js talks to your backend.
export const COL = [['#7c3aed','#ec4899'],['#0ea5e9','#6366f1'],['#f97316','#ef4444'],['#10b981','#0ea5e9'],['#f43f5e','#a855f7'],['#eab308','#f97316'],['#14b8a6','#6366f1'],['#8b5cf6','#06b6d4']]
export const SONGS = [
  ['Tum Se Hi','Mohit Chauhan','Jab We Met',268],['Kun Faya Kun','A.R. Rahman','Rockstar',472],['Channa Mereya','Arijit Singh','Ae Dil Hai Mushkil',289],
  ['Raabta','Arijit Singh','Agent Vinod',243],['Agar Tum Saath Ho','Alka Yagnik','Tamasha',341],['Kabira','Tochi Raina','Yeh Jawaani Hai Deewani',224],
  ['Ilahi','Arijit Singh','Yeh Jawaani Hai Deewani',228],['Pee Loon','Mohit Chauhan','Once Upon a Time in Mumbaai',279],['Phir Le Aya Dil','Arijit Singh','Barfi!',249],['Tere Bina','A.R. Rahman','Guru',330],
].map(([title, artist, album, dur], id) => ({ id, title, artist, album, dur, c: COL[id % 8], streamUrl: null }))
export const PLAYLISTS = [{ id: 1, name: 'Late Night Drive', c: COL[1], count: 24 }, { id: 2, name: 'Rainy Evenings', c: COL[3], count: 18 }, { id: 3, name: 'Heartstrings', c: COL[4], count: 31 }, { id: 4, name: 'Focus Flow', c: COL[6], count: 40 }]
export const ME = { id: 'me', name: 'Aftab', initial: 'A', c: COL[0] }
export const FRIEND = { id: 'u2', name: 'Sonali', initial: 'S', c: COL[2] }
