import React from 'react'
import {Modal, Button, Form, Col} from "react-bootstrap";
import {Formik} from "formik";
import {addRole, updateRoleById} from "../../../service/role.api";
import showNotification from "../../../shared/helper/notification";

export const AddEditRole = (props) => {
    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={props.isOpen}
                onHide={props.toggleAddRole}
            >
                <>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.isEditing? "Edit Role" : "Add Role"}
                    </Modal.Title>
                </Modal.Header>
                <Formik initialValues={{roleName: props.isEditing ? props.roleName : " "}} onSubmit={(values)=>{
                    console.log({values})
                    let data= {
                        roleName:values.roleName
                    }
                    if (props.isEditing) {
                        data["id"] = props.roleId;
                    }
                    let roleApi=props.isEditing ? updateRoleById :addRole
                    roleApi(data).then((response)=>{
                    if (response.status && response.status===200){
                        showNotification(response.message,'success')
                        props.toggleAddRole()
                        props.getAllRoles()
                    }
                    else throw response
                    console.log({response})
                }).catch((error)=>{
                    showNotification(error.error,'error')
                    props.toggleAddRole()
                    props.getAllRoles()
                    console.log(error)
                })
                }}>
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isValid,
                          dirty
                      }) => (
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <Modal.Body className="add-role-modal-body">
                                <div className="row modal-formik-div">
                                    <div className="col-md-12">
                                        <Form.Group as={Col} className="modal-form-group">
                                            <Form.Label className={"mt-4 label-required"}>
                                                Role Name
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                value={values.roleName}
                                                name={"roleName"}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                type="text"
                                                className={
                                                    touched.roleName && errors.roleName
                                                        ? "error"
                                                        : null
                                                }
                                            />
                                            {touched.roleName && errors.roleName ? (
                                                <div className="error-message">
                                                    {errors.roleName}
                                                </div>
                                            ) : null}
                                        </Form.Group>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={props.toggleAddRole}>
                                    Close
                                </Button>
                                <Button
                                    variant="primary"
                                    type="submit">
                                    {props.isEditing? "Update" : "Save"}
                                </Button>
                            </Modal.Footer>
                        </form>
                    )}
                </Formik>
                </>
            </Modal>
        </>
    )
}
export default AddEditRole;