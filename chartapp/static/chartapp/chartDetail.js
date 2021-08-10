const objectDataArray = objectData.split('|');
const objectColorArray = objectColor.split('|');
const objectInnerArray = objectInnerLabels.split('|');

function controlChart(type, array1, array2, array3, label){
  const ctx = document.getElementById('canvas');
  const bdColor = type === 'line' ? array3[0] : 'rgba(0,0,0,0.1)';
  const myChart = new Chart(ctx, {
      type: type,
      data: {
          labels: array1,
          datasets: [{
              label: label,
              data: array2,
              backgroundColor: array3,
              borderColor: bdColor,
          }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
  });
};
controlChart(objectType, objectInnerArray, objectDataArray, objectColorArray, objectLabel)

const formParent = document.getElementById("form-parent")
const formChart = document.getElementsByClassName('form-chart')[0];
formChart.remove()

function loadChart(array1, array2, array3, type) {
  for (let i = 0; i < array1.length; i++){
    let cln = formChart.cloneNode(true);
    cln.getElementsByClassName('numbering')[0].innerHTML = i + 1;
    cln.getElementsByClassName('label-form')[0].value = array1[i];
    cln.getElementsByClassName('data-form')[0].value = array2[i];
    cln.getElementsByClassName('color-form')[0].value = array3[i];
    formParent.appendChild(cln);
  };

  var types = document.getElementsByName('chart-type');
  for (var i = 0; i < types.length; i++) {
    if (types[i].value === type){
      types[i].checked = true;
    }
  }
};
loadChart(objectInnerArray, objectDataArray, objectColorArray, objectType)

function getType() {
  var types = document.getElementsByName('chart-type');
  var types_value;
  for(var i = 0; i < types.length; i++){
    if(types[i].checked){
      types_value = types[i].value;
      return types_value;
    }
  }
}

function addRow() {
  prevForm = document.getElementsByClassName('form-chart');
  if (prevForm.length === 0){
      roll = 0
  }else {
    roll = parseInt(prevForm[prevForm.length - 1].getElementsByClassName('numbering')[0].innerHTML)
  };

  let cln = formChart.cloneNode(true);
  cln.getElementsByClassName('numbering')[0].innerHTML = roll + 1;
  formParent.appendChild(cln);
};

function renderChart() {
  let labelForm = document.getElementsByClassName('label-form')
  let dataForm = document.getElementsByClassName('data-form')
  let colorForm = document.getElementsByClassName('color-form')

  let labelArray = [];
  let dataArray = [];
  let colorArray = [];

  for (let x = 0; x <  labelForm.length; x++){
      labelArray.push(labelForm[x].value);
      dataArray.push(dataForm[x].value);
      colorArray.push(colorForm[x].value);
  };

  document.getElementById('canvas').remove();
  let canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  canvas.height = '500'
  document.getElementById('canvas-div').append(canvas)
  chartType = getType()
  controlChart(chartType, labelArray, dataArray, colorArray, objectLabel)
};

document.getElementById('add-row').addEventListener('click', addRow);
document.getElementById('render').addEventListener('click', renderChart);

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};
const csrftoken = getCookie('csrftoken');

function fetchData(postData) {
    fetch(
      url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrftoken,
    },
        body: JSON.stringify({'post_data': postData})
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        return console.log(data)
  });
};

function saveChart() {
  let labelForm = document.getElementsByClassName('label-form')
  let dataForm = document.getElementsByClassName('data-form')
  let colorForm = document.getElementsByClassName('color-form')

  let labelArray = '';
  let dataArray = '';
  let colorArray = '';

  for (let x = 0; x <  labelForm.length; x++){
      labelArray += labelForm[x].value + '|';
      dataArray += dataForm[x].value + '|';
      colorArray += colorForm[x].value + '|';
  };

  chartType = getType()

  data = {
    'type': chartType,
    'array1': labelArray.slice(0, labelArray.length - 1),
    'array2': dataArray.slice(0, dataArray.length - 1),
    'array3': colorArray.slice(0, colorArray.length - 1),
    'label': objectLabel,
     'id': objectId
   }

  fetchData(data)
};

document.getElementById('save-btn').addEventListener('click', saveChart)
