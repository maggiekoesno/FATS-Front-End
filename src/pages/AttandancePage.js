import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { Button, Divider, TopNavigation, Layout, Card, Modal, Text, Input, Toggle } from '@ui-kitten/components';

const useToggleState = (initialState = false) => {
	const [checked, setChecked] = React.useState(initialState);

	const onCheckedChange = (isChecked) => {
		setChecked(isChecked);
	};

	return { checked, onChange: onCheckedChange };
};

export default function AttendancePage(props) {
	const id = props.id
	const [isVisible, setVisible] = useState(false);
	const [isSuccess, setSuccess] = useState(false);
	const [matric, setMatric] = useState("");
	const infoToggleState = useToggleState();

	const handleOverride = async () => {
		const data = {
			course_schedule: id,
			student_id: matric,
			late: infoToggleState.checked,
		}
		const response = await axios.post(`${process.env.ENDPOINT}/teacher-api/override-attendance/`, data);
		if (response.status == 201) {
			setSuccess(true);
		}
		console.log(response)
		setVisible(false)
	}

	const renderOverrideAction = () => {
		return (<Button size='tiny' onPress={() => setVisible(true)}>Override Attendance</Button>)
	}

	const renderOverrideCard = () => {
		if (isSuccess) {
			return (
				<Card disabled={true} style={styles.card}>
					<Text category='h3' style={styles.text}>Override Attendance Successful</Text>
					<Divider />
					<Button onPress={handleOverride}>
						Okay
					</Button>
				</Card>
			)
		}
		return (
			<Card disabled={true} style={styles.card}>
				<Text category='h3' style={styles.text}>Override Attendance</Text>
				<Input
					style={styles.input}
					placeholder="Enter Student's matriculation number"
					value={matric}
					onChangeText={nextValue => setMatric(nextValue)}
				/>
				<Toggle
					style={styles.toggle}
					status='info'
					{...infoToggleState}>
					Late
      </Toggle>
				<Divider />
				<Button onPress={handleOverride}>
					Override
				</Button>
			</Card>
		)
	}

	const renderOverrideModal = () => {

		return (<Modal
			visible={isVisible}
			backdropStyle={styles.backdrop}
			onBackdropPress={() => setVisible(false)}>
			{renderOverrideCard()}
		</Modal>)
	}

	return (
		<Layout>
			<TopNavigation
				title='Classes'
				accessoryRight={renderOverrideAction}
			/>
			<Divider />
			{renderOverrideModal()}
		</Layout>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	card: {
		padding: 20,
		paddingBottom: 5,
	},
	text: {
		paddingBottom: 20,
	},
	input: {
		paddingBottom: 10,
	},
	toggle: {
		margin: 2,
		justifyContent: "flex-end",
		paddingBottom: 20,
	},
});