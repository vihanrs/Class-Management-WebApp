//Access Browser onload event
window.addEventListener('load',()=>{
    
    //call refresh function
    refreshAll();
    
});

// ********* LISTENERS *********
// textCallingName
// textFullName
// radioGenderMale
// radioGenderFemale
// dateDOB
// textMobileNo
// textOtherContact

const fullNamePattern= '^(([A-Z][a-z]{3,20}[\\s])+([A-Z][a-z]{3,20}){1})$';
const mobileNoPattern= '^[0][7][01245678][0-9]{7}$';

textFullName.addEventListener('keyup',()=>{
    textFieldValidator(textFullName,fullNamePattern,'student','fullName');
    generateCallingNameValues(textFullName,'callingname');
});

textCallingName.addEventListener('change',()=>{
    callingNameValidator(textCallingName,'student',"callingName");
});

textCallingName.addEventListener('keyup',()=>{
    callingNameValidator(textCallingName,'student',"callingName");
});

radioGenderMale.addEventListener('change',()=>{
    radioFieldValidator(radioGenderMale,'student','gender');
});

radioGenderFemale.addEventListener('change',()=>{
    radioFieldValidator(radioGenderFemale,'student','gender');
});

dateDOB.addEventListener('change',()=>{
    dateFieldValidator(dateDOB,'student','dob');
});

textMobileNo.addEventListener('keyup',()=>{
    textFieldValidator(textMobileNo,mobileNoPattern,'student','contact');
});

textOtherContact.addEventListener('keyup',()=>{
    textFieldValidator(textOtherContact,mobileNoPattern,'student','contactTwo');
});

btnReset.addEventListener('click',()=>{
    refreshStudentForm();
});

btnUpdate.addEventListener('click',()=>{
    updateCourse();
});

btnAdd.addEventListener('click',()=>{
    addCourse();
});

// ********* RESET *********

const refreshAll=()=>{
    //Call table refresh function
    refreshStudentTable();
    //Call form refresh function
    refreshStudentForm();
}
//function for refresh form area
const refreshStudentForm=()=>{
    //create empty student object
    student = {};
    student.userId = {
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

    //set elements empty
    textCallingName.value = '';
    textFullName.value = '';
    radioGenderMale.checked = false;
    radioGenderFemale.checked = false;
    dateDOB.value = '';
    textMobileNo.value = '';
    textOtherContact.value = '';

    textCallingName.style.border = '1px solid #ced4da';
    textFullName.style.border = '1px solid #ced4da';
    dateDOB.style.border = '1px solid #ced4da';
    textMobileNo.style.border = '1px solid #ced4da';
    textOtherContact.style.border = '1px solid #ced4da';
}

//function for refresh table record
const refreshStudentTable = ()=>{
    //create array for store employee data list

    students = ajaxGetRequest("/student/findall");

    //object count = table column count
    //String - number/string/date
    //function - object/array/boolean 
    const displayProperty = [   {property:'callingName',datatype:'String'},
                                {property:'contact',datatype:'String'},
                                {property:'contactTwo',datatype:'String'} ]
    
    
    //call the function (tableID,dataList,display property list, refill function name, delete function name, print function name, button visibilitys)
    fillDataIntoTable(tblStudents,students,displayProperty,refillStudent,deleteStudent,printStudent,true);

}

// ********* TABLE OPERATIONS *********
//delete course record function
const deleteStudent = (rowObject,rowId) =>{
    const userConfirm = confirm('Are you sure to delete following student \n'+rowObject.callingName);

    if(userConfirm){
        //response from backend ...
        let serverResponse = ajaxRequestBody("/student","DELETE",rowObject); // url,method,object
            //4. check back end response
            if(serverResponse == "OK"){
                alert('Delete sucessfully..! \n'+serverResponse);
                //call refresh function
                refreshAll();
            }else{
                alert('Save not sucessfully..! have some errors \n'+serverResponse);
            }
    }
}

//create refill function
const refillStudent=(rowObject,rowId)=>{
    student = JSON.parse(JSON.stringify(rowObject));
    oldstudent = JSON.parse(JSON.stringify(rowObject));

    textFullName.value = student.fullName;
    generateCallingNameValues(textFullName,'callingname');
    textCallingName.value = student.callingName;
    dateDOB.value = student.dob;
    textMobileNo.value = student.contact;
    textOtherContact.value = student.contactTwo;
    
    if(student.gender == 'Male'){
        radioGenderMale.checked = true;
    }else{
        radioGenderFemale.checked = true;
    }
    
}

//create print function
const printStudent=(ob,rowId)=>{
    
}

// ********* FORM OPERATIONS *********
const checkErrors = ()=>{
    //need to check all required property fields

    let error = '';
    if(student.fullName == null){
        error = error+'Please Enter Full Name...!\n';
        textFullName.style.border = '2px solid red';
    }
    if(student.callingName == null){
        error = error+'Please Enter Calling Name...!\n';
        textCallingName.style.border = '2px solid red';
    }
    if(student.gender == null){
        error = error+'Please Select Gender...!\n';
    }
    if(student.dob == null){
        error = error+'Please Enter Date of Birth...!\n';
        dateDOB.style.border = '2px solid red';
    }
    if(student.contact == null){
        error = error+'Please Enter Mobile No...!\n';
        textMobileNo.style.border = '2px solid red';
    }

    return error;   
}

const checkUpdates =()=>{
    let updates = "";

    if(oldstudent.fullName != student.fullName){
        updates = updates + "Full Name has changed \n";
    }

    if(oldstudent.callingName != student.callingName){
        updates = updates + "Calling Name has changed \n";
    }

    if(oldstudent.gender != student.gender){
        updates = updates + "Gender has changed \n";
    }
    
    if(oldstudent.dob != student.dob){
        updates = updates + "Date Of Birth has changed \n";
    }

    if(oldstudent.contact != student.contact){
        updates = updates + "Mobile No has changed \n";
    }

    if(oldstudent.contactTwo != student.contactTwo){
        updates = updates + "Other Contact No has changed \n";
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
                                        + '\nFull Name : '+student.fullName
                                        + '\nCalling Name : '+student.callingName
                                        + '\nGender : '+student.gender
                                        + '\nDate of Birth : '+student.dob
                                        + '\nMobile No : '+student.contact);

        if(userConfirm){
        //3. pass data into back end
            let serverResponse = ajaxRequestBody("/student","POST",student); // url,method,object
        
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

const updateCourse = () =>{
    let errors =  checkErrors();
    if(errors == ""){
        let updates = checkUpdates();
        if(updates != ""){
            let userConfirm = confirm("Are you sure to update following changes...?\n"+updates);
            if(userConfirm){
                let updateSeriveResponse = ajaxRequestBody("/student","PUT",student);
                if(updateSeriveResponse == "OK"){
                    alert('Update sucessfully..! ');
                    //Call refresh function
                    refreshAll();
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


