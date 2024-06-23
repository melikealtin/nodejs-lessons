const os = require("os");
const fs = require("fs");

function pcInfo() {
  const freeMemoryGB = formatBytes(os.freemem());
  const totalMemoryGB = formatBytes(os.totalmem());
  const usedMemoryGB = (totalMemoryGB - freeMemoryGB).toFixed(2);

  const cpuCount = os.cpus().length;

  fs.writeFile("pc-info.txt", generatePcInfo(), (err) => {
    if (err) {
      console.error("error", err);
    } else {
      console.log("pc info saved to pc-info.txt");
    }
  });

  function formatBytes(bytes) {
    return (bytes / 1024 / 1024 / 1024).toFixed(2);
  }

  function generatePcInfo() {
    return `Total RAM: ${totalMemoryGB}GB | Used RAM: ${usedMemoryGB}GB | Free RAM: ${freeMemoryGB}GB | CPU Count: ${cpuCount}`;
  }
}

exports.pcInfo = pcInfo;
