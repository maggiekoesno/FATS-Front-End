import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Icon, List, ListItem, TopNavigation, TopNavigationAction, Layout, Spinner, OverflowMenu, MenuItem } from '@ui-kitten/components';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';


const BackIcon = (props) => (
	<Icon {...props} name='arrow-back' />
);

const SettingsIcon = (props) => (
	<Icon {...props} name='settings' />
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

export default function CoursesPage() {
	const [courseList, setCourseList] = useState(null);
	const [menuVisible, setMenuVisible] = React.useState(false);

	useEffect(() => {
		async function fetchCourses(){
			try{
				const response = await axios.get(`http://10.0.1.6:8000/teacher-api/course-teacher/`);
				setCourseList(response.data.results)
			} catch(e){
				console.log(e)
			}
		}
		fetchCourses();
	}, []);

	const handleLogout = () =>{
		axios.defaults.headers.common[
			"Authorization"
		] = "";

		Actions.auth();
	}

	const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

	const renderMenuAction = () => (
    <TopNavigationAction icon={SettingsIcon} onPress={toggleMenu}/>
	);

	const renderSettingsAction = () => (
		<React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={LogoutIcon} title='Logout' onPress={handleLogout}/>
      </OverflowMenu>
    </React.Fragment>
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
			title={`${item.courseId}`}
			description={`${item.description}`}
			accessoryLeft={renderItemIcon}
			accessoryRight={renderItemAccessory}
		/>
	);

	if(courseList === null){
		return (
		<View styles={styles.container}>
			<Spinner />
		</View>
		)
	}
	const data = courseList.map(course => ({courseId: course.course_class, description: "a computer course"}))

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
		display: "flex",
    justifyContent: 'center',
		alignItems: 'center',
	}
})