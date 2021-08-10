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

  var types = document.getElementsByName('chart-type');
  for (var i = 0; i < types.length; i++) {
    if (types[i].value === type){
      types[i].checked = true;
    }
  }
  
};

controlChart('bar', [], [], [], '')

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

const formParent = document.getElementById("form-parent")
const formChart = document.getElementsByClassName('form-chart')[0];
formChart.remove()

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
  controlChart(chartType, labelArray, dataArray, colorArray, '-')
};

document.getElementById('add-row').addEventListener('click', addRow);
document.getElementById('render').addEventListener('click', renderChart);
