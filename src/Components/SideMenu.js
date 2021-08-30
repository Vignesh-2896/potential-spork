import React from 'react';

let SideMenu = () => {

    return (
        <div>
            <div className = "SideMenu">
                <ul>
                    <li className = "closeBtn" onClick = {CloseMenu}>&times;</li>
                    <li>Home</li>
                    <li>Orders</li>
                    <li>Notification</li>
                    <li>Help & Support</li>
                    <li>Settings</li>
                </ul>
            </div>
        </div>
    )

}

let ShowMenu = () => {
    document.getElementsByClassName("SideMenu")[0].style.width = "250px";
    document.getElementsByClassName("homepage")[0].style.filter = "blur(5px)";
}

let CloseMenu = () => {
    document.getElementsByClassName("SideMenu")[0].style.width = "0px";
    document.getElementsByClassName("homepage")[0].style.filter = "blur(0px)";
}

export {SideMenu, ShowMenu}