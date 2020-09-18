import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Icon, List, ListItem, TopNavigation, TopNavigationAction, Layout, Spinner, OverflowMenu, MenuItem } from '@ui-kitten/components';
import { Actions } from 'react-native-router-flux';

import {SettingsIcon, LogoutIcon } from "../components/Icons";

export default function CoursesPage() {
	const [courseList, setCourseList] = useState(null);
	const [menuVisible, setMenuVisible] = React.useState(false);

	useEffect(() => {
		async function fetchCourses() {
			try {
				const response = await axios.get(`${process.env.ENDPOINT}/teacher-api/course-teacher/`);
				setCourseList(response.data.results)
			} catch (e) {
				console.log(e)
			}
		}
		fetchCourses();
	}, []);

	const handleLogout = () => {
		axios.defaults.headers.common[
			"Authorization"
		] = "";

		Actions.auth();
	}

	const handleBeginSession = async (item) => {
		let courseIndex;
		const description = item.description.split("/")
		const courseType = description[0]
		if(description.length >1){
			courseIndex = description[1]
		}
		
		const selectedItem = courseList.find(c => c.course_class.type === courseType && c.course_class.index === courseIndex)
		const data = {
			course_class: selectedItem.course_class.id,
			is_open: true,
		}
		try {
			const response = await axios.post(`${process.env.ENDPOINT}/teacher-api/course-schedule/`, data);
			Actions.attendance(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};

	const renderMenuAction = () => (
		<TopNavigationAction icon={SettingsIcon} onPress={toggleMenu} />
	);

	const renderSettingsAction = () => (
		<React.Fragment>
			<OverflowMenu
				anchor={renderMenuAction}
				visible={menuVisible}
				onBackdropPress={toggleMenu}>
				<MenuItem accessoryLeft={LogoutIcon} title='Logout' onPress={handleLogout} />
			</OverflowMenu>
		</React.Fragment>
	);

	const renderItemAccessory = (item) => {
		return(<Button size='tiny' onPress={()=> handleBeginSession(item)}>Begin Session</Button>)
	}

	const renderItemIcon = (props) => (
		<Icon {...props} name='book-open-outline'/>
	);

	const renderItem = ({ item }) => (
		<ListItem
			title={`${item.courseId}`}
			description={`${item.description}`}
			accessoryLeft={renderItemIcon}
			accessoryRight={()=> renderItemAccessory(item)}
		/>
	);

	if (courseList === null) {
		return (
			<View styles={styles.container}>
				<Spinner />
			</View>
		)
	}
	const data = courseList.map(c => ({
		courseId: c.course_class.course.name, 
		description: `${c.course_class.type}/${c.course_class.index}`
	}));

	return (
		<Layout>
			<TopNavigation
				title='Classes'
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
		display: "flex",
    justifyContent: 'center',
		alignItems: 'center',
	}
})