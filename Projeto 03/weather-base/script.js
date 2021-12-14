// async => vai deixar a requisição assincrona
document.querySelector('.busca').addEventListener('submit', async (event) => {
    //* Vai previnir o comportamento padrão do elemento;
    event.preventDefault();

    //* Vai pegar o valor do elemendo cujo id é 'searchInput';
    let input = document.querySelector('#searchInput').value;
    let inputEncode = encodeURI(input);

    if(input !== '' ) {
        clearInfo();
        showWarning("Carregando... seu resto de aborto");

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputEncode}&appid=1c45c77714b5f16ac3f0d73f81150665&units=metric&lang=pt_br`;
    
        // vai esperar a requisição acontecer e guardar em 'results'
        let results = await fetch(url);
        // assim que fazer a requisição irá jogar para JSON
        let json = await results.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não foi enontrada a localização :(');
        }
    } else{
        clearInfo();
    }

});

function showInfo(json) {
    showWarning('');
 
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}
