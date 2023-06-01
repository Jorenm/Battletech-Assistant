'use client'

import { useState } from 'react'
import classNames from 'classnames'
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
	const [facing, setFacing] = useState('front')
	const [weaponPreferences, setWeaponPreferences] = useState({})

	// const [onClient, setOnClient] = useState(false)
	const [floatingCrits, setFloatingCrits] = useState([])

	// useEffect(() => {
	// 	setOnClient(true)
	// }, [])

	function rollHit() {
		const result = RollDice()
		console.log(result)
	}

	function rollCluster(count, clusterSize, damage) {

		setFloatingCrits([])
		setClusterHits([])

		const clusterHits = clusterTable[count][RollDice()-2]
		const displayedHits = Math.ceil(clusterHits/clusterSize)
		let remainder = clusterHits%clusterSize

		if (damage && remainder) {
			remainder = damage * remainder
		}

		const generatedHits = []
		const newFloatingCrits = []
		for (let i = 0; i < displayedHits; i++) {
			const hit = GetHitLocation(facing, RollDice())
			if (i == displayedHits-1) {
				hit.remainder = remainder
			}
			if (hit.floatingCrit) {
				const actualCrits = {8: 1, 9: 1, 10: 2, 11: 2, 12: 3}[RollDice()] || false
				if (actualCrits > 0) {
					hit.critCount = actualCrits
					newFloatingCrits.push(hit)
				}
			}
			generatedHits.push(hit)
		}

		setClusterHits({hits: generatedHits, remainder})
		setFloatingCrits(newFloatingCrits)
	}

	console.log(floatingCrits)

	return <div className={styles.roller}>
		{clusterHits && <div className={styles.cluster_hits}>
			{clusterHits.hits.map((hit, i) => {
				return <Hit key={`cluster_hit_${i}`} hitLocation={GetHitLocation(facing, hit.roll)} roll={hit.roll} facing={facing} damage={hit.remainder || 0} />
			})}
			{[...new Array(7-clusterHits.hits.length%7).keys()].map((i) => {
				return <div key={`spacer_${i}`} className={styles.hit_spacer}></div>
			})}
			{/* {onClient && <Hit facing={facing} roll={RollDice()} />}
			{onClient && <Hit facing={facing} roll={RollDice()} />} */}
		</div>}

		{floatingCrits.length ? <div className={styles.floating_crits}>
			{floatingCrits.map((floatingCrit, i) => {
				console.log('float', floatingCrit, i)
				return <Crit key={`floating_crit_${i}`} critCount={floatingCrit.critCount} facing={facing} />
			})}
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

		<ul className={styles.facing_and_hit}>
			<li><button className={classNames(facing == 'back' ? styles.active : '')} onClick={setFacing.bind(null, 'back')}><strong>Back</strong></button></li>
			<li><button className={classNames(facing == 'left' ? styles.active : '')} onClick={setFacing.bind(null, 'left')}><strong>Left</strong></button></li>
			<li><button className={classNames(styles.roll_hit)} onClick={rollHit}><strong>Hit</strong></button></li>
			<li><button className={classNames(facing == 'right' ? styles.active : '')} onClick={setFacing.bind(null, 'right')}><strong>Right</strong></button></li>
			<li><button className={classNames(facing == 'front' ? styles.active : '')} onClick={setFacing.bind(null, 'front')}><strong>Front</strong></button></li>
		</ul>

		<WeaponPreferencesMenu {...{setWeaponPreferences, weaponPreferences}} />

	</div>
}