
function ipParaNumero(ip) {
    return ip.split('.').reduce((acc, parte) => (acc << 8) + Number(parte), 0) >>> 0;
}

function numeroParaIp(num) {
    return [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
    ].join('.');
}

function gerarMascara(cidr) {
    return cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
}