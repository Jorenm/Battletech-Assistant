import Cookies from 'js-cookie'
import classNames from 'classnames'

import styles from './weapon_preferences_menu.module.sass'

import Image from 'next/image'

import clusterWeapons from '../lib/clusterWeapons'
import { useEffect, useState } from 'react'

export default function WeaponPreferencesMenu({setWeaponPreferences, weaponPreferences}) {
	const [showWeaponsMenu, setShowWeaponsMenu] = useState(false)

	function updatePreferences(name) {
		const newWeaponPreferences = {...weaponPreferences}
		newWeaponPreferences[name] = !newWeaponPreferences[name]
		setWeaponPreferences(newWeaponPreferences)
	
		Cookies.set('weaponPreferences', JSON.stringify(newWeaponPreferences))
	}

	useEffect(() => {
		const cookieWeaponPreferences = Cookies.get('weaponPreferences')
		if (cookieWeaponPreferences) {
			setWeaponPreferences(JSON.parse(cookieWeaponPreferences))
		} else {
			const weaponNames = Object.keys(clusterWeapons).map((weaponType) => {
				return clusterWeapons[weaponType].map((weapon) => {
					return weapon.name
				})
			}).flat()
			const newWeaponPreferences = {}
			weaponNames.forEach((weaponName) => {
				newWeaponPreferences[weaponName] = true
			})
			setWeaponPreferences(newWeaponPreferences)
		}
	}, [])

	return <div className={styles.hidden_weapons_menu}>
		<button className={showWeaponsMenu ? styles.active : ''} onClick={() => setShowWeaponsMenu(!showWeaponsMenu)}><Image src={'pullout_menu.svg'} width="24" height="24" alt="Weapon preferences menu toggle" /></button>
		<div className={classNames(styles.hidden_weapons_menu_inner, showWeaponsMenu ? styles.show : '')}>
			<h2>Displayed Weapons</h2>
			<div className={styles.weapon_list}>
				{Object.keys(clusterWeapons).map((weaponType) => {
					const weapons = clusterWeapons[weaponType]
					return <ul key={`weapon_type_${weaponType}`} className={styles.weapon_type}>
						<li><strong>{weaponType}</strong></li>
						{weapons.map((weapon) => {
							return <li key={`weapon_${weapon.name}`}>
								<label><input onChange={updatePreferences.bind(null, weapon.name + (weapon.sup || ''))} checked={weaponPreferences[weapon.name + (weapon.sup || '')] ? true : false} type="checkbox" />{weapon.name}{weapon.sup ? <sup>{weapon.sup}</sup> : ''}</label>
							</li>
						})}
					</ul>
				})}
			</div>
		</div>
	</div>
}