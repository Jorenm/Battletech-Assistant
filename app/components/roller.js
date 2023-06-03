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
	const [singleHit, setSingleHit] = useState(null)
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
			const date = new Date()
			Cookies.set('targetType', targetType, {expires: date.setFullYear(date.getFullYear() + 1)})
			Cookies.set('attackDirection', attackDirection, {expires: date.setFullYear(date.getFullYear() + 1)})
			resetResults()
		} else {
			initialRenderRef.current = false
		}
	}, [targetType, attackDirection])

	useEffect(() => {
		setTargetType(Cookies.get('targetType') || 'mech')
		setattackDirection(Cookies.get('attackDirection') || 'front')
	}, [])

	function resetResults() {
		setFloatingCrits([])
		setVehicleCrits([])
		setVehicleMotiveCrits([])
		setSingleHit(null)
		setClusterHits(null)
	}

	function rollHit() {
		resetResults()

		const roll = RollDice()
		// const roll = 10
		console.log('roll', roll)
		const hit = GetHitLocation({targetType, attackDirection, roll})

		setSingleHit(hit)

		if (hit.floatingCrit) {
			setFloatingCrits([hit])
		} else if (hit.vehicleMotiveCrit) {
			setVehicleMotiveCrits([hit])
		} else if (hit.vehicleCrit) {
			setVehicleCrits([hit])
		}
	}

	function rollCluster(count, clusterSize, damage) {
		resetResults()

		const clusterHits = clusterTable[count][RollDice()-2]
		const displayedClusterHits = Math.ceil(clusterHits/clusterSize)
		let remainder = clusterHits%clusterSize

		if (damage && remainder) {
			remainder = damage * remainder
		}

		const generatedHits = []
		const newFloatingCrits = []
		const newVehicleCrits = []
		const newVehicleMotiveCrits = []
		for (let i = 0; i < displayedClusterHits; i++) {
			const hit = GetHitLocation({targetType, attackDirection, roll: RollDice()})
			if (i == displayedClusterHits-1) {
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

		setClusterHits({hits: generatedHits, remainder})
		setFloatingCrits(newFloatingCrits)
		setVehicleCrits(newVehicleCrits)
		setVehicleMotiveCrits(newVehicleMotiveCrits)
	}

	return <div className={styles.roller}>
		{singleHit && <div className={styles.single_hit}>
			<Hit hitLocation={singleHit} single={true} targetType={targetType} roll={singleHit.roll} attackDirection={attackDirection} damage={0} />
		</div>}

		{clusterHits && <div className={styles.cluster_hits}>
			<h2 className={styles.header_bar}>Cluster Hits</h2>
			<div className={styles.hits_wrapper}>
				{clusterHits.hits.map((hit, i) => {
					return <Hit key={`cluster_hit_${i}`} hitLocation={hit} targetType={targetType} roll={hit.roll} attackDirection={attackDirection} damage={hit.remainder || 0} />
				})}
			</div>
		</div>}

		{floatingCrits.length ? <div className={classNames(styles.scrolling_list, styles.floating_crits)}>
			<h2 className={styles.header_bar}>Floating crits</h2>
			{floatingCrits.length > 7 ? <div className={styles.more}><strong>more &raquo;</strong></div> : ''}
			<div className={styles.crits_wrapper}>
				{floatingCrits.map((hit, i) => {
					return [...new Array(hit.floatingCrit).keys()].map((i) => {
						return <Crit key={`floating_crit_${i}`} targetType={targetType} hit={hit} attackDirection={attackDirection} />
					})
				})}
			</div>
		</div> : ''}

		{vehicleMotiveCrits.length ? <div className={classNames(styles.scrolling_list, styles.vehicle_motive_crits)}>
			<h2 className={styles.header_bar}>Motive damage</h2>
			{vehicleMotiveCrits.length > 2 ? <div className={styles.more}><strong>more &raquo;</strong></div> : ''}
			<div className={styles.crits_wrapper}>
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