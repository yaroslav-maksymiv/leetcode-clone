import user_photo from "../../assets/user_photo.png";
import Popup from "reactjs-popup";
import React, {useEffect, useState} from "react";
import AvatarEdit from 'react-avatar-edit';

const PhotoEditPopup = ({editedUser, setEditedUser, handleSubmit, cancelEditing}) => {
    const [open, setOpen] = useState(false)
    const [croppedImage, setCroppedImage] = useState(null)

    const closeModal = () => {
        setOpen(false)
        cancelEditing()
    }

    useEffect(() => {
        setEditedUser((prevUser) => ({...prevUser, photo: croppedImage}))
    }, [croppedImage])

    const handleSavePhoto = (e) => {
        closeModal()
        handleSubmit(e)
    }

    return (
        <>
            <div className="user-profile-photo mr-6" onClick={() => setOpen(o => !o)}>
                {editedUser.photo ? (
                    <img
                        className="h-40 w-40 border border-2 border-gray-500 rounded-lg"
                        src={editedUser.photo}
                        alt=""
                    />
                ) : (
                    <img
                        className="h-40 w-40 border border-2 border-gray-500 rounded-lg"
                        src={user_photo}
                        alt=""
                    />
                )}
                <div className="user-profile-photo__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke-width="1.5" stroke="currentColor" className="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/>
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"/>
                    </svg>
                </div>
            </div>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div>
                    <div className="popup-header flex justify-between items-center mb-5">
                        <h2 className="text-xl font-semibold">Edit Profile Photo</h2>
                        <button className="close-icon" onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="avatar-edit mb-6 flex justify-center">
                        {/* Your AvatarEdit component */}
                        <AvatarEdit
                            width={200}
                            height={200}
                            imageWidth={370}
                            minCropRadius={60}
                            onCrop={(croppedImage) => setCroppedImage(croppedImage)}
                        />
                    </div>
                    <div className="w-full button-container flex justify-end">
                        <button onClick={handleSavePhoto}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3">
                            Save
                        </button>
                        <button onClick={closeModal}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-3">
                            Cancel
                        </button>
                    </div>
                </div>
            </Popup>
        </>

    )
}

export default PhotoEditPopup
