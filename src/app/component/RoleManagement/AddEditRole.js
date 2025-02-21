import React from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { addRole, updateRoleById } from "../../../service/role.api";
import showNotification from "../../../shared/helper/notification";
import Select from "react-select";

export const AddEditRole = (props) => {
    // Convert selected permission IDs to { value, label } objects ONLY in edit mode
    console.log("Roles",props.activateRole)
    console.log("selectedPermissionWithRole",props.selectedPermissionWithRole)
    // const selectedPermissions = props.isEditing
    //     ? props.selectedPermissionWithRole.map(id =>
    //         props.activateRole.find(p => p.value === id) || { value: id, label: `${id}` }
    //     )
    //     : []; // Empty array in add mode
    const selectedPermissions = props.isEditing ? props.selectedPermissionWithRole
            .map(label => props.activateRole.find(role => role.label === label))
            .filter(Boolean) // Remove undefined values if no match found
        : [];
    console.log({selectedPermissions});
    return (
        <Modal size="lg" centered show={props.isOpen} onHide={props.toggleAddRole}>
            <Modal.Header closeButton>
                <Modal.Title>{props.isEditing ? "Edit Role" : "Add Role"}</Modal.Title>
            </Modal.Header>

            <Formik
                initialValues={{
                    roleName: props.isEditing ? props.roleName || "" : "", // Set blank for add mode
                    permissions: selectedPermissions// Pre-selected only for edit
                }}
                enableReinitialize
                onSubmit={async (values) => {
                    const data = {
                        roleName: values.roleName,
                        permissions: values.permissions.map(p => p.value), // Extract only IDs
                    };

                    if (props.isEditing) {
                        data["id"] = props.roleId;
                    }
                    try {
                        const response = await (props.isEditing ? updateRoleById : addRole)(data);
                        if (response.status === 200) {
                            showNotification(response.message, 'success');
                            props.toggleAddRole();
                            props.getAllRoles();
                        } else {
                            throw response;
                        }
                    } catch (error) {
                        showNotification(error.message || "Something went wrong", 'error');
                    }
                }}
            >
                {({ values, handleChange, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Role Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="roleName"
                                    value={values.roleName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter Role"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Permissions</Form.Label>
                                <Select
                                    options={props.activateRole} // Available permissions
                                    isMulti
                                    value={values.permissions} // Show only for edit
                                    onChange={selected => setFieldValue("permissions", selected)}
                                />
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.toggleAddRole}>Cancel</Button>
                            <Button type="submit" variant="primary">Save</Button>
                        </Modal.Footer>
                    </form>
                )}
            </Formik>
        </Modal>
    );
};

export default AddEditRole;
