var btn = document.getElementById("btn");
var algorithmValue = "fifo";

btn.addEventListener("click", function (e) {
  e.preventDefault();
    var frame = document.getElementById("frame").value;
  var arrayValue = document.getElementById("arr").value.split(" ");
  fifo(Number(frame), arrayValue);
});

//grid view
async function gridview(frame, arr, affectedIndex = null, isHit = false) {
    //  ////////////////////////////////////////
var table = document.getElementById("grid1");
table.innerHTML = ""; 
// Create the header row
var header = table.createTHead();
var headerRow = header.insertRow();
for (var i = 0; i < frame; i++) {
    var headerCell = document.createElement("th");
    headerCell.innerHTML = `Frame ${i + 1}`;
    headerRow.appendChild(headerCell);
}
/////////////////////////////////////////////
  var table = document.getElementById("grid");
  var row = table.insertRow(); 
  
  for (var i = 0; i < frame; i++) {
      var cell = row.insertCell(i);
      cell.innerHTML = arr[i];

      if (i === affectedIndex) {
        cell.classList.add(isHit ? "blink-green" : "blink-red");
    }
	await new Promise((resolve) =>
  setTimeout(() => {
  resolve();
  },600))
  }
}

// FIFO ALGORITHM
async function fifo(n, element) {
//   console.log(n, element);
  let res = new Array(n).fill('*');
  let pos = 0;
  let hit = 0;
  let miss = 0;
  for (let i of element) {
    let affectedIndex = res.indexOf(i); // Check if the element is already in the frame
    let isHit = affectedIndex !== -1;
    console.log(isHit)

    if (!isHit) {
        res[pos] = i;
        affectedIndex = pos;
        pos = (pos + 1) % n;
        miss++;
    } else {
        hit++;
    }
    await gridview(n, res, affectedIndex, isHit);
	await new Promise((resolve) =>
  setTimeout(() => {
  resolve();
  },(n+1)*600))
  }

//   console.log("Hit: " + hit);
//   console.log("Miss: " + miss);
  let hitRatio = hit / (hit + miss);
  let missRatio = miss / (hit + miss);
//   console.log("Hit Ratio: " + hitRatio);
//   console.log("Miss Ratio: " + missRatio);
  document.getElementById("hits").innerHTML = "Hit: " + hit;
  document.getElementById("miss").innerHTML = "Miss: " + miss;
  document.getElementById("ratioh").innerHTML = "Hit Ratio: " + (hit / (hit + miss)).toFixed(2);
  document.getElementById("ratiom").innerHTML = "Miss Ratio: " + (miss / (hit + miss)).toFixed(2);


  // Create the chart
  createChart(hit, miss);

}


// Function to create the chart
function createChart(hit, miss) {
    const ctx = document.getElementById('hitMissChart').getContext('2d');
    const hitMissChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Hits', 'Misses'],
            datasets: [{
                label: 'Hit and Miss Count',
                data: [hit, miss],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const label = tooltipItem.label || '';
                            const value = tooltipItem.raw || 0;
                            return `${label}: ${value}`;
                        }
                    }
                }
            }
        }
    });
}

