import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';
import {useParams} from 'react-router-dom';
import {LinkCard} from '../components/LinkCard';
import LinearProgress from '@material-ui/core/LinearProgress';

export const DetailPage = () => {
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setLink(fetched);
        } catch (e) {
            console.error(e);
            return null
        }
    }, [token, linkId, request])
    useEffect(() => {
        getLink()
    }, [getLink]);
    if (loading) {
        return <LinearProgress color='secondary'/>
    }
    return (<>{!loading && link && <LinkCard link={link}/>}</>)
};
