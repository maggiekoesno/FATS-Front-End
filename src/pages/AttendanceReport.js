import React, { useEffect, useState } from "react";
import { Divider, TopNavigation, Layout, List, ListItem, Button } from '@ui-kitten/components';
import axios from "axios";
import { Actions } from "react-native-router-flux";

export default function AttendanceReport(props) {
	const course = props.course_class.course.name;
	const courseType = props.course_class.type;
	const index = props.course_class.index;
	const classId = props.course_class.id;

	useEffect(() => {
		async function loadData() {
			const response = await axios.get(`${process.env.ENDPOINT}/teacher-api/course-schedule/`);
			const filteredClasses = response.data.results.filter(c => c.course_class === classId);
			setClass(filteredClasses);
		}
		loadData();
	}, [])

	const [classes, setClass] = useState(null);


	const renderItemAccessory = (data) => {
		return(
			<Button size='small' onPress={()=> Actions.alist(data)}>View</Button>
		)
	};

	const renderItem = ({ item }) => {
		const data = {
			courseType,
			index,
			course,
			openTime: item.open_time,
			id: item.id
		}
		return(<ListItem
      title={`${course}/${courseType}/${index}/${item.id}`}
			description={`${item.open_time}`}
			accessoryRight={() => renderItemAccessory(data)}
    />)
	};

	return (
		<Layout>
			<TopNavigation
				title={`Ended Classes for ${course}/${courseType}/${index}`}
			/>
			<List
				data={classes}
				ItemSeparatorComponent={Divider}
				renderItem={renderItem}
			/>
			<Divider />
		</Layout>
	)
}