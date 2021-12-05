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
function getPowerPlantsProduction(isDay) {
  return powerPlants.reduce((acc, powerPlant) => {
    let hours = sunlightHour;
    if (!isDay) {
      hours = 24 - sunlightHour;
    }
    return powerPlant.power * hours + acc;
  }, 0);
}

const createSolarPanels = (maxLength) => {
  return Array.from({ length: getRandom(1, maxLength) }, () => {
    return { power: getRandom(1000, 5000) };
  });
};
let solarPanels = createSolarPanels(6);
function getSolarPlantsProduction(isDay) {
  if (!isDay) {
    return 0;
  }
  return solarPanels.reduce((acc, solarPanel) => {
    return solarPanel.power * sunlightHour + acc;
  }, 0);
}

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

function getHousesConsuption(isDay) {
  let hours = sunlightHour;

  if (!isDay) {
    hours = 24 - sunlightHour;
  }
  return houses.reduce((acc, house) => {
    let powerConsuption = house.powerConsumeDay;
    if (!isDay) {
      powerConsuption = house.powerConsumeNight;
    }
    return hours * powerConsuption * house.quantityFlat + acc;
  }, 0);
}

const createElectricalLines = (maxLength) => {
  return Array.from({ length: getRandom(1, maxLength) }, () => {
    return { price: getRandom(10, 30), maxPower: getRandom(1000, 3000) };
  });
};
let electricalLines = createElectricalLines(30);

function getEnergyDifference(isDay) {
  let powerPlantsProduction = getPowerPlantsProduction(isDay);
  let solarPanelsProduction = getSolarPlantsProduction(isDay);
  let consumptionHouses = getHousesConsuption(isDay);

  return powerPlantsProduction + solarPanelsProduction - consumptionHouses;
}

function getMoneyDifference(isDay) {
  let moneyDifference = 0;
  let difference = getEnergyDifference(isDay);

  let hours = sunlightHour;
  if (!isDay) {
    hours = 24 - sunlightHour;
  }
  if (difference > 0) {
    let sortedLines = electricalLines.sort((a, b) => {
      return b.price - a.price;
    });

    for (let sortedLine of sortedLines) {
      if (sortedLine.maxPower * hours > difference) {
        moneyDifference += sortedLine.price * difference;
        difference = 0;
        break;
      } else {
        moneyDifference += sortedLine.price * sortedLine.maxPower * hours;
        difference -= sortedLine.maxPower * hours;
      }
    }
  } else {
    let sortedLines = electricalLines.sort((a, b) => {
      return a.price - b.price;
    });

    for (let sortedLine of sortedLines) {
      if (sortedLine.maxPower * hours > Math.abs(difference)) {
        moneyDifference -= sortedLine.price * difference;
        difference = 0;
        break;
      } else {
        moneyDifference -= sortedLine.price * sortedLine.maxPower * hours;
        difference += sortedLine.maxPower * hours;
      }
    }
  }
  isDay
    ? console.log(`Calculation for day:`)
    : console.log(`Calculation for night:`);

  console.log(`Money spent or gained: ${moneyDifference} USD`);

  difference > 0
    ? console.log(`We haven't sold ${difference}`)
    : console.log(`We have deficit ${difference}`);
}
getMoneyDifference(true);
getMoneyDifference(false);
