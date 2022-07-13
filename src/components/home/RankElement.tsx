import { View, Text, Image, StyleSheet, ListRenderItemInfo } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface Rank {
	name: string
	position: number
	points: number
}

interface RankElementProps {
	itemData: ListRenderItemInfo<Rank>
}

export function RankElement(props: RankElementProps) {
	return (
		<View style={styles.root}>
			<View style={styles.outterRankElement}>
				<View style={styles.innerRankElement}>
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							resizeMode={'cover'}
							source={{
								uri: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
							}}
						/>
					</View>
					<View>
						<Text>{props.itemData.item.name}</Text>
						<View style={{ flexDirection: 'row' }}>
							<Text>{props.itemData.item.position}º Lugar</Text>
						</View>
						<View style={{ flexDirection: 'row' }}>
							{props.itemData.item.position <= 3 && (
								<Ionicons
									name='trophy'
									color={
										props.itemData.item.position == 1
											? '#e6c404'
											: props.itemData.item.position === 2
											? '#a5a5a5'
											: '#8b6703'
									}
									size={18}
								/>
							)}
							<Text style={{ color: '#838495' }}>{props.itemData.item.points}Pts</Text>
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
		marginBottom: 9,
	},
	outterRankElement: {
		flex: 1,
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
		width: 347,
		backgroundColor: '#fff',
		borderRadius: 30,
		height: 90,
		alignItems: 'center',
		overflow: 'hidden',
		flexDirection: 'row',
	},
	imageContainer: {
		marginLeft: 14,
		height: 76,
		width: 76,
		borderRadius: 100,
		overflow: 'hidden',
		marginRight: 10,
	},
	image: {
		height: '100%',
	},
})
