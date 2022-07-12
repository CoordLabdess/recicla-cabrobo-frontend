import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { ProfileHeader } from '../../components/profile/ProfileHeader'

export function ProfileScreen() {
	return (
		<SafeAreaView style={styles.root}>
			<FlatList
				ListHeaderComponent={ProfileHeader}
				data={[0, 1, 2, 3, 4]}
				style={styles.contentList}
				renderItem={itemData => (
					<View>
						<Text>{itemData.item}</Text>
					</View>
				)}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: 'green',
	},
	contentList: {
		backgroundColor: '#fff',
		flexGrow: 1,
	},
})
