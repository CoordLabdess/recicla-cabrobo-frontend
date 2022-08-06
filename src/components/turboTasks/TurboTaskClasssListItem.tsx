import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'

interface TurboTaskClasssListItemProps {
	class: string
	isOpen: boolean
	lastUpdate: Date
}

export function TurboTaskClasssListItem(props: TurboTaskClasssListItemProps) {
	return (
		<View style={styles.shadowContainer}>
			<View style={{ overflow: 'hidden', borderRadius: 27 }}>
				<Pressable android_ripple={{ color: '#ccc' }} style={styles.cardContainer}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
						<Text style={styles.title}>{props.class}</Text>
						<Text
							style={[styles.status, { color: props.isOpen ? COLORS.primary500 : COLORS.red500 }]}
						>
							{props.isOpen ? 'Aberta' : 'Encerrada'}
						</Text>
					</View>
					<Text style={styles.description}>
						Liberada em: {props.lastUpdate.toLocaleDateString()}
					</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	shadowContainer: {
		borderRadius: 27,
		backgroundColor: 'transparent',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		marginBottom: 14,
	},
	cardContainer: {
		backgroundColor: COLORS.secondary400,
		width: 345,
		minHeight: 100,
		borderRadius: 27,
		overflow: 'hidden',
		paddingHorizontal: 29,
		paddingVertical: 16,
	},
	title: {
		fontWeight: '600',
		fontSize: 19,
	},
	description: {},
	status: {
		fontSize: 16,
		fontWeight: '600',
	},
})
