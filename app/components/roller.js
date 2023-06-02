'use client'

import { useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import Cookies from 'js-cookie'

import styles from './roller.module.sass'

import clusterTable from '../lib/clusterTable'
import RollDice from '../lib/rolldice'
import Hit from './hit'
import GetHitLocation from '../lib/getHitLocation'
import Crit from './crit'
import clusterWeapons from '../lib/clusterWeapons'
import WeaponPreferencesMenu from './weapon_preferences_menu'

export default function Roller() {

	const [clusterHits, setClusterHits] = useState(null)
	const [hits, setHits] = useState([])
	const [attackDirection, setattackDirection] = useState('')
	const [weaponPreferences, setWeaponPreferences] = useState({})
	const [targetType, setTargetType] = useState('')
	// const [onClient, setOnClient] = useState(false)
	const [floatingCrits, setFloatingCrits] = useState([])
	const [vehicleCrits, setVehicleCrits] = useState([])
	const [vehicleMotiveCrits, setVehicleMotiveCrits] = useState([])
	const initialRenderRef = useRef(true)

	useEffect(() => {
		if (!initialRenderRef.current) {
			Cookies.set('targetType', targetType)
			Cookies.set('attackDirection', attackDirection)
			setVehicleCrits([])
			setVehicleMotiveCrits([])
			setHits([])
			setClusterHits(null)
		} else {
			initialRenderRef.current = false
		}
	}, [targetType, attackDirection])

	useEffect(() => {
		setTargetType(Cookies.get('targetType') || 'mech')
		setattackDirection(Cookies.get('attackDirection') || 'front')
	}, [])

	function rollHit() {
		const result = RollDice()
		console.log(result)
	}

	function rollCluster(count, clusterSize, damage) {

		// setFloatingCrits([])
		// setClusterHits([])

		const clusterHits = clusterTable[count][RollDice()-2]
		const displayedHits = Math.ceil(clusterHits/clusterSize)
		let remainder = clusterHits%clusterSize

		if (damage && remainder) {
			remainder = damage * remainder
		}

		// TODO: Seed floating crit so it doesn't change on attackDirection change. Maybe make attackDirection change do an entire reroll?

		const generatedHits = []
		const newFloatingCrits = []
		const newVehicleCrits = []
		const newVehicleMotiveCrits = []
		for (let i = 0; i < displayedHits; i++) {
			const hit = GetHitLocation({targetType, attackDirection, roll: RollDice()})
			if (i == displayedHits-1) {
				hit.remainder = remainder
			}
			if (hit.floatingCrit) {
				newFloatingCrits.push(hit)
			} else if (hit.vehicleMotiveCrit) {
				newVehicleMotiveCrits.push(hit)
			} else if (hit.vehicleCrit) {
				newVehicleCrits.push(hit)
			}
			generatedHits.push(hit)
		}

		console.log()

		setClusterHits({hits: generatedHits, remainder})
		setFloatingCrits(newFloatingCrits)
		setVehicleCrits(newVehicleCrits)
		setVehicleMotiveCrits(newVehicleMotiveCrits)
		console.log({newVehicleCrits, newVehicleMotiveCrits})
	}

	return <div className={styles.roller}>
		{clusterHits && <div className={styles.cluster_hits}>
			{clusterHits.hits.map((hit, i) => {
				return <Hit key={`cluster_hit_${i}`} hitLocation={hit} targetType={targetType} roll={hit.roll} attackDirection={attackDirection} damage={hit.remainder || 0} />
			})}
			{[...new Array(7-clusterHits.hits.length%7).keys()].map((i) => {
				return <div key={`spacer_${i}`} className={styles.hit_spacer}></div>
			})}
		</div>}

		{floatingCrits.length ? <div className={styles.floating_crits}>
			{floatingCrits.map((hit, i) => {
				return <Crit key={`floating_crit_${i}`} targetType={targetType} hit={hit} attackDirection={attackDirection} />
			})}
		</div> : ''}

		{vehicleMotiveCrits.length ? <div className={styles.vehicle_motive_crits}>
			<h2>Motive damage</h2>
			{vehicleMotiveCrits.length > 2 ? <div className={styles.more}><strong>more &raquo;</strong></div> : ''}
			<div className={styles.hits_wrapper}>
				{vehicleMotiveCrits.map((hit, i) => {
					return <Crit key={`motive_crit_${i}`} targetType={targetType} hit={hit} attackDirection={attackDirection} />
				})}
			</div>
		</div> : ''}

		<ul className={styles.roll}>
			<li>
				<div className={styles.weapon_types}>
					{Object.keys(clusterWeapons).map((weaponType) => {
						const weapons = clusterWeapons[weaponType]
						return <ul key={`weapon_type_${weaponType}`} className={styles.weapon_type}>
							<li><strong>{weaponType}</strong></li>
							{weapons.map((weapon) => {
								return weaponPreferences[weapon.name + (weapon.sup || '')] ? <li key={`weapon_${weapon.name}`}><button onClick={rollCluster.bind(null, weapon.count, weapon.cluster, weapon.damage)}>{weapon.name}{weapon.sup ? <sup>{weapon.sup}</sup> : ''}</button></li> : ''
							})}
						</ul>
					})}
				</div>
			</li>
		</ul>

		<ul className={styles.attackDirection_and_hit}>
			<li><button className={classNames(attackDirection == 'back' ? styles.active : '')} onClick={setattackDirection.bind(null, 'back')}><strong>Back</strong></button></li>
			<li><button className={classNames(attackDirection == 'left' ? styles.active : '')} onClick={setattackDirection.bind(null, 'left')}><strong>Left</strong></button></li>
			<li><button className={classNames(styles.roll_hit)} onClick={rollHit}><strong>Roll Hit</strong></button></li>
			<li><button className={classNames(attackDirection == 'right' ? styles.active : '')} onClick={setattackDirection.bind(null, 'right')}><strong>Right</strong></button></li>
			<li><button className={classNames(attackDirection == 'front' ? styles.active : '')} onClick={setattackDirection.bind(null, 'front')}><strong>Front</strong></button></li>
		</ul>

		<ul className={styles.target_type}>
			<li><button className={targetType == 'mech' ? styles.active : ''} onClick={setTargetType.bind(null, 'mech')}><strong>MECH</strong></button></li>
			<li><button className={targetType == 'vehicle' ? styles.active : ''} onClick={setTargetType.bind(null, 'vehicle')}><strong>VEHICLE</strong></button></li>
			<li><button className={targetType == 'vtol' ? styles.active : ''} onClick={setTargetType.bind(null, 'vtol')}><strong>VTOL</strong></button></li>
		</ul>

		<WeaponPreferencesMenu {...{setWeaponPreferences, weaponPreferences}} />

	</div>
}