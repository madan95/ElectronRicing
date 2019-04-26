const os = require('os');
const username = os.userInfo().username;
const remote = require('electron').remote;
const disk = require('diskusage');

const path = os.platform() === 'win32' ? 'c:' : '/';
const $close = document.querySelector('.close');
const $memory = document.querySelector('.memory');
const $username = document.querySelector('.username');
const $diskusage = document.querySelector('.diskusage');

function init() {
  timeout();
  $memory.innerHTML = getFreeMemoryGB() + "GB.";
  $username.innerHTML = username;
  disk.check(path)
    .then(info => { $diskusage.innerHTML = `${byteToGigaByte(info.free)}GB free out of ${byteToGigaByte(info.total)}GB`;})
    .catch(err => console.error(err))
  $close.addEventListener('click', () => { let currentWindow = remote.getCurrentWindow(); currentWindow.close(); });
}


function timeout() {
    setTimeout(function () {
      let memory_gb = getFreeMemoryGB();
      if (memory_gb < 5) {
        alert('Stop what you are doing, Memory low. Currently free memory: '+ memory_gb + 'GB');
      }
      document.querySelector('.memory').innerHTML = memory_gb + "GB.";
      timeout();
    }, 3000);
}

function getFreeMemoryGB(){
  let memory = process.getSystemMemoryInfo();
  let memory_gb = (memory['free']/1000000).toFixed(2);
  return memory_gb;
}

function byteToGigaByte(b) {
  return (b/1073741824).toFixed(0);
}

init();
