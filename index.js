let button = document.getElementById('btn');

button.addEventListener('click', async () => {

    button.classList.add('invisible')

    const response = await fetch('https://my.api.mockaroo.com/cars_api.json?key=4f4e4ef0');

    if (response.ok) {
        const data = await response.json();

        let dataBlock = document.querySelector('#data');
        let tableBody = document.querySelector('.table-body');

        dataBlock.classList.remove('invisible');

        let carMakes = [];
        let numberOfCarMakes = {};
        let countries = [];
        let numberOfPeopleInCountries = {};

        data.forEach( item => {
            const tableRow = 
                `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.first_name}</td>
                    <td>${item.last_name}</td>
                    <td>${item.gender}</td>
                    <td>${item.country}</td>
                    <td>${item.car_make}</td>
                </tr>
                `;
            tableBody.innerHTML += tableRow;

            carMakes.push(item.car_make);
            countries.push(item.country);
        });

        carMakes.forEach(item => numberOfCarMakes[item] = (numberOfCarMakes[item]||0) + 1);
        countries.forEach(item => numberOfPeopleInCountries[item] = (numberOfPeopleInCountries[item]||0) + 1);

        let ctx1 = document.querySelector('#chart1');
        let ctx2 = document.querySelector('#chart2');
        // const ctx3 = document.querySelector('#chart3');

        new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: [
                    ...Object.keys(numberOfCarMakes)
                ],
                datasets: [{
                    label: 'Number of car makes',
                    data: Object.values(numberOfCarMakes),
                    hoverOffset: 4
                }]
            }
        });

        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: [
                    ...Object.keys(numberOfPeopleInCountries)
                ],
                datasets: [{
                    label: 'Number of people in countries',
                    data: Object.values(numberOfPeopleInCountries),
                    hoverOffset: 4
                }]
            }
        });


    }
    else {
        alert('error');
    }

});