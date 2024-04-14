//Adiciona um listener de evento para o envio do formulário
document.getElementById('country-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const country = document.getElementById('country').value;

    //faz uma requiição para obter os dados do país
    fetch(`https://dev.kidopilabs.com.br/exercicio/covid.php?pais=${country}`)
        .then(response => response.json())
        .then(data => {
            displayData(data);
            logAccess(country);
            updateLastAccessInfo(country);


        })
        .catch(error => {
            console.error('Erro ao obter dados:', error); // Trata erros de requisição
        });

});


//Função para atualizar o último acesso
function updateLastAccessInfo() {
    const lastAccessInfo = document.getElementById('last-access-info');


    fetch('php/get_last_access_info.php')
        .then(response => response.json())
        .then(data => {

            lastAccessInfo.textContent = `Último acesso: País: ${data.country}, Data: ${data.access_time}`;

        })
        .catch(error => {
            console.error('Erro ao obter dados do último acesso:', error);
        });
}

function displayData(data) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const provinceData = data[key];
            const provinceName = provinceData.ProvinciaEstado;
            const confirmedCases = provinceData.Confirmados;
            const deaths = provinceData.Mortos;

            const provinceInfo = document.createElement('div');
            provinceInfo.classList.add('province-info');

            const provinceNameElement = document.createElement('h2');
            provinceNameElement.textContent = provinceName;
            provinceInfo.appendChild(provinceNameElement);

            const casesElement = document.createElement('p');
            casesElement.textContent = `Casos confirmados: ${confirmedCases}`;
            provinceInfo.appendChild(casesElement);

            const deathsElement = document.createElement('p');
            deathsElement.textContent = `Mortos: ${deaths}`;
            provinceInfo.appendChild(deathsElement);

            dataContainer.appendChild(provinceInfo);
        }
    }

    dataContainer.style.display = 'block';
}


function logAccess(country) {
    fetch('php/log_access.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ country: country })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao registrar acesso.');
            }
            console.log('Acesso registrado no banco de dados.');
        })
        .catch(error => {
            console.error('Erro ao registrar acesso:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    const country1Select = document.getElementById('country1');
    const country2Select = document.getElementById('country2');
    const differenceContainer = document.getElementById('difference-container');

    // Função para listar os países disponíveis
    function listCountries() {
        fetch('https://dev.kidopilabs.com.br/exercicio/covid.php?listar_paises=1')
            .then(response => response.json())
            .then(data => {
                // Preencher os menus suspensos com a lista de países disponíveis
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const countryName = data[key];
                        const option1 = document.createElement('option');
                        option1.value = countryName;
                        option1.textContent = countryName;
                        country1Select.appendChild(option1);

                        const option2 = document.createElement('option');
                        option2.value = countryName;
                        option2.textContent = countryName;
                        country2Select.appendChild(option2);
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao obter lista de países:', error);
            });
    }

    // Função para obter os dados de covid de um país específico
    function fetchData(country) {
        return fetch(`https://dev.kidopilabs.com.br/exercicio/covid.php?pais=${country}`)
            .then(response => response.json())
            .then(data => {

                return data;
            })
            .catch(error => {
                console.error(`Erro ao obter dados de covid para ${country}:`, error);
                throw error;
            });
    }

    // Manipular o envio do formulário de comparação
    document.getElementById('comparison-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const country1 = country1Select.value;
        const country2 = country2Select.value;

        // Fazer solicitações à API-Covid-19 para obter os dados dos países selecionados
        Promise.all([
            fetchData(country1),
            fetchData(country2)
        ])
            .then(([data1, data2]) => {
                // Verificar se os dados estão completos para ambos os países
                if (!data1.Mortos || !data1.Confirmados || !data2.Mortos || !data2.Confirmados) {
                    differenceContainer.textContent = "Não foi possível obter dados completos para os países selecionados.";
                } else {
                    const mortalityRate1 = data1.Mortos / data1.Confirmados;
                    const mortalityRate2 = data2.Mortos / data2.Confirmados;
                    const difference = mortalityRate1 - mortalityRate2;

                    // Exibir a diferença da taxa de mortalidade na interface
                    differenceContainer.textContent = `Diferença na taxa de mortalidade entre ${country1} e ${country2}: ${difference.toFixed(5)}`;
                }
            })
            .catch(error => {
                console.error('Erro ao obter dados de covid:', error);
            });
    });


    listCountries();


});


