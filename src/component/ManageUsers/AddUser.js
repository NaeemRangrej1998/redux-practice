import React from 'react'
import {Button, Col, Form, Modal, Spinner} from "react-bootstrap";

import {Formik, Field, ErrorMessage} from 'formik';
import {getAllUsers, saveUser} from "../../service/user.api";

function AddUser(props) {
    const { isOpen, toggleAddUser = () => {} ,getAllSavedUsers=()=>{}}=props
    return (
        <div>
            <Modal show={isOpen} aria-labelledby="contained-modal-title-vcenter" onHide={() => toggleAddUser} centered>
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Small Modal
                    </Modal.Title>
                </Modal.Header>
                <Formik initialValues={{firstName: "", lastName: "", email: "", password: "", roleId: ""}}
                        validate={(values) => {
                            const errors = {};
                            if (!values.firstName) {
                                errors.firstName = "Required";
                            }
                            if (!values.lastName) {
                                errors.lastName = "Required";
                            }
                            if (!values.email) {
                                errors.email = "Required";
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = "Invalid email address";
                            }
                            if (!values.password) {
                                errors.password = "Required";
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            let data = {
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                                password: values.password,
                                roleId: values.roleId,
                            };
                            saveUser(data).then((res)=>{
                                if (res.status && res.status==200){
                                    toggleAddUser()
                                    getAllSavedUsers()
                                    console.log("save",res)
                                }
                            }).catch((error)=>{
                                alert(error.messages)
                            })
                            console.log({values});
                        }}>
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isValid,
                          isSubmitting,
                          dirty
                      }) => (
                        <form autoComplete="off"
                              onSubmit={handleSubmit}>
                            <Modal.Body
                                className="add-dashboard-modal-body">
                                <div className="row modal-formik-div">
                                    <div className="col-md-12">
                                        <Form.Group as={Col} className="modal-form-group">
                                            <Form.Label className={"mt-4 label-required"}>
                                                First Name
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                value={values.firstName}
                                                name={"firstName"}
                                                onChange={handleChange}
                                                type="text"
                                            />
                                            {touched.firstName && errors.firstName ? (
                                                <div className="error-message">
                                                    {errors.firstName}
                                                </div>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group as={Col} className="modal-form-group">
                                            <Form.Label className={"mt-4 label-required"}>
                                                Last Name
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                value={values.lastName}
                                                name={"lastName"}
                                                onChange={handleChange}
                                                type="text"
                                            />
                                            {touched.lastName && errors.lastName ? (
                                                <div className="error-message">
                                                    {errors.lastName}
                                                </div>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group as={Col} className="modal-form-group">
                                            <Form.Label className={"mt-4 label-required"}>
                                               Email
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                value={values.email}
                                                name={"email"}
                                                onChange={handleChange}
                                                type="email"
                                            />
                                            {touched.email && errors.email ? (
                                                <div className="error-message">
                                                    {errors.email}
                                                </div>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group as={Col} className="modal-form-group">
                                            <Form.Label className={"mt-4 label-required"}>
                                                Password
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                value={values.password}
                                                name={"password"}
                                                onChange={handleChange}
                                                type="password"
                                            />
                                            {touched.password && errors.password ? (
                                                <div className="error-message">
                                                    {errors.password}
                                                </div>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group as={Col} className="modal-form-group">
                                            <Form.Label className={"mt-4 label-required"}>
                                                RoleName
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                value={values.roleId}
                                                name={"roleId"}
                                                onChange={handleChange}
                                                type="text"
                                            />
                                            {touched.roleId && errors.roleId ? (
                                                <div className="error-message">
                                                    {errors.roleId}
                                                </div>
                                            ) : null}
                                        </Form.Group>
                                        {/*<Form.Group>*/}
                                        {/*    <Form.Label>Role Name</Form.Label>*/}
                                        {/*    <Form.Select aria-label="Default select example">*/}
                                        {/*        <option>Open this select menu</option>*/}
                                        {/*        <option value="1">One</option>*/}
                                        {/*        <option value="2">Two</option>*/}
                                        {/*        <option value="3">Three</option>*/}
                                        {/*    </Form.Select>*/}
                                        {/*</Form.Group>*/}
                                        {/*<Field*/}
                                        {/*    type="text"*/}
                                        {/*    name="firstName"*/}
                                        {/*    placeholder="Enter your firstName"*/}
                                        {/*/>*/}
                                        {/*<ErrorMessage name="firstName" component="div"/>*/}
                                        {/*<Field*/}
                                        {/*    type="text"*/}
                                        {/*    name="lastName"*/}
                                        {/*    placeholder="Enter your lastName"*/}
                                        {/*/>*/}
                                        {/*<ErrorMessage name="lastName" component="div"/>*/}
                                        {/*<Field*/}
                                        {/*    type="email"*/}
                                        {/*    name="email"*/}
                                        {/*    placeholder="Enter email address"*/}
                                        {/*/>*/}
                                        {/*<ErrorMessage name="email" component="div"/>*/}

                                        {/*<Field type="password" name="password"/>*/}
                                        {/*<ErrorMessage name="password" component="div"/>*/}
                                    </div>
                                </div>

                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={toggleAddUser}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit">
                                    Save User
                                </Button>
                            </Modal.Footer>
                        </form>
                    )}
                </Formik>
                <Modal.Body></Modal.Body>

            </Modal>
        </div>
    )
}

export default AddUser
