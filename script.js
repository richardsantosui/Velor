
// VELOR - SISTEMA INICIAL


console.log(" Velor iniciado, bem vindo ao Velor! ");



// TEXTO DINÂMICO


const elemento = document.getElementById("Velor");

if (elemento) {

    elemento.textContent =
        "Velor é uma plataforma de aprendizado e desenvolvimento colaborativo.";

}



// MENU MOBILE

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}



// TEMA DARK/LIGHT


const themeToggle = document.getElementById("themeToggle");


// Verifica tema salvo
if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light-mode");

}


// Evento do botão de tema
if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");


        // Verifica qual tema está ativo
        const temaClaroAtivo =
            document.body.classList.contains("light-mode");


        // Salva no localStorage
        if (temaClaroAtivo) {

            localStorage.setItem("theme", "light");

            themeToggle.textContent = "☀️";

        } else {

            localStorage.setItem("theme", "dark");

            themeToggle.textContent = "🌖";

        }

    });

}


// CALCULADORA DE REDES


const ipInput = document.getElementById("ipInput");

const cidrInput = document.getElementById("cidrInput");

const calcularBtn = document.getElementById("calcularBtn");

const resultado = document.getElementById("resultado");



// VALIDAR IPv4


function validarIPv4(ip) {

    ip = ip.trim();

    const partes = ip.split(".");


    // IPv4 precisa ter 4 partes
    if (partes.length !== 4) {

        return false;

    }


    // Verifica cada parte
    for (let parte of partes) {

        const num = Number(parte);


        if (

            isNaN(num) ||
            num < 0 ||
            num > 255

        ) {

            return false;

        }

    }

    return true;

}



// CONVERTER IP PARA NÚMERO


function ipParaNumero(ip) {

    return ip

        .split(".")

        .reduce((acc, parte) => {

            return (acc << 8) + Number(parte);

        }, 0) >>> 0;

}



// CONVERTER NÚMERO PARA IP


function numeroParaIp(num) {

    return [

        (num >>> 24) & 255,

        (num >>> 16) & 255,

        (num >>> 8) & 255,

        num & 255

    ].join(".");

}



// GERAR MÁSCARA


function gerarMascara(cidr) {

    return (0xFFFFFFFF << (32 - cidr)) >>> 0;

}



// CÁLCULO DA REDE


if (

    calcularBtn &&
    ipInput &&
    cidrInput &&
    resultado

) {

    calcularBtn.addEventListener("click", () => {

        const ip = ipInput.value.trim();

        const cidr = Number(cidrInput.value);


        // Validação
        if (

            !validarIPv4(ip) ||
            isNaN(cidr) ||
            cidr < 0 ||
            cidr > 32

        ) {

            resultado.innerHTML = `
                <p>❌ Dados inválidos.</p>
            `;

            return;

        }


        // Conversões
        const ipNum = ipParaNumero(ip);

        const mascara = gerarMascara(cidr);


        // Cálculos
        const rede = ipNum & mascara;

        const broadcast = rede | (~mascara >>> 0);


        // Resultado
        resultado.innerHTML = `

            <p>
                <strong>Rede:</strong>
                ${numeroParaIp(rede)}
            </p>

            <p>
                <strong>Broadcast:</strong>
                ${numeroParaIp(broadcast)}
            </p>

            <p>
                <strong>Máscara:</strong>
                ${numeroParaIp(mascara)}
            </p>

        `;

    });

}

