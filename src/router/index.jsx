import { useRoutes } from 'react-router-dom/dist/index';
import { ProtectedRoutes, PublicRoutes } from "./routes";
// import { useRoutes } from 'react-router-dom';

const Router = () => {
    const routes = [ProtectedRoutes, ...PublicRoutes];

    return useRoutes(routes);
};

export default Router;