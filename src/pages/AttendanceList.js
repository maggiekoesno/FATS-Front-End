import React, { useEffect, useState } from "react";
import { Divider, TopNavigation, Layout, List, ListItem, Text } from '@ui-kitten/components';
import axios from "axios";
import { StyleSheet, View } from 'react-native';

export default function AttendanceList(props){
	const course = props.course;
	const courseType = props.courseType;
	const index = props.index;
	const openTime = props.openTime;
	const id = props.id;

	useEffect(() =>{
		async function loadData(){
			let newList;
			let students = [];

			const absentResponse = await axios.get(`${process.env.ENDPOINT}/teacher-api/attendance/absent/?course_schedule_id=${id}`);
			newList = absentResponse.data.results.map(ar => ({
				birthDate : ar.birth_date,
				faceRecognition : ar.face_recognition,
				id: ar.id,
				user: ar.user,
				studentId: ar.student_id,
				status: "ABSENT"
			}));
			students = [...students, ...newList];

			const presentResponse = await axios.get(`${process.env.ENDPOINT}/teacher-api/attendance/present/?course_schedule_id=${id}`);
			newList = presentResponse.data.results.map(pr => ({
				birthDate : pr.birth_date,
				faceRecognition : pr.face_recognition,
				id: pr.id,
				user: pr.user,
				studentId: pr.student_id,
				status: "PRESENT"
			}));
			students = [...students, ...newList];
			
			const lateResponse = await axios.get(`${process.env.ENDPOINT}/teacher-api/attendance/late/?course_schedule_id=${id}`);
			newList = lateResponse.data.results.map(lr => ({
				birthDate : lr.birth_date,
				faceRecognition : lr.face_recognition,
				id: lr.id,
				user: lr.user,
				studentId: lr.student_id,
				status: "LATE"
			}));
			students = [...students, ...newList];

			setStudents(students);
		}

		loadData();
	}, [])

	const [students, setStudents] = useState(null);

	const renderItemAccessory = (status) => {
		if(status === "LATE"){
			return(
				<View style={styles.late}>
					<Text category="s1" style={styles.text}> LATE </Text>
				</View>
			)
		}

		if(status === "ABSENT"){
			return(
				<View style={styles.absent}>
					<Text category="s1" style={styles.text}> ABSENT </Text>
				</View>
			)
		}

		return(
			<View style={styles.present}>
				<Text category="s1" style={styles.text}> PRESENT </Text>
			</View>
		)
	};

	const renderItem = ({ item }) => {
		return(<ListItem
      title={`${item.studentId}`}
			accessoryRight={()=> renderItemAccessory(item.status)}
    />)
	};

	return(
		<Layout>
			<TopNavigation
				title={`Attendance List for ${course}/${courseType}/${index}/${id}`}
			/>
			<Divider />
			<List
				data={students}
				ItemSeparatorComponent={Divider}
				renderItem={renderItem}
			/>
		</Layout>
	)
}

const styles = StyleSheet.create({
	late:{
		backgroundColor: "#FFA500",
		borderRadius: 5,
		padding: 10,
	},
	absent:{
		backgroundColor: "#FF0000",
		borderRadius: 5,
		padding: 10,
	},
	present:{
		backgroundColor: "#00B700",
		borderRadius: 5,
		padding: 10,
	},
	text:{
		color: "#FFFFFF",
	}
})