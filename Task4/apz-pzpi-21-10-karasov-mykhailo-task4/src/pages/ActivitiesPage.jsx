import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import Loader from "../components/UI/Loader/Loader";
import {fetchActivity} from "../API/activityApi";
import {useTranslation} from "react-i18next";
import ActivityList from "../components/Activity/ActivityList";
import {useNavigate} from "react-router-dom";
import {ADD_ACTIVITY_PAGE} from "../utils/consts";

const ActivitiesPage = () => {
    const { t } = useTranslation();
    const navigation = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [activities, setActivities] = useState([{}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesCount, setPageCounts] = useState(1);

    useEffect(() => {
        fetchActivity(8, currentPage).then(response => {
            setActivities(response.activities);
            setPageCounts(response.pagination.totalPages);
            setCurrentPage(response.pagination.currentPage);
            setIsLoading(false);
        });
    }, []);

    return (
        isLoading ?
            <Container className={"w-100 mt-3 mb-3 min-vh-100 border d-flex justify-content-start align-items-center"}>
                <Loader />
            </Container>
            :
            <Container className={"w-100 mt-3 mb-3 border min-vh-100"}>
                <div>
                    <h2>{t('companyActivities')}</h2>
                </div>
                {activities.length > 0 ?
                    <div>
                        <ActivityList />
                    </div>
                    :
                    <div className={"d-flex w-100 min-vh-100 flex-column justify-content-center align-items-center"}>
                        <strong>У вашій компанії відстутні активності</strong>
                        <Button
                            className={"mt-3 w-25"}
                            variant={"primary"}
                            onClick={() => navigation(ADD_ACTIVITY_PAGE)}
                        >
                            {t('addButton')}
                        </Button>
                    </div>
                }
            </Container>
    );
};

export default ActivitiesPage;