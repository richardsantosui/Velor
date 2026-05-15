function calcularSubredes(cidr, numSubredes) {
    const bitsNecessarios = Math.ceil(Math.log2(numSubredes));
    return {
        novoCidr: cidr + bitsNecessarios,
        subredesCriadas: Math.pow(2, bitsNecessarios)
    };
}