import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {

    const [value, setValue] = useState('');
    const [state, setState] = useState({
        title: ''
    });

    const handleInput = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }


    return (
        <>

            <div class="container mt-3">
                <div class="row">

                    <div class="col-md-8 col-md-offset-2">

                        <h1>Create post</h1>

                        <form action="" method="POST">

                            <div class="form-group mt-3">
                                <label for="title">Title <span class="require">*</span></label>
                                <input type="text" class="form-control" name="title" onChange={handleInput} />
                            </div>

                            <div class="form-group mt-3">
                                <input type="file" class="form-control-file" id="exampleFormControlFile1" name='picture' />
                            </div>

                            <div class="group mt-3">
                                <label for="description">Description</label>
                                <ReactQuill theme="snow" value={value} onChange={setValue} />
                            </div>


                            <div class="form-group mt-3">
                                <button type="submit" class="btn btn-primary">
                                    Publish
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CreatePost