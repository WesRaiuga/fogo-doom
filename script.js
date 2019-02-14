const pixelsArray = [];
const largura = 40;
const altura = 40;
const paletaCores = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];

const start = () => {
    criarEstruturaDados();
    criarFonteFogo();
    setInterval(calcularPropagacao,50);

    renderizar();
};

const criarEstruturaDados = () => {
    const numeroPixels = largura * altura;
    
    for (let i = 0; i < numeroPixels; i++) {
        pixelsArray[i] = 0;
    }
};

const calcularPropagacao = () => {
    for (let coluna = 0; coluna < largura; coluna++) {
        for (let linha = 0; linha < altura; linha++) {
            const pixelIndice = coluna + (largura * linha);
            atualizarIntensidadePorPixel(pixelIndice);
        }
    }
    renderizar();
};

const atualizarIntensidadePorPixel = (indicePixelAtual) => {
    const indicePixelInferior = indicePixelAtual + largura;

    if (indicePixelInferior >= largura * altura) {
        return;
    }

    const decremento = Math.floor(Math.random() * 3);
    const intensidadePixelInferior = pixelsArray[indicePixelInferior];
    const novaIntensidade = intensidadePixelInferior - decremento >= 0 ? intensidadePixelInferior - decremento : 0;

    pixelsArray[indicePixelAtual - decremento] = novaIntensidade;
};

const renderizar = () => {
    const debug = false;
    let html = '<table cellpadding=0 cellspacing=0>';
    
    for (let linha = 0; linha < altura; linha++) {
        html += '<tr>';
        
        for (let coluna = 0; coluna < largura; coluna++) {
            const pixelIndice = coluna + (largura * linha);
            const intensidadeFogo = pixelsArray[pixelIndice];

            if (debug === true) {
                html += '<td>';
                html += `<div class="pixel-index">${pixelIndice}</div>`;
                html += intensidadeFogo;
                html += '</td>';
            } else {
                const cor = paletaCores[intensidadeFogo];
                const corString = `${cor.r},${cor.g},${cor.b}`;
                html += `<td class="pixel" style="background-color: rgb(${corString})">`
                html += '</td>';
            }

        }
        
        html += '</tr>';
    }
    
    html += '</table>';
    
    document.querySelector("#fire-canvas").innerHTML = html;
};

const criarFonteFogo = () => {
    for (let coluna = 0; coluna <= largura; coluna++) {
        const overFlowPixelIndice = largura * altura;
        const pixelIndice = (overFlowPixelIndice - largura) + coluna;
        pixelsArray[pixelIndice] = 36;
    }
};

start();