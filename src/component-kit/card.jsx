import React from 'react';
import '../style/style.css'


export default function OutlinedCard({ title, image, price }) {

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={image} alt="Avatar" width='200px' height='300px' />
                </div>
                <div className="flip-card-back">
                    <h2>{title}</h2>

                    <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <p>قیمت:</p>
                        <h3>{price} &#32;</h3>
                        <p>
                            تومان
                        </p></span>
                    <p style={{ color: 'gray' }}>(برای جزئیات بیشتر اینجا کلیک کنید)</p>
                </div>

            </div>
        </div>





    );
}
