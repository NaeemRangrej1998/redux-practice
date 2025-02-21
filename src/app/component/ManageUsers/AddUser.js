// import React, {useEffect, useState} from "react";
// import {Button, Col, Form, Modal, Spinner} from "react-bootstrap";
// import {Formik, Field, ErrorMessage} from 'formik';
// import {saveUser, updateUser} from "../../../service/user.api";
// import {getUserRoles} from "../../../service/role.api";
// import Select from "react-select";
//
// function AddUser(props) {
//     const {isOpen, toggleAddUser = () => {}, getAllSavedUsers = () => {}, selectedUser, isEditing,activeRole} = props
//     console.log({selectedUser,activeRole})
//
//     const selectedRole = isEditing
//         ? activeRole
//             .filter((item) => item.label === selectedUser.userRole)
//             .map((item) => ({ value: item.value, label: item.label }))
//         : [];
//     console.log({selectedRole});
//     return (
//         <div>
//             <Modal show={isOpen} aria-labelledby="contained-modal-title-vcenter" onHide={() => toggleAddUser} centered>
//                 <Modal.Header>
//                     <Modal.Title id="example-modal-sizes-title-sm">
//                         Add User
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Formik initialValues={{firstName: isEditing ? selectedUser.firstName: "", lastName: isEditing ? selectedUser.lastName: ""
//                     , email: isEditing ? selectedUser.email: "", password: isEditing ? selectedUser.password: "", roleId: isEditing ? selectedRole: ""}}
//                         validate={(values) => {
//                             const errors = {};
//                             if (!values.firstName) {
//                                 errors.firstName = "Required";
//                             }
//                             if (!values.lastName) {
//                                 errors.lastName = "Required";
//                             }
//                             if (!values.email) {
//                                 errors.email = "Required";
//                             } else if (
//                                 !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//                             ) {
//                                 errors.email = "Invalid email address";
//                             }
//                             if (!values.password) {
//                                 errors.password = "Required";
//                             }
//                             return errors;
//                         }}
//                         onSubmit={(values) => {
//                             let data = {
//                                 firstName: values.firstName,
//                                 lastName: values.lastName,
//                                 email: values.email,
//                                 password: values.password,
//                                 userRoleId: values.roleId,
//                             };
//                             if (isEditing){
//                                 data["id"]=selectedUser.id
//                             }
//                             let saveOrUpdateUserData = isEditing ? updateUser : saveUser
//                             saveOrUpdateUserData(data).then((res) => {
//                                 if (res.status && res.status == 200) {
//                                     toggleAddUser()
//                                     getAllSavedUsers()
//                                 } else throw res
//                             }).catch((error) => {
//                                 alert(error.response.data.error)
//                             })
//                         }}>
//                     {({
//                           values,
//                           errors,
//                           touched,
//                           handleChange,
//                           handleBlur,
//                           handleSubmit,
//                           setFieldValue,
//                           isValid,
//                           isSubmitting,
//                           dirty
//                       }) => (
//                         <form autoComplete="off"
//                               onSubmit={handleSubmit}>
//                             <Modal.Body
//                                 className="add-dashboard-modal-body">
//                                 <div className="row modal-formik-div">
//                                     <div className="col-md-12">
//                                         <Form.Group as={Col} className="modal-form-group">
//                                             <Form.Label className={"mt-4 label-required"}>
//                                                 First Name
//                                             </Form.Label>
//                                             <Form.Control
//                                                 required
//                                                 value={values.firstName}
//                                                 name={"firstName"}
//                                                 onChange={handleChange}
//                                                 type="text"
//                                             />
//                                             {touched.firstName && errors.firstName ? (
//                                                 <div className="error-message">
//                                                     {errors.firstName}
//                                                 </div>
//                                             ) : null}
//                                         </Form.Group>
//                                         <Form.Group as={Col} className="modal-form-group">
//                                             <Form.Label className={"mt-4 label-required"}>
//                                                 Last Name
//                                             </Form.Label>
//                                             <Form.Control
//                                                 required
//                                                 value={values.lastName}
//                                                 name={"lastName"}
//                                                 onChange={handleChange}
//                                                 type="text"
//                                             />
//                                             {touched.lastName && errors.lastName ? (
//                                                 <div className="error-message">
//                                                     {errors.lastName}
//                                                 </div>
//                                             ) : null}
//                                         </Form.Group>
//                                         <Form.Group as={Col} className="modal-form-group">
//                                             <Form.Label className={"mt-4 label-required"}>
//                                                 Email
//                                             </Form.Label>
//                                             <Form.Control
//                                                 required
//                                                 value={values.email}
//                                                 name={"email"}
//                                                 onChange={handleChange}
//                                                 type="email"
//                                             />
//                                             {touched.email && errors.email ? (
//                                                 <div className="error-message">
//                                                     {errors.email}
//                                                 </div>
//                                             ) : null}
//                                         </Form.Group>
//                                         <Form.Group as={Col} className="modal-form-group">
//                                             <Form.Label className={"mt-4 label-required"}>
//                                                 Password
//                                             </Form.Label>
//                                             <Form.Control
//                                                 required
//                                                 value={values.password}
//                                                 name={"password"}
//                                                 onChange={handleChange}
//                                                 type="password"
//                                             />
//                                             {touched.password && errors.password ? (
//                                                 <div className="error-message">
//                                                     {errors.password}
//                                                 </div>
//                                             ) : null}
//                                         </Form.Group>
//                                         <Form.Group as={Col} className="modal-form-group">
//                                             <Form.Label className="mt-4 label-required">Role</Form.Label>
//                                             {/*<Form.Select*/}
//                                             {/*    required*/}
//                                             {/*    value={values.roleId}*/}
//                                             {/*    name="roleId"*/}
//                                             {/*    onChange={handleChange}*/}
//                                             {/*>*/}
//                                             {/*    <option value="" disabled>*/}
//                                             {/*        Select Role*/}
//                                             {/*    </option>*/}
//                                             {/*    {roles.map((role) => (*/}
//                                             {/*        <option key={role.id} value={role.id}>*/}
//                                             {/*            {role.roleName}*/}
//                                             {/*        </option>*/}
//                                             {/*    ))}*/}
//                                             {/*</Form.Select>*/}
//                                             <Select
//                                                 options={activeRole} // Available permissions
//                                                 isMulti
//                                                 value={values.roleId} // Show only for edit
//                                                 onChange={selected => setFieldValue("roleId", selected)}
//                                             />
//                                             {touched.roleId && errors.roleId ? (
//                                                 <div className="error-message">{errors.roleId}</div>
//                                             ) : null}
//                                         </Form.Group>
//                                         {/*<Form.Group>*/}
//                                         {/*    <Form.Label>Role Name</Form.Label>*/}
//                                         {/*    <Form.Select aria-label="Default select example">*/}
//                                         {/*        <option>Open this select menu</option>*/}
//                                         {/*        <option value="1">One</option>*/}
//                                         {/*        <option value="2">Two</option>*/}
//                                         {/*        <option value="3">Three</option>*/}
//                                         {/*    </Form.Select>*/}
//                                         {/*</Form.Group>*/}
//                                         {/*<Field*/}
//                                         {/*    type="text"*/}
//                                         {/*    name="firstName"*/}
//                                         {/*    placeholder="Enter your firstName"*/}
//                                         {/*/>*/}
//                                         {/*<ErrorMessage name="firstName" component="div"/>*/}
//                                         {/*<Field*/}
//                                         {/*    type="text"*/}
//                                         {/*    name="lastName"*/}
//                                         {/*    placeholder="Enter your lastName"*/}
//                                         {/*/>*/}
//                                         {/*<ErrorMessage name="lastName" component="div"/>*/}
//                                         {/*<Field*/}
//                                         {/*    type="email"*/}
//                                         {/*    name="email"*/}
//                                         {/*    placeholder="Enter email address"*/}
//                                         {/*/>*/}
//                                         {/*<ErrorMessage name="email" component="div"/>*/}
//
//                                         {/*<Field type="password" name="password"/>*/}
//                                         {/*<ErrorMessage name="password" component="div"/>*/}
//                                     </div>
//                                 </div>
//
//                             </Modal.Body>
//
//                             <Modal.Footer>
//                                 <Button variant="secondary" onClick={toggleAddUser}>
//                                     Close
//                                 </Button>
//                                 <Button variant="primary" type="submit">
//                                     Save User
//                                 </Button>
//                             </Modal.Footer>
//                         </form>
//                     )}
//                 </Formik>
//                 <Modal.Body></Modal.Body>
//
//             </Modal>
//         </div>
//     )
// }
//
// export default AddUser
import React, {useState} from "react";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {Formik} from 'formik';
import {saveUser, updateUser} from "../../../service/user.api";
import Select from "react-select";
import showNotification from "../../../shared/helper/notification";

function AddUser(props) {
    const {isOpen, toggleAddUser, getAllSavedUsers, selectedUser, isEditing, activeRole} = props;

    // Manually setting the selectedRole to ensure it's set before Formik initializes
    const selectedRole = isEditing
        ? activeRole.filter((item) => item.label === selectedUser.userRole)
        : [];

    return (
        <Modal show={isOpen} onHide={toggleAddUser} centered>
            <Modal.Header>
                <Modal.Title>
                    {isEditing ? "Edit User" : "Add User"}
                </Modal.Title>
            </Modal.Header>
            <Formik
                enableReinitialize // Ensures Formik updates when props change
                initialValues={{
                    firstName: isEditing ? selectedUser.firstName : "",
                    lastName: isEditing ? selectedUser.lastName : "",
                    email: isEditing ? selectedUser.email : "",
                    password: isEditing ? selectedUser.password : "",
                    roleId: isEditing ? selectedRole : [],
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.firstName) errors.firstName = "Required";
                    if (!values.lastName) errors.lastName = "Required";
                    if (!values.email) {
                        errors.email = "Required";
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = "Invalid email address";
                    }
                    if (!values.password && !isEditing) errors.password = "Required";
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    console.log({values})
                    let data = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password,
                        userRoleId: values.roleId.value
                            // .map(role => role.value)[0] || null // Extracts first value

                    };
                    if (isEditing) {
                        data["id"] = selectedUser.id;
                    }
                    let saveOrUpdateUserData = isEditing ? updateUser : saveUser;
                    saveOrUpdateUserData(data)
                        .then((res) => {
                            if (res.status === 200) {
                                toggleAddUser();
                                getAllSavedUsers();
                            } else {
                                throw res;
                            }
                        })
                        .catch((error) => {
                            showNotification(error.response?.data?.error || "An error occurred",'error');
                        })
                        .finally(() => setSubmitting(false));
                }}
            >
                {({values, errors, touched, handleChange, handleSubmit, setFieldValue}) => (
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-md-12">
                                    <Form.Group as={Col}>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            value={values.firstName}
                                            name="firstName"
                                            onChange={handleChange}
                                            type="text"
                                        />
                                        {touched.firstName && errors.firstName && (
                                            <div className="error-message">{errors.firstName}</div>
                                        )}
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            value={values.lastName}
                                            name="lastName"
                                            onChange={handleChange}
                                            type="text"
                                        />
                                        {touched.lastName && errors.lastName && (
                                            <div className="error-message">{errors.lastName}</div>
                                        )}
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            value={values.email}
                                            name="email"
                                            onChange={handleChange}
                                            type="email"
                                        />
                                        {touched.email && errors.email && (
                                            <div className="error-message">{errors.email}</div>
                                        )}
                                    </Form.Group>
                                    {!isEditing ? (<Form.Group as={Col}>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            value={values.password}
                                            name="password"
                                            onChange={handleChange}
                                            type="password"
                                            disabled={isEditing} // Prevents password update during edit
                                        />
                                        {touched.password && errors.password && (
                                            <div className="error-message">{errors.password}</div>
                                        )}
                                    </Form.Group>) : ("")}
                                    <Form.Group as={Col}>
                                        <Form.Label>Role</Form.Label>
                                        <Select
                                            options={activeRole}
                                            isMulti={false}
                                            value={values.roleId}
                                            onChange={selected => setFieldValue("roleId", selected)} // Store only the selected object
                                        />
                                        {touched.roleId && errors.roleId && (
                                            <div className="error-message">{errors.roleId}</div>
                                        )}
                                    </Form.Group>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={toggleAddUser}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                {isEditing ? "Update User" : "Save User"}
                            </Button>
                        </Modal.Footer>
                    </form>
                )}
            </Formik>
        </Modal>
    );
}

export default AddUser;
