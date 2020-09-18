export function getSelectedCourse(item, courseList){
	let courseIndex;
	const description = item.description.split("/")
	const courseType = description[0]
	if(description.length >1){
		courseIndex = description[1]
	}
	
	const selectedItem = courseList.find(c => c.course_class.type === courseType && c.course_class.index === courseIndex)
	return selectedItem
}