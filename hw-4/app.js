function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

let sunlightHour = 12;

const createPowerPlants = (maxLength) => {
  return Array.from({ length: getRandom(1, maxLength) }, () => {
    return { power: getRandom(1000, 100000) };
  });
};
let powerPlants = createPowerPlants(4);
let powerPlantsProduction = powerPlants.reduce((acc, powerPlant) => {
  return powerPlant.power * 24 + acc;
}, 0);
console.log(`Power plants production: ${powerPlantsProduction} kWh`);

const createSolarPanels = (maxLength) => {
  return Array.from({ length: getRandom(1, maxLength) }, () => {
    return { power: getRandom(1000, 5000) };
  });
};
let solarPanels = createSolarPanels(6);
let solarPanelsProduction = solarPanels.reduce((acc, solarPanel) => {
  return solarPanel.power * sunlightHour + acc;
}, 0);
console.log(`Power solar panels production: ${solarPanelsProduction} kWh`);

const createHouses = (maxLength) => {
  return Array.from({ length: getRandom(1, maxLength) }, () => {
    return {
      powerConsumeDay: 4,
      powerConsumeNight: 1,
      quantityFlat: getRandom(1, 400),
    };
  });
};
let houses = createHouses(1000);

let consumptionHouses = houses.reduce((acc, house) => {
  return (
    (house.powerConsumeDay * sunlightHour +
      house.powerConsumeNight * (24 - sunlightHour)) *
      house.quantityFlat +
    acc
  );
}, 0);

console.log(`Consumption by houses: ${consumptionHouses} kWh`);

const createElectricalLines = (maxLength) => {
  return Array.from({ length: getRandom(1, maxLength) }, () => {
    return { price: getRandom(10, 30), maxPower: getRandom(1000, 3000) };
  });
};
let electricalLines = createElectricalLines(10);

let difference =
  powerPlantsProduction + solarPanelsProduction - consumptionHouses;

console.log(`Difference production of consuption: ${difference} kWh`);
let moneyDifference = 0;
if (difference > 0) {
  let sortedLines = electricalLines.sort((a, b) => {
    return b.price - a.price;
  });

  for (let sortedLine of sortedLines) {
    if (sortedLine.maxPower * 24 > difference) {
      moneyDifference += sortedLine.price * difference;
      difference = 0;
      break;
    } else {
      moneyDifference += sortedLine.price * sortedLine.maxPower * 24;
      difference -= sortedLine.maxPower * 24;
    }
  }
} else {
  let sortedLines = electricalLines.sort((a, b) => {
    return a.price - b.price;
  });

  for (let sortedLine of sortedLines) {
    if (sortedLine.maxPower * 24 > Math.abs(difference)) {
      moneyDifference -= sortedLine.price * difference;
      difference = 0;
      break;
    } else {
      moneyDifference -= sortedLine.price * sortedLine.maxPower * 24;
      difference += sortedLine.maxPower * 24;
    }
  }
}
console.log(`Money spent or gained: ${moneyDifference} USD`);

difference > 0
  ? console.log(`We haven't sold ${difference}`)
  : console.log(`We have deficit ${difference}`);
