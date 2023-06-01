import RollDice from "./rolldice"

export default function GetCritLocations(number = 0) {
	const result = []
	for (let i = 0; i < number; i++) {
		const top = RollDice(1)
		const bottom = RollDice(1)
		result.push({group: top, location: bottom})
	}

	return result
}