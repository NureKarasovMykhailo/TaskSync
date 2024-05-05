import React, {useContext} from 'react';
import { Route, Routes} from "react-router-dom";
import defaultRoutes, {authRoutes} from "../routes";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const AppRouter = observer(() => {
    const { userStore } = useContext(Context);

    return (
        <Routes>
            { defaultRoutes.map(({path, Element} ) => (
                <Route key={path} path={path} element={<Element />} />
            ))}
            { userStore.isAuth && authRoutes.map(({path, Element}) => (
                <Route key={path} path={path} element={< Element />} />
            )) }
        </Routes>

    );
});

export default AppRouter;