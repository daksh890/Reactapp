import React from 'react';
import Distributor from './../../assets/4.jpg';
import Distributor_2 from './../../assets/5.png';
import './styles.scss';

const Directory = props =>{
    return(
        <div className="directory">
            <div className="wrap">
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${Distributor})`
                    }}
                >
                    <a>
                        Buyer
                    </a>
                </div>
                <div
                    className="item"
                    style={{
                        backgroundImage: `url(${Distributor_2})`
                    }}
                >
                    <a>
                        Seller
                    </a>
                </div>
            </div>    
            
        </div>
    );
};

export default Directory;