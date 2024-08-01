class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const persons = [];

function getElementById(id) {
    return document.getElementById(id);
}

function addPerson() {
    let name = getElementById('name').value;
    let age = parseInt(getElementById('age').value);
    if(age<0 || age>130 || isNaN(age)){
        alert('Please enter a valid age from 0 to 130');
        return;
    }
    if (name && !persons.some(person => person.name === name)) {
        persons.push(new Person(name, age));
        updatePersonsList();
        clearInputFields();
    } else {
        alert('Please enter a valid, unique name');
    }
}

function updatePersonsList() {
    const listContainer = getElementById('personsList');
    listContainer.innerHTML = persons.map(person => `<div>${person.name}, Age: ${person.age}</div>`).join('');
}

function calculateAgeStatistics() {
    if (persons.length === 0) {
        alert('No persons added yet.');
        return;
    }

    let minAge = Number.MAX_VALUE;
    let maxAge = Number.MIN_VALUE;
    let totalAge = 0;
    let youngestPersons = [];
    let oldestPersons = [];

    persons.forEach(person => {
        totalAge += person.age;

        if (person.age < minAge) {
            minAge = person.age;
            youngestPersons = [person.name];
        } else if (person.age === minAge) {
            youngestPersons.push(person.name);
        }

        if (person.age > maxAge) {
            maxAge = person.age;
            oldestPersons = [person.name];
        } else if (person.age === maxAge) {
            oldestPersons.push(person.name);
        }
    });

    const averageAge = (totalAge / persons.length).toFixed(2);

    const statisticsContainer = getElementById('statistics');
    statisticsContainer.innerHTML = `
        <div>Minimum age: ${minAge}</div>
        <div>Maximum age: ${maxAge}</div>
        <div>Average age: ${averageAge}</div>
        <div>Name(s) of the youngest person(s): ${youngestPersons.join(", ")}</div>
        <div>Name(s) of the oldest person(s): ${oldestPersons.join(", ")}</div>
    `;
}

function resetAll() {
    persons.length = 0;
    clearInputFields();
    clearDisplay();
}

function clearInputFields() {
    getElementById('name').value = '';
    getElementById('age').value = '';
}

function clearDisplay() {
    getElementById('personsList').innerHTML = '';
    getElementById('statistics').innerHTML = '';
}

getElementById('addPerson').addEventListener('click', addPerson);
getElementById('calculateStats').addEventListener('click', calculateAgeStatistics);
getElementById('resetAll').addEventListener('click', resetAll);
