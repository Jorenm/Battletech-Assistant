import RollDice from "./rolldice"

export default function GetCritLocation({targetType}) {
	const result = {}
	if (targetType == 'mech') {
		const top = RollDice(1)
		const bottom = RollDice(1)
		return {group: top, location: bottom}
	} else {
		
	}

	return result
}