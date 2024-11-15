import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {
    const { userStore } = useStore();
    return (
        <div className='access'>
            <Formik
                initialValues={{ email: '', password: '', error: null }}
                onSubmit={(values, { setErrors }) => userStore.login(values).catch(error => setErrors({ error: 'Invalid email or password' }))}

            >
                {({ handleSubmit, isSubmitting, errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <div className='inputs'>
                            <Header as='h2' content='Login to our page' textAlign='center' style={{ marginTop: '100px', marginBottom: '50px', color: 'forestgreen' }} />
                            <MyTextInput name='email' placeholder='Email' />
                            <MyTextInput name='password' placeholder='Password' type='password' />
                            <ErrorMessage
                                name='error' render={() => <Label style={{ marginBottom: 10, width: '210px' }} basic color='red' content={errors.error} />}
                            />

                        </div>
                        <Button loading={isSubmitting} positive content='Login' type='submit' className='submit' style={{ float: 'right', backgroundColor: 'forestgreen' }} />

                    </Form>

                )}
            </Formik>
        </div>
    )
})