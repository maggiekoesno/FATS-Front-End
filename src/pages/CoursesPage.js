import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Divider, Icon, List, ListItem, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
	<Icon {...props} name='arrow-back' />
);

const SettingsIcon = (props) => (
	<Icon {...props} name='settings' />
);

const data = new Array(8).fill({
	title: 'Class Name',
	description: 'Class Description',
});


export default function CoursesPage() {
	useEffect(() => {
		//fetch for data
	}, [])

	const renderSettingsAction = () => (
		<TopNavigationAction icon={SettingsIcon} />
	);

	const renderBackAction = () => (
		<TopNavigationAction icon={BackIcon} />
	);

	const renderItemAccessory = (props) => (
		<Button size='tiny'>Begin Session</Button>
	);

	const renderItemIcon = (props) => (
		<Icon {...props} name='person' />
	);

	const renderItem = ({ item, index }) => (
		<ListItem
			title={`${item.title} ${index + 1}`}
			description={`${item.description} ${index + 1}`}
			accessoryLeft={renderItemIcon}
			accessoryRight={renderItemAccessory}
		/>
	);

	return (
		<React.Fragment>
			<TopNavigation
				title='Eva Application'
				accessoryLeft={renderBackAction}
				accessoryRight={renderSettingsAction}
			/>
			<Divider />
			<List
				style={styles.container}
				data={data}
				renderItem={renderItem}
			/>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
  container: {

  },
});