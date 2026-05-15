
const ipInput = document.getElementById("ipInput");
const cidrInput = document.getElementById("cidrInput");
const subnetInput = document.getElementById("subnetInput");
const calcularBtn = document.getElementById("calcularBtn");
const resultado = document.getElementById("resultado");



calcularBtn.addEventListener("click", () => {

    const ip = ipInput.value.trim();
    const cidr = Number(cidrInput.value);
    const numSubredes = Number(subnetInput.value);

    if (!validarIPv4(ip) || isNaN(cidr) || cidr < 0 || cidr > 32) {
        resultado.innerHTML = "❌ Dados inválidos.";
        return;
    }

    const ipNum = ipParaNumero(ip);
    const mascara = gerarMascara(cidr);

    const rede = ipNum & mascara;
    const broadcast = rede | (~mascara >>> 0);

    const totalIPs = Math.pow(2, 32 - cidr);

    const hostsValidos = (cidr === 32) ? 1 :
                         (cidr === 31) ? 2 :
                         totalIPs - 2;

    const primeiroHost = (cidr >= 31) ? rede : rede + 1;
    const ultimoHost = (cidr >= 31) ? broadcast : broadcast - 1;

    let subnetInfo = "";



    if (numSubredes && numSubredes > 0) {

        const bitsNecessarios = Math.ceil(Math.log2(numSubredes));
        const novoCidr = cidr + bitsNecessarios;

        if (novoCidr <= 32) {
            subnetInfo = `
                <hr>
                <p><strong>Nova Máscara:</strong> /${novoCidr}</p>
                <p><strong>Sub-redes Criadas:</strong> ${Math.pow(2, bitsNecessarios)}</p>
            `;
        } else {
            subnetInfo = "<p>❌ Não é possível dividir nessa quantidade.</p>";
        }
    }


    resultado.innerHTML = `
        <p><strong>Rede:</strong> ${numeroParaIp(rede)}</p>
        <p><strong>Broadcast:</strong> ${numeroParaIp(broadcast)}</p>
        <p><strong>Máscara:</strong> ${numeroParaIp(mascara)}</p>

        <hr>

        <p><strong>Rede (Binário):</strong> ${numeroParaBinario(rede)}</p>
        <p><strong>Broadcast (Binário):</strong> ${numeroParaBinario(broadcast)}</p>
        <p><strong>Máscara (Binário):</strong> ${numeroParaBinario(mascara)}</p>

        <hr>

        <p><strong>Total de IPs:</strong> ${totalIPs}</p>
        <p><strong>Hosts Utilizáveis:</strong> ${hostsValidos}</p>
        <p><strong>Primeiro Host:</strong> ${numeroParaIp(primeiroHost)}</p>
        <p><strong>Último Host:</strong> ${numeroParaIp(ultimoHost)}</p>

        ${subnetInfo}
    `;
});