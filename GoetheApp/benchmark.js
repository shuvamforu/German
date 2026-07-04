const mockServers = [];
for (let i = 0; i < 1000; i++) {
  mockServers.push({ id: i.toString(), name: `Server ${i}` });
}

const activeServer = '999';

const startArray = performance.now();
let resultArray;
for (let i = 0; i < 100000; i++) {
  resultArray = mockServers.find(s => s.id === activeServer)?.name;
}
const endArray = performance.now();

const mockServerMap = mockServers.reduce((acc, server) => {
  acc[server.id] = server;
  return acc;
}, {});

const startMap = performance.now();
let resultMap;
for (let i = 0; i < 100000; i++) {
  resultMap = mockServerMap[activeServer]?.name;
}
const endMap = performance.now();

console.log(`Array find: ${(endArray - startArray).toFixed(2)} ms`);
console.log(`Map lookup: ${(endMap - startMap).toFixed(2)} ms`);
