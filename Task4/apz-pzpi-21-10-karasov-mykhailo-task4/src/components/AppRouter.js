import React from 'react';
import { Route, Routes} from "react-router-dom";
import defaultRoutes from "../routes";

const AppRouter = () => {
    return (
        <Routes>
            { defaultRoutes.map(({path, Element} ) => (
                <Route key={path} path={path} element={<Element />} />
            ))}
        </Routes>
    );
};

export default AppRouter;