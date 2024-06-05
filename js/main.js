function theme(indice) {
    let noDarkElement = document.getElementById('no-dark');
    let darkElement = document.getElementById('dark');


    if (indice === 'dark') {
        darkElement.classList.add('d-none');
        noDarkElement.classList.remove('d-none');
        document.querySelector('body').setAttribute('data-bs-theme', 'dark')
    } else {
        darkElement.classList.remove('d-none');
        noDarkElement.classList.add('d-none');
        document.querySelector('body').setAttribute('data-bs-theme', '')
    }
}

function copy(texto) {

    var tempInput = document.createElement("input");
    tempInput.value = texto;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    toastr("😁", "Texto copiado!");

}

function toastr(titulo, texto) {
    var divElement = document.createElement("div");
    var divElement2 = document.createElement("strong");
    divElement.setAttribute('id', 'toast');
    divElement.classList.add('ubuntu-mono-bold');
    divElement2.innerText = titulo + ' ';
    divElement.appendChild(divElement2);
    divElement.append(texto);
    document.body.appendChild(divElement);

    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(() => {
        x.className = x.className.replace("show", "");
        document.body.removeChild(divElement);
    }, 5000);

}

function calcularIdade(dataNascimento) {
    // Converter a data de nascimento em um objeto Date
    var nascimento = new Date(dataNascimento);

    // Obter a data atual
    var hoje = new Date();

    // Calcular a diferença em anos
    var idade = hoje.getFullYear() - nascimento.getFullYear();

    // Ajustar a idade se o aniversário ainda não foi comemorado neste ano
    var mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}

window.addEventListener('load', () => {
    var data = "1996-07-16";
    var anos = calcularIdade(data);
    console.log(anos)
    document.getElementById('idade').innerText = anos + ' anos'

    data = "2016-03-10";
    anos = calcularIdade(data);
    console.log(anos)
    document.getElementById('experiencia-php').innerText = anos + ' anos'

    data = "2016-12-10";
    anos = calcularIdade(data);
    console.log(anos)
    document.getElementById('experiencia-javascript').innerText = anos + ' anos'

    data = "2022-01-09";
    anos = calcularIdade(data);
    document.getElementById('experiencia-typescript').innerText = anos + ' anos'

    data = "2016-12-10";
    anos = calcularIdade(data);
    document.getElementById('experiencia-sql').innerText = anos + ' anos'
    falar();


})

function ouvir(id,idioma='pt-BR') {
    let texto = document.getElementById(id).innerText;
    console.log(texto)
    if ('speechSynthesis' in window) {

        const utterance = new SpeechSynthesisUtterance(texto);

        // Configurações adicionais (opcionais)
        utterance.lang = idioma; // Define o idioma
        utterance.rate = 1; // Define a velocidade da fala (0.1 a 10)
        utterance.pitch = 1; // Define o tom da fala (0 a 2)
        utterance.volume = 1; // Define o volume da fala (0 a 1)

        // Inicia a síntese de fala
        speechSynthesis.speak(utterance);
    } else {
        alert('API de síntese de fala não é suportada pelo seu navegador.');
    }
}

function falar() {
    // Verifica se o navegador suporta a API de reconhecimento de fala
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        recognition.lang = 'pt-BR'; // Define o idioma para reconhecimento

        // Define o evento de resultado
        recognition.onresult = function (event) {
            let resultado = event.results[0][0].transcript;
            resultado = resultado.toLowerCase();
            console.log(resultado)
            if (resultado.indexOf(' hub') > -1) {
                window.open('https://github.com/luanmarcosfgns', '_blank');
            }
            if (resultado.indexOf('instagram') > -1) {
                window.open('https://www.instagram.com/oluanfigueira/', '_blank');
            }

            if (resultado.indexOf('linkedin') > -1) {
                window.open('https://www.linkedin.com/in/luan-figueira-13b07a72/', '_blank');
            }

            if (resultado.indexOf('abrir currículo') > -1) {
                window.open('https://docs.google.com/document/d/1TcPzji2UxYDgiNulUu77oHVBdvqpZApAZoEoHlS-SLE/edit', '_blank');
            }

            if (resultado.indexOf('programação') > -1) {
                ouvir('linguagens')
            }

            if (resultado.indexOf('perfil') > -1) {
                ouvir('saudacoes')
            }
            if (resultado.indexOf('frameworks') > -1 || resultado.indexOf('bibliotecas') > -1) {
                ouvir('frameworks-bibliotecas')
            }

            if (resultado.indexOf('banco de dados') > -1) {
                ouvir('database')
            }

            if (resultado.indexOf('ouvir currículo') > -1) {
                ouvir('curriculo')
            }

        };

        // Define o evento de erro
        recognition.onerror = function (event) {
            console.error('Nada Falado');
        };

        // Define o evento de fim da fala
        recognition.onend = function () {
            falar()
        };

        recognition.start();
    } else {
        alert('API de reconhecimento de fala não é suportada pelo seu navegador.');
    }
}

// Função para rolar suavemente para o topo da página
function voltarAoTopo() {
    if (window.scrollY != 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Mostrar o botão de voltar ao topo quando o usuário rolar para baixo
window.addEventListener('scroll', function() {
    var btnVoltarAoTopo = document.getElementById("btnVoltarAoTopo");
    if (window.scrollY > 300) {
        btnVoltarAoTopo.style.display = "block";
    } else {
        btnVoltarAoTopo.style.display = "none";
    }
});
