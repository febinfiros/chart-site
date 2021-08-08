const box = document.getElementById('box');
box.remove()

function createList(objectList) {
  const parentBox = document.getElementById('parent-box');

  while (parentBox.firstChild) {
    parentBox.removeChild(parentBox.firstChild);
  };

  for (let x = 0; x < objectList.length; x++) {
    let cln = box.cloneNode(true);
    cln.style.display = 'flex';
    cln.getElementsByTagName('a')[0].innerHTML = objectList[x]['fields']['name'];
    cln.getElementsByTagName('a')[0].href = location.href.split('t')[1] + 'chart/' + objectList[x]['pk']
    cln.getElementsByClassName('btn-outline-primary')[0].value = objectList[x]['pk'];
    cln.getElementsByClassName('btn-outline-danger')[0].value = objectList[x]['pk'];
    parentBox.appendChild(cln);
  };
};

createList(objectList);

const namingForm = document.getElementById('chart-form');

function clearForm(form) {
  let formData = form.value;
  form.value = '';

  return formData
};

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
        return createList(data)
  });
}

function createChart() {
  let data = {'name': clearForm(namingForm), 'project': project}
  fetchData(data)
}

function deleteChart(value) {
  let data = {'delete': value, 'project': project}
  fetchData(data)
}

function updateChart(value) {
  let formValue = clearForm(namingForm)
  let data = {'update': value, 'rename': formValue, 'project': project}
  fetchData(data)
}

const mainModal = document.getElementById('createModal');

mainModal.addEventListener('show.bs.modal', function (event) {
  const titleModal = document.getElementById('title')
  let targetId = event.relatedTarget

  if (targetId.id === 'create-btn') {
    titleModal.innerHTML = 'New Chart';
    let btn = document.getElementById('change');
    let btnCln = btn.cloneNode(true);
    btnCln.innerHTML = 'Create';
    btnCln.addEventListener('click', function(){
      createChart()
    });
    btn.parentNode.appendChild(btnCln)
    btn.remove()

  } else if (targetId.id === 'update-btn') {
    titleModal.innerHTML = 'Rename Chart';
    let btn = document.getElementById('change');
    let btnCln = btn.cloneNode(true);
    btnCln.innerHTML = 'Save';
    btnCln.addEventListener('click', function(){
      updateChart(event.relatedTarget.value);
    });
    btn.parentNode.appendChild(btnCln)
    btn.remove()

  } else if (targetId.id === 'delete-btn') {
    titleModal.innerHTML = 'Delete Chart';
    let btn = document.getElementById('change');
    let btnCln = btn.cloneNode(true);
    btnCln.innerHTML = 'Delete';
    btnCln.className = 'btn btn-danger';
    btnCln.addEventListener('click', function(){
      deleteChart(event.relatedTarget.value);
    });
    btn.parentNode.appendChild(btnCln)
    btn.remove()
    document.getElementById('form').style.display = 'none';
    document.getElementById('content').innerHTML = 'Are you sure you want to delete this chart?'
  };
});

mainModal.addEventListener('hidden.bs.modal', function (event) {
    document.getElementById('form').style.display = 'block';
    document.getElementById('content').innerHTML = '';
    document.getElementById('change').className = 'btn btn-primary';

});
