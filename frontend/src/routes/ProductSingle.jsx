import React, { useState, useEffect } from 'react';
import { useParams, } from "react-router-dom";
import * as api from '../api/api';

function ProductSingle() {
    const [singleProduct, setSingleProduct] = useState();
    const { id } = useParams();

    useEffect(() => {
        const fetchSingleProductData = async () => {
            const data = await api.getProductById(id)
            if (data?.data) {
                setSingleProduct(data.data)
            } else if (data.err) {
                alert(data.err)
            }
        }

        fetchSingleProductData()
    }, [id])

    return (
        <div className='single-wrapper'>
            <div className="left">

            </div>

            <div className="right">
                {singleProduct.title}
            </div>
        </div>
    )
}

export default ProductSingle