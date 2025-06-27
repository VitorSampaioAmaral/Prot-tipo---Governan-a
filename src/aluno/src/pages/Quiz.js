import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRobot, FaCheckCircle, FaTimesCircle, FaArrowRight, FaTrophy, FaStar, FaMedal } from 'react-icons/fa';

// Função utilitária para embaralhar array
function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Banco de 50 perguntas para cada quiz (exemplo para 2 quizzes)
const bancoQuizzes = {
  'sistema-solar': [
    { id: 0, tipo: 'multipla', enunciado: 'Qual é o maior planeta do Sistema Solar?', opcoes: ['Terra', 'Júpiter', 'Saturno', 'Netuno'], correta: 1, dica: 'É um gigante gasoso.' },
    { id: 1, tipo: 'multipla', enunciado: 'Qual planeta é conhecido como o Planeta Vermelho?', opcoes: ['Vênus', 'Marte', 'Júpiter', 'Mercúrio'], correta: 1, dica: 'É o quarto planeta a partir do Sol.' },
    { id: 2, tipo: 'vf', enunciado: 'Saturno possui anéis visíveis da Terra.', correta: true, dica: 'Seus anéis são famosos.' },
    { id: 3, tipo: 'lacuna', enunciado: 'O planeta _______ é o mais próximo do Sol.', correta: 'Mercúrio', dica: 'É também o menor planeta.' },
    { id: 4, tipo: 'multipla', enunciado: 'Qual planeta foi rebaixado a planeta anão em 2006?', opcoes: ['Plutão', 'Netuno', 'Urano', 'Vênus'], correta: 0, dica: 'Era considerado o nono planeta.' },
    { id: 5, tipo: 'multipla', enunciado: 'Qual planeta tem o dia mais longo (rotação mais lenta)?', opcoes: ['Vênus', 'Terra', 'Marte', 'Júpiter'], correta: 0, dica: 'Seu dia dura mais que seu ano.' },
    { id: 6, tipo: 'vf', enunciado: 'A Terra é o terceiro planeta a partir do Sol.', correta: true, dica: 'Mercúrio, Vênus, Terra...' },
    { id: 7, tipo: 'lacuna', enunciado: 'O planeta conhecido como gigante gasoso é _______.', correta: 'Júpiter', dica: 'É o maior planeta.' },
    { id: 8, tipo: 'multipla', enunciado: 'Qual planeta tem a maior quantidade de luas conhecidas?', opcoes: ['Saturno', 'Júpiter', 'Urano', 'Netuno'], correta: 1, dica: 'Tem mais de 70 luas.' },
    { id: 9, tipo: 'multipla', enunciado: 'Qual planeta é famoso por seus ventos extremamente rápidos?', opcoes: ['Netuno', 'Vênus', 'Marte', 'Terra'], correta: 0, dica: 'É o planeta mais distante do Sol.' },
    { id: 10, tipo: 'vf', enunciado: 'Vênus é mais quente que Mercúrio.', correta: true, dica: 'Sua atmosfera é densa e cheia de CO2.' },
    { id: 11, tipo: 'lacuna', enunciado: 'O planeta _______ é chamado de "planeta azul".', correta: 'Terra', dica: 'É o nosso lar.' },
    { id: 12, tipo: 'multipla', enunciado: 'Qual planeta tem as maiores tempestades do Sistema Solar?', opcoes: ['Júpiter', 'Saturno', 'Netuno', 'Marte'], correta: 0, dica: 'A Grande Mancha Vermelha é uma tempestade.' },
    { id: 13, tipo: 'multipla', enunciado: 'Qual planeta tem uma lua chamada Titã?', opcoes: ['Terra', 'Júpiter', 'Saturno', 'Urano'], correta: 2, dica: 'Titã é a segunda maior lua do Sistema Solar.' },
    { id: 14, tipo: 'vf', enunciado: 'Urano gira "deitado" em relação ao seu plano orbital.', correta: true, dica: 'Seu eixo é muito inclinado.' },
    { id: 15, tipo: 'lacuna', enunciado: 'O planeta _______ é conhecido por sua cor azul intensa.', correta: 'Netuno', dica: 'É o mais distante do Sol.' },
    { id: 16, tipo: 'multipla', enunciado: 'Qual planeta tem o maior deserto conhecido?', opcoes: ['Marte', 'Terra', 'Vênus', 'Mercúrio'], correta: 0, dica: 'É o planeta vermelho.' },
    { id: 17, tipo: 'multipla', enunciado: 'Qual planeta tem a atmosfera mais densa?', opcoes: ['Vênus', 'Terra', 'Júpiter', 'Saturno'], correta: 0, dica: 'Sua pressão é 90x maior que a da Terra.' },
    { id: 18, tipo: 'vf', enunciado: 'Plutão já foi considerado um planeta.', correta: true, dica: 'Foi rebaixado em 2006.' },
    { id: 19, tipo: 'lacuna', enunciado: 'O planeta _______ tem uma Grande Mancha Vermelha.', correta: 'Júpiter', dica: 'É uma tempestade gigante.' },
    { id: 20, tipo: 'multipla', enunciado: 'Qual planeta tem o menor período de translação?', opcoes: ['Mercúrio', 'Terra', 'Marte', 'Vênus'], correta: 0, dica: 'É o mais próximo do Sol.' },
    { id: 21, tipo: 'multipla', enunciado: 'Qual planeta tem a maior inclinação de eixo?', opcoes: ['Urano', 'Saturno', 'Netuno', 'Júpiter'], correta: 0, dica: 'Gira quase deitado.' },
    { id: 22, tipo: 'vf', enunciado: 'A Lua é o único satélite natural da Terra.', correta: true, dica: 'É nosso satélite.' },
    { id: 23, tipo: 'lacuna', enunciado: 'O planeta _______ tem o maior número de anéis.', correta: 'Saturno', dica: 'Seus anéis são famosos.' },
    { id: 24, tipo: 'multipla', enunciado: 'Qual planeta tem a maior diferença de temperatura entre o dia e a noite?', opcoes: ['Mercúrio', 'Vênus', 'Terra', 'Marte'], correta: 0, dica: 'Não tem atmosfera significativa.' },
    { id: 25, tipo: 'multipla', enunciado: 'Qual planeta é chamado de "irmão gêmeo da Terra"?', opcoes: ['Vênus', 'Marte', 'Júpiter', 'Saturno'], correta: 0, dica: 'Tem tamanho e massa parecidos com a Terra.' },
    { id: 26, tipo: 'vf', enunciado: 'Netuno foi descoberto por cálculos matemáticos.', correta: true, dica: 'Foi previsto antes de ser observado.' },
    { id: 27, tipo: 'lacuna', enunciado: 'O planeta _______ tem a lua chamada Fobos.', correta: 'Marte', dica: 'Tem duas luas pequenas.' },
    { id: 28, tipo: 'multipla', enunciado: 'Qual planeta tem o maior campo magnético?', opcoes: ['Júpiter', 'Saturno', 'Terra', 'Urano'], correta: 0, dica: 'Protege suas luas da radiação.' },
    { id: 29, tipo: 'multipla', enunciado: 'Qual planeta tem a órbita mais excêntrica?', opcoes: ['Plutão', 'Mercúrio', 'Marte', 'Vênus'], correta: 1, dica: 'Sua órbita é bem oval.' },
    { id: 30, tipo: 'vf', enunciado: 'Júpiter é composto principalmente de hidrogênio e hélio.', correta: true, dica: 'Assim como o Sol.' },
    { id: 31, tipo: 'lacuna', enunciado: 'O planeta _______ é o segundo maior do Sistema Solar.', correta: 'Saturno', dica: 'Tem anéis impressionantes.' },
    { id: 32, tipo: 'multipla', enunciado: 'Qual planeta tem a menor densidade?', opcoes: ['Saturno', 'Júpiter', 'Urano', 'Netuno'], correta: 0, dica: 'Flutuaria na água!' },
    { id: 33, tipo: 'multipla', enunciado: 'Qual planeta tem a maior velocidade orbital?', opcoes: ['Mercúrio', 'Terra', 'Marte', 'Vênus'], correta: 0, dica: 'É o mais próximo do Sol.' },
    { id: 34, tipo: 'vf', enunciado: 'Marte tem calotas polares.', correta: true, dica: 'São feitas de gelo de CO2 e água.' },
    { id: 35, tipo: 'lacuna', enunciado: 'O planeta _______ tem a lua chamada Tritão.', correta: 'Netuno', dica: 'É a maior lua do planeta mais distante.' },
    { id: 36, tipo: 'multipla', enunciado: 'Qual planeta tem o maior período de rotação?', opcoes: ['Vênus', 'Júpiter', 'Saturno', 'Urano'], correta: 0, dica: 'Seu dia dura mais que seu ano.' },
    { id: 37, tipo: 'multipla', enunciado: 'Qual planeta tem a menor massa?', opcoes: ['Mercúrio', 'Marte', 'Vênus', 'Terra'], correta: 0, dica: 'É o menor planeta.' },
    { id: 38, tipo: 'vf', enunciado: 'Saturno tem mais de 80 luas.', correta: true, dica: 'Tem muitas luas, incluindo Titã.' },
    { id: 39, tipo: 'lacuna', enunciado: 'O planeta _______ é o mais distante do Sol.', correta: 'Netuno', dica: 'É o oitavo planeta.' },
    { id: 40, tipo: 'multipla', enunciado: 'Qual planeta tem a maior excentricidade orbital?', opcoes: ['Mercúrio', 'Plutão', 'Marte', 'Vênus'], correta: 1, dica: 'Sua órbita é muito oval.' },
    { id: 41, tipo: 'multipla', enunciado: 'Qual planeta tem a maior pressão atmosférica?', opcoes: ['Vênus', 'Terra', 'Júpiter', 'Saturno'], correta: 0, dica: 'Sua atmosfera é sufocante.' },
    { id: 42, tipo: 'vf', enunciado: 'Urano tem anéis, mas são pouco visíveis.', correta: true, dica: 'São escuros e finos.' },
    { id: 43, tipo: 'lacuna', enunciado: 'O planeta _______ tem a lua chamada Europa.', correta: 'Júpiter', dica: 'Europa pode ter um oceano sob o gelo.' },
    { id: 44, tipo: 'multipla', enunciado: 'Qual planeta tem a menor temperatura média?', opcoes: ['Netuno', 'Urano', 'Marte', 'Mercúrio'], correta: 0, dica: 'É o mais distante do Sol.' },
    { id: 45, tipo: 'multipla', enunciado: 'Qual planeta tem a maior quantidade de metano na atmosfera?', opcoes: ['Urano', 'Netuno', 'Saturno', 'Júpiter'], correta: 0, dica: 'Dá a cor azul-esverdeada.' },
    { id: 46, tipo: 'vf', enunciado: 'Vênus gira no sentido oposto à maioria dos planetas.', correta: true, dica: 'Seu movimento é retrógrado.' },
    { id: 47, tipo: 'lacuna', enunciado: 'O planeta _______ tem a lua chamada Ganimedes.', correta: 'Júpiter', dica: 'É a maior lua do Sistema Solar.' },
    { id: 48, tipo: 'multipla', enunciado: 'Qual planeta tem a maior diferença de massa entre si e sua lua principal?', opcoes: ['Terra', 'Marte', 'Júpiter', 'Saturno'], correta: 0, dica: 'A Lua é muito menor que a Terra.' },
    { id: 49, tipo: 'multipla', enunciado: 'Qual planeta tem a maior quantidade de energia recebida do Sol?', opcoes: ['Mercúrio', 'Vênus', 'Terra', 'Marte'], correta: 0, dica: 'É o mais próximo do Sol.' },
  ],
  'matematica-basica': [
    { id: 0, tipo: 'multipla', enunciado: 'Quanto é 7 x 8?', opcoes: ['54', '56', '64', '58'], correta: 1, dica: 'Multiplicação básica.' },
    { id: 1, tipo: 'multipla', enunciado: 'Qual é o resultado de 9²?', opcoes: ['81', '18', '27', '72'], correta: 0, dica: '9 x 9.' },
    { id: 2, tipo: 'vf', enunciado: 'O número zero é um número par.', correta: true, dica: 'Zero é divisível por 2.' },
    { id: 3, tipo: 'lacuna', enunciado: 'O resultado de 15 + 6 é _______.', correta: '21', dica: 'Some os dois números.' },
    { id: 4, tipo: 'multipla', enunciado: 'Qual é a metade de 100?', opcoes: ['25', '50', '75', '100'], correta: 1, dica: 'Divida por 2.' },
    { id: 5, tipo: 'multipla', enunciado: 'Quanto é 12 x 12?', opcoes: ['124', '144', '132', '112'], correta: 1, dica: 'É um quadrado perfeito.' },
    { id: 6, tipo: 'vf', enunciado: 'O número 17 é primo.', correta: true, dica: 'Só é divisível por 1 e ele mesmo.' },
    { id: 7, tipo: 'lacuna', enunciado: 'O dobro de 15 é _______.', correta: '30', dica: 'Multiplique por 2.' },
    { id: 8, tipo: 'multipla', enunciado: 'Qual é o valor de 3³?', opcoes: ['6', '9', '27', '18'], correta: 2, dica: '3 x 3 x 3.' },
    { id: 9, tipo: 'multipla', enunciado: 'Quanto é 100 dividido por 4?', opcoes: ['20', '25', '30', '40'], correta: 1, dica: 'Divida 100 por 4.' },
    { id: 10, tipo: 'vf', enunciado: 'O número 100 é múltiplo de 5.', correta: true, dica: 'Termina em 0.' },
    { id: 11, tipo: 'lacuna', enunciado: 'A soma de 8 + 12 é _______.', correta: '20', dica: 'Some os dois números.' },
    { id: 12, tipo: 'multipla', enunciado: 'Qual é o resultado de 45 - 17?', opcoes: ['28', '32', '27', '29'], correta: 0, dica: 'Subtração simples.' },
    { id: 13, tipo: 'multipla', enunciado: 'Quanto é 5 x 9?', opcoes: ['45', '40', '35', '55'], correta: 0, dica: 'Multiplicação da tabuada.' },
    { id: 14, tipo: 'vf', enunciado: 'O número 50 é maior que 49.', correta: true, dica: 'Compare os valores.' },
    { id: 15, tipo: 'lacuna', enunciado: 'O triplo de 7 é _______.', correta: '21', dica: 'Multiplique por 3.' },
    { id: 16, tipo: 'multipla', enunciado: 'Qual é o valor de 2⁴?', opcoes: ['6', '8', '16', '12'], correta: 2, dica: '2 x 2 x 2 x 2.' },
    { id: 17, tipo: 'multipla', enunciado: 'Quanto é 81 dividido por 9?', opcoes: ['8', '9', '7', '6'], correta: 1, dica: 'Divida 81 por 9.' },
    { id: 18, tipo: 'vf', enunciado: 'O número 1 é divisor de todos os números inteiros.', correta: true, dica: '1 divide qualquer número.' },
    { id: 19, tipo: 'lacuna', enunciado: 'A soma de 13 + 17 é _______.', correta: '30', dica: 'Some os dois números.' },
    { id: 20, tipo: 'multipla', enunciado: 'Qual é o resultado de 100 - 37?', opcoes: ['63', '73', '67', '57'], correta: 0, dica: 'Subtração simples.' },
    { id: 21, tipo: 'multipla', enunciado: 'Quanto é 6 x 7?', opcoes: ['42', '36', '48', '56'], correta: 0, dica: 'Multiplicação da tabuada.' },
    { id: 22, tipo: 'vf', enunciado: 'O número 2 é o único número par primo.', correta: true, dica: 'Todos os outros pares são divisíveis por 2.' },
    { id: 23, tipo: 'lacuna', enunciado: 'O quadrado de 5 é _______.', correta: '25', dica: '5 x 5.' },
    { id: 24, tipo: 'multipla', enunciado: 'Qual é o valor de 10²?', opcoes: ['20', '100', '50', '10'], correta: 1, dica: '10 x 10.' },
    { id: 25, tipo: 'multipla', enunciado: 'Quanto é 14 + 27?', opcoes: ['41', '40', '39', '42'], correta: 0, dica: 'Some os dois números.' },
    { id: 26, tipo: 'vf', enunciado: 'O número 9 é ímpar.', correta: true, dica: 'Não é divisível por 2.' },
    { id: 27, tipo: 'lacuna', enunciado: 'A metade de 18 é _______.', correta: '9', dica: 'Divida por 2.' },
    { id: 28, tipo: 'multipla', enunciado: 'Qual é o resultado de 8 x 8?', opcoes: ['64', '56', '72', '48'], correta: 0, dica: 'Multiplicação da tabuada.' },
    { id: 29, tipo: 'multipla', enunciado: 'Quanto é 99 - 33?', opcoes: ['66', '77', '55', '88'], correta: 0, dica: 'Subtração simples.' },
    { id: 30, tipo: 'vf', enunciado: 'O número 15 é múltiplo de 3.', correta: true, dica: '3 x 5 = 15.' },
    { id: 31, tipo: 'lacuna', enunciado: 'O resultado de 6 x 6 é _______.', correta: '36', dica: 'Multiplicação da tabuada.' },
    { id: 32, tipo: 'multipla', enunciado: 'Qual é o valor de 4³?', opcoes: ['12', '16', '64', '24'], correta: 2, dica: '4 x 4 x 4.' },
    { id: 33, tipo: 'multipla', enunciado: 'Quanto é 72 dividido por 8?', opcoes: ['8', '9', '7', '6'], correta: 1, dica: 'Divida 72 por 8.' },
    { id: 34, tipo: 'vf', enunciado: 'O número 11 é primo.', correta: true, dica: 'Só é divisível por 1 e 11.' },
    { id: 35, tipo: 'lacuna', enunciado: 'O triplo de 9 é _______.', correta: '27', dica: 'Multiplique por 3.' },
    { id: 36, tipo: 'multipla', enunciado: 'Qual é o resultado de 5²?', opcoes: ['10', '25', '15', '20'], correta: 1, dica: '5 x 5.' },
    { id: 37, tipo: 'multipla', enunciado: 'Quanto é 8 + 15?', opcoes: ['23', '22', '24', '25'], correta: 0, dica: 'Some os dois números.' },
    { id: 38, tipo: 'vf', enunciado: 'O número 20 é múltiplo de 4.', correta: true, dica: '4 x 5 = 20.' },
    { id: 39, tipo: 'lacuna', enunciado: 'A soma de 11 + 14 é _______.', correta: '25', dica: 'Some os dois números.' },
    { id: 40, tipo: 'multipla', enunciado: 'Qual é o valor de 2 x 15?', opcoes: ['30', '25', '20', '35'], correta: 0, dica: 'Multiplicação simples.' },
    { id: 41, tipo: 'multipla', enunciado: 'Quanto é 18 dividido por 3?', opcoes: ['6', '5', '7', '8'], correta: 0, dica: 'Divida 18 por 3.' },
    { id: 42, tipo: 'vf', enunciado: 'O número 8 é par.', correta: true, dica: '8 dividido por 2 é 4.' },
    { id: 43, tipo: 'lacuna', enunciado: 'O quadrado de 4 é _______.', correta: '16', dica: '4 x 4.' },
    { id: 44, tipo: 'multipla', enunciado: 'Qual é o resultado de 13 + 19?', opcoes: ['32', '31', '33', '30'], correta: 0, dica: 'Some os dois números.' },
    { id: 45, tipo: 'multipla', enunciado: 'Quanto é 10 x 7?', opcoes: ['70', '77', '67', '60'], correta: 0, dica: 'Multiplicação da tabuada.' },
    { id: 46, tipo: 'vf', enunciado: 'O número 6 é divisor de 36.', correta: true, dica: '36 dividido por 6 é 6.' },
    { id: 47, tipo: 'lacuna', enunciado: 'A soma de 7 + 8 é _______.', correta: '15', dica: 'Some os dois números.' },
    { id: 48, tipo: 'multipla', enunciado: 'Qual é o valor de 3 x 12?', opcoes: ['36', '32', '30', '28'], correta: 0, dica: 'Multiplicação simples.' },
    { id: 49, tipo: 'multipla', enunciado: 'Quanto é 90 dividido por 9?', opcoes: ['10', '9', '8', '11'], correta: 0, dica: 'Divida 90 por 9.' },
  ],
  'portugues': [
  { id: 0, tipo: 'multipla', enunciado: 'Qual é o plural de "cão"?', opcoes: ['Cãos', 'Cães', 'Cãoses', 'Cãons'], correta: 1, dica: 'Termina com "ães".' },
  { id: 1, tipo: 'multipla', enunciado: 'Qual palavra está escrita corretamente?', opcoes: ['Excessão', 'Exceção', 'Exceçãoo', 'Excessao'], correta: 1, dica: 'Tem cedilha e til.' },
  { id: 2, tipo: 'vf', enunciado: 'A palavra "feliz" é um adjetivo.', correta: true, dica: 'Adjetivo qualifica o substantivo.' },
  { id: 3, tipo: 'lacuna', enunciado: 'O feminino de "ator" é _______.', correta: 'atriz', dica: 'Termina com "iz".' },
  { id: 4, tipo: 'multipla', enunciado: 'Qual destas palavras é um verbo?', opcoes: ['Correr', 'Mesa', 'Bonito', 'Rápido'], correta: 0, dica: 'Indica ação.' },
  { id: 5, tipo: 'multipla', enunciado: 'Qual é o antônimo de "alegre"?', opcoes: ['Triste', 'Feliz', 'Rápido', 'Grande'], correta: 0, dica: 'Significa o oposto.' },
  { id: 6, tipo: 'vf', enunciado: '"Nós fomos ao cinema" está no tempo futuro.', correta: false, dica: 'Está no passado.' },
  { id: 7, tipo: 'lacuna', enunciado: 'O aumentativo de "casa" é _______.', correta: 'casarão', dica: 'Termina com "rão".' },
  { id: 8, tipo: 'multipla', enunciado: 'Qual destas frases está correta?', opcoes: ['Eu vai', 'Eu vou', 'Eu ir', 'Eu irei'], correta: 1, dica: 'Concordância verbal.' },
  { id: 9, tipo: 'multipla', enunciado: 'Qual é o sujeito da frase: "O cachorro latiu"?', opcoes: ['O', 'Cachorro', 'Latiu', 'Frase'], correta: 1, dica: 'Quem faz a ação.' },
  { id: 10, tipo: 'vf', enunciado: '"Eles estudam" está no plural.', correta: true, dica: 'Mais de um sujeito.' },
  { id: 11, tipo: 'lacuna', enunciado: 'O diminutivo de "flor" é _______.', correta: 'florzinha', dica: 'Termina com "inha".' },
  { id: 12, tipo: 'multipla', enunciado: 'Qual destas palavras é um advérbio?', opcoes: ['Rápido', 'Rapidamente', 'Rápida', 'Rapidez'], correta: 1, dica: 'Indica modo.' },
  { id: 13, tipo: 'multipla', enunciado: 'Qual é o coletivo de "peixe"?', opcoes: ['Cardume', 'Rebanho', 'Matilha', 'Bando'], correta: 0, dica: 'Grupo de peixes.' },
  { id: 14, tipo: 'vf', enunciado: '"Casa" é um substantivo comum.', correta: true, dica: 'Não é nome próprio.' },
  { id: 15, tipo: 'lacuna', enunciado: 'O feminino de "leão" é _______.', correta: 'leoa', dica: 'Termina com "a".' },
  { id: 16, tipo: 'multipla', enunciado: 'Qual destas palavras é um pronome?', opcoes: ['Ele', 'Mesa', 'Bonito', 'Correr'], correta: 0, dica: 'Substitui o nome.' },
  { id: 17, tipo: 'multipla', enunciado: 'Qual é o tempo verbal de "eu comeria"?', opcoes: ['Presente', 'Futuro', 'Pretérito', 'Condicional'], correta: 3, dica: 'Expressa condição.' },
  { id: 18, tipo: 'vf', enunciado: '"A gente" é uma expressão informal.', correta: true, dica: 'Usada na fala do dia a dia.' },
  { id: 19, tipo: 'lacuna', enunciado: 'O plural de "pão" é _______.', correta: 'pães', dica: 'Termina com "ães".' },
  { id: 20, tipo: 'multipla', enunciado: 'Qual destas frases está no futuro?', opcoes: ['Eu fui', 'Eu vou', 'Eu irei', 'Eu ia'], correta: 2, dica: 'Ação que ainda vai acontecer.' },
  { id: 21, tipo: 'multipla', enunciado: 'Qual é o aumentativo de "homem"?', opcoes: ['Homão', 'Homemzão', 'Homemão', 'Homemzão'], correta: 1, dica: 'Termina com "zão".' },
  { id: 22, tipo: 'vf', enunciado: '"Bonita" é um adjetivo.', correta: true, dica: 'Qualifica o substantivo.' },
  { id: 23, tipo: 'lacuna', enunciado: 'O coletivo de "abelha" é _______.', correta: 'enxame', dica: 'Grupo de abelhas.' },
  { id: 24, tipo: 'multipla', enunciado: 'Qual destas palavras é um substantivo?', opcoes: ['Correr', 'Mesa', 'Rápido', 'Feliz'], correta: 1, dica: 'Nome de objeto.' },
  { id: 25, tipo: 'multipla', enunciado: 'Qual é o antônimo de "claro"?', opcoes: ['Escuro', 'Branco', 'Luz', 'Dia'], correta: 0, dica: 'Oposto de claro.' },
  { id: 26, tipo: 'vf', enunciado: '"Nós" é um pronome pessoal.', correta: true, dica: 'Refere-se a quem fala e outros.' },
  { id: 27, tipo: 'lacuna', enunciado: 'O plural de "mão" é _______.', correta: 'mãos', dica: 'Termina com "ãos".' },
  { id: 28, tipo: 'multipla', enunciado: 'Qual destas frases está correta?', opcoes: ['Eu estudou', 'Eu estudo', 'Eu estudas', 'Eu estudam'], correta: 1, dica: 'Concordância verbal.' },
  { id: 29, tipo: 'multipla', enunciado: 'Qual é o feminino de "pato"?', opcoes: ['Pata', 'Patoa', 'Pate', 'Patona'], correta: 0, dica: 'Termina com "a".' },
  { id: 30, tipo: 'vf', enunciado: '"Correr" é um verbo.', correta: true, dica: 'Indica ação.' },
  { id: 31, tipo: 'lacuna', enunciado: 'O coletivo de "aluno" é _______.', correta: 'turma', dica: 'Grupo de alunos.' },
  { id: 32, tipo: 'multipla', enunciado: 'Qual destas palavras é um adjetivo?', opcoes: ['Mesa', 'Feliz', 'Correr', 'Rapidamente'], correta: 1, dica: 'Qualifica o substantivo.' },
  { id: 33, tipo: 'multipla', enunciado: 'Qual é o plural de "papel"?', opcoes: ['Papeis', 'Papéis', 'Papéises', 'Papels'], correta: 1, dica: 'Tem acento.' },
  { id: 34, tipo: 'vf', enunciado: '"Eles" é um pronome pessoal do plural.', correta: true, dica: 'Refere-se a mais de uma pessoa.' },
  { id: 35, tipo: 'lacuna', enunciado: 'O feminino de "professor" é _______.', correta: 'professora', dica: 'Termina com "a".' },
  { id: 36, tipo: 'multipla', enunciado: 'Qual destas palavras é um advérbio?', opcoes: ['Devagar', 'Mesa', 'Bonito', 'Correr'], correta: 0, dica: 'Indica modo.' },
  { id: 37, tipo: 'multipla', enunciado: 'Qual é o coletivo de "lobo"?', opcoes: ['Alcateia', 'Rebanho', 'Cardume', 'Matilha'], correta: 0, dica: 'Grupo de lobos.' },
  { id: 38, tipo: 'vf', enunciado: '"Rápido" pode ser adjetivo ou advérbio.', correta: true, dica: 'Depende do contexto.' },
  { id: 39, tipo: 'lacuna', enunciado: 'O plural de "pincel" é _______.', correta: 'pincéis', dica: 'Tem acento.' },
  { id: 40, tipo: 'multipla', enunciado: 'Qual destas frases está no passado?', opcoes: ['Eu vou', 'Eu fui', 'Eu irei', 'Eu vou ir'], correta: 1, dica: 'Ação já realizada.' },
  { id: 41, tipo: 'multipla', enunciado: 'Qual é o antônimo de "feliz"?', opcoes: ['Triste', 'Alegre', 'Rápido', 'Grande'], correta: 0, dica: 'Oposto de feliz.' },
  { id: 42, tipo: 'vf', enunciado: '"Mesa" é um substantivo comum.', correta: true, dica: 'Não é nome próprio.' },
  { id: 43, tipo: 'lacuna', enunciado: 'O coletivo de "navio" é _______.', correta: 'frota', dica: 'Grupo de navios.' },
  { id: 44, tipo: 'multipla', enunciado: 'Qual destas palavras é um verbo?', opcoes: ['Correr', 'Mesa', 'Bonito', 'Rápido'], correta: 0, dica: 'Indica ação.' },
  { id: 45, tipo: 'multipla', enunciado: 'Qual é o plural de "cidadão"?', opcoes: ['Cidadãos', 'Cidadões', 'Cidadães', 'Cidadãos'], correta: 0, dica: 'Termina com "ãos".' },
  { id: 46, tipo: 'vf', enunciado: '"Rápida" é um adjetivo.', correta: true, dica: 'Qualifica o substantivo.' },
  { id: 47, tipo: 'lacuna', enunciado: 'O feminino de "menino" é _______.', correta: 'menina', dica: 'Termina com "a".' },
  { id: 48, tipo: 'multipla', enunciado: 'Qual destas frases está correta?', opcoes: ['Eu comeu', 'Eu comi', 'Eu comer', 'Eu comendo'], correta: 1, dica: 'Concordância verbal.' },
  { id: 49, tipo: 'multipla', enunciado: 'Qual é o coletivo de "elefante"?', opcoes: ['Manada', 'Rebanho', 'Cardume', 'Matilha'], correta: 0, dica: 'Grupo de elefantes.' }
],
  'ciencias': [
  { id: 0, tipo: 'multipla', enunciado: 'Qual é o maior órgão do corpo humano?', opcoes: ['Coração', 'Pele', 'Fígado', 'Pulmão'], correta: 1, dica: 'Reveste todo o corpo.' },
  { id: 1, tipo: 'multipla', enunciado: 'Qual destes animais é um mamífero?', opcoes: ['Sapo', 'Cobra', 'Gato', 'Galinha'], correta: 2, dica: 'Tem pelos e mama.' },
  { id: 2, tipo: 'vf', enunciado: 'A água ferve a 100°C ao nível do mar.', correta: true, dica: 'É o ponto de ebulição.' },
  { id: 3, tipo: 'lacuna', enunciado: 'O gás essencial para a respiração é o _______.', correta: 'oxigênio', dica: 'Representado por O2.' },
  { id: 4, tipo: 'multipla', enunciado: 'Qual é o planeta mais próximo do Sol?', opcoes: ['Vênus', 'Terra', 'Mercúrio', 'Marte'], correta: 2, dica: 'É também o menor planeta.' },
  { id: 5, tipo: 'multipla', enunciado: 'Qual destes é um estado físico da água?', opcoes: ['Gelo', 'Vapor', 'Líquido', 'Todos'], correta: 3, dica: 'Pode ser sólido, líquido ou gasoso.' },
  { id: 6, tipo: 'vf', enunciado: 'O sangue é um tecido do corpo humano.', correta: true, dica: 'É considerado tecido conjuntivo.' },
  { id: 7, tipo: 'lacuna', enunciado: 'O animal que voa e põe ovos é o _______.', correta: 'pássaro', dica: 'Tem asas e bico.' },
  { id: 8, tipo: 'multipla', enunciado: 'Qual destes é um invertebrado?', opcoes: ['Cachorro', 'Borboleta', 'Gato', 'Cavalo'], correta: 1, dica: 'Não tem coluna vertebral.' },
  { id: 9, tipo: 'multipla', enunciado: 'Qual é a principal fonte de energia para as plantas?', opcoes: ['Água', 'Sol', 'Terra', 'Vento'], correta: 1, dica: 'Fotossíntese.' },
  { id: 10, tipo: 'vf', enunciado: 'O ser humano tem 206 ossos.', correta: true, dica: 'No corpo adulto.' },
  { id: 11, tipo: 'lacuna', enunciado: 'O planeta conhecido como planeta vermelho é _______.', correta: 'Marte', dica: 'É o quarto planeta do Sol.' },
  { id: 12, tipo: 'multipla', enunciado: 'Qual destes é um órgão do sistema digestório?', opcoes: ['Coração', 'Estômago', 'Pulmão', 'Rim'], correta: 1, dica: 'Ajuda na digestão.' },
  { id: 13, tipo: 'multipla', enunciado: 'Qual é a função das raízes nas plantas?', opcoes: ['Respirar', 'Absorver água', 'Produzir flores', 'Fazer fotossíntese'], correta: 1, dica: 'Ficam no solo.' },
  { id: 14, tipo: 'vf', enunciado: 'A lua é um satélite natural da Terra.', correta: true, dica: 'Gira ao redor da Terra.' },
  { id: 15, tipo: 'lacuna', enunciado: 'O animal que vive na água e respira por brânquias é o _______.', correta: 'peixe', dica: 'Nada e tem escamas.' },
  { id: 16, tipo: 'multipla', enunciado: 'Qual destes é um exemplo de herbívoro?', opcoes: ['Leão', 'Vaca', 'Cachorro', 'Gato'], correta: 1, dica: 'Alimenta-se de plantas.' },
  { id: 17, tipo: 'multipla', enunciado: 'Qual é o maior planeta do Sistema Solar?', opcoes: ['Terra', 'Júpiter', 'Saturno', 'Netuno'], correta: 1, dica: 'É um gigante gasoso.' },
  { id: 18, tipo: 'vf', enunciado: 'O Sol é uma estrela.', correta: true, dica: 'É a estrela mais próxima da Terra.' },
  { id: 19, tipo: 'lacuna', enunciado: 'O órgão responsável por bombear sangue é o _______.', correta: 'coração', dica: 'Fica no peito.' },
  { id: 20, tipo: 'multipla', enunciado: 'Qual destes animais é ovíparo?', opcoes: ['Gato', 'Cachorro', 'Galinha', 'Vaca'], correta: 2, dica: 'Nasce de ovos.' },
  { id: 21, tipo: 'multipla', enunciado: 'Qual é a função dos pulmões?', opcoes: ['Bombear sangue', 'Respirar', 'Digere alimentos', 'Filtrar sangue'], correta: 1, dica: 'Absorve oxigênio.' },
  { id: 22, tipo: 'vf', enunciado: 'A fotossíntese ocorre nas folhas das plantas.', correta: true, dica: 'É onde há clorofila.' },
  { id: 23, tipo: 'lacuna', enunciado: 'O animal que produz mel é a _______.', correta: 'abelha', dica: 'Inseto importante para a natureza.' },
  { id: 24, tipo: 'multipla', enunciado: 'Qual destes é um animal carnívoro?', opcoes: ['Vaca', 'Leão', 'Cavalo', 'Coelho'], correta: 1, dica: 'Alimenta-se de carne.' },
  { id: 25, tipo: 'multipla', enunciado: 'Qual é o principal gás do ar?', opcoes: ['Oxigênio', 'Hidrogênio', 'Nitrogênio', 'Gás carbônico'], correta: 2, dica: 'Representa 78% do ar.' },
  { id: 26, tipo: 'vf', enunciado: 'O corpo humano é formado por células.', correta: true, dica: 'São as menores unidades da vida.' },
  { id: 27, tipo: 'lacuna', enunciado: 'O animal que pula e tem bolsa é o _______.', correta: 'canguru', dica: 'Vive na Austrália.' },
  { id: 28, tipo: 'multipla', enunciado: 'Qual destes é um animal anfíbio?', opcoes: ['Sapo', 'Gato', 'Cobra', 'Galinha'], correta: 0, dica: 'Vive na água e na terra.' },
  { id: 29, tipo: 'multipla', enunciado: 'Qual é o maior osso do corpo humano?', opcoes: ['Fêmur', 'Tíbia', 'Úmero', 'Rádio'], correta: 0, dica: 'Fica na coxa.' },
  { id: 30, tipo: 'vf', enunciado: 'O sangue transporta oxigênio pelo corpo.', correta: true, dica: 'Leva nutrientes e gases.' },
  { id: 31, tipo: 'lacuna', enunciado: 'O planeta mais distante do Sol é _______.', correta: 'Netuno', dica: 'É o oitavo planeta.' },
  { id: 32, tipo: 'multipla', enunciado: 'Qual destes é um animal invertebrado?', opcoes: ['Borboleta', 'Cachorro', 'Gato', 'Cavalo'], correta: 0, dica: 'Não tem coluna vertebral.' },
  { id: 33, tipo: 'multipla', enunciado: 'Qual é a função do estômago?', opcoes: ['Bombear sangue', 'Respirar', 'Digere alimentos', 'Filtrar sangue'], correta: 2, dica: 'Ajuda na digestão.' },
  { id: 34, tipo: 'vf', enunciado: 'O Sol é maior que a Terra.', correta: true, dica: 'É uma estrela gigante.' },
  { id: 35, tipo: 'lacuna', enunciado: 'O animal que tem tromba é o _______.', correta: 'elefante', dica: 'É o maior animal terrestre.' },
  { id: 36, tipo: 'multipla', enunciado: 'Qual destes é um animal onívoro?', opcoes: ['Vaca', 'Leão', 'Porco', 'Coelho'], correta: 2, dica: 'Come de tudo.' },
  { id: 37, tipo: 'multipla', enunciado: 'Qual é o menor planeta do Sistema Solar?', opcoes: ['Terra', 'Júpiter', 'Mercúrio', 'Netuno'], correta: 2, dica: 'É o mais próximo do Sol.' },
  { id: 38, tipo: 'vf', enunciado: 'A água cobre mais de 70% da superfície da Terra.', correta: true, dica: 'Oceano, rios e lagos.' },
  { id: 39, tipo: 'lacuna', enunciado: 'O animal que produz lã é a _______.', correta: 'ovelha', dica: 'Animal de fazenda.' },
  { id: 40, tipo: 'multipla', enunciado: 'Qual destes é um animal réptil?', opcoes: ['Cobra', 'Gato', 'Sapo', 'Galinha'], correta: 0, dica: 'Tem escamas.' },
  { id: 41, tipo: 'multipla', enunciado: 'Qual é o principal órgão do sistema nervoso?', opcoes: ['Coração', 'Cérebro', 'Pulmão', 'Rim'], correta: 1, dica: 'Comanda o corpo.' },
  { id: 42, tipo: 'vf', enunciado: 'O ser humano é um mamífero.', correta: true, dica: 'Tem pelos e mama.' },
  { id: 43, tipo: 'lacuna', enunciado: 'O animal que tem asas e bico é o _______.', correta: 'pássaro', dica: 'Pode voar.' },
  { id: 44, tipo: 'multipla', enunciado: 'Qual destes é um animal aquático?', opcoes: ['Cavalo', 'Peixe', 'Gato', 'Galinha'], correta: 1, dica: 'Vive na água.' },
  { id: 45, tipo: 'multipla', enunciado: 'Qual é o principal gás responsável pelo efeito estufa?', opcoes: ['Oxigênio', 'Hidrogênio', 'Gás carbônico', 'Nitrogênio'], correta: 2, dica: 'CO2.' },
  { id: 46, tipo: 'vf', enunciado: 'O corpo humano tem dois rins.', correta: true, dica: 'Filtram o sangue.' },
  { id: 47, tipo: 'lacuna', enunciado: 'O animal que tem carapaça é o _______.', correta: 'tartaruga', dica: 'Vive na água e na terra.' },
  { id: 48, tipo: 'multipla', enunciado: 'Qual destes é um animal marsupial?', opcoes: ['Canguru', 'Gato', 'Cobra', 'Galinha'], correta: 0, dica: 'Tem bolsa.' },
  { id: 49, tipo: 'multipla', enunciado: 'Qual é o maior animal do planeta?', opcoes: ['Elefante', 'Baleia-azul', 'Girafa', 'Leão'], correta: 1, dica: 'Vive no mar.' }
],

'historia': [
  { id: 0, tipo: 'multipla', enunciado: 'Quem foi o primeiro presidente do Brasil?', opcoes: ['Getúlio Vargas', 'Deodoro da Fonseca', 'Juscelino Kubitschek', 'Dom Pedro II'], correta: 1, dica: 'Proclamou a República.' },
  { id: 1, tipo: 'multipla', enunciado: 'Em que ano o Brasil foi descoberto?', opcoes: ['1500', '1822', '1889', '1492'], correta: 0, dica: 'Pedro Álvares Cabral.' },
  { id: 2, tipo: 'vf', enunciado: 'A escravidão no Brasil foi abolida em 1888.', correta: true, dica: 'Lei Áurea.' },
  { id: 3, tipo: 'lacuna', enunciado: 'O descobridor do Brasil foi _______.', correta: 'Pedro Álvares Cabral', dica: 'Chegou em 1500.' },
  { id: 4, tipo: 'multipla', enunciado: 'Quem proclamou a independência do Brasil?', opcoes: ['Dom Pedro I', 'Dom Pedro II', 'Getúlio Vargas', 'Tiradentes'], correta: 0, dica: '"Independência ou morte!"' },
  { id: 5, tipo: 'multipla', enunciado: 'Qual era o nome da capital do Brasil antes de Brasília?', opcoes: ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Belo Horizonte'], correta: 1, dica: 'Cidade maravilhosa.' },
  { id: 6, tipo: 'vf', enunciado: 'A Proclamação da República ocorreu em 1889.', correta: true, dica: 'Fim do Império.' },
  { id: 7, tipo: 'lacuna', enunciado: 'O movimento que lutou pelo fim da escravidão foi o _______.', correta: 'abolicionismo', dica: 'Abolir = acabar.' },
  { id: 8, tipo: 'multipla', enunciado: 'Quem foi o líder da Inconfidência Mineira?', opcoes: ['Tiradentes', 'Dom Pedro I', 'Getúlio Vargas', 'Zumbi'], correta: 0, dica: 'Símbolo da liberdade.' },
  { id: 9, tipo: 'multipla', enunciado: 'Em que ano foi assinada a Lei Áurea?', opcoes: ['1888', '1822', '1500', '1889'], correta: 0, dica: 'Fim da escravidão.' },
  { id: 10, tipo: 'vf', enunciado: 'A capital do Brasil já foi Salvador.', correta: true, dica: 'Primeira capital.' },
  { id: 11, tipo: 'lacuna', enunciado: 'O nome do navio que trouxe Cabral ao Brasil era _______.', correta: 'Nau Capitânia', dica: 'Nau principal.' },
  { id: 12, tipo: 'multipla', enunciado: 'Quem foi o imperador do Brasil durante a independência?', opcoes: ['Dom Pedro I', 'Dom Pedro II', 'Getúlio Vargas', 'Juscelino Kubitschek'], correta: 0, dica: 'Primeiro imperador.' },
  { id: 13, tipo: 'multipla', enunciado: 'Qual foi o principal produto exportado pelo Brasil colonial?', opcoes: ['Café', 'Açúcar', 'Ouro', 'Algodão'], correta: 1, dica: 'Plantado em engenhos.' },
  { id: 14, tipo: 'vf', enunciado: 'A escravidão existiu no Brasil por mais de 300 anos.', correta: true, dica: 'Começou no século XVI.' },
  { id: 15, tipo: 'lacuna', enunciado: 'O nome da princesa que assinou a Lei Áurea é _______.', correta: 'Princesa Isabel', dica: 'Filha de Dom Pedro II.' },
  { id: 16, tipo: 'multipla', enunciado: 'Quem foi o líder do Quilombo dos Palmares?', opcoes: ['Zumbi', 'Tiradentes', 'Dom Pedro I', 'Getúlio Vargas'], correta: 0, dica: 'Símbolo da resistência negra.' },
  { id: 17, tipo: 'multipla', enunciado: 'Em que ano o Brasil se tornou independente?', opcoes: ['1500', '1822', '1888', '1889'], correta: 1, dica: '"Independência ou morte!"' },
  { id: 18, tipo: 'vf', enunciado: 'A República foi proclamada após o Império.', correta: true, dica: 'Fim do governo monárquico.' },
  { id: 19, tipo: 'lacuna', enunciado: 'O nome do movimento que lutou pela independência de Minas Gerais foi _______.', correta: 'Inconfidência Mineira', dica: 'Tiradentes participou.' },
  { id: 20, tipo: 'multipla', enunciado: 'Quem foi o presidente que construiu Brasília?', opcoes: ['Getúlio Vargas', 'Juscelino Kubitschek', 'Fernando Henrique', 'Lula'], correta: 1, dica: 'JK.' },
  { id: 21, tipo: 'multipla', enunciado: 'Qual era o nome do Brasil antes da independência?', opcoes: ['Brasil', 'Terra de Santa Cruz', 'Pindorama', 'Ilha de Vera Cruz'], correta: 1, dica: 'Nome religioso.' },
  { id: 22, tipo: 'vf', enunciado: 'A escravidão foi abolida pela Lei Áurea.', correta: true, dica: 'Assinada em 1888.' },
  { id: 23, tipo: 'lacuna', enunciado: 'O nome do movimento que lutou pela abolição da escravidão foi _______.', correta: 'abolicionismo', dica: 'Abolir = acabar.' },
  { id: 24, tipo: 'multipla', enunciado: 'Quem foi o primeiro imperador do Brasil?', opcoes: ['Dom Pedro I', 'Dom Pedro II', 'Getúlio Vargas', 'Juscelino Kubitschek'], correta: 0, dica: 'Proclamou a independência.' },
  { id: 25, tipo: 'multipla', enunciado: 'Qual foi o principal produto exportado pelo Brasil no século XIX?', opcoes: ['Café', 'Açúcar', 'Ouro', 'Algodão'], correta: 0, dica: 'Bebida popular.' },
  { id: 26, tipo: 'vf', enunciado: 'A Inconfidência Mineira ocorreu em Minas Gerais.', correta: true, dica: 'Estado do sudeste.' },
  { id: 27, tipo: 'lacuna', enunciado: 'O nome do movimento que lutou pela independência do Brasil foi _______.', correta: 'Independência do Brasil', dica: '"Independência ou morte!"' },
  { id: 28, tipo: 'multipla', enunciado: 'Quem foi o presidente do Brasil durante a Segunda Guerra Mundial?', opcoes: ['Getúlio Vargas', 'Juscelino Kubitschek', 'Fernando Henrique', 'Lula'], correta: 0, dica: '"Pai dos pobres".' },
  { id: 29, tipo: 'multipla', enunciado: 'Qual era o nome da capital do Brasil antes do Rio de Janeiro?', opcoes: ['São Paulo', 'Salvador', 'Belo Horizonte', 'Brasília'], correta: 1, dica: 'Primeira capital.' },
  { id: 30, tipo: 'vf', enunciado: 'A Proclamação da República ocorreu em 1889.', correta: true, dica: 'Fim do Império.' },
  { id: 31, tipo: 'lacuna', enunciado: 'O nome do movimento que lutou pela liberdade dos escravos foi _______.', correta: 'abolicionismo', dica: 'Abolir = acabar.' },
  { id: 32, tipo: 'multipla', enunciado: 'Quem foi o líder da Revolta dos Malês?', opcoes: ['Zumbi', 'Tiradentes', 'Dom Pedro I', 'Getúlio Vargas'], correta: 0, dica: 'Símbolo da resistência negra.' },
  { id: 33, tipo: 'multipla', enunciado: 'Em que ano foi proclamada a República?', opcoes: ['1889', '1822', '1500', '1888'], correta: 0, dica: 'Fim do Império.' },
  { id: 34, tipo: 'vf', enunciado: 'A escravidão existiu no Brasil por mais de 300 anos.', correta: true, dica: 'Começou no século XVI.' },
  { id: 35, tipo: 'lacuna', enunciado: 'O nome do movimento que lutou pela independência do Brasil foi _______.', correta: 'Independência do Brasil', dica: '"Independência ou morte!"' },
  { id: 36, tipo: 'multipla', enunciado: 'Quem foi o presidente que construiu Brasília?', opcoes: ['Getúlio Vargas', 'Juscelino Kubitschek', 'Fernando Henrique', 'Lula'], correta: 1, dica: 'JK.' },
  { id: 37, tipo: 'multipla', enunciado: 'Qual era o nome do Brasil antes da independência?', opcoes: ['Brasil', 'Terra de Santa Cruz', 'Pindorama', 'Ilha de Vera Cruz'], correta: 1, dica: 'Nome religioso.' },
  { id: 38, tipo: 'vf', enunciado: 'A escravidão foi abolida pela Lei Áurea.', correta: true, dica: 'Assinada em 1888.' },
  { id: 39, tipo: 'lacuna', enunciado: 'O nome do movimento que lutou pela abolição da escravidão foi _______.', correta: 'abolicionismo', dica: 'Abolir = acabar.' },
  { id: 40, tipo: 'multipla', enunciado: 'Quem foi o primeiro imperador do Brasil?', opcoes: ['Dom Pedro I', 'Dom Pedro II', 'Getúlio Vargas', 'Juscelino Kubitschek'], correta: 0, dica: 'Proclamou a independência.' },
  { id: 41, tipo: 'multipla', enunciado: 'Qual foi o principal produto exportado pelo Brasil no século XIX?', opcoes: ['Café', 'Açúcar', 'Ouro', 'Algodão'], correta: 0, dica: 'Bebida popular.' },
  { id: 42, tipo: 'vf', enunciado: 'A Inconfidência Mineira ocorreu em Minas Gerais.', correta: true, dica: 'Estado do sudeste.' },
  { id: 43, tipo: 'lacuna', enunciado: 'O nome do movimento que lutou pela independência do Brasil foi _______.', correta: 'Independência do Brasil', dica: '"Independência ou morte!"' },
  { id: 44, tipo: 'multipla', enunciado: 'Quem foi o presidente do Brasil durante a Segunda Guerra Mundial?', opcoes: ['Getúlio Vargas', 'Juscelino Kubitschek', 'Fernando Henrique', 'Lula'], correta: 0, dica: '"Pai dos pobres".' },
  { id: 45, tipo: 'multipla', enunciado: 'Qual era o nome da capital do Brasil antes do Rio de Janeiro?', opcoes: ['São Paulo', 'Salvador', 'Belo Horizonte', 'Brasília'], correta: 1, dica: 'Primeira capital.' },
  { id: 46, tipo: 'vf', enunciado: 'A Proclamação da República ocorreu em 1889.', correta: true, dica: 'Fim do Império.' },
  { id: 47, tipo: 'lacuna', enunciado: 'O nome do movimento que lutou pela liberdade dos escravos foi _______.', correta: 'abolicionismo', dica: 'Abolir = acabar.' },
  { id: 48, tipo: 'multipla', enunciado: 'Quem foi o líder da Revolta dos Malês?', opcoes: ['Zumbi', 'Tiradentes', 'Dom Pedro I', 'Getúlio Vargas'], correta: 0, dica: 'Símbolo da resistência negra.' },
  { id: 49, tipo: 'multipla', enunciado: 'Em que ano foi proclamada a República?', opcoes: ['1889', '1822', '1500', '1888'], correta: 0, dica: 'Fim do Império.' }
],

'geografia': [
  { id: 0, tipo: 'multipla', enunciado: 'Qual é o maior país da América do Sul?', opcoes: ['Argentina', 'Brasil', 'Chile', 'Colômbia'], correta: 1, dica: 'É o nosso país.' },
  { id: 1, tipo: 'multipla', enunciado: 'Qual é o maior oceano do mundo?', opcoes: ['Atlântico', 'Índico', 'Pacífico', 'Ártico'], correta: 2, dica: 'Fica entre América e Ásia.' },
  { id: 2, tipo: 'vf', enunciado: 'O Brasil faz fronteira com todos os países da América do Sul, exceto Chile e Equador.', correta: true, dica: 'Dois países não fazem fronteira.' },
  { id: 3, tipo: 'lacuna', enunciado: 'A capital do Brasil é _______.', correta: 'Brasília', dica: 'Cidade planejada.' },
  { id: 4, tipo: 'multipla', enunciado: 'Qual é o maior rio do mundo em volume de água?', opcoes: ['Nilo', 'Amazonas', 'Mississipi', 'Yangtzé'], correta: 1, dica: 'Fica no Brasil.' },
  { id: 5, tipo: 'multipla', enunciado: 'Qual é o menor continente?', opcoes: ['Europa', 'Oceania', 'África', 'Ásia'], correta: 1, dica: 'Austrália faz parte dele.' },
  { id: 6, tipo: 'vf', enunciado: 'O deserto do Saara fica na África.', correta: true, dica: 'É o maior deserto quente do mundo.' },
  { id: 7, tipo: 'lacuna', enunciado: 'O maior estado do Brasil é _______.', correta: 'Amazonas', dica: 'Fica na região Norte.' },
  { id: 8, tipo: 'multipla', enunciado: 'Qual é o ponto mais alto do Brasil?', opcoes: ['Pico da Neblina', 'Pico das Agulhas Negras', 'Monte Roraima', 'Pão de Açúcar'], correta: 0, dica: 'Fica no Amazonas.' },
  { id: 9, tipo: 'multipla', enunciado: 'Qual é o bioma predominante na região Norte do Brasil?', opcoes: ['Cerrado', 'Caatinga', 'Amazônia', 'Pampas'], correta: 2, dica: 'Floresta tropical.' },
  { id: 10, tipo: 'vf', enunciado: 'O Brasil está localizado na América do Sul.', correta: true, dica: 'É o maior país do continente.' },
  { id: 11, tipo: 'lacuna', enunciado: 'O maior arquipélago do Brasil é _______.', correta: 'Fernando de Noronha', dica: 'Fica no Atlântico.' },
  { id: 12, tipo: 'multipla', enunciado: 'Qual é o clima predominante na região Nordeste?', opcoes: ['Equatorial', 'Semiárido', 'Tropical', 'Subtropical'], correta: 1, dica: 'Pouca chuva.' },
  { id: 13, tipo: 'multipla', enunciado: 'Qual é o maior lago do Brasil?', opcoes: ['Lagoa dos Patos', 'Lago Paranoá', 'Lagoa Mirim', 'Lago de Sobradinho'], correta: 0, dica: 'Fica no Rio Grande do Sul.' },
  { id: 14, tipo: 'vf', enunciado: 'O Rio São Francisco nasce em Minas Gerais.', correta: true, dica: 'Corta o Nordeste.' },
  { id: 15, tipo: 'lacuna', enunciado: 'O bioma típico do Sul do Brasil é o _______.', correta: 'Pampas', dica: 'Campos abertos.' },
  { id: 16, tipo: 'multipla', enunciado: 'Qual é o maior país do mundo?', opcoes: ['China', 'Estados Unidos', 'Rússia', 'Canadá'], correta: 2, dica: 'Fica na Eurásia.' },
  { id: 17, tipo: 'multipla', enunciado: 'Qual é o menor estado do Brasil?', opcoes: ['Sergipe', 'Alagoas', 'Rio de Janeiro', 'Espírito Santo'], correta: 0, dica: 'Fica no Nordeste.' },
  { id: 18, tipo: 'vf', enunciado: 'O Pantanal é o maior alagado do mundo.', correta: true, dica: 'Fica no Centro-Oeste.' },
  { id: 19, tipo: 'lacuna', enunciado: 'O maior país da América do Norte é _______.', correta: 'Canadá', dica: 'Fica acima dos EUA.' },
  { id: 20, tipo: 'multipla', enunciado: 'Qual é o oceano que banha o litoral leste do Brasil?', opcoes: ['Atlântico', 'Pacífico', 'Índico', 'Ártico'], correta: 0, dica: 'Oceano tropical.' },
  { id: 21, tipo: 'multipla', enunciado: 'Qual é o bioma predominante no Centro-Oeste?', opcoes: ['Cerrado', 'Amazônia', 'Caatinga', 'Mata Atlântica'], correta: 0, dica: 'Vegetação de savana.' },
  { id: 22, tipo: 'vf', enunciado: 'O Brasil tem 26 estados e 1 Distrito Federal.', correta: true, dica: 'Total de 27 unidades federativas.' },
  { id: 23, tipo: 'lacuna', enunciado: 'O maior rio da América do Sul é o _______.', correta: 'Amazonas', dica: 'Corta a floresta.' },
  { id: 24, tipo: 'multipla', enunciado: 'Qual é o maior continente?', opcoes: ['África', 'Ásia', 'Europa', 'América'], correta: 1, dica: 'Fica a China.' },
  { id: 25, tipo: 'multipla', enunciado: 'Qual é o clima predominante na região Sul?', opcoes: ['Equatorial', 'Tropical', 'Subtropical', 'Semiárido'], correta: 2, dica: 'Invernos frios.' },
  { id: 26, tipo: 'vf', enunciado: 'O Rio Amazonas nasce no Peru.', correta: true, dica: 'Deságua no Brasil.' },
  { id: 27, tipo: 'lacuna', enunciado: 'O maior deserto do mundo é o _______.', correta: 'Saara', dica: 'Fica na África.' },
  { id: 28, tipo: 'multipla', enunciado: 'Qual é o maior arquipélago do mundo?', opcoes: ['Indonésia', 'Filipinas', 'Japão', 'Maldivas'], correta: 0, dica: 'País asiático.' },
  { id: 29, tipo: 'multipla', enunciado: 'Qual é o maior lago do mundo?', opcoes: ['Lago Baikal', 'Lago Vitória', 'Mar Cáspio', 'Lago Superior'], correta: 2, dica: 'É chamado de mar.' },
  { id: 30, tipo: 'vf', enunciado: 'O Brasil faz parte do Mercosul.', correta: true, dica: 'Bloco econômico sul-americano.' },
  { id: 31, tipo: 'lacuna', enunciado: 'O maior país da África é _______.', correta: 'Argélia', dica: 'Fica no norte do continente.' },
  { id: 32, tipo: 'multipla', enunciado: 'Qual é o maior país da Europa?', opcoes: ['França', 'Alemanha', 'Rússia', 'Espanha'], correta: 2, dica: 'Fica em dois continentes.' },
  { id: 33, tipo: 'multipla', enunciado: 'Qual é o maior arquipélago do Brasil?', opcoes: ['Fernando de Noronha', 'Ilha Grande', 'Marajó', 'Abrolhos'], correta: 0, dica: 'Fica no Atlântico.' },
  { id: 34, tipo: 'vf', enunciado: 'O Brasil tem cinco regiões geográficas.', correta: true, dica: 'Norte, Nordeste, Centro-Oeste, Sudeste, Sul.' },
  { id: 35, tipo: 'lacuna', enunciado: 'O maior país da Oceania é _______.', correta: 'Austrália', dica: 'É também um continente.' },
  { id: 36, tipo: 'multipla', enunciado: 'Qual é o maior país da Ásia?', opcoes: ['China', 'Índia', 'Rússia', 'Japão'], correta: 2, dica: 'Fica em dois continentes.' },
  { id: 37, tipo: 'multipla', enunciado: 'Qual é o maior país da América Central?', opcoes: ['México', 'Guatemala', 'Panamá', 'Honduras'], correta: 0, dica: 'Faz fronteira com os EUA.' },
  { id: 38, tipo: 'vf', enunciado: 'O Brasil é banhado pelo Oceano Atlântico.', correta: true, dica: 'Litoral leste.' },
  { id: 39, tipo: 'lacuna', enunciado: 'O maior país da América do Sul é _______.', correta: 'Brasil', dica: 'É o nosso país.' },
  { id: 40, tipo: 'multipla', enunciado: 'Qual é o maior arquipélago do mundo?', opcoes: ['Indonésia', 'Filipinas', 'Japão', 'Maldivas'], correta: 0, dica: 'País asiático.' },
  { id: 41, tipo: 'multipla', enunciado: 'Qual é o maior lago do mundo?', opcoes: ['Lago Baikal', 'Lago Vitória', 'Mar Cáspio', 'Lago Superior'], correta: 2, dica: 'É chamado de mar.' },
  { id: 42, tipo: 'vf', enunciado: 'O Brasil faz parte do Mercosul.', correta: true, dica: 'Bloco econômico sul-americano.' },
  { id: 43, tipo: 'lacuna', enunciado: 'O maior país da África é _______.', correta: 'Argélia', dica: 'Fica no norte do continente.' },
  { id: 44, tipo: 'multipla', enunciado: 'Qual é o maior país da Europa?', opcoes: ['França', 'Alemanha', 'Rússia', 'Espanha'], correta: 2, dica: 'Fica em dois continentes.' },
  { id: 45, tipo: 'multipla', enunciado: 'Qual é o maior arquipélago do Brasil?', opcoes: ['Fernando de Noronha', 'Ilha Grande', 'Marajó', 'Abrolhos'], correta: 0, dica: 'Fica no Atlântico.' },
  { id: 46, tipo: 'vf', enunciado: 'O Brasil tem cinco regiões geográficas.', correta: true, dica: 'Norte, Nordeste, Centro-Oeste, Sudeste, Sul.' },
  { id: 47, tipo: 'lacuna', enunciado: 'O maior país da Oceania é _______.', correta: 'Austrália', dica: 'É também um continente.' },
  { id: 48, tipo: 'multipla', enunciado: 'Qual é o maior país da Ásia?', opcoes: ['China', 'Índia', 'Rússia', 'Japão'], correta: 2, dica: 'Fica em dois continentes.' },
  { id: 49, tipo: 'multipla', enunciado: 'Qual é o maior país da América Central?', opcoes: ['México', 'Guatemala', 'Panamá', 'Honduras'], correta: 0, dica: 'Faz fronteira com os EUA.' }
],

'cidadania': [
  { id: 0, tipo: 'multipla', enunciado: 'O que é cidadania?', opcoes: ['Direito de votar', 'Direito e deveres de um cidadão', 'Ser brasileiro', 'Ter emprego'], correta: 1, dica: 'Inclui direitos e deveres.' },
  { id: 1, tipo: 'multipla', enunciado: 'Qual é o principal documento de identificação no Brasil?', opcoes: ['CPF', 'RG', 'Título de eleitor', 'Carteira de trabalho'], correta: 1, dica: 'Documento de identidade.' },
  { id: 2, tipo: 'vf', enunciado: 'Votar é um direito e um dever do cidadão.', correta: true, dica: 'É obrigatório no Brasil.' },
  { id: 3, tipo: 'lacuna', enunciado: 'O direito à educação é garantido pela _______.', correta: 'Constituição', dica: 'Lei maior do país.' },
  { id: 4, tipo: 'multipla', enunciado: 'Qual é a idade mínima para votar no Brasil?', opcoes: ['16', '18', '21', '14'], correta: 0, dica: 'Voto facultativo.' },
  { id: 5, tipo: 'multipla', enunciado: 'O que é democracia?', opcoes: ['Governo de um só', 'Governo do povo', 'Governo militar', 'Governo religioso'], correta: 1, dica: 'Poder do povo.' },
  { id: 6, tipo: 'vf', enunciado: 'Respeitar as leis é um dever do cidadão.', correta: true, dica: 'Todos devem cumprir as leis.' },
  { id: 7, tipo: 'lacuna', enunciado: 'O direito à saúde é garantido pelo _______.', correta: 'SUS', dica: 'Sistema público de saúde.' },
  { id: 8, tipo: 'multipla', enunciado: 'Qual é o órgão responsável pela segurança pública?', opcoes: ['Polícia', 'Prefeitura', 'Escola', 'Hospital'], correta: 0, dica: 'Mantém a ordem.' },
  { id: 9, tipo: 'multipla', enunciado: 'O que é o Estatuto da Criança e do Adolescente?', opcoes: ['Lei trabalhista', 'Lei de trânsito', 'Lei de proteção à infância', 'Lei eleitoral'], correta: 2, dica: 'Protege os direitos das crianças.' },
  { id: 10, tipo: 'vf', enunciado: 'Todos são iguais perante a lei.', correta: true, dica: 'Princípio da igualdade.' },
  { id: 11, tipo: 'lacuna', enunciado: 'O direito ao lazer é garantido pela _______.', correta: 'Constituição', dica: 'Lei maior do país.' },
  { id: 12, tipo: 'multipla', enunciado: 'O que é o voto secreto?', opcoes: ['Voto em casa', 'Voto sem identificação', 'Voto sem influência', 'Voto obrigatório'], correta: 2, dica: 'Ninguém pode saber em quem você votou.' },
  { id: 13, tipo: 'multipla', enunciado: 'Qual é o dever do cidadão em relação ao meio ambiente?', opcoes: ['Destruir', 'Preservar', 'Ignorar', 'Poluir'], correta: 1, dica: 'Cuidar da natureza.' },
  { id: 14, tipo: 'vf', enunciado: 'A liberdade de expressão é um direito fundamental.', correta: true, dica: 'Falar o que pensa.' },
  { id: 15, tipo: 'lacuna', enunciado: 'O direito à moradia é garantido pela _______.', correta: 'Constituição', dica: 'Lei maior do país.' },
  { id: 16, tipo: 'multipla', enunciado: 'O que é o Estatuto do Idoso?', opcoes: ['Lei de trânsito', 'Lei de proteção ao idoso', 'Lei eleitoral', 'Lei trabalhista'], correta: 1, dica: 'Protege os direitos dos idosos.' },
  { id: 17, tipo: 'multipla', enunciado: 'Qual é o dever do cidadão em relação aos impostos?', opcoes: ['Pagar', 'Evitar', 'Ignorar', 'Aumentar'], correta: 0, dica: 'Contribuir para o país.' },
  { id: 18, tipo: 'vf', enunciado: 'A Constituição Federal foi promulgada em 1988.', correta: true, dica: '"Constituição Cidadã".' },
  { id: 19, tipo: 'lacuna', enunciado: 'O direito ao transporte é garantido pela _______.', correta: 'Constituição', dica: 'Lei maior do país.' },
  { id: 20, tipo: 'multipla', enunciado: 'O que é cidadania ativa?', opcoes: ['Participar da vida pública', 'Ficar em casa', 'Não votar', 'Ignorar a política'], correta: 0, dica: 'Envolve participação social.' },
  { id: 21, tipo: 'multipla', enunciado: 'Qual é o dever do cidadão em relação à escola?', opcoes: ['Faltar', 'Estudar', 'Destruir', 'Ignorar'], correta: 1, dica: 'Aproveitar o direito à educação.' },
  { id: 22, tipo: 'vf', enunciado: 'O direito à vida é inviolável.', correta: true, dica: 'Ninguém pode tirar a vida de outro.' },
  { id: 23, tipo: 'lacuna', enunciado: 'O direito à alimentação é garantido pela _______.', correta: 'Constituição', dica: 'Lei maior do país.' },
  { id: 24, tipo: 'multipla', enunciado: 'O que é o Estatuto da Juventude?', opcoes: ['Lei de proteção à juventude', 'Lei eleitoral', 'Lei de trânsito', 'Lei trabalhista'], correta: 0, dica: 'Protege os direitos dos jovens.' },
  { id: 25, tipo: 'multipla', enunciado: 'Qual é o dever do cidadão em relação ao lixo?', opcoes: ['Jogar na rua', 'Separar e reciclar', 'Queimar', 'Ignorar'], correta: 1, dica: 'Ajuda o meio ambiente.' },
  { id: 26, tipo: 'vf', enunciado: 'A liberdade religiosa é um direito garantido.', correta: true, dica: 'Cada um pode escolher sua religião.' },
  { id: 27, tipo: 'lacuna', enunciado: 'O direito ao trabalho é garantido pela _______.', correta: 'Constituição', dica: 'Lei maior do país.' },
  { id: 28, tipo: 'multipla', enunciado: 'O que é o Estatuto da Criança e do Adolescente?', opcoes: ['Lei trabalhista', 'Lei de trânsito', 'Lei de proteção à infância', 'Lei eleitoral'], correta: 2, dica: 'Protege os direitos das crianças.' },
  { id: 29, tipo: 'multipla', enunciado: 'Qual é o dever do cidadão em relação ao voto?', opcoes: ['Votar', 'Evitar', 'Ignorar', 'Aumentar'], correta: 0, dica: 'Participar das eleições.' },
  { id: 30, tipo: 'vf', enunciado: 'A liberdade de imprensa é um direito fundamental.', correta: true, dica: 'Informação livre.' },
  { id: 31, tipo: 'lacuna', enunciado: 'O direito à saúde é garantido pelo _______.', correta: 'SUS', dica: 'Sistema público de saúde.' },
  { id: 32, tipo: 'multipla', enunciado: 'O que é cidadania passiva?', opcoes: ['Não participar da vida pública', 'Votar', 'Estudar', 'Trabalhar'], correta: 0, dica: 'Ficar alheio à sociedade.' },
  { id: 33, tipo: 'multipla', enunciado: 'Qual é o dever do cidadão em relação à natureza?', opcoes: ['Destruir', 'Preservar', 'Ignorar', 'Poluir'], correta: 1, dica: 'Cuidar do meio ambiente.' },
  { id: 34, tipo: 'vf', enunciado: 'O direito à moradia é garantido pela Constituição.', correta: true, dica: 'Lei maior do país.' },
  { id: 35, tipo: 'lacuna', enunciado: 'O direito à cultura é garantido pela _______.', correta: 'Constituição', dica: 'Lei maior do país.' },
  { id: 36, tipo: 'multipla', enunciado: 'O que é o Estatuto do Idoso?', opcoes: ['Lei de trânsito', 'Lei de proteção ao idoso', 'Lei eleitoral', 'Lei trabalhista'], correta: 1, dica: 'Protege os direitos dos idosos.' },
  { id: 37, tipo: 'multipla', enunciado: 'Qual é o dever do cidadão em relação aos impostos?', opcoes: ['Pagar', 'Evitar', 'Ignorar', 'Aumentar'], correta: 0, dica: 'Contribuir para o país.' },
  { id: 38, tipo: 'vf', enunciado: 'A Constituição Federal foi promulgada em 1988.', correta: true, dica: '"Constituição Cidadã".' },
  { id: 39, tipo: 'lacuna', enunciado: 'O direito ao transporte é garantido pela _______.', correta: 'Constituição', dica: 'Lei maior do país.' },
  { id: 40, tipo: 'multipla', enunciado: 'O que é cidadania ativa?', opcoes: ['Participar da vida pública', 'Ficar em casa', 'Não votar', 'Ignorar a política'], correta: 0, dica: 'Envolve participação social.' },
  { id: 41, tipo: 'multipla', enunciado: 'Qual é o dever do cidadão em relação à escola?', opcoes: ['Faltar', 'Estudar', 'Destruir', 'Ignorar'], correta: 1, dica: 'Aproveitar o direito à educação.' },
  { id: 42, tipo: 'vf', enunciado: 'O direito à vida é inviolável.', correta: true, dica: 'Ninguém pode tirar a vida de outro.' },
  { id: 43, tipo: 'lacuna', enunciado: 'O direito à alimentação é garantido pela _______.', correta: 'Constituição', dica: 'Lei maior do país.' },
  { id: 44, tipo: 'multipla', enunciado: 'O que é o Estatuto da Juventude?', opcoes: ['Lei de proteção à juventude', 'Lei eleitoral', 'Lei de trânsito', 'Lei trabalhista'], correta: 0, dica: 'Protege os direitos dos jovens.' },
  { id: 45, tipo: 'multipla', enunciado: 'Qual é o dever do cidadão em relação ao lixo?', opcoes: ['Jogar na rua', 'Separar e reciclar', 'Queimar', 'Ignorar'], correta: 1, dica: 'Ajuda o meio ambiente.' },
  { id: 46, tipo: 'vf', enunciado: 'A liberdade religiosa é um direito garantido.', correta: true, dica: 'Cada um pode escolher sua religião.' },
  { id: 47, tipo: 'lacuna', enunciado: 'O direito ao trabalho é garantido pela _______.', correta: 'Constituição', dica: 'Lei maior do país.' },
  { id: 48, tipo: 'multipla', enunciado: 'O que é o Estatuto da Criança e do Adolescente?', opcoes: ['Lei trabalhista', 'Lei de trânsito', 'Lei de proteção à infância', 'Lei eleitoral'], correta: 2, dica: 'Protege os direitos das crianças.' },
  { id: 49, tipo: 'multipla', enunciado: 'Qual é o dever do cidadão em relação ao voto?', opcoes: ['Votar', 'Evitar', 'Ignorar', 'Aumentar'], correta: 0, dica: 'Participar das eleições.' }
],
  // Adicione outros quizzes aqui...
};

// Níveis de maestria infinitos
const niveis = [0, 10, 25, 45, 70, 100, 140, 200]; // pontos necessários para cada nível base
const nomesMaestria = [
  '🐛 Lagarta Verde',      // Nível 1 (0-9 pts) - Iniciante, pequeno e verde
  '🐸 Sapo Azul',          // Nível 2 (10-24 pts) - Pequeno anfíbio azul
  '🦋 Borboleta Roxa',     // Nível 3 (25-44 pts) - Voa, roxa
  '🦅 Águia Dourada',      // Nível 4 (45-69 pts) - Poderosa, dourada
  '🦁 Leão Vermelho',      // Nível 5 (70-99 pts) - Rei da selva, vermelho
  '🐉 Dragão Prateado',    // Nível 6 (100-139 pts) - Mítico, prateado
  '👑 Fênix Dourada'       // Nível 7 (140+ pts) - Imortal, dourada brilhante
];

// Sistema infinito de evolução da Fênix
function obterNivelInfinito(pontos) {
  if (pontos < 140) {
    // Níveis normais 1-7
    let nivel = 1;
    for (let i = 1; i < niveis.length; i++) {
      if (pontos >= niveis[i]) nivel = i + 1;
    }
    return { nivel, nome: nomesMaestria[nivel - 1], cor: coresMaestria[nivel - 1] };
  } else {
    // Sistema infinito da Fênix
    const nivelFenix = Math.floor((pontos - 140) / 50) + 8; // A cada 50 pontos, sobe um nível
    const multiplicador = Math.floor((pontos - 140) / 200) + 1; // A cada 200 pontos, multiplicador aumenta
    
    // Evoluções da Fênix baseadas no nível
    let nomeFenix, corFenix;
    
    if (nivelFenix <= 15) {
      // Fênix Elemental (8-15)
      const elementos = ['🔥 Fênix de Fogo', '⚡ Fênix de Trovão', '❄️ Fênix de Gelo', '🌊 Fênix de Água', '🌪️ Fênix de Vento', '🌍 Fênix de Terra', '✨ Fênix de Luz', '🌑 Fênix de Sombra'];
      nomeFenix = elementos[(nivelFenix - 8) % elementos.length];
      corFenix = ['#FF5722', '#FFC107', '#00BCD4', '#2196F3', '#9C27B0', '#795548', '#FFD700', '#424242'][(nivelFenix - 8) % 8];
    } else if (nivelFenix <= 30) {
      // Fênix Cósmica (16-30)
      const cosmicas = ['🌟 Fênix Estelar', '🌌 Fênix Galáctica', '🌠 Fênix Nebulosa', '💫 Fênix Cometa', '🌙 Fênix Lunar', '☀️ Fênix Solar', '🌍 Fênix Planetária', '🌌 Fênix Interestelar'];
      nomeFenix = cosmicas[(nivelFenix - 16) % cosmicas.length];
      corFenix = ['#E91E63', '#9C27B0', '#3F51B5', '#2196F3', '#00BCD4', '#FF9800', '#4CAF50', '#FF5722'][(nivelFenix - 16) % 8];
    } else if (nivelFenix <= 50) {
      // Fênix Divina (31-50)
      const divinas = ['👼 Fênix Celestial', '😇 Fênix Angelical', '👑 Fênix Real', '⚜️ Fênix Sagrada', '💎 Fênix Cristalina', '🏆 Fênix Campeã', '🎖️ Fênix Heroica', '⭐ Fênix Lendária'];
      nomeFenix = divinas[(nivelFenix - 31) % divinas.length];
      corFenix = ['#FFD700', '#C0C0C0', '#FF6B35', '#4CAF50', '#00BCD4', '#FF9800', '#E91E63', '#9C27B0'][(nivelFenix - 31) % 8];
    } else if (nivelFenix <= 100) {
      // Fênix Primordial (51-100)
      const primordiais = ['🌋 Fênix Primordial', '⚡ Fênix Suprema', '🌟 Fênix Eterna', '🌌 Fênix Infinita', '👑 Fênix Absoluta', '💫 Fênix Transcendental', '🌠 Fênix Universal', '✨ Fênix Definitiva'];
      nomeFenix = primordiais[(nivelFenix - 51) % primordiais.length];
      corFenix = ['#FF5722', '#FFC107', '#FFD700', '#9C27B0', '#E91E63', '#00BCD4', '#4CAF50', '#FF9800'][(nivelFenix - 51) % 8];
    } else {
      // Fênix Suprema (100+)
      const supremas = ['🔥 Fênix Suprema', '⚡ Fênix Definitiva', '🌟 Fênix Eterna', '🌌 Fênix Infinita', '👑 Fênix Absoluta', '💫 Fênix Transcendental', '🌠 Fênix Universal', '✨ Fênix Definitiva'];
      nomeFenix = supremas[(nivelFenix - 101) % supremas.length];
      corFenix = ['#FF5722', '#FFC107', '#FFD700', '#9C27B0', '#E91E63', '#00BCD4', '#4CAF50', '#FF9800'][(nivelFenix - 101) % 8];
    }
    
    // Adiciona multiplicador para níveis muito altos
    if (multiplicador > 1) {
      nomeFenix += ` x${multiplicador}`;
    }
    
    return { nivel: nivelFenix, nome: nomeFenix, cor: corFenix };
  }
}

const coresMaestria = [
  '#4CAF50',  // Verde - Lagarta
  '#2196F3',  // Azul - Sapo
  '#9C27B0',  // Roxo - Borboleta
  '#FFD700',  // Dourado - Águia
  '#F44336',  // Vermelho - Leão
  '#C0C0C0',  // Prateado - Dragão
  '#FFD700'   // Dourado brilhante - Fênix
];

function BarraProgressoMaestria({ pontos }) {
  // Usa o sistema infinito
  const infoNivel = obterNivelInfinito(pontos);
  const nivel = infoNivel.nivel;
  const nomeAtual = infoNivel.nome;
  const corAtual = infoNivel.cor;
  
  // Calcula progresso para o próximo nível
  let proxNivel, pct;
  if (pontos < 140) {
    // Níveis normais 1-7
    if (pontos < niveis[1]) {
      // Caso especial para o primeiro nível (0-9)
      proxNivel = niveis[1];
      pct = Math.round((pontos / proxNivel) * 100);
    } else {
      for (let i = 1; i < niveis.length; i++) {
        if (pontos >= niveis[i]) {
          proxNivel = niveis[i + 1] || niveis[niveis.length - 1];
          pct = Math.min(100, Math.round(((pontos - niveis[i]) / (proxNivel - niveis[i])) * 100));
          break;
        }
      }
    }
  } else {
    // Sistema infinito da Fênix
    const pontosParaProximo = 50; // A cada 50 pontos sobe um nível
    const pontosAtualNivel = (pontos - 140) % 50;
    pct = Math.min(100, Math.round((pontosAtualNivel / pontosParaProximo) * 100));
  }
  
  return (
    <div style={{ margin: '24px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 4 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: corAtual }}>{nomeAtual}</span>
        <span style={{ color: '#ffd600', fontWeight: 700, fontSize: 18 }}>({pontos} pts)</span>
      </div>
      <div style={{ background: '#c5cae9', borderRadius: 8, width: 320, height: 18, margin: '0 auto', overflow: 'hidden', boxShadow: '0 2px 8px rgba(26,35,126,0.08)' }}>
        <div style={{ background: `linear-gradient(90deg, ${corAtual} 0%, #ffd600 100%)`, width: pct + '%', height: '100%', borderRadius: 8, transition: 'width 0.7s cubic-bezier(.4,2,.6,1)' }}></div>
      </div>
      <div style={{ textAlign: 'center', color: '#2575fc', fontWeight: 600, marginTop: 4 }}>
        {pontos < 140 ? `${pct}% para o próximo nível` : `${pct}% para próxima evolução da Fênix`}
      </div>
    </div>
  );
}

// Função para calcular o próximo intervalo SRS (em tentativas)
function proximoIntervaloSRS(atual, acertou) {
  if (!atual) return acertou ? 2 : 1;
  if (!acertou) return 1;
  // Se acertou, dobra o intervalo até um máximo
  return Math.min(atual * 2, 32);
}

export default function Quiz({ aluno, offline, maestria, setMaestria }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const perguntasBanco = bancoQuizzes[id] || [];
  const totalQuiz = 5;
  // Histórico SRS: { [perguntaId]: { acertos, erros, prox, ultima, nivel } }
  const storageKey = `quiz_srs_${id}_${aluno?.nome || 'anon'}`;
  const [srs, setSrs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch {
      return {};
    }
  });
  // Seleciona perguntas não concluídas (não acertadas ainda)
  const perguntasSelecionadas = React.useMemo(() => {
    const pendentes = shuffle(perguntasBanco.filter(q => !(srs[q.id] && srs[q.id].acertou)));
    return pendentes.slice(0, totalQuiz);
  }, [perguntasBanco, srs]);

  const [etapa, setEtapa] = useState(0);
  const [resposta, setResposta] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [acertos, setAcertos] = useState(0);
  const pontosAtuais = maestria[id] || 0;
  const [finalizado, setFinalizado] = useState(false);

  const progressKey = `quiz_progress_${id}_${aluno?.nome || 'anon'}`;

  // Restaurar progresso salvo
  React.useEffect(() => {
    const saved = localStorage.getItem(progressKey);
    if (saved) {
      try {
        const { etapa, acertos, resposta, feedback, finalizado } = JSON.parse(saved);
        setEtapa(etapa || 0);
        setAcertos(acertos || 0);
        setResposta(resposta || null);
        setFeedback(feedback || '');
        setFinalizado(!!finalizado);
      } catch {}
    } else {
      setEtapa(0);
      setAcertos(0);
      setResposta(null);
      setFeedback('');
      setFinalizado(false);
    }
  }, [id, aluno?.nome]);

  // Salvar progresso sempre que mudar
  React.useEffect(() => {
    const data = { etapa, acertos, resposta, feedback, finalizado };
    localStorage.setItem(progressKey, JSON.stringify(data));
  }, [etapa, acertos, resposta, feedback, finalizado, progressKey]);

  // Resetar quiz ao mudar de id (novo quiz ou reinício)
  React.useEffect(() => {
    setEtapa(0);
    setResposta(null);
    setFeedback('');
    setAcertos(0);
    setFinalizado(false);
  }, [id]);

  // Atualiza maestria ao finalizar quiz
  useEffect(() => {
    if (etapa >= totalQuiz && !finalizado) {
      const pontosGanhos = acertos * 2 + (totalQuiz - acertos);
      if ((maestria[id] || 0) < (pontosAtuais + pontosGanhos)) {
        setMaestria(m => ({ ...m, [id]: (m[id] || 0) + pontosGanhos }));
      }
      setFinalizado(true);
    }
    // eslint-disable-next-line
  }, [etapa, finalizado, acertos, totalQuiz, pontosAtuais, maestria, id, setMaestria]);

  function avancar(acertou) {
    setResposta(null);
    setFeedback('');
    setEtapa(e => e + 1);
    if (acertou) setAcertos(a => a + 1);
    // Atualiza SRS
    setSrs(s => {
      const q = perguntasSelecionadas[etapa];
      const hist = s[q.id] || { acertos: 0, erros: 0, prox: 0, ultima: 0, nivel: 1 };
      const novo = { ...hist };
      if (acertou) {
        novo.acertos += 1;
        novo.acertou = true; // Marca como concluída
      } else {
        novo.erros += 1;
      }
      novo.ultima = Date.now();
      // Próxima revisão: nunca, pois só queremos nunca vistas
      novo.nivel = acertou ? Math.min(hist.nivel + 1, 7) : 1;
      novo.prox = Date.now() + 9999999999; // nunca mais aparece
      const novoSrs = { ...s, [q.id]: novo };
      localStorage.setItem(storageKey, JSON.stringify(novoSrs));
      return novoSrs;
    });
  }

  // Mensagens motivacionais
  const motivacional = [
    'Ótimo começo! Continue assim!',
    'Você está indo muito bem!',
    'Metade do caminho! Não desista!',
    'Quase lá! Continue focado!',
    'Última etapa! Mostre seu conhecimento!'
  ];

  // Renderização dos tipos de quiz
  function renderQuiz() {
    const p = perguntasSelecionadas[etapa];
    if (!p) return null;
    if (p.tipo === 'multipla') {
      return (
        <>
          <div style={{ fontSize: 18, marginBottom: 24 }}>{p.enunciado}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            {p.opcoes.map((op, i) => (
              <button
                key={i}
                disabled={resposta !== null}
                onClick={() => {
                  setResposta(i);
                  setTimeout(() => {
                    if (i === p.correta) {
                      setFeedback('Parabéns! Você acertou!');
                    } else {
                      setFeedback('Tente novamente! Dica: ' + p.dica);
                    }
                  }, 500);
                }}
                style={{
                  background: resposta === i ? (i === p.correta ? '#388e3c' : '#d32f2f') : 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 0',
                  fontSize: 18,
                  fontWeight: 600,
                  cursor: resposta !== null ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px rgba(26,35,126,0.08)',
                  transition: 'background 0.2s'
                }}
              >
                {op}
                {resposta !== null && i === p.correta && <FaCheckCircle style={{ marginLeft: 8 }} />}
                {resposta !== null && resposta === i && resposta !== p.correta && <FaTimesCircle style={{ marginLeft: 8 }} />}
              </button>
            ))}
          </div>
        </>
      );
    }
    if (p.tipo === 'vf') {
      return (
        <>
          <div style={{ fontSize: 18, marginBottom: 24 }}>{p.enunciado}</div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
            {[true, false].map((val, i) => (
              <button
                key={i}
                disabled={resposta !== null}
                onClick={() => {
                  setResposta(val);
                  setTimeout(() => {
                    if (val === p.correta) {
                      setFeedback('Correto!');
                    } else {
                      setFeedback('Não! ' + p.dica);
                    }
                  }, 500);
                }}
                style={{
                  background: resposta === val ? (val === p.correta ? '#388e3c' : '#d32f2f') : 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 32px',
                  fontSize: 18,
                  fontWeight: 600,
                  cursor: resposta !== null ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px rgba(26,35,126,0.08)',
                  transition: 'background 0.2s'
                }}
              >
                {val ? 'Verdadeiro' : 'Falso'}
                {resposta !== null && val === p.correta && <FaCheckCircle style={{ marginLeft: 8 }} />}
                {resposta !== null && resposta === val && resposta !== p.correta && <FaTimesCircle style={{ marginLeft: 8 }} />}
              </button>
            ))}
          </div>
        </>
      );
    }
    if (p.tipo === 'lacuna') {
      return (
        <>
          <div style={{ fontSize: 18, marginBottom: 24 }}>{p.enunciado.replace('_______', resposta || '_______')}</div>
          <input
            type="text"
            value={resposta || ''}
            disabled={feedback}
            onChange={e => setResposta(e.target.value)}
            style={{ width: 200, padding: 10, fontSize: 18, borderRadius: 8, border: '1px solid #c5cae9', marginBottom: 16, textAlign: 'center' }}
          />
          <br />
          <button
            disabled={feedback || !resposta}
            onClick={() => {
              if ((resposta || '').trim().toLowerCase() === p.correta.toLowerCase()) {
                setFeedback('Correto!');
              } else {
                setFeedback('Tente novamente! Dica: ' + p.dica);
              }
            }}
            style={{
              background: feedback ? '#bdbdbd' : 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 32px',
              fontSize: 18,
              fontWeight: 600,
              cursor: feedback ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(26,35,126,0.08)',
              transition: 'background 0.2s'
            }}
          >
            Verificar
          </button>
        </>
      );
    }
    return null;
  }

  if (etapa >= totalQuiz) {
    // Pontuação: 2 pontos por acerto, 1 ponto por tentativa
    const pontosGanhos = acertos * 2 + (totalQuiz - acertos);
    const pontosTotais = pontosAtuais + pontosGanhos;
    const infoNivel = obterNivelInfinito(pontosTotais);
    const nivelAnterior = obterNivelInfinito(pontosAtuais);
    
    return (
      <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(26,35,126,0.08)', padding: 40, textAlign: 'center' }}>
        <FaTrophy color="#ffd600" size={48} style={{ marginBottom: 16 }} />
        <h2 style={{ color: '#1a237e', marginBottom: 16 }}>Quiz concluído!</h2>
        <div style={{ fontSize: 20, color: '#388e3c', marginBottom: 16 }}>Acertos: {acertos} de {totalQuiz}</div>
        <div style={{ fontSize: 18, color: '#3949ab', marginBottom: 16 }}>Você ganhou {pontosGanhos} pontos de maestria!</div>
        {/* Forçar BarraProgressoMaestria a usar pontosTotais para mostrar o animal correto */}
        <BarraProgressoMaestria key={pontosTotais} pontos={pontosTotais} />
        <div style={{ fontSize: 17, color: '#2575fc', fontWeight: 500, marginBottom: 16 }}>
          {infoNivel.nivel > nivelAnterior.nivel && <span>Parabéns! Você evoluiu para {infoNivel.nome}! 🎉</span>}
        </div>
        <button
          style={{ background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: 18, fontWeight: 600, cursor: 'pointer', marginTop: 24 }}
          onClick={() => navigate('/aluno/desafios')}
        >
          Voltar para Desafios
        </button>
      </div>
    );
  }

  if (perguntasSelecionadas.length === 0) {
    return (
      <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(26,35,126,0.08)', padding: 40, textAlign: 'center' }}>
        <FaTrophy color="#ffd600" size={48} style={{ marginBottom: 16 }} />
        <h2 style={{ color: '#1a237e', marginBottom: 16 }}>Parabéns!</h2>
        <div style={{ fontSize: 18, color: '#3949ab', marginBottom: 16 }}>
          Você já concluiu todas as perguntas deste quiz!<br />
          Tente outro quiz ou revise suas respostas.
        </div>
        <button
          style={{ background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: 18, fontWeight: 600, cursor: 'pointer', marginTop: 24 }}
          onClick={() => navigate('/aluno/desafios')}
        >
          Voltar para Desafios
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(26,35,126,0.08)', padding: 40, textAlign: 'center' }}>
      <h2 style={{ color: '#1a237e', marginBottom: 16 }}><FaRobot color="#ffd600" /> Quiz: {id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h2>
      <BarraProgressoMaestria pontos={pontosAtuais} />
      {renderQuiz()}
      {feedback && (
        <div style={{ fontSize: 16, color: feedback.startsWith('Parabéns') || feedback.startsWith('Correto') ? '#388e3c' : '#d32f2f', fontWeight: 500, marginTop: 16 }}>{feedback}</div>
      )}
      {feedback && (
        <button
          style={{
            background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: 24
          }}
          onClick={() => avancar(feedback.startsWith('Parabéns') || feedback.startsWith('Correto'))}
        >
          Próximo <FaArrowRight style={{ marginLeft: 8 }} />
        </button>
      )}
      <div style={{ marginTop: 32, color: '#3949ab', fontWeight: 500, fontSize: 16 }}>
        {motivacional[Math.min(etapa, motivacional.length - 1)]}
      </div>
    </div>
  );
} 