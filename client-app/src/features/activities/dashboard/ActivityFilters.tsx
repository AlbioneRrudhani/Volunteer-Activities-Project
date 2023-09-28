
import React from 'react';
import Calendar from 'react-calendar';
import { Dropdown, Header, Input, Menu } from 'semantic-ui-react';

const tagOptions = [
    {
      key: 'Important',
      text: 'City',
      value: 'Important',
      label: { color: 'orange', empty: true, circular: true },
    },
    {
      //key: 'Announcement',
      text: 'Category',
      value: 'Announcement',
      label: { color: 'blue', empty: true, circular: true },
    },
    {
      key: 'Cannot Fix',
      text: 'Venue',
      value: 'Cannot Fix',
      label: { color: 'green', empty: true, circular: true },
    }
]

export default function ActivityFilters() {
    return (
        <>
           <div className='filterMenuCalendar'>

            <div className='filterMenu'>
            <Dropdown text='Filter Posts' multiple icon='filter'>
            <Dropdown.Menu>
            <Dropdown.Divider />
            <Dropdown.Header icon='tags' content='Chose option' />
            <Dropdown.Menu scrolling>
                {tagOptions.map((option) => (
                <Dropdown.Item key={option.value} {...option} />
                ))}
            </Dropdown.Menu>
            </Dropdown.Menu>
        </Dropdown>
            </div>
            <div style={{marginLeft:80}}>
            <Calendar/>
            </div>
            </div>
        </>

    )
}