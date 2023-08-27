/* CODED BY TEACHER: VIKRAM SINGH */

export function generateRandomNumber(min, max) {
	return (Math.random() * (max - min) + min) * (Math.random() < 0.5 ? -1 : 1);
}

export function generateRandomPositiveNumber(min, max) {
	return (Math.random() * (max - min) + min);
}

export function generateRandomNegativeNumber(min, max) {
	return (Math.random() * (max - min) + min) * -1;
}
