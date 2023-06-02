import RollDice from "./rolldice"

const locationMap = {
	mech: {
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
	}, vehicle: {
		front: {
			2: 'Front',
			3: 'Front',
			4: 'Front',
			5: 'Right Side',
			6: 'Front',
			7: 'Front',
			8: 'Front',
			9: 'Left Side',
			10: 'Turret',
			11: 'Turret',
			12: 'Turret'
		},
		back: {
			2: 'Rear',
			3: 'Rear',
			4: 'Rear',
			5: 'Left Side',
			6: 'Rear',
			7: 'Rear',
			8: 'Rear',
			9: 'Right Side',
			10: 'Turret',
			11: 'Turret',
			12: 'Turret'
		},
		left: {
			2: 'Left Side',
			3: 'Left Side',
			4: 'Left Side',
			5: 'Front',
			6: 'Left Side',
			7: 'Left Side',
			8: 'Left Side',
			9: 'Rear',
			10: 'Turret',
			11: 'Turret',
			12: 'Turret'
		},
		right: {
			2: 'Right Side',
			3: 'Right Side',
			4: 'Right Side',
			5: 'Front',
			6: 'Right Side',
			7: 'Right Side',
			8: 'Right Side',
			9: 'Rear',
			10: 'Turret',
			11: 'Turret',
			12: 'Turret'
		}
	}, vtol: {
		front: {
			2: 'Front',
			3: 'Rotors',
			4: 'Rotors',
			5: 'Right Side',
			6: 'Front',
			7: 'Front',
			8: 'Front',
			9: 'Left Side',
			10: 'Rotors',
			11: 'Rotors',
			12: 'Rotors'
		},
		back: {
			2: 'Rear',
			3: 'Rotors',
			4: 'Rotors',
			5: 'Left Side',
			6: 'Rear',
			7: 'Rear',
			8: 'Rear',
			9: 'Right Side',
			10: 'Rotors',
			11: 'Rotors',
			12: 'Rotors'
		},
		left: {
			2: 'Left Side',
			3: 'Rotors',
			4: 'Rotors',
			5: 'Front',
			6: 'Left Side',
			7: 'Left Side',
			8: 'Left Side',
			9: 'Rear',
			10: 'Rotors',
			11: 'Rotors',
			12: 'Rotors'
		},
		right: {
			2: 'Right Side',
			3: 'Rotors',
			4: 'Rotors',
			5: 'Front',
			6: 'Right Side',
			7: 'Right Side',
			8: 'Right Side',
			9: 'Rear',
			10: 'Rotors',
			11: 'Rotors',
			12: 'Rotors'
		}
	}
}

export default function GetHitLocation({targetType, attackDirection, roll}) {
	const location = locationMap[targetType][attackDirection][roll]
	console.log('GetHitLocation', {location, targetType, attackDirection, roll})


	let vehicleCrit = null
	let vehicleMotiveCrit = null
	if (targetType == 'vehicle') {
		vehicleCrit = roll == 2 || roll == 12 || (roll == 8 && (attackDirection == 'left' || attackDirection == 'right'))
		vehicleMotiveCrit = [3,4,5,9].includes(roll)
		vehicleMotiveCrit = vehicleMotiveCrit ? {
			attackDirectionModifier: {back: 1, left: 2, right: 2}[attackDirection] || 0,
		} : null
	}

	let floatingCrit = false
	if (targetType == 'mech') {
		floatingCrit = roll == 2
	}

	// typeModifiers: {'Tracked, Naval': '+0', 'Hovercraft, Hydrofoil': '+3', 'Wheeled': '+2', 'WiGE': '+4'}

	return {location, roll, floatingCrit: floatingCrit, vehicleCrit, vehicleMotiveCrit}
}