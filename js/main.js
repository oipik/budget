'use strict';

let startBtn = document.querySelector('#start'),
   budjetValue = document.querySelector('.budget-value'),
   dayBudgetValue = document.querySelector('.daybudget-value'),
   levelValue = document.querySelector('.level-value'),
   expensesValue = document.querySelector('.expenses-value'),
   optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
   incomeValue = document.querySelector('.income-value'),
   monthSavingsValue = document.querySelector('.monthsavings-value'),
   yearSavingsValue = document.querySelector('.yearsavings-value'),


   expensesItem = document.querySelectorAll('.expenses-item'),
   expensesBtn = document.getElementsByTagName('button')[0],
   optionalExpensesBtn = document.getElementsByTagName('button')[1],
   countBtn = document.getElementsByTagName('button')[2],
   optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
   incomeItem = document.querySelector('.choose-income'),
   checkSavings = document.querySelector('#savings'),
   sumValue = document.querySelector('.choose-sum'),
   percentValue = document.querySelector('.choose-percent'),
   yearValue = document.querySelector('.year-value'),
   monthValue = document.querySelector('.month-value'),
   dayValue = document.querySelector('.day-value');

let money, time;

expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

startBtn.addEventListener('click', function () {
   expensesBtn.disabled = false;
   optionalExpensesBtn.disabled = false;
   countBtn.disabled = false;

   time = prompt('Введите дату в формате YYYY-MM-DD', '');
   money = +prompt('Ваш бюджет на месяц?', '');

   while (isNaN(money) || money == '' || money == null) {
      money = +prompt('Ваш бюджет на месяц?', '');
   }
   appData.budjet = money;
   appData.timeData = time;
   budjetValue.textContent = money.toFixed();
   yearValue.value = new Date(Date.parse(time)).getFullYear();
   monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
   dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', function () {
   let sum = 0;

   for (let i = 0; i < expensesItem.length; i++) {
      let a = expensesItem[i].value,
         b = expensesItem[++i].value;

      if (typeof a === 'string' && typeof a != null && typeof b != null && a != '' && b != '' && a.length < 50) {
         console.log('done!');
         appData.expenses[a] = b;
         sum += +b;
      } else {
         console.log('bad way');
         i--;
      }
   };
   expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function () {
   for (let i = 0; i < optionalExpensesItem.length; i++) {
      let opt = optionalExpensesItem[i].value;
      appData.optionalExpenses[i] = opt;
      optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
   }
});

countBtn.addEventListener('click', function () {

   if (appData.budjet != undefined) {
      appData.moneyPerDay = ((appData.budjet - +expensesValue.textContent) / 30).toFixed();
      dayBudgetValue.textContent = appData.moneyPerDay;

      if (appData.moneyPerDay < 100) {
         levelValue.textContent = 'Минимальный уровень достатка';
      } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
         levelValue.textContent = 'Средний уровень достатка';
      } else if (appData.moneyPerDay > 2000) {
         levelValue.textContent = 'Высокий уровень достатка';
      } else {
         levelValue.textContent = 'Произошла ошибка';
      }
   } else {
      dayBudgetValue.textContent = 'Произошла ошибка';
   }
});

incomeItem.addEventListener('input', function () {
   let items = incomeItem.value;
   appData.income = items.split(", ");
   incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function () {
   if (appData.savings == true) {
      appData.savings = false;
   } else {
      appData.savings = true;
   }
});

sumValue.addEventListener('input', function () {
   if (appData.savings == true) {
      let sum = +sumValue.value;
      let percent = +percentValue.value;

      appData.monthIncome = sum / 100 / 12 * percent;
      appData.yearIncome = sum / 100 * percent;

      monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
      yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
   }
});

percentValue.addEventListener('input', function () {
   if (appData.savings == true) {
      let sum = +sumValue.value;
      let percent = +percentValue.value;

      appData.monthIncome = sum / 100 / 12 * percent;
      appData.yearIncome = sum / 100 * percent;

      monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
      yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
   }
});

let appData = {
   budjet: money,
   expenses: {},
   optionalExpenses: {},
   income: [],
   timeData: time,
   savings: false,
};







