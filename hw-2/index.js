let n;
while (true) {
    n = prompt('Число для подсчета обобщенного числа Фибоначчи', '5');
    if (isNaN(n) || !Number.isInteger(+n)) {
        alert ('Пожалуйста, введите целое число!')
    } else {
        break;
    }
}
function fibonacci (F0, F1, n) {
    if (n > 0) {
        for (let i = 0; i < n; i++) {
            let temp = F1;
            F1 = F0 + F1;
            F0 = temp;
        }
    } else if (n < 0) {
        for (let i = n; i < 0; i++) {
            let temp = F0;
            F0 = F1 - F0;
            F1 = temp;
        }
    }
    return F0;
}
alert (`Обобщенное число Фибоначчи: ${fibonacci (-10,2, n)}`);
