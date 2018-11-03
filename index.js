document.addEventListener('DOMContentLoaded', () => {
    const addDiv = document.querySelector('.add-div');
    const form = document.querySelector('.form-s');
    const taskSection = document.querySelector('.task-section');
    const inputSection = document.querySelector('#add-section');
    const ulSection = document.querySelector('.ul-box');
    const clearButton = document.querySelector('.Clear-all');
    
    //Время и день
    const displayTime = () => {
        const dateTime = new Date();
        const clock = document.querySelector('.time-data');
        const date = document.querySelector('.data');
    
        let hours = dateTime.getHours() % 12;
        let minutes = dateTime.getMinutes();
        let TimesOfDay = '';
        
        if(hours.toString().length < 2) {
            hours = '0' + hours;
        }
        if (minutes.toString().length < 2) {
            minutes = "0" + minutes;
        }
        if (dateTime.getHours() <= 12) {
            TimesOfDay = 'AM';
        } else{
            TimesOfDay = 'PM';
        }
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satyrday'];
        const today = days[dateTime.getDay()];
        const clockOutput = hours + ":" + minutes + TimesOfDay;
        const dateOutput = today;
        clock.textContent = clockOutput;
        date.textContent = dateOutput;
    }
    window.onload = cFunction = () => {
        displayTime();
        setInterval(displayTime, 1000);
    }
    //Список заданий
    let itemsArray;
            if (localStorage.getItem('items') === null) {
                itemsArray = [];
            } else{
                itemsArray = JSON.parse(localStorage.getItem('items'));
            }
            let check;
            if(localStorage.getItem('checked') === null) {
                check = [];
            } else {
                check = JSON.parse(localStorage.getItem('checked'));
            }

    const emptyString = document.createElement('p');
        addDiv.appendChild(emptyString);
        
    const addToLocalStorege = (key , array) => {
            return localStorage.setItem(key, JSON.stringify(array));
        }
        
    form.addEventListener('submit', (e) => {
        e.preventDefault();
            if(inputSection.value === '') {
                emptyString.textContent = "Add your ToDo";
            }else{
                itemsArray.push(inputSection.value);
                addToLocalStorege('input', itemsArray);
                createListSection(inputSection.value);
                inputSection.value = '';
                emptyString.textContent = '';
            }
        });
    const createListSection = task => {
            const span = document.createElement('span');
            const li = document.createElement('li');
            span.textContent = task;
            li.appendChild(span);
            ulSection.appendChild(li);
            createButton(li);
            }   

    const createButton = li => {
        const listItem = li.firstElementChild;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'style-checkbox';
        li.insertBefore(checkbox, listItem.nextElementSibling);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.className = 'deleted-b';
        li.insertBefore(removeButton, listItem.nextElementSibling );
    }   
    ulSection.addEventListener('click', (e) => {
        if (e.target.className === 'deleted-b'){
        const li = e.target.parentNode;
        const liName = e.target.previousSibling.textContent;
        ulSection.removeChild(li);

            for ( let i = 0; i < itemsArray.length; i++) {
                if(liName ===itemsArray[i]) {
                itemsArray.splice(i, 1);
                 }
            }
            for (let i = 0; i< check.length; i++) {
                if (liName === check[i]) {
                check.splice(i, 1);
                setLocalStorage('checked', checkedArray);
                }
            }
        }
    });

    clearButton.addEventListener('cleck', (e) => {
    ulSection.innerHTML = '';
    itemsArray = [];
    setLocalStorage('items',itemsArray);
    })

    ulSection.addEventListener('chang', (e) => {
    const li = e.target.parentNode;
    const liName = e.target.nextElementSibling.textContent;
    if (e.target.checked) {
        li.className = 'checked';
        check.push(liName);
        setLocalStorage('checked', check);
    } else {
        li.className = '';
        for(let i = 0; i<check.length; i++) {
            if(liName === check[i]){
                check.splice(i, 1);
                setLocalStorage('checked', check);
            }
        }

    }
    });

    for(let i = 0; i < itemsArray.length; i++) {
        createListSection(itemsArray[i]);
        for (let j =0; j<check.length; j++) {
            if(itemsArray[i] === check[j]) {
                const localStorageli = ulSection.getElementsByTagName('LI')[i];
                const locakStiregeCheckbox = localStorageli.querySelector('input');
                localStorageli.className = 'checked';
                locakStiregeCheckbox.checked = true;
            }
        }
    }

    const save = () =>{
        ulSection = [];
        for( let i = 0; i < ulSection.children.length; i++){
            ulSection.push(ulSection.children[i].getElementsByTagName(span)[0].innerText);
        }
        check = [];
        for( let i = 0; i < check.children.length; i++){
            ulSection.push(check.children[i].getElementsByTagName(span)[0].innerText);
        }
         localStorage.setItem('saveTask', JSON.stringify({ ulSectionn: ulSection, checkk: check }));
    } 
    const load = () => {
        return JSON.parse(localStorage.setItem('saveTask'))
    }

});
