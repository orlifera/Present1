import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // import lightbox styles
import galleryData from "../data/gallery.json";
import { Counter } from "yet-another-react-lightbox/plugins";



const Gallery: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const handleImageClick = (index: number) => {
        setCurrentImage(index); // set the current image index when clicked
        setIsOpen(true); // open the lightbox
    };

    return (
        <div className="gallery">
            <div className="gallery-grid">
                <ul className="image-list">
                    {galleryData.map((image, index) => (
                        <li key={image.src}>
                            <img
                                key={index}
                                src={image.src}
                                alt={image.alt}
                                className="gallery-image"
                                onClick={() => handleImageClick(index)} // handle the image click to open the lightbox
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {
                isOpen && (
                    <Lightbox

                        open={isOpen} // controlling whether the lightbox is open or not
                        plugins={[Counter]}
                        close={() => setIsOpen(false)} // close lightbox handler
                        slides={galleryData.map((image) => ({
                            src: image.src, // image source for each slide
                            alt: image.alt, // image alt text for each slide
                        }))}
                        index={currentImage} // set the current image index for the lightbox
                    />
                )
            }
        </div >
    );
};

export default Gallery;
