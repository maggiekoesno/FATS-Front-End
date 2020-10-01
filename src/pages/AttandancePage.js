import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import axios from "axios";
import {
  Button,
  Divider,
  TopNavigation,
  Layout,
  Card,
  Modal,
  Text,
  Input,
  Toggle,
} from "@ui-kitten/components";
import { CheckIcon, CrossIcon } from "../components/Icons";
import { Actions } from "react-native-router-flux";

const useToggleState = (initialState = false) => {
  const [checked, setChecked] = React.useState(initialState);

  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };

  return { checked, onChange: onCheckedChange };
};

export default function AttendancePage(props) {
  const id = props.id;
  const course_class_id = props.course_class;

  const [isVisible, setVisible] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isFail, setFail] = useState(false);
  const [endSuccess, setEndSuccess] = useState(false);
  const [endFail, setEndFail] = useState(false);
  const [matric, setMatric] = useState("");
  const infoToggleState = useToggleState();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isNotificationOn, setNotificationOn] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [studentDetected, setStudentDetected] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleOverride = async () => {
    const data = {
      course_schedule: id,
      student_id: matric,
      late: infoToggleState.checked,
    };
    const response = await axios.post(
      `${process.env.ENDPOINT}/teacher-api/override-attendance/`,
      data
    );
    if (response.status == 201) {
      setSuccess(true);
    } else {
      setFail(true);
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
    setSuccess(false);
    setFail(false);
    setEndSuccess(false);
    setEndFail(false);
  };

  const handleEndCloseModal = () => {
    setVisible(false);
    setSuccess(false);
    setFail(false);
    setEndSuccess(false);
    setEndFail(false);
    Actions.admin();
  };
  const handleEndClass = async () => {
    const data = {
      course_class: course_class_id,
      is_open: false,
    };
    const response = await axios.put(
      `${process.env.ENDPOINT}/teacher-api/course-schedule/${id}/`,
      data
    );
    if (response.status === 200) {
      setVisible(true);
      setEndSuccess(true);
    } else {
      setVisible(true);
      setEndFail(true);
    }
  };

  const renderOverrideAction = () => {
    return (
      <Button onPress={() => setVisible(true)}>Override Attendance</Button>
    );
  };

  const renderEndClassAction = () => {
    return (
      <Button status="danger" onPress={handleEndClass}>
        End Class
      </Button>
    );
  };

  const handleCloseNotification = () => {
		if(isNotificationOn){
			setNotificationOn(false);
		}
    if(faceDetected){
			setFaceDetected(false);
		}
		if(studentDetected){
			setStudentDetected(false)
		}
		if(matric !== ""){
			setMatric("");
		}
  };

  const renderOverrideCard = () => {
    if (isSuccess) {
      return (
        <Card disabled={true} style={styles.card}>
          <Text category="h3" style={styles.text}>
            Override Attendance Successful
          </Text>
          <CheckIcon style={styles.icon} fill="#00B700" />
          <Divider />
          <Button onPress={handleCloseModal}>Okay</Button>
        </Card>
      );
    }

    if (isFail) {
      return (
        <Card disabled={true} style={styles.card}>
          <Text category="h3" style={styles.text}>
            Override Attendance Failed
          </Text>
          <Text category="p1" style={styles.text}>
            Please check student's matriculation number and try again.
          </Text>
          <CrossIcon style={styles.icon} fill="#FF0000" />
          <Divider />
          <Button onPress={handleCloseModal}>Okay</Button>
        </Card>
      );
    }

    if (endSuccess) {
      return (
        <Card disabled={true} style={styles.card}>
          <Text category="h3" style={styles.text}>
            Class Has Ended
          </Text>
          <Text category="p1" style={styles.text}>
            Thank you, see you next time!
          </Text>
          <CheckIcon style={styles.icon} fill="#00B700" />
          <Divider />
          <Button onPress={handleEndCloseModal}>Okay</Button>
        </Card>
      );
    }

    if (endFail) {
      return (
        <Card disabled={true} style={styles.card}>
          <Text category="h3" style={styles.text}>
            End Class Failed
          </Text>
          <Text category="p1" style={styles.text}>
            Please try again.
          </Text>
          <CrossIcon style={styles.icon} fill="#FF0000" />
          <Divider />
          <Button onPress={handleEndCloseModal}>Okay</Button>
        </Card>
      );
    }

    return (
      <Card disabled={true} style={styles.card}>
        <Text category="h3" style={styles.text}>
          Override Attendance
        </Text>
        <Input
          style={styles.input}
          placeholder="Enter Student's matriculation number"
          value={matric}
          onChangeText={(nextValue) => setMatric(nextValue)}
        />
        <Toggle style={styles.toggle} status="info" {...infoToggleState}>
          Late
        </Toggle>
        <Divider />
        <Button onPress={handleOverride}>Override</Button>
      </Card>
    );
  };

  const renderOverrideModal = () => {
    return (
      <Modal
        visible={isVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        {renderOverrideCard()}
      </Modal>
    );
  };

  const renderAttendanceNotificationCard = () => {
    if (faceDetected) {
      if (studentDetected) {
        return (
          <Card disabled={true} style={styles.card}>
            <Text category="h3" style={styles.text}>
              Hello, {matric}!
            </Text>
            <Text category="p1" style={styles.text}>
              Your attendance has been successfully taken.
            </Text>
            <CheckIcon style={styles.icon} fill="#00B700" />
            <Divider />
            <Button onPress={handleCloseNotification()}>Next</Button>
          </Card>
        );
      }
      return (
        <Card disabled={true} style={styles.card}>
          <Text category="h3" style={styles.text}>
            Face Not Recognized
          </Text>
          <Text category="p1" style={styles.text}>
            Please try again or contact your teacher to manually take your
            attendance.
          </Text>
          <CrossIcon style={styles.icon} fill="#FF0000" />
          <Divider />
          <Button onPress={handleCloseNotification()}>Next</Button>
        </Card>
      );
    }
    return (
      <Card disabled={true} style={styles.card}>
        <Text category="h3" style={styles.text}>
          No Face Detected
        </Text>
        <Text category="p1" style={styles.text}>
          Please posisition your face in front of the camera and try again.
        </Text>
        <CrossIcon style={styles.icon} fill="#FF0000" />
        <Divider />
        <Button onPress={handleCloseNotification()}>Next</Button>
      </Card>
    );
  };

  const renderAttendanceNotification = () => {
    return (
      <Modal
        visible={isNotificationOn}
        backdropStyle={styles.backdrop}
        onBackdropPress={handleCloseNotification()}
      >
        {renderAttendanceNotificationCard()}
      </Modal>
    );
  };

  const handleAttendancePicture = async (rawPicture) => {
    if (rawPicture === null) {
      console.log("Failed to take image");
    } else {
      const data = {
        session_id: id,
        raw_picture: rawPicture,
      };
      // const response = await axios.post(
      //   `${process.env.ENDPOINT}/teacher-api/take-attendance/`,
      //   data
      // );
      let detectedFace = true;
      //if (response.data.face_is_detected) {
      if (detectedFace) {
        setFaceDetected(true);
        // const studentMatric = response.data.matched_student;
        const studentMatric = "U17cccccH";
        if (studentMatric !== null) {
          setMatric(studentMatric);
          setStudentDetected(true);
        }
      }
      setNotificationOn(true);
    }
  };

  const renderCameraView = () => {
    if (hasPermission === null) {
      return <Text>Null access to camera</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={Camera.Constants.Type.front}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <View style={styles.cameraButtonBar}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={async () => {
                if (cameraRef) {
                  let picture = await cameraRef.takePictureAsync({
                    base64: true,
                  });
                  handleAttendancePicture(picture.base64);
                }
              }}
            >
              <View style={styles.outerButton}>
                <View style={styles.innerButton}></View>
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  };

  return (
    <React.Fragment>
      <TopNavigation
        accessoryLeft={renderOverrideAction}
        accessoryRight={renderEndClassAction}
      />
      <Divider />
      {renderOverrideModal()}
      {renderAttendanceNotification()}
      {renderCameraView()}
    </React.Fragment>
  );
}

var { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  icon: {
    width: 170,
    height: 170,
    alignSelf: "center",
    marginBottom: 20,
  },
  cameraButtonBar: {
    position: "absolute",
    height: 100,
    bottom: 0.05 * height,
    width: width,
  },
  captureButton: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  outerButton: {
    borderWidth: 5,
    borderRadius: 50,
    borderColor: "white",
    height: 70,
    width: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerButton: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 50,
    width: 50,
    backgroundColor: "white",
  },
});
