export default {
	SRM: [
		{count: 2, cluster: 1, name: 'SRM-2'},
		{count: 4, cluster: 1, name: 'SRM-4'},
		{count: 6, cluster: 1, name: 'SRM-6'},
		{count: 3, cluster: 2, damage: 2, name: 'MML-3', sup: 'SRM'},
		{count: 5, cluster: 2, damage: 2, name: 'MML-5', sup: 'SRM'},
		{count: 7, cluster: 2, damage: 2, name: 'MML-7', sup: 'SRM'},
		{count: 9, cluster: 2, damage: 2, name: 'MML-9', sup: 'SRM'}
	],
	LRM: [
		{count: 5, cluster: 5, name: 'LRM-5'},
		{count: 10, cluster: 5, name: 'LRM-10'},
		{count: 15, cluster: 5, name: 'LRM-15'},
		{count: 20, cluster: 5, name: 'LRM-20'},
		{count: 3, cluster: 3, name: 'MML-3', sup: 'LRM'},
		{count: 5, cluster: 5, name: 'MML-5', sup: 'LRM'},
		{count: 7, cluster: 5, name: 'MML-7', sup: 'LRM'},
		{count: 9, cluster: 5, name: 'MML-9', sup: 'LRM'}
	],
	AC: [
		{count: 2, cluster: 1, name: 'LB 2-X'},
		{count: 5, cluster: 1, name: 'LB 5-X'},
		{count: 10, cluster: 1, name: 'LB 10-X'},
		{count: 20, cluster: 1, name: 'LB 20-X'}
	],
	OTHER: [
		{count: 10, cluster: 5, name: 'MRM-10'},
		{count: 20, cluster: 5, name: 'MRM-20'},
		{count: 30, cluster: 5, name: 'MRM-30'},
		{count: 40, cluster: 5, name: 'MRM-40'},
		{count: 10, cluster: 5, name: 'RL-10'},
		{count: 15, cluster: 5, name: 'RL-15'},
		{count: 20, cluster: 5, name: 'RL-20'},
		{count: 20, cluster: 5, name: 'HAG-20'},
		{count: 30, cluster: 5, name: 'HAG-30'},
		{count: 40, cluster: 5, name: 'HAG-40'}
	]
}