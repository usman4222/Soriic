import React, { Fragment } from 'react'
import { Link} from "react-router-dom"
import './Header.css'


const Header = () => {

    return (
        <Fragment>
            <div>
                <div className='row main-r2'>
                    <div className='col-lg-12 main-r2-b1'>
                        <div className='header'>
                            <ul>
                                <Link to='/'>
                                    <p>DashBoard</p>
                                </Link>

                                {/* {isAuthenticated
                                    ? */}
                                    <Link to='/logout'>
                                        Logout
                                    </Link>
                                    {/* :
                                    <Link to='/login'>
                                    Login
                                </Link>} */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Header