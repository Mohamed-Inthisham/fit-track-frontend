import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import { app } from '../config/Config';
import { v4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';

const storage = getStorage(app);

const Register = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        phoneNumber: '',
        profilePictureUrl: '',
        bio: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedUrls, setUploadedUrls] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setErrors({ ...errors, profilePictureUrl: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formErrors = {};

        if (!selectedFile) {
            formErrors.profilePictureUrl = 'Profile Picture is required';
        }

        if (!user.firstName.trim()) {
            formErrors.firstName = 'First Name is required';
        }
        if (!user.lastName.trim()) {
            formErrors.lastName = 'Last Name is required';
        }
        if (!user.email.trim()) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            formErrors.email = 'Email address is invalid';
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            let imageUrl = null;

            if (selectedFile) {
                const imageRef = ref(storage, `/images/${selectedFile.name}`);
                await uploadBytes(imageRef, selectedFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            const data = {
                ...user,
                profilePictureUrl: imageUrl,
            };

            UserService.saveUser(data)
                .then((response) => {
                    console.log(response);
                    navigate('/');
                    alert('User Registered!');
                })
                .catch((error) => {
                    console.log('error');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-[#ef4444]-100">
            <div className="bg-white shadow-md rounded-md p-10 w-96"
            style={{ minWidth: '800px', minHeight: '700px' }}>
                <h2 className="text-xl font-semibold mb-4">Register</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    
                    <div className="space-y-3">
                        <input
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            placeholder="First Name"
                            className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                         <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            placeholder="User Name"
                            className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"
                            className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                         <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Password"
                            className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                        />  
                    </div>
                    <textarea
                        name="bio"
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    ></textarea>
                    <div className="flex flex-col items-center">
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                className="rounded-full w-24 h-24 mb-3"
                                alt="Selected"
                            />
                        )}
                        <label>Profile Picture</label>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Register
                    </button>
                </form>
                <div className="flex justify-center mt-5">
                    <p>Already have an account?</p>
                    <Link to="/login">
                        <p className="ml-1 text-blue-600 underline cursor-pointer">
                            Login
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
