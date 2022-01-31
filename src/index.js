function fetchDogs(){
    fetch(`http://localhost:3000/dogs`)
    .then(resp => resp.json())
    .then(obj => loadDogs(obj));
}

function loadDogs(dogObj){
    const tBody = document.getElementById('table-body');
    tBody.textContent = '';

    for(let key in dogObj){
        const tRow = document.createElement('tr');
        const tName = document.createElement('td');
        const tBreed = document.createElement('td');
        const tSex = document.createElement('td');
        const tBtn = document.createElement('td');
        const editBtn = document.createElement('button');

        tName.textContent = dogObj[key]['name'];
        tBreed.textContent = dogObj[key]['breed'];
        tSex.textContent = dogObj[key]['sex'];

        editBtn.textContent = 'Edit Dog';
        tBtn.appendChild(editBtn);

        tRow.appendChild(tName);
        tRow.appendChild(tBreed);
        tRow.appendChild(tSex);
        tRow.appendChild(tBtn);
        tBody.appendChild(tRow);

        editBtn.addEventListener('click', () => editDog(dogObj[key]));
    }
}


function editDog(dogObj){
    const form = document.getElementById('dog-form');
    form.name.value = dogObj.name;
    form.breed.value = dogObj.breed;
    form.sex.value = dogObj.sex;

    form.addEventListener('submit', e => {
        e.preventDefault();
        updateDog(form.name.value, form.breed.value, form.sex.value, dogObj.id);
    });
}

function updateDog(name, breed, sex, id){
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: name,
            breed: breed,
            sex: sex,
        })
    })
    .then(resp => resp.json())
    .then(() => fetchDogs());
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
})