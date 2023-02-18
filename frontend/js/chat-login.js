function getFilters() { //move to main.js
    fetch("/getFilters", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
  
            } else {
                throw new Error("Could not load filters.")
            }
        })
        .then(data => {
            loadRoomOptions(data["categories"]);
        })
        .catch((error) => console.log(error))
  }
  
  function loadRoomOptions(categories){
  console.log(categories)
  const select = document.getElementById('room');
  categories.forEach(category => {
    const opt = document.createElement('option');
    opt.setAttribute('value', category.name);
    opt.innerText = category.name;
    select.appendChild(opt)
  });
  }