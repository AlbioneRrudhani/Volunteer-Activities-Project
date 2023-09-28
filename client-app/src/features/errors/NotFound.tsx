import React from 'react';
import { Link } from 'react-router-dom';
import { Button, HeaderContent, Icon, Segment } from 'semantic-ui-react';

export default function NotFound(){
    return(
        <Segment placeholder>
             <HeaderContent icon>
                <Icon name ='search'/>
                Couldn't find anywhere your search...
            </HeaderContent> 
            <Segment.Inline>
                <Button as={Link} to='/activities' primary>
                    Return to activities page
                </Button>
            </Segment.Inline> 
        </Segment>
    )
}