import { Formik, Form } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/myDateInput';
import { ActivityFormValues} from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';




export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity,
            loadActivity, loadingIntial } = activityStore;
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('Titulli i aktivitetit duhet te jete i plotesuar!'),
        description: Yup.string().required('Pershkrimi i aktivitetit duhet te jete i plotesuar!'),
        category: Yup.string().required('Kategoria e aktivitetit duhet te jete e plotesuar!'),
        date: Yup.string().required('Data duhet te jete e plotesuar!').nullable(),
        venue: Yup.string().required('Vendngjarja e aktivitetit duhet te jete e plotesuar!'),
        city: Yup.string().required('Qyteti duhet te jete i plotesuar!')
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))   
    }, [id, loadActivity]);                                                

    function handleFromSubmit(activity: ActivityFormValues) {
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }


    if (loadingIntial) return <LoadingComponent content='Loading activity...' />

    return (

        <Segment clearing className='create'> {}
            <div className='createForm'>
                <Header content='Activity Details' sub style={{ color: 'forestgreen', paddingTop: '50px', marginLeft: '58px' }} />

                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={activity}
                    onSubmit={values => handleFromSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (

                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <div className='inputs'>
                                <MyTextInput name='title' placeholder='Title' />
                                <MyTextArea rows={3} placeholder='Description' name='description' />
                                <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                                <MyDateInput placeholderText='Date' name='date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />

                                <Header content='Location Details' sub style={{ color: 'forestgreen', marginLeft: '58px' }} />
                                <MyTextInput placeholder='City' name='city' />
                                <MyTextInput placeholder='Venue' name='venue' />
                            </div>
                            <Button className='create'
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={isSubmitting} positive type='submit' content='Submit' style={{ marginTop: '15px', marginLeft: '58px', backgroundColor: 'forestgreen', marginBottom: '50px' }} />
                            <Button className='cancel' as={Link} to='/activities' type='button' content='Cancel' /> {}

                        </Form>

                    )}

                </Formik>
            </div>

        </Segment>
    )
})