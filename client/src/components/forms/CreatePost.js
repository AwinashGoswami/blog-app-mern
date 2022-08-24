import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux'
import { createAction } from '../../store/asyncMethods/PostMethods';

const CreatePost = () => {

    const [state, setState] = useState({
        title: '',
        description: '',
        image: ''
    });

    const [value, setValue] = useState('');
    const [slug, setSlug] = useState('');
    const [slugButton, setSlugButton] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const dispatch = useDispatch();
    const { user: { _id, username } } = useSelector(state => state.AuthReducer);
    // const {_id, username} = user; 
    // const [currentImage, setCurrentImage] = useState('');


    const handleInput = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
        const createSlug = e.target.value.trim().split(' ').join('-');
        setSlug(createSlug);
    }

    const slugHandle = e => {
        setSlugButton(true);
        setSlug(e.target.value);
    }

    const handleURL = e => {
        e.preventDefault();
        setSlug(slug.trim().split(' ').join('-'))
    }

    const fileHandle = e => {
        // setCurrentImage(e.target.files[0].name);
        setState({
            ...state,
            [e.target.name]: e.target.files[0]
        })
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleDescription = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const createPost = e => {
        e.preventDefault();
        const { title, description, image } = state;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', value);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('slug', slug);
        formData.append('username', username);
        formData.append('id', _id);
        dispatch(createAction(formData));
    }


    return (
        <>

            <div className="container mt-3">
                <div className="row">
                    <form onSubmit={createPost}>
                        <div className="col-md-8 col-md-offset-2">
                            <h1>Create Post</h1>

                            {/* Post Image */}
                            <div className="form-group mt-3">
                                <input type="file" className="form-control-file" id="image" name='image' onChange={fileHandle} />
                            </div>
                            <br />
                            <div>
                                <div className='post_img_preview'>
                                    {
                                        imagePreview ? <img src={imagePreview} /> : ''
                                    }
                                </div>
                            </div>

                            {/* Post Title */}
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" name="title" onChange={handleInput} placeholder='Post Title...' />
                            </div>

                            {/* Post Slug */}
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" name="slug" onChange={slugHandle} value={slug} placeholder='Post URL...' />
                            </div>

                            <div className="form-group mt-3">
                                {slugButton ?
                                    (<button className='btn btn-primary' onClick={handleURL}>Update Slug</button>)
                                    :
                                    ('')
                                }
                            </div>

                            {/* Post Body  */}
                            <div className="group mt-3">
                                <ReactQuill theme="snow" value={value} onChange={setValue} placeholder='Post Body...' />
                            </div>

                            {/* Post Meta Description  */}
                            <div className="form-group mt-3">
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows='5'
                                    placeholder='Meta Description...'
                                    maxLength="150"
                                    defaultValue={state.description}
                                    onChange={handleDescription}
                                />
                                <p className="meta_length">
                                    Max Length: 150 -
                                    {
                                        state.description ? state.description.length : 0
                                    }
                                </p>
                            </div>

                            {/* Post Publish Button */}
                            <div className="form-group mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Publish
                                </button>
                            </div>
                            <br />
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}

export default CreatePost