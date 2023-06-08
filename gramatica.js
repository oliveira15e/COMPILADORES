/* Emilly De Oliveira Alves - 01343702 */

/* Use o comando no terminal: node gramatica.js */

function eliminarRecursaoEsquerdaDireta(gramatica) {
  let naoTerminais = Object.keys(gramatica);

  for (let i = 0; i < naoTerminais.length; i++) {
    let A = naoTerminais[i];
    let regrasA = gramatica[A];
    let novasRegrasA = [];

    for (let j = 0; j < i; j++) {
      let B = naoTerminais[j];
      let regrasB = gramatica[B];

      for (let regraA of regrasA) {
        if (regraA[0] === B) {
          for (let regraB of regrasB) {
            novasRegrasA.push(regraB + regraA.slice(1));
          }
        } else {
          novasRegrasA.push(regraA);
        }
      }
    }

    let novosNaoTerminais = [];
    let regrasRecursivasA = [];

    for (let regraA of novasRegrasA) {
      if (regraA[0] === A) {
        regrasRecursivasA.push(regraA.slice(1));
      } else {
        novosNaoTerminais.push(regraA);
      }
    }

    if (regrasRecursivasA.length > 0) {
      let novoNaoTerminal = A + "'";
      novosNaoTerminais.push(novoNaoTerminal);

      let novasRegrasRecursivasA = [];

      for (let regra of regrasRecursivasA) {
        novasRegrasRecursivasA.push(regra + novoNaoTerminal);
      }

      gramatica[novoNaoTerminal] = novasRegrasRecursivasA;
    }

    gramatica[A] = novosNaoTerminais;
  }
}

function eliminarRecursaoEsquerdaIndireta(gramatica) {
  let naoTerminais = Object.keys(gramatica);

  for (let i = 0; i < naoTerminais.length; i++) {
    let A = naoTerminais[i];
    let regrasA = gramatica[A];

    for (let j = 0; j < i; j++) {
      let B = naoTerminais[j];
      let regrasB = gramatica[B];
      let novasRegrasA = [];

      for (let regraA of regrasA) {
        if (regraA[0] !== B) {
          novasRegrasA.push(regraA);
        } else {
          for (let regraB of regrasB) {
            novasRegrasA.push(regraB + regraA.slice(1));
          }
        }
      }

      gramatica[A] = novasRegrasA;
    }
  }
}

function converterRegrasUnitarias(gramatica) {
  let naoTerminais = Object.keys(gramatica);

  for (let i = 0; i < naoTerminais.length; i++) {
    let A = naoTerminais[i];
    let regrasA = gramatica[A];
    let novasRegrasA = [];

    for (let regraA of regrasA) {
      if (regraA.length === 1 && gramatica[regraA]) {
        for (let regraB of gramatica[regraA]) {
          novasRegrasA.push(regraB);
        }
      } else {
        novasRegrasA.push(regraA);
      }
    }

    gramatica[A] = novasRegrasA;
  }
}

function converterParaFormaNormal(gramatica) {
  eliminarRecursaoEsquerdaIndireta(gramatica);
  eliminarRecursaoEsquerdaDireta(gramatica);
  converterRegrasUnitarias(gramatica);
}

// Exemplo de gramática
let gramatica = {
  'S': ['aAd', 'A'],
  'A': ['Bc', ''],
  'B': ['Aca']
};

converterParaFormaNormal(gramatica);

// Imprime a gramática na forma normal de Greibach
for (let naoTerminal in gramatica) {
  for (let regra of gramatica[naoTerminal]) {
    console.log(`${naoTerminal} -> ${regra}`);
  }
}
