import { useState } from 'react';

function CreateListForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const onSaveHandler = async () => {
        const url = 'http://localhost:8080/lists';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        };
        const response = await fetch(url, requestOptions);
        console.log('response', response);
    };

    return (
        <div>
            <div>
                <label htmlFor='title'>Title: </label>
                <input type='text' value={title} id='title' onChange={e => setTitle(e.target.value)} required />

                <label htmlFor='description'>Description: </label>
                <input type='text' value={description} id='description' onChange={e => setDescription(e.target.value)} />

                <button onClick={onSaveHandler}>Save!</button>
            </div>
        </div>
    );
}

export function CreateList() {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const addListClickHandler = () => {
        setShowCreateForm(true);
    };

    const closeClickHandler = () => {
        setShowCreateForm(false);
    };

    return (
        <div>
            {
                showCreateForm ? 
                    <div>
                        <CreateListForm/>
                        <button onClick={closeClickHandler}>Close</button>
                    </div> 
                    : 
                    <button onClick={addListClickHandler}>Create new checklist</button>
            }
        </div>
    );
}