import axios from "axios";
import React, { useEffect, useState } from "react";
import loader from "./assets/loader.gif";
import ReactPaginate from "react-paginate";
import "./App.css";

const App = () => {
    const [images, setImages] = useState([]);

    const GetImages = async (count = 1) => {
        try {
            const res = await axios.get(
                `https://picsum.photos/v2/list?page=${count}&limit=10`
            );
            setImages(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetImages();
    }, []);

    const handlePageClick = (e) => {
        GetImages(e.selected + 1);
    };

    let imagelist = [];
    if (images.length > 0) {
        imagelist = images.map((image, index) => (
            <div
                key={index}
                className="me-3 mb-3 card"
                style={{ width: "15vmax" }}
            >
                <img
                    src={image.download_url}
                    className="card-img-top"
                    alt={image.download_url}
                />
                <div className="card-body">
                    <p className="card-text">{image.author}</p>
                </div>
            </div>
        ));
    }

    return (
        <div style={{ width: "100vw", height: "100vh" }} className="container">
            <h1 className="p-5">Gallery App</h1>
            <div className=" d-flex justify-content-start align-items-center flex-wrap">
                {images.length > 0 ? (
                    imagelist
                ) : (
                    <img
                        style={{ width: "30vmax" }}
                        src={loader}
                        alt="Loading..."
                    />
                )}
            </div>

            <ReactPaginate
                className="pagination"
                breakLabel="..."
                nextLabel="▶"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={10}
                previousLabel="◀"
            />
        </div>
    );
};

// https://picsum.photos/v2/list?page=2&limit=100

export default App;
