//Access Browser onload event
window.addEventListener('load',()=>{
    
    //call refresh function
    refreshAll();
    
});

// ********* LISTENERS *********
// selectStudent
// selectCourse
// textFee
// btnReset
// btnAdd
// selectStudentSearch
// selectCourseSearch
// btnSearch

const courseFeePattern= '^([0-9]{3,5}[.][0-9]{2})$';

selectStudent.addEventListener('change',()=>{
    selectDFieldValidator(selectStudent,'enroll','studentId');
});

selectCourse.addEventListener('change',()=>{
    selectDFieldValidator(selectCourse,'enroll','courseId');
    getDefaultFee(selectCourse);
});

textFee.addEventListener('keyup',()=>{
    textFieldValidator(textFee,courseFeePattern,'enroll','fee');
});

selectStudentSearch.addEventListener('change',()=>{
    selectDFieldValidator(selectStudentSearch,'enrolled','studentId');
});

selectCourseSearch.addEventListener('change',()=>{
    selectDFieldValidator(selectCourseSearch,'enrolled','courseId');
});

btnAdd.addEventListener('click',()=>{
    addEnroll();
});

btnUpdate.addEventListener('click',()=>{
    updateEnroll();
});

btnReset.addEventListener('click',()=>{
    refreshEnrollForm();
});

btnSearch.addEventListener('click',()=>{
    search();
});


// ********* RESET *********

const refreshAll=()=>{
    //Call table object refresh function
    refreshTableObjects();

    //Call form refresh function
    refreshEnrollForm();
}

//function for refresh form area
const refreshEnrollForm=()=>{
    //create empty student object
    enroll = {};
    enroll.userId = {
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
          active: true
        }
    }

    //get data for dynamic lists
    // students = [{id:1,fullName:'Kasun'},{id:2,fullName:'Damitha'},{id:3,fullName:'Nimal'}];
    students = ajaxGetRequest("/student/findall");
    fillDataIntoSelect(selectStudent,'Select Student',students,'fullName');
    fillDataIntoSelect(selectStudentSearch,'Select Student',students,'fullName');

    // course = [{id:1,name:'Grade 9'},{id:2,name:'Grade 10'},{id:3,name:'Grade 11'}];
    courses = ajaxGetRequest("/course/findall");
    fillDataIntoSelect(selectCourse,'Select Course',courses, 'gradeId.name,subjectId.name');
    fillDataIntoSelect(selectCourseSearch,'Select Course',courses, 'gradeId.name,subjectId.name');

    //reset elements
    textFee.value = '';
    textFee.style.border = '1px solid #ced4da';
    selectStudent.style.border = '1px solid #ced4da';
    selectCourse.style.border = '1px solid #ced4da';
    
}

//function for refresh table record
const refreshTableObjects = ()=>{
    enrolled = {};
    enrolled.studentId = {id:null};
    enrolled.courseId =  {id:null};
    selectStudentSearch.style.border = '1px solid #ced4da';
    selectCourseSearch.style.border = '1px solid #ced4da';
}

// ********* FORM OPERATIONS *********

//load default course fee
const getDefaultFee=(fieldId)=>{
    const fieldValue = fieldId.value;
    let defaultFee = JSON.parse(fieldValue).defaultFee;
    textFee.value = defaultFee + '.00';
    enroll.fee = defaultFee+'.00';
    textFee.style.border = '2px solid green';
}

const checkErrors = ()=>{
    //need to check all required property fields
    let error = '';
    if(enroll.studentId == null){
        error = error+'Please Select Student...!\n';
        selectStudent.style.border = '2px solid red';
    }
    if(enroll.courseId == null){
        error = error+'Please Select Class...!\n';
        selectCourse.style.border = '2px solid red';
    }
    if(enroll.fee == null){
        error = error+'Please Enter Fee...!\n';
    }

    return error;   
}

const checkUpdates =()=>{
    let updates = "";

    if(oldenroll.fee != enroll.fee){
        updates = updates + "Fee has changed \n";
    }

    console.log(oldenroll.courseId.id + '---'+enroll.courseId.id);
    if(oldenroll.courseId.id != enroll.courseId.id){
        updates = "not";
    }

    console.log(oldenroll.studentId.id + '---'+enroll.studentId.id);
    if(oldenroll.studentId.id != enroll.studentId.id){
        updates = "not";
    }

    return updates;
}

