const addUserDetail = (response) => {
    localStorage.setItem('isAutehnticate', response.data.success);
    localStorage.setItem('address', response.data.user_data.address);
    localStorage.setItem('city', response.data.user_data.city);
    localStorage.setItem('profilePic', response.data.user_data.profile);
    localStorage.setItem('contactNumber', response.data.user_data.contactNumber);
    localStorage.setItem('country', response.data.user_data.country);
    localStorage.setItem('created_at', response.data.user_data.created_at);
    localStorage.setItem('emailAddress', response.data.user_data.emailAddress);
    localStorage.setItem('facebook_id', response.data.user_data.facebook_id);
    localStorage.setItem('firstName', response.data.user_data.firstName);
    localStorage.setItem('google_id', response.data.user_data.google_id);
    localStorage.setItem('id', response.data.user_data.id);
    localStorage.setItem('is_deleted', response.data.user_data.is_deleted);
    localStorage.setItem('lastName', response.data.user_data.lastName);
    localStorage.setItem('loginType', response.data.user_data.loginType);
    localStorage.setItem('state', response.data.user_data.state);
    localStorage.setItem('updated_at', response.data.user_data.updated_at);
    localStorage.setItem('userType', response.data.user_data.userType);
    localStorage.setItem('fullName', response.data.user_data.firstName + ' ' + response.data.user_data.lastName);
}


const removeUserDetail = () => {
    localStorage.removeItem('isAutehnticate');
    localStorage.removeItem('address');
    localStorage.removeItem('city');
    localStorage.removeItem('contactNumber');
    localStorage.removeItem('country');
    localStorage.removeItem('created_at');
    localStorage.removeItem('profilePic');
    localStorage.removeItem('emailAddress');
    localStorage.removeItem('facebook_id');
    localStorage.removeItem('firstName');
    localStorage.removeItem('google_id');
    localStorage.removeItem('id');
    localStorage.removeItem('is_deleted');
    localStorage.removeItem('lastName');
    localStorage.removeItem('loginType');
    localStorage.removeItem('state');
    localStorage.removeItem('updated_at');
    localStorage.removeItem('userType');
    localStorage.removeItem('fullName');
}

const getUserDetail = () => {
    const userDetail = {
        isAutehnticate: localStorage.getItem('isAutehnticate'),
        address: localStorage.getItem('address'),
        city: localStorage.getItem('city'),
        contactNumber: localStorage.getItem('contactNumber'),
        country: localStorage.getItem('country'),
        created_at: localStorage.getItem('created_at'),
        emailAddress: localStorage.getItem('emailAddress'),
        facebook_id: localStorage.getItem('facebook_id'),
        firstName: localStorage.getItem('firstName'),
        google_id: localStorage.getItem('google_id'),
        id: localStorage.getItem('id'),
        is_deleted: localStorage.getItem('is_deleted'),
        lastName: localStorage.getItem('lastName'),
        loginType: localStorage.getItem('loginType'),
        state: localStorage.getItem('state'),
        updated_at: localStorage.getItem('updated_at'),
        userType: localStorage.getItem('userType'),
        fullName: localStorage.getItem('fullName'),
        profilePic: localStorage.getItem('profilePic')
    }

    return userDetail;
}

export { addUserDetail, removeUserDetail, getUserDetail }