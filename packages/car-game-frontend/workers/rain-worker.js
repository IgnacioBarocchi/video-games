const rainHeight = 4.5;

function updateRaindrops(raindrops, delta) {
  for (let i = 0; i < raindrops.length; i++) {
    const drop = raindrops[i];
    drop.position.y -= delta * 5;
    if (drop.position.y <= 0) {
      drop.position.y = rainHeight;
    }
  }
  return raindrops;
}

self.addEventListener('message', (event) => {
  const { raindrops, delta } = event.data;
  const updatedDrops = updateRaindrops(raindrops, delta);
  self.postMessage(updatedDrops);
});


// // const rainHeight = 4.5;

// // self.onmessage = function(event) {
// //   alert("a worker!")
// //   const { numDrops, delta } = event.data;

// //   const updatedPositions = [];

// //   for (let i = 0; i < numDrops; i++) {
// //     const position = event.data.positions[i];
// //     position.y -= delta * 5;
// //     if (position.y <= 0) {
// //       position.y = rainHeight;
// //     }
// //     updatedPositions.push(position);
// //   }

// //   postMessage({ updatedPositions });
// // };



// // RainWorker.js
// const rainHeight = 4.5;

// self.onmessage = function(event) {
//   const { numDrops, delta, positions } = event.data;

//   const updatedPositions = positions.map(position => {
//     position.y -= delta * 5;
//     if (position.y <= 0) {
//       position.y = rainHeight;
//     }
//     return position;
//   });

//   postMessage({ updatedPositions });
// };