const addEnroll = ()=>{
    //1. need to check form errors ---> checkError() 
    let formErrors = checkErrors();
    if(formErrors == ''){
        // alert('No errors!');
        //2. need to get user confirmation
        let userConfirm = window.confirm('Are you sure to add following student..?\n'
                                        + '\n'+enroll.studentId.fullName
                                        +' to '+enroll.courseId.gradeId.name+' - '+enroll.courseId.subjectId.name + ' Class'
                                        + '\n'+'Class Fee (RS.) '+enroll.fee
                                        );

        if(userConfirm){
        //3. pass data into back end
            let serverResponse = ajaxRequestBody("/enroll","POST",enroll); // url,method,object
        
            //4. check back end response
            if(serverResponse == "OK"){
                alert('Save sucessfully..! '+serverResponse);
                //Call refresh function
                refreshAll();
            }else{
                alert('Save not sucessfully..! have some errors \n'+serverResponse);
            }
        }
        
    }else{
        alert('Error\n' + formErrors);
    }
}

const updateEnroll = () =>{
    let errors =  checkErrors();
    if(errors == ""){
        let updates = checkUpdates();
        if(updates != ""){
            if(updates != "not"){
                let userConfirm = confirm("Are you sure to update following changes...?\n"+updates);
                if(userConfirm){
                    let updateSeriveResponse = ajaxRequestBody("/enroll","PUT",enroll);
                    if(updateSeriveResponse == "OK"){
                        alert('Update sucessfully..! ');
                        refreshAll();
                    }else{
                        alert('Update not sucessfully..! have some errors \n'+updateSeriveResponse);
                    }
                }
            }else{
                alert("Cannot Change Student or Class! \nYou can update only fee to relevent class");
            }
        }else{
            alert("Nothing to Update...!");
        }
    }else{
        alert("form has following errors \n"+errors);
    }
}

// ********* TABLE OPERATIONS *********

const search = ()=>{
    let enrolledData ='';
    tblEnrollClass.style.display = '';
    tblEnrollStudent.style.display = '';
    if(enrolled.studentId.id != null){
        enrolledData = ajaxGetRequest("/enroll/findCoursesByStudent/"+enrolled.studentId.id);
        //object count = table column count
        //String - number/string/date
        //function - object/array/boolean 
        const displayProperty = [   {property:getCourseName,datatype:'function'},
                                    {property:getDate,datatype:'function'} ]


        //call the function (tableID,dataList,display property list, refill function name, delete function name, print function name, button visibilitys)
        fillDataIntoTable(tblEnrollClass,enrolledData,displayProperty,refillEnroll,deleteEnroll,printEnroll,true);
        tblEnrollStudent.style.display = 'none';

    }else if(enrolled.courseId.id != null){
        enrolledData = ajaxGetRequest("/enroll/findstudentsBycourse/"+enrolled.courseId.id);
        const displayProperty = [   {property:getStudentName,datatype:'function'},
                                    {property:getDate,datatype:'function'} ]


        //call the function (tableID,dataList,display property list, refill function name, delete function name, print function name, button visibilitys)
        fillDataIntoTable(tblEnrollStudent,enrolledData,displayProperty,refillEnroll,deleteEnroll,printEnroll,true);
        tblEnrollClass.style.display = 'none';
    }  
}

const getCourseName=(rowObject)=>{
    return rowObject.courseId.gradeId.name + ' - ' + rowObject.courseId.subjectId.name;
}

const getDate=(rowObject)=>{
    return rowObject.date.substr(0,9); //ex - 2023-12-12T10:30:00 --> 2023-12-12
}

const getStudentName = (rowObject) =>{
    return rowObject.studentId.fullName;
}

const refillEnroll = (rowObject,rowId)=>{
    refreshEnrollForm();
    enroll = JSON.parse(JSON.stringify(rowObject));
    oldenroll = JSON.parse(JSON.stringify(rowObject));

    textFee.value = enroll.fee+'.00';

    // Select Student
    fillDataIntoSelect(selectStudent,'Select Student',students,'fullName',enroll.studentId.fullName);
    
    // Select Course
    fillDataIntoSelect(selectCourse,'Select Course',courses,'gradeId.name,subjectId.name',enroll.courseId.gradeId.name + ' - ' + enroll.courseId.subjectId.name);
}

const deleteEnroll = (rowObject,rowId)=>{
    let obj = '';
    if(tblEnrollClass.style.display != 'none'){
        obj = rowObject.courseId.gradeId.name + ' - ' + rowObject.courseId.subjectId.name;
    }else{
        obj = rowObject.studentId.fullName;
    }
    
    const userConfirm = confirm('Are you sure to delete following record, \n'+obj);

    if(userConfirm){
        //response from backend ...
        let serverResponse = ajaxRequestBody("/enroll","DELETE",rowObject); // url,method,object
            //4. check back end response
            if(serverResponse == "OK"){
                alert('Delete sucessfully..! \n'+serverResponse);
                refreshAll();
            }else{
                alert('Delete not sucessfully..! have some errors \n'+serverResponse);
            }
    }
}

const printEnroll = (rowObject,rowId)=>{
    
}