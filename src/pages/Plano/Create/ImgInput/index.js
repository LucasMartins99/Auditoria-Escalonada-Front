import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { Container } from './styles';
import api from '~/services/api';

export default function ImgInput() {
    const { registerField } = useField('item');
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const ref = useRef();
    useEffect(() => {
        registerField({
            name: 'avatar_id',
            ref: ref.current,
            path: 'dataset.file',
        });
    }, [ref, registerField]);
    async function handleChange(e) {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        const response = await api.post('files', data);
        const { id, url } = response.data;
        setFile(id);
        setPreview(url);
    }
    return (
        <Container>
            <label htmlFor="avatar">
                <img src={preview} alt="" />
                <input
                    type="file"
                    id="img"
                    accept="image/*"
                    data-file={file}
                    onChange={handleChange}
                    ref={ref}
                />
            </label>
        </Container>
    );
}