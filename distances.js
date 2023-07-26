const distances = [
	{ "name": "Edgbaston Village", "distanceFromLast": 0.00, "distanceCum": 0.00 },
	{ "name": "Five Ways", "distanceFromLast": 0.65, "distanceCum": 0.65 },
	{ "name": "Brindley Place", "distanceFromLast": 0.30, "distanceCum": 0.95 },
	{ "name": "Library", "distanceFromLast": 0.35, "distanceCum": 1.31 },
	{ "name": "Town Hall", "distanceFromLast": 0.38, "distanceCum": 1.68 },
	{ "name": "Grand Central", "distanceFromLast": 0.31, "distanceCum": 1.99 },
	{ "name": "Corporation Street", "distanceFromLast": 0.25, "distanceCum": 2.24 },
	{ "name": "Bull Street", "distanceFromLast": 0.25, "distanceCum": 2.49 },
	{ "name": "St Chads", "distanceFromLast": 0.43, "distanceCum": 2.92 },
	{ "name": "St Paul's", "distanceFromLast": 0.41, "distanceCum": 3.33 },
	{ "name": "Jewellery Quarter", "distanceFromLast": 0.72, "distanceCum": 4.05 },
	{ "name": "Soho Benson Rd", "distanceFromLast": 1.40, "distanceCum": 5.45 },
	{ "name": "Winson Green Outer Circle", "distanceFromLast": 0.60, "distanceCum": 6.05 },
	{ "name": "Handsworth Booth St", "distanceFromLast": 0.95, "distanceCum": 7.00 },
	{ "name": "The Hawthorns", "distanceFromLast": 0.96, "distanceCum": 7.96 },
	{ "name": "Kenrick Park", "distanceFromLast": 1.23, "distanceCum": 9.19 },
	{ "name": "Trinity Way", "distanceFromLast": 0.53, "distanceCum": 9.72 },
	{ "name": "West Bromwich Central", "distanceFromLast": 0.68, "distanceCum": 10.39 },
	{ "name": "Lodge Road", "distanceFromLast": 0.43, "distanceCum": 10.82 },
	{ "name": "Dartmouth St", "distanceFromLast": 0.37, "distanceCum": 11.19 },
	{ "name": "Dudley Street Guns Village", "distanceFromLast": 0.60, "distanceCum": 11.79 },
	{ "name": "Black Lake", "distanceFromLast": 0.67, "distanceCum": 12.46 },
	{ "name": "Wednesbury Great Western St", "distanceFromLast": 2.27, "distanceCum": 14.73 },
	{ "name": "WWednesbury Parkway", "distanceFromLast": 0.44, "distanceCum": 15.17 },
	{ "name": "Bradley Lane", "distanceFromLast": 1.94, "distanceCum": 17.11 },
	{ "name": "Loxdale", "distanceFromLast": 0.70, "distanceCum": 17.82 },
	{ "name": "Bilston Central", "distanceFromLast": 0.82, "distanceCum": 18.64 },
	{ "name": "The Crescent", "distanceFromLast": 0.53, "distanceCum": 19.17 },
	{ "name": "Priestfield", "distanceFromLast": 1.29, "distanceCum": 20.46 },
	{ "name": "The Royal", "distanceFromLast": 1.68, "distanceCum": 22.13 },
	{ "name": "W'ton St George's", "distanceFromLast": 0.59, "distanceCum": 22.73 }
];


const fromE = document.getElementById("js-from");
const toE = document.getElementById("js-to");
let options = "";

for(const i in distances) {
	const stop = distances[i];
	options += `
		<option value="${i}">${stop.name}</option>
	`;
}

fromE.innerHTML = options;
fromE.value = 0;
toE.innerHTML = options;
toE.value = 1;


function calcDist() {
	document.getElementById("js-debug").innerHTML = "";
	let fromIndex = parseInt(fromE.value);
	let toIndex = parseInt(toE.value);

	if(fromIndex > toIndex) {
		const justForSwap = fromIndex;
		fromIndex = toIndex;
		toIndex = justForSwap;
	}

	let running = 0;

	for(let i = fromIndex + 1; i <= toIndex; i++) {

		document.getElementById("js-debug").innerHTML += `distance from ${distances[i-1].name} to ${distances[i].name} is ${distances[i].distanceFromLast}km\n`;

		running += distances[i].distanceFromLast;

		document.getElementById("js-debug").innerHTML += `new total is ${running}km\n`;
	}

	if (fromIndex === toIndex) running = 0;

	const km = running;
	const miles = convertToMilesAndChains(km)[0];
	const chains = convertToMilesAndChains(km)[1];


	document.getElementById("js-out").innerHTML = `
		<b>${km.toFixed(2)}km</b> (${miles} miles and ${chains} chains)
	`
}

calcDist();

// chatgpt!
// "could you please write a JavaScript function that converts"
// "a length in metres to the British Railway standard of miles and chains?"
// then: "could you have it convert from kilometres instead?"
function convertToMilesAndChains(lengthInKilometers) {
	const metersPerKilometer = 1000;
	const metersPerMile = 1609.344;
	const metersPerChain = 20.1168;

	const totalMeters = lengthInKilometers * metersPerKilometer;
	const totalChains = totalMeters / metersPerChain;
	const miles = Math.floor(totalChains / 80);
	const chains = Math.round(totalChains % 80);

	return [miles, chains];
}
