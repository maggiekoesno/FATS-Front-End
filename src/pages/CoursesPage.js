import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Button, Divider, Icon, List, ListItem, TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';

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
		<Layout>
			<TopNavigation
				title='Eva Application'
				accessoryLeft={renderBackAction}
				accessoryRight={renderSettingsAction}
			/>
			<Divider />
			<List
				data={data}
				renderItem={renderItem}
			/>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})