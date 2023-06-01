export default function RollDice(number = 2) {
	let result = 0
	
	for (let i = 0; i < number; i++) {
		result += Math.floor(Math.random() * 6) + 1
	}
	
	return result
}