import React, { Suspense, lazy } from "react";
import { store } from "../../../redux/store";
import roles from "../../../enums/role.enum";

// Lazy load the remote component
const LazyCourseComponent = lazy(() => import("catalog/Course"));

// ✅ Wrapper component to pass props
const CourseComponentWithStore = () => <LazyCourseComponent store={"Naim"} />;

export default [
    {
        path: "/manage-permission",
        roles: [roles.ADMIN, roles.USER],
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <CourseComponentWithStore/>
            </Suspense>
        ),
    },
];
