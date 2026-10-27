var input = document.getElementById('tela'),
    numero = document.querySelectorAll('.numeros div'),
    conta = document.querySelectorAll('.contas div'),
    resultado = document.getElementById('resultado'),
    limpar = document.getElementById('limpar'),
    resultadoEstaMostrando = false;

// evento de clique nos botões dos números
for (var i = 0; i < numero.length; i++) {
  numero[i].addEventListener("click", function (e) {
    if (resultadoEstaMostrando) {
      // depois de um resultado, digitar um número começa uma nova conta
      input.innerHTML = "";
      resultadoEstaMostrando = false;
    }
    input.innerHTML += e.target.innerHTML;
  });
}

// evento de clique nos botões dos operadores
for (var j = 0; j < conta.length; j++) {
  conta[j].addEventListener("click", function (e) {
    var textoNaTela = input.innerHTML;
    var ultimoChar = textoNaTela[textoNaTela.length - 1];
    var operadores = ["+", "-", "x", "÷"];

    if (textoNaTela === "") return; // não começa com operador

    if (operadores.indexOf(ultimoChar) !== -1) {
      // se o último já é operador, troca por este
      input.innerHTML = textoNaTela.slice(0, -1) + e.target.innerHTML;
    } else {
      // se estava mostrando resultado, continua a conta a partir dele
      resultadoEstaMostrando = false;
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// evento do botão igual
resultado.addEventListener("click", function () {
  var inputString = input.innerHTML;
  var ultimoChar = inputString[inputString.length - 1];

  // se terminar com operador, ignora ele
  if (["+", "-", "x", "÷"].indexOf(ultimoChar) !== -1) {
    inputString = inputString.slice(0, -1);
  }
  if (inputString === "") return;

  // separa os números pelos operadores
  var numeros = inputString.split(/\+|-|x|÷/g).map(parseFloat);
  // pega só os operadores, na ordem
  var contas = inputString.replace(/[0-9.]/g, "").split("");

  // divisão
  var divide = contas.indexOf("÷");
  while (divide != -1) {
    numeros.splice(divide, 2, numeros[divide] / numeros[divide + 1]);
    contas.splice(divide, 1);
    divide = contas.indexOf("÷");
  }

  // multiplicação
  var multiply = contas.indexOf("x");
  while (multiply != -1) {
    numeros.splice(multiply, 2, numeros[multiply] * numeros[multiply + 1]);
    contas.splice(multiply, 1);
    multiply = contas.indexOf("x");
  }

  // subtração
  var subtract = contas.indexOf("-");
  while (subtract != -1) {
    numeros.splice(subtract, 2, numeros[subtract] - numeros[subtract + 1]);
    contas.splice(subtract, 1);
    subtract = contas.indexOf("-");
  }

  // soma
  var add = contas.indexOf("+");
  while (add != -1) {
    numeros.splice(add, 2, numeros[add] + numeros[add + 1]);
    contas.splice(add, 1);
    add = contas.indexOf("+");
  }

  input.innerHTML = numeros[0]; // mostra o resultado na tela
  resultadoEstaMostrando = true;
});

// botão limpar
limpar.addEventListener("click", function () {
  input.innerHTML = "";
  resultadoEstaMostrando = false;
});