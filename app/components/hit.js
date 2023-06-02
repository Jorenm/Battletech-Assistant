import classNames from 'classnames'
import styles from './hit.module.sass'

import RollDice from '../lib/rolldice'
import { useEffect, useState } from 'react'
import GetHitLocation from '../lib/getHitLocation'
import GetCritLocations from '../lib/getCritLocations'

export default function Hit({facing, targetType, roll, hitLocation, damage}) {
	useEffect(() => {
	}, [])

	// This is also used in the crit component. If it's displayed from a crit it has no value except hitLocation
	return <div roll={roll || hitLocation.roll} floatingcrit={!roll ? 'true' : 'false'} className={classNames(styles.hit_wrapper, targetType == 'vehicle' ? styles.vehicle_hit_wrapper : '', targetType == 'vtol' ? styles.vtol_hit_wrapper : '')}>
		{hitLocation && targetType == 'mech' && <div className={styles.hit}>
			<img src={`/hit_locations/left_arm${hitLocation.location == 'LA' ? '_red' : ''}.png`} width="49" height="137" className={styles.left_arm} />
			<img src={`/hit_locations/left_torso${hitLocation.location == 'LT' ? '_red' : ''}.png`} width="44" height="70" className={styles.left_torso} />
			<img src={`/hit_locations/head${hitLocation.location == 'HD' ? '_red' : ''}.png`} width="52" height="41" className={styles.head} />
			<img src={`/hit_locations/center_torso${hitLocation.location == 'CT' ? '_red' : ''}.png`} width="57" height="109" className={styles.center_torso} />
			<img src={`/hit_locations/right_torso${hitLocation.location == 'RT' ? '_red' : ''}.png`} width="44" height="70" className={styles.right_torso} />
			<img src={`/hit_locations/right_arm${hitLocation.location == 'RA' ? '_red' : ''}.png`} width="49" height="137" className={styles.right_arm} />
			<img src={`/hit_locations/left_leg${hitLocation.location == 'LL' ? '_red' : ''}.png`} width="57" height="179" className={styles.left_leg} />
			<img src={`/hit_locations/right_leg${hitLocation.location == 'RL' ? '_red' : ''}.png`} width="57" height="179" className={styles.right_leg} />
		</div>}

		{hitLocation && targetType == 'vehicle' && <div className={styles.vehicle_hit}>
			<img src={`/hit_locations/vehicle_left${hitLocation.location == 'Left Side' ? '_red' : ''}.png`} width="91" height="406" className={styles.vehicle_left_side} />
			<img src={`/hit_locations/vehicle_front${hitLocation.location == 'Front' ? '_red' : ''}.png`} width="212" height="136" className={styles.vehicle_front} />
			<img src={`/hit_locations/vehicle_turret${hitLocation.location == 'Rotor' ? '_red' : ''}.png`} width="135" height="177" className={styles.vehicle_turret} />
			<img src={`/hit_locations/vehicle_right${hitLocation.location == 'Right Side' ? '_red' : ''}.png`} width="92" height="405" className={styles.vehicle_right_side} />
			<img src={`/hit_locations/vehicle_rear${hitLocation.location == 'Rear' ? '_red' : ''}.png`} width="249" height="73" className={styles.vehicle_rear} />
		</div>}

		{hitLocation && targetType == 'vtol' && <div className={styles.vtol_hit}>
			<img src={`/hit_locations/vtol_left_side${hitLocation.location == 'Left Side' ? '_red' : ''}.png`} width="41" height="211" className={styles.vtol_left_side} />
			<img src={`/hit_locations/vtol_front${hitLocation.location == 'Front' ? '_red' : ''}.png`} width="95" height="81" className={styles.vtol_front} />
			<img src={`/hit_locations/vtol_rotor${hitLocation.location == 'Rotor' ? '_red' : ''}.png`} width="238" height="21" className={styles.vtol_rotor} />
			<img src={`/hit_locations/vtol_right_side${hitLocation.location == 'Right Side' ? '_red' : ''}.png`} width="41" height="213" className={styles.vtol_right_side} />
			<img src={`/hit_locations/vtol_tail${hitLocation.location == 'Rear' ? '_red' : ''}.png`} width="29" height="122" className={styles.vtol_tail} />
		</div>}

		{damage ? <div className={styles.damage}>{damage}</div> : ''}
	</div>
}