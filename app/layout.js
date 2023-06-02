import './globals.sass'
import { Inter, Bebas_Neue } from 'next/font/google'

const inter = Inter({
	subsets: ['latin']
})

const bebasNeue = Bebas_Neue({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-bebas-neue',
	display: 'swap',
})

export const metadata = {
	title: 'Battletech Assistant',
	description: 'Help resolve weapon hits',
}


export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${bebasNeue.variable}`}>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
