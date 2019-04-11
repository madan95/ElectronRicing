const os = require('os');
const username = os.userInfo().username;
const remote = require('electron').remote;

const $close = document.querySelector('.close');
const $memory = document.querySelector('.memory');
const $username = document.querySelector('.username');

function init() {
  timeout();
  $memory.innerHTML = getFreeMemoryGB() + "GB.";
  $username.innerHTML = username;
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
    }, 30000);
}

function getFreeMemoryGB(){
  let memory = process.getSystemMemoryInfo();
  let memory_gb = (memory['free']/1000000).toFixed(2);
  return memory_gb;
}

init();
