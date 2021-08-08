function colorToRGBA(color) {
  var cvs, ctx;
  cvs = document.createElement('canvas');
  cvs.height = 1;
  cvs.width = 1;
  ctx = cvs.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  return ctx.getImageData(0, 0, 1, 1).data;
}

function byteToHex(num) {
  return ('0'+num.toString(16)).slice(-2);
}

function colorToHex(color) {  
  var rgba, hex;
  rgba = colorToRGBA(color);
  hex = [0,1,2].map(
      function(idx) { return byteToHex(rgba[idx]); }
      ).join('');
  return "#"+hex;
}

function loadColor() {
  let colorPicker = document.getElementsByClassName('color-i');
  let colorForm = document.getElementsByClassName('color-form');

  for (i = 0; i < colorPicker.length; i++) {
    colorPicker[i].value = colorToHex(colorForm[i].value);
    colorPicker[i].name = i
    colorForm[i].name = i

    colorPicker[i].addEventListener('change', function(e){ 
      colorForm[e.target.name].value = e.target.value
    })

    colorForm[i].addEventListener('change', function(e){ 
      colorPicker[e.target.name].value = colorToHex(e.target.value)
    })
  };
};  

loadColor()
document.getElementById('add-row').addEventListener('click', loadColor)
