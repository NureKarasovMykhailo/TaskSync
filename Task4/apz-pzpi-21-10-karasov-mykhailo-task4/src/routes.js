import {
    ADD_COMPANY,
    AUTH_PAGE_PATH,
    MAIN_PAGE_PATH,
    PROFILE_PAGE_PATH,
    REGISTRATION_PAGE_PATH,
    SUCCESS_SUBSCRIBE
} from "./utils/consts";
import AuthPage from "./pages/AuthPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SubscribeSuccess from "./pages/SubscribeSuccess";
import AddCompanyPage from "./pages/AddCompanyPage";

const defaultRoutes = [
    {
        path: AUTH_PAGE_PATH,
        Element: AuthPage
    },
    {
        path: REGISTRATION_PAGE_PATH,
        Element: RegistrationPage
    },
    {
        path: MAIN_PAGE_PATH,
        Element: MainPage
    }
];

export const authRoutes = [
    {
        path: PROFILE_PAGE_PATH,
        Element: ProfilePage
    },
    {
        path: SUCCESS_SUBSCRIBE,
        Element: SubscribeSuccess
    },
    {
        path: ADD_COMPANY,
        Element: AddCompanyPage
    }
];

export default defaultRoutes;