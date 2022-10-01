import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'
import { TurboTask } from '../../data/turboTasks'
import { useNavigation } from '@react-navigation/native'
import { AtividadeData } from '../../utils/school'

interface TurboTaskClasssListItemProps {
	turboTask: AtividadeData
}

export function TurboTaskClasssListItem(props: TurboTaskClasssListItemProps) {
	const navigation = useNavigation()
	return (
		<View style={styles.shadowContainer}>
			<View style={{ overflow: 'hidden', borderRadius: 27 }}>
				<Pressable
					android_ripple={{ color: '#ccc' }}
					style={styles.cardContainer}
					onPress={() =>
						navigation.navigate(
							'TurboTaskConfig' as never,
							{ mode: 'edit', atividade: props.turboTask } as never,
						)
					}
				>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
						<View style={{ maxWidth: '70%' }}>
							<Text style={styles.title}>{props.turboTask.nome}</Text>
						</View>
						<Text style={[styles.status, { color: true ? COLORS.primary500 : COLORS.red500 }]}>
							{true ? 'Aberta' : 'Encerrada'}
						</Text>
					</View>
					<Text>{props.turboTask.serie}</Text>
					<Text style={styles.description}>Liberada em: {new Date().toLocaleDateString()}</Text>
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
		marginBottom: 25,
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
		paddingLeft: 30,
		fontSize: 16,
		fontWeight: '600',
	},
})
