document.addEventListener('DOMContentLoaded', function() {
    const textArea = document.querySelector('.text-area');
    const mensaje = document.querySelector('.mensaje');

    if (!textArea || !mensaje) {
        console.error('No se pudo encontrar textArea o mensaje en el DOM');
        return;
    }

    const encryptionKeys = {
        a: "00001",
        b: "00010",
        c: "00011",
        d: "00100",
        e: "00101",
        f: "00110",
        g: "00111",
        h: "01000",
        i: "01001",
        j: "01010",
        k: "01011",
        l: "01100",
        m: "01101",
        n: "01110",
        o: "01111",
        p: "10000",
        q: "10001",
        r: "10010",
        s: "10011",
        t: "10100",
        u: "10101",
        v: "10110",
        w: "10111",
        x: "11000",
        y: "11001",
        z: "11010",
        " ": "00000"
    };

    function validarTexto() {
        let textoEscrito = textArea.value;
        let validador = textoEscrito.match(/^[a-z\s]*$/);

        if (!validador) {
            alert("Solo se permiten letras minúsculas, sin acentos y espacios");
            location.reload();
            return false;
        }
        return true;
    }

    function btnEncriptar() {
        if (validarTexto()) {
            const textoEncriptado = encriptar(textArea.value);
            mensaje.value = textoEncriptado;
            mensaje.style.backgroundImage = "none";
            textArea.value = "";
        }
    }

    function encriptar(stringEncriptada) {
        stringEncriptada = stringEncriptada.toLowerCase();
        let textoEncriptado = "";

        for (let i = 0; i < stringEncriptada.length; i++) {
            const char = stringEncriptada[i];
            if (encryptionKeys.hasOwnProperty(char)) {
                textoEncriptado += encryptionKeys[char];
            }
        }

        return textoEncriptado;
    }

    function btnDesencriptar() {
        const textoDesencriptado = desencriptar(mensaje.value);
        mensaje.value = textoDesencriptado;
    }

    function desencriptar(stringDesencriptada) {
        let textoDesencriptado = "";
        for (let i = 0; i < stringDesencriptada.length; i += 5) {
            let tempChar = stringDesencriptada.substring(i, i + 5);
            const originalChar = getKeyByValue(encryptionKeys, tempChar);
            if (originalChar !== null) {
                textoDesencriptado += originalChar;
            }
        }
        return textoDesencriptado;
    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value) || null;
    }

    function copiar() {
        mensaje.select();
        document.execCommand("copy");
        mensaje.value = "";
        alert("Texto Copiado");
    }

    window.btnEncriptar = btnEncriptar;
    window.btnDesencriptar = btnDesencriptar;
    window.copiar = copiar;
});
