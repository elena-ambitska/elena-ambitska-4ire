const currentCours = {
    'UAH': 1,
    'USD': 26.2933,
    'EUR': 30.4358,
    'CHF': 28.8209,
    'JPY': 2.3024,
};
const currencies = Object.keys(currentCours).join(', ');

while (true) {
    const firstCurrency = prompt('Type currency code (' + currencies + ')').toUpperCase();
    if (typeof currentCours[firstCurrency] == 'undefined') {
        alert('Unknown currency');
        continue;
    }

    const secondCurrency = prompt('Type currency code (' + currencies + ')').toUpperCase();
    if (typeof currentCours[secondCurrency] == 'undefined') {
        alert('Unknown currency');
        continue;
    } else if (firstCurrency === secondCurrency) {
        alert('Meaningless!');
        continue;
    }

    const amount = +prompt('Type amount', '100');
    if (amount <= 0) {
        alert('Amount should be greater then 0');
        continue;
    }
    const convertedAmount = Math.floor(amount * currentCours[firstCurrency] / currentCours[secondCurrency] * 100) / 100;

    alert(`You will get ${convertedAmount} ${secondCurrency} !`);

    if (!confirm('Continue?')) {
        break;
    }
}