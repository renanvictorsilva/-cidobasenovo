// ======================================
// BINGO - ÁCIDOS E BASES
// Desenvolvido para revisão em sala
// ======================================

// ---------- PERGUNTAS ----------

const perguntas = {

1:{
titulo:"Pergunta 1",
texto:"O limão pode ser classificado como:",
alternativas:[
"Ácido",
"Base",
"Sal"
],
correta:0
},

2:{
titulo:"Pergunta 2",
texto:"A soda cáustica é o nome popular do:",
alternativas:[
"Hidróxido de sódio",
"Ácido clorídrico",
"Cloreto de sódio"
],
correta:0
},

3:{
titulo:"Pergunta 3",
texto:"O leite de magnésia é utilizado para:",
alternativas:[
"Neutralizar a acidez do estômago.",
"Aumentar a acidez do estômago.",
"Desinfetar alimentos."
],
correta:0
},

4:{
titulo:"Pergunta 4",
texto:"Segundo Arrhenius, um ácido libera em solução aquosa:",
alternativas:[
"H⁺",
"OH⁻",
"Na⁺"
],
correta:0
},

5:{
titulo:"Pergunta 5",
texto:"Segundo Arrhenius, uma base libera em solução aquosa:",
alternativas:[
"Cl⁻",
"OH⁻",
"H⁺"
],
correta:1
},

6:{
titulo:"Pergunta 6",
texto:"O hidróxido de cálcio Ca(OH)₂ é classificado como:",
alternativas:[
"Monobase",
"Dibase",
"Tribase"
],
correta:1
},

7:{
titulo:"Pergunta 7",
texto:"A água sanitária apresenta caráter:",
alternativas:[
"Ácido",
"Básico",
"Neutro"
],
correta:1
},

8:{
titulo:"Pergunta 8",
texto:"Qual destes produtos possui caráter ácido?",
alternativas:[
"Limão",
"Sabão",
"Detergente"
],
correta:0
},

9:{
titulo:"Pergunta 9",
texto:"Qual destes produtos possui caráter básico?",
alternativas:[
"Vinagre",
"Leite de magnésia",
"Refrigerante"
],
correta:1
},

10:{
titulo:"Pergunta 10",
texto:"Qual é a fórmula química do hidróxido de sódio?",
alternativas:[
"NaOH",
"HCl",
"Ca(OH)₂"
],
correta:0
},

11:{
titulo:"Pergunta 11",
texto:"Uma solução aquosa é aquela em que a substância:",
alternativas:[
"Está dissolvida em água.",
"Está no estado sólido.",
"Está misturada ao óleo."
],
correta:0
},

12:{
titulo:"Pergunta 12",
texto:"Quantas hidroxilas existem na fórmula Ca(OH)₂?",
alternativas:[
"Uma",
"Duas",
"Três"
],
correta:1
},

13:{
titulo:"Pergunta 13",
texto:"O ácido clorídrico é encontrado principalmente:",
alternativas:[
"No suco gástrico.",
"No leite de magnésia.",
"Na água sanitária."
],
correta:0
},

14:{
titulo:"Pergunta 14",
texto:"O detergente é geralmente classificado como:",
alternativas:[
"Ácido",
"Básico",
"Neutro"
],
correta:1
}

};

// ------------------------------

const usados=[];

let numeroAtual=null;

// ------------------------------

const painel=document.getElementById("painel");

const numeroSorteado=document.getElementById("numeroSorteado");

const overlay=document.getElementById("overlay");

const rolling=document.getElementById("rollingNumber");

const perguntaCard=document.getElementById("perguntaCard");

const titulo=document.getElementById("tituloPergunta");

const texto=document.getElementById("perguntaTexto");

const alternativas=document.getElementById("alternativas");

const btnSortear=document.getElementById("btnSortear");

const btnProxima=document.getElementById("btnProxima");

const btnReiniciar=document.getElementById("btnReiniciar");

const drum=document.getElementById("drumSound");

// ------------------------------
// Gera painel
// ------------------------------

for(let i=1;i<=14;i++){

const div=document.createElement("div");

div.className="numero";

div.id="n"+i;

div.innerHTML=i;

painel.appendChild(div);

}

// ------------------------------
// Sorteio
// ------------------------------

btnSortear.onclick=sortear;

function sortear(){

if(usados.length===14){

alert("Todas as perguntas já foram utilizadas.");

return;

}

btnSortear.disabled=true;

overlay.style.display="flex";

drum.currentTime=0;

drum.play();

let contador=0;

const animacao=setInterval(()=>{

rolling.innerHTML=Math.floor(Math.random()*14)+1;

contador++;

if(contador>=20){

clearInterval(animacao);

finalizarSorteio();

}

},100);
function finalizarSorteio(){

    drum.pause();
    drum.currentTime = 0;

    let disponiveis = [];

    for(let i=1;i<=14;i++){

        if(!usados.includes(i)){
            disponiveis.push(i);
        }

    }

    numeroAtual = disponiveis[Math.floor(Math.random()*disponiveis.length)];

    usados.push(numeroAtual);

    document.getElementById("n"+numeroAtual).classList.add("usado");

    rolling.innerHTML = numeroAtual;

    numeroSorteado.innerHTML = numeroAtual;

    numeroSorteado.classList.remove("zoom");

    void numeroSorteado.offsetWidth;

    numeroSorteado.classList.add("zoom");

    setTimeout(()=>{

        overlay.style.display="none";

        mostrarPergunta(numeroAtual);

        btnSortear.disabled=false;

    },1000);

}

// ======================================

function mostrarPergunta(numero){

    perguntaCard.classList.remove("hidden");

    titulo.innerHTML = perguntas[numero].titulo;

    texto.innerHTML = perguntas[numero].texto;

    alternativas.innerHTML="";

    perguntas[numero].alternativas.forEach((alt)=>{

        const div=document.createElement("div");

        div.className="alternativa";

        div.innerHTML="◯ "+alt;

        alternativas.appendChild(div);

    });

}

// ======================================

btnProxima.onclick=function(){

    perguntaCard.classList.add("hidden");

}

// ======================================

btnReiniciar.onclick=function(){

    if(!confirm("Deseja reiniciar o Bingo?")){

        return;

    }

    usados.length=0;

    numeroAtual=null;

    numeroSorteado.innerHTML="?";

    perguntaCard.classList.add("hidden");

    document.querySelectorAll(".numero").forEach(n=>{

        n.classList.remove("usado");

    });

}

// ======================================
// Atalhos
// ======================================

document.addEventListener("keydown",function(e){

    // Espaço
    if(e.code==="Space"){

        e.preventDefault();

        if(!btnSortear.disabled){

            sortear();

        }

    }

    // Enter
    if(e.code==="Enter"){

        if(numeroAtual!==null){

            mostrarPergunta(numeroAtual);

        }

    }

    // ESC
    if(e.code==="Escape"){

        perguntaCard.classList.add("hidden");

    }

});

// ======================================
// Impede seleção de texto
// ======================================

document.body.onselectstart=function(){

    return false;

};