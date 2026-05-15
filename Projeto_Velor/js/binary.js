function numeroParaBinario(num) {
    return num
        .toString(2)
        .padStart(32, "0")
        .match(/.{1,8}/g)
        .join(".");
}