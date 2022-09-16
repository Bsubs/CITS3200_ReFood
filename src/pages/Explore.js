import React from 'react';
import { Amplify, Auth } from 'aws-amplify';

async function getUser() {
    let user = await Auth.currentAuthenticatedUser();

    const { attributes } = user;
    console.log("Test");
    console.log(user);
}

function Explore(props) {
    getUser();
    return (
        <div>
            Explore Page
        </div>
    );
}

export default Explore;