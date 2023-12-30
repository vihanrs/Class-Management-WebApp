//Access Browser onload event
window.addEventListener('load',()=>{
    
    //Call table refresh function
    refreshCourseTable();

    //Call form refresh function
    refreshCourseForm();
});

// ********* LISTENERS *********
const courseTimePattern= '^([0-9]{2}[:][0-9]{2}[\\s][A,P][M])$';
const courseFeePattern= '^([0-9]{3,5}[.][0-9]{2})$';

selectGrade.addEventListener('change',()=>{
    selectDFieldValidator(selectGrade,'course','gradeId');
});

selectSubject.addEventListener('change',()=>{
    selectDFieldValidator(selectSubject,'course','subjectId');
});

selectDay.addEventListener('change',()=>{
    selectFieldValidator(selectDay,'course','defaultDay');
});

textCourseTimeFrom.addEventListener('keyup',()=>{
    textFieldValidator(textCourseTimeFrom,courseTimePattern,'course','fromTime');
});

textCourseTimeTo.addEventListener('keyup',()=>{
    textFieldValidator(textCourseTimeTo,courseTimePattern,'course','toTime');
});

textFee.addEventListener('keyup',()=>{
    textFieldValidator(textFee,courseFeePattern,'course','defaultFee');
});

checkboxFixedTime.addEventListener('change',()=>{
    checkBoxValidator(checkboxFixedTime,'course','hasFixedTime',true,false,labelCBFixedTime,'Fixed Time','Non-Fixed Time');
});

btnReset.addEventListener('click',()=>{
    refreshCourseForm();
});

btnUpdate.addEventListener('click',()=>{
    updateCourse();
});

btnAdd.addEventListener('click',()=>{
    addCourse();
});

// ********* RESET *********
//function for refresh form area
const refreshCourseForm=()=>{
    //create empty course object
    course = {};
    course.hasFixedTime = true;
    course.userId = {
        id: 1,
        firstName: "vihan",
        lastName: "rojitha",
        gender: "male",
        contact: "0716024065",
        email: "vihanvrs@gmail.com",
        addedDateTime: "2023-10-21T14:36:12",
        lastUpdatedDateTime: null,
        deletedDateTime: null,
        role_id: {
          id: 1,
          name: "Admin",
        }
    }

    //get data for dynamic lists
    // grades = [{id:1,name:'Grade 9'},{id:2,name:'Grade 10'},{id:3,name:'Grade 11'}];
    grades = ajaxGetRequest("/grade/findall");
    fillDataIntoSelect(selectGrade,'Select Grade',grades,'name');

    // subjects = [{id:1,name:'English'},{id:2,name:'Sinhala'},{id:3,name:'Math'}];
    subjects = ajaxGetRequest("/subject/findall");
    fillDataIntoSelect(selectSubject,'Select Subject',subjects,'name');

    //reset elements
    selectDay.value = '';
    textCourseTimeFrom.value = '';
    textCourseTimeTo.value = '';
    textFee.value = '';
    checkboxFixedTime.checked = true;
    labelCBFixedTime.innerText = 'Fixed Time';

    selectGrade.style.border = '1px solid #ced4da';
    selectSubject.style.border = '1px solid #ced4da';
    selectDay.style.border = '1px solid #ced4da';
    textCourseTimeFrom.style.border = '1px solid #ced4da';
    textCourseTimeTo.style.border = '1px solid #ced4da';
    textFee.style.border = '1px solid #ced4da';
}

//function for refresh table record
const refreshCourseTable = ()=>{
    //create array for store course data list
    courses = ajaxGetRequest("/course/findall");

    //object count = table column count
    //String - number/string/date
    //function - object/array/boolean 
    const displayProperty = [   {property:getGrade,datatype:'function'},
                                {property:getSubject,datatype:'function'} ]
    
    
    //call the function (tableID,dataList,display property list, refill function name, delete function name, print function name, button visibilitys)
    fillDataIntoTable(tblCourses,courses,displayProperty,refillCourse,deleteCourse,printCourse,true);

}

const getGrade=(rowObject)=>{
    return rowObject.gradeId.name;
}

const getSubject=(rowObject)=>{
    return rowObject.subjectId.name;
}

// ********* TABLE OPERATIONS *********

//delete course record function
const deleteCourse = (rowObject,rowId) =>{
    const userConfirm = confirm('Are you sure to delete following class \n'+rowObject.gradeId.name+' - '+rowObject.subjectId.name);

    if(userConfirm){
        //response from backend ...
        let serverResponse = ajaxRequestBody("/course","DELETE",rowObject); // url,method,object
            //4. check back end response
            if(serverResponse == "OK"){
                alert('Delete sucessfully..! \n'+serverResponse);
                //Call table refresh function
                refreshCourseTable();

                //Call form refresh function
                refreshCourseForm();
            }else{
                alert('Delete not sucessfully..! have some errors \n'+serverResponse);
            }
    }
}

//create refill function
const refillCourse=(rowObject,rowId)=>{
    course = JSON.parse(JSON.stringify(rowObject));
    oldcourse = JSON.parse(JSON.stringify(rowObject));

    selectDay.value = course.defaultDay;
    textCourseTimeFrom.value = course.fromTime;
    textCourseTimeTo.value = course.toTime;
    textFee.value = course.defaultFee;

    if(course.hasFixedTime){
        checkboxFixedTime.checked = true;
        labelCBFixedTime.innerText = 'Fixed Time';
    }else{
        checkboxFixedTime.checked = false;
        labelCBFixedTime.innerText = 'Non-Fixed Time';
    }

    // Select Grade
    fillDataIntoSelect(selectGrade,'Select Grade',grades,'name',course.gradeId.name);
    
    // Select Subject
    fillDataIntoSelect(selectSubject,'Select Subject',subjects,'name',course.subjectId.name);
}

//create print function
const printCourse=(ob,rowId)=>{
    
}

// ********* FORM OPERATIONS *********

const checkErrors = ()=>{
    //need to check all required property fields
    let error = '';
    if(course.gradeId == null){
        error = error+'Please Select Grade...!\n';
        selectGrade.style.border = '2px solid red';
    }
    if(course.subjectId == null){
        error = error+'Please Select Subject...!\n';
        selectSubject.style.border = '2px solid red';
    }
    if(course.defaultDay == null){
        error = error+'Please Select Day...!\n';
        selectDay.style.border = '2px solid red';
    }
    // if(course.fromTime == null){
    //     error = error+'Please Enter From time...!\n';
    //     textCourseTimeFrom.style.border = '2px solid red';
    // }
    // if(course.toTime == null){
    //     error = error+'Please Enter To time...!\n';
    //     textCourseTimeTo.style.border = '2px solid red';
    // }
    if(course.defaultFee == null){
        error = error+'Please Enter Fee...!\n';
        textFee.style.border = '2px solid red';
    }

    return error;   
}

const checkUpdates =()=>{
    let updates = "";

    if(oldcourse.gradeId.name != course.gradeId.name){
        updates = updates + "Grade has changed \n";
    }

    if(oldcourse.subjectId.name != course.subjectId.name){
        updates = updates + "Subject has changed \n";
    }

    if(oldcourse.defaultDay != course.defaultDay){
        updates = updates + "Class Day has changed \n";
    }

    if(oldcourse.fromTime != course.fromTime || oldcourse.toTime != course.toTime){
        updates = updates + "Class Time has changed \n";
    }

    if(oldcourse.defaultFee != course.defaultFee){
        updates = updates + "Class Fee has changed \n";
    }

    if(oldcourse.hasFixedTime != course.hasFixedTime){
        updates = updates + "Fixed Time has changed \n";
    }

    return updates;
}

const addCourse = ()=>{
    //1. need to check form errors ---> checkError() 
    let formErrors = checkErrors();
    if(formErrors == ''){
        // alert('No errors!');
        //2. need to get user confirmation
        let userConfirm = window.confirm('Are you sure to add following course..?\n'
                                        + '\nGrade : '+course.gradeId.name 
                                        + '\nSubject : '+course.subjectId.name
                                        + '\nClass Day : '+course.defaultDay
                                        + '\nFrom : '+course.fromTime
                                        + '\nTo : '+course.toTime
                                        + '\nFee : '+course.defaultFee
                                        + '\nFixed Date : '+course.hasFixedTime);

        if(userConfirm){
        //3. pass data into back end
            let serverResponse = ajaxRequestBody("/course","POST",course); // url,method,object
        
            //4. check back end response
            if(serverResponse == "OK"){
                alert('Save sucessfully..! '+serverResponse);
                //Call table refresh function
                refreshCourseTable();

                //Call form refresh function
                refreshCourseForm();
            }else{
                alert('Save not sucessfully..! have some errors \n'+serverResponse);
            }
        }
        
    }else{
        alert('Error\n' + formErrors);
    }
}

const updateCourse = () =>{
    let errors =  checkErrors();
    if(errors == ""){
        let updates = checkUpdates();
        if(updates != ""){
            let userConfirm = confirm("Are you sure to update following changes...?\n"+updates);
            if(userConfirm){
                let updateSeriveResponse = ajaxRequestBody("/course","PUT",course);
                if(updateSeriveResponse == "OK"){
                    alert('Update sucessfully..! ');
                    //Call table refresh function
                    refreshCourseTable();

                    //Call form refresh function
                    refreshCourseForm();
                }else{
                    alert('Update not sucessfully..! have some errors \n'+updateSeriveResponse);
                }
            }
        }else{
            alert("Nothing to Update...!");
        }
    }else{
        alert("form has following errors \n"+errors);
    }
}


