import { useRoutes } from 'react-router-dom';
import { ProtectedRoutes, PublicRoutes } from "./routes";
// import { useRoutes } from 'react-router-dom';

const Router = () => {
    console.log('ProtectedRoutes:', ProtectedRoutes,PublicRoutes);

    const routes = [ProtectedRoutes, ...PublicRoutes];

    return useRoutes(routes);
};

export default Router;