import RollDice from "./rolldice"

const locationMap = {
	left: {
		2: 'LT',
		3: 'LL',
		4: 'LA',
		5: 'LA',
		6: 'LL',
		7: 'LT',
		8: 'CT',
		9: 'RT',
		10: 'RA',
		11: 'RL',
		12: 'HD'
	}, right: {
		2: 'RT',
		3: 'RL',
		4: 'RA',
		5: 'RA',
		6: 'RL',
		7: 'RT',
		8: 'CT',
		9: 'LT',
		10: 'LA',
		11: 'LL',
		12: 'HD'
	}, front: {
		2: 'CT',
		3: 'RA',
		4: 'RA',
		5: 'RL',
		6: 'RT',
		7: 'CT',
		8: 'LT',
		9: 'LL',
		10: 'LA',
		11: 'LA',
		12: 'HD'
	}
}

export default function GetHitLocation(facing, roll) {
	const location = locationMap[facing == 'back' ? 'front' : facing][roll]
	return {location, roll, floatingCrit: roll == 2 ? true : false}
}