import RollDice from "./rolldice"

export default function GetCritLocations({targetType, critCount = 0}) {
	console.log('GetCritLocations', targetType, critCount)
	const result = []
	if (targetType == 'mech') {
		for (let i = 0; i < critCount; i++) {
			const top = RollDice(1)
			const bottom = RollDice(1)
			result.push({group: top, location: bottom})
		}
	} else {
		
	}

	return result
}