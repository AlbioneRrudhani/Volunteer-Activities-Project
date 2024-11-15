//import { format } from 'date-fns';
import { Formik , Form, Field, FieldProps} from 'formik';
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Segment, Header, Comment, Loader } from 'semantic-ui-react'
import MyTextArea from '../../../app/common/form/MyTextArea';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { formatDistanceToNow } from 'date-fns/esm';

interface Props {
    activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
    const { commentStore } = useStore();

    useEffect(() => {
        if (activityId) {
            commentStore.createHubConnection(activityId);
        }
        //clean up function
        return () => {
            commentStore.clearComments();//clears comments array, stops connection
        }
    }, [commentStore, activityId]);

    return (
        <>
            <Segment
                attached='top'
                inverted
                style={{ border: 'none' }}
                className="commentSection"
            >
                <Header style={{ color: 'black' }}> Comments</Header>
            </Segment>
            <Segment attached clearing>
            <Formik 
                    onSubmit={(values: any,{resetForm}: any) => commentStore
                    .addComment(values).then(() => resetForm())}
                    initialValues={{body: ''}}
                    validationSchema={Yup.object({
                        body: Yup.string().required()
                    })}
                    >
                        {({isSubmitting, isValid,handleSubmit}) =>(
                            <Form className='ui form'>
                         
                       <Field name="body">
                        {(props: FieldProps) =>(
                            <div style={{position: 'relative'}}>
                                <Loader active={isSubmitting}/>
                                <textarea 
                                placeholder='Enter your comment (Enter to submit, SHIFT + enter for new Line)'
                                rows={2}
                                {...props.field}
                                onKeyDown={e => {
                                    if(e.key === 'Enter' && e.shiftKey){
                                    return;
                                    }
                                    if(e.key === 'Enter' && !e.shiftKey){
                                        e.preventDefault();
                                        isValid && handleSubmit();
                                    }
                                }}
                                
                                />
                            </div>
                        )}
                       </Field>
                        </Form>

                        )}

                        
                    </Formik>
                
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/images/era.png'} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                                    {comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                                </Comment.Metadata>
                                <Comment.Text style={{whiteSpace: 'pre-wrap'}}>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}

                </Comment.Group>
            </Segment>
        </>

    )
})