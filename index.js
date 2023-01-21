let button = document.getElementById('btn');
let controls = document.querySelector('#cntrls');
let nextBtn = document.querySelector('#next');
let prevBtn = document.querySelector('#prev');
let chartContainer = document.querySelector('.charts');
let tableBody = document.querySelector('.table-body');


let counter = 1;

async function getData(number) {

    let url = `https://raw.githubusercontent.com/98xriso/EDI/main/${number}.json`

    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        return data;
    }

}

function fillContent(data) {

    let firstSet = [];
    let numberOfFirstSet = {};
    let secondSet = [];
    let numberOfSecondSet = {};

    data.forEach( item => {
        const tableRow = 
            `
            <tr>
                <td>${item.first}</td>
                <td>${item.second}</td>
                <td>${item.third}</td>
                <td>${item.fourth}</td>
                <td>${item.fifth}</td>
                <td>${item.sixth}</td>
            </tr>
            `;
        tableBody.innerHTML += tableRow;

        firstSet.push(item.fifth);
        secondSet.push(item.sixth);
    });

    firstSet.forEach(item => numberOfFirstSet[item] = (numberOfFirstSet[item]||0) + 1);
    secondSet.forEach(item => numberOfSecondSet[item] = (numberOfSecondSet[item]||0) + 1);

    chartContainer.innerHTML += 
    `
        <canvas id="chart1"></canvas>
        <canvas id="chart2"></canvas>
    `;

    let ctx1 = document.querySelector('#chart1');
    let ctx2 = document.querySelector('#chart2');

    new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: [
                ...Object.keys(numberOfFirstSet)
            ],
            datasets: [{
                label: 'Numbers in first set',
                data: Object.values(numberOfFirstSet),
                hoverOffset: 4
            }]
        }
    });

    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: [
                ...Object.keys(numberOfSecondSet)
            ],
            datasets: [{
                label: 'Numbers in second set',
                data: Object.values(numberOfSecondSet),
                hoverOffset: 4
            }]
        }
    });

}

function clearContent() {
    chartContainer.innerHTML = '';
    tableBody.innerHTML = '';
}


button.addEventListener('click', async () => {

    button.classList.add('invisible')
    controls.classList.remove('invisible')

    const data = await getData(counter);

    let dataBlock = document.querySelector('#data');

    dataBlock.classList.remove('invisible');

    fillContent(data);


});

nextBtn.addEventListener('click', async () => {

    counter += 1;
    if (counter > 3) {
        counter = 1;
    }

    clearContent();

    const data = await getData(counter);

    fillContent(data);


});

prevBtn.addEventListener('click', async () => {

    counter -= 1;
    if (counter < 1) {
        counter = 3;
    }

    clearContent();

    const data = await getData(counter);

    fillContent(data);

})