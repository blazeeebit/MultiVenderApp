import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CsvForm = () => {
	const { csv } = useSelector((state) => state);
    const {auth} = useSelector((state) => ({...state}));


	const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`http://localhost:5000/create-multi-product`, csv, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        }).then((res) => {
            console.log(res);
            window.alert('Product created');
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
    }

	return (
        <>
			{csv && <form className="position-absolute bg-light p-5 table-modal" onSubmit={handleSubmit}>
                    <h1>Form Data</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Category</th>
                                <th scope="col">Shipping</th>
                                <th scope="col">Color</th>
                                <th scope="col">Brand</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(csv).map(keys => (
                                <tr key={keys}>
                                <th scope="row">{keys}</th> 
                                <td><input value={csv[keys].title} placeholder={csv[keys].title} name="title" disabled/></td>
                                <td><input value={csv[keys].description} placeholder={csv[keys].description} disabled/></td>
                                <td><input value={csv[keys].price} placeholder={csv[keys].price} disabled/></td>
                                <td><input value={csv[keys].quantity} placeholder={csv[keys].quantity} disabled/></td>
                                <td><input value={csv[keys].category} placeholder={csv[keys].category} disabled/></td>
                                <td><input value={csv[keys].shipping} placeholder={csv[keys].shipping} disabled/></td>
                                <td><input value={csv[keys].color} placeholder={csv[keys].color} disabled/></td>
                                <td><input value={csv[keys].brand} placeholder={csv[keys].brand} disabled/></td>
                             </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type="submit" className="btn btn-primary">Post</button>
                </form>}
		</>	
	);
};

export default CsvForm;
