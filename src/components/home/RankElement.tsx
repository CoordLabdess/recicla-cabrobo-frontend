import { View, Text, Image, StyleSheet, ListRenderItemInfo } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { School } from '../../data/schools'
import { Student } from '../../data/students'
import { ProfileImage } from '../ui/ProfileImage'

interface RankElementProps {
	user: Student | School
	index: number
	disableImage: boolean
}

export function RankElement(props: RankElementProps) {
	return (
		<View style={styles.root}>
			<View style={styles.outterRankElement}>
				<View style={styles.innerRankElement}>
					{props.disableImage && (
						<ProfileImage
							imgUri='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
							size={70}
						/>
					)}
					<View>
						<Text>{props.user.nome}</Text>
						<View style={{ flexDirection: 'row' }}>
							<Text>{props.index}º Lugar</Text>
						</View>
						<View style={{ flexDirection: 'row' }}>
							{props.index <= 3 && (
								<Ionicons
									name='trophy'
									color={props.index == 1 ? '#e6c404' : props.index === 2 ? '#a5a5a5' : '#8b6703'}
									size={18}
									style={{ marginRight: 5 }}
								/>
							)}
							<Text style={{ color: '#838495' }}>{props.user.points}Pts</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
		marginBottom: 10,
	},
	outterRankElement: {
		width: '80%',
		borderRadius: 30,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	innerRankElement: {
		width: '100%',
		backgroundColor: '#fff',
		borderRadius: 30,
		height: 100,
		alignItems: 'center',
		overflow: 'hidden',
		padding: 10,
		flexDirection: 'row',
	},
	image: {
		height: '100%',
	},
})
