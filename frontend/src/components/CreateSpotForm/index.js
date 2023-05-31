import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpotThunk, updateSpotThunk } from '../../store/spots';
import './CreateSpotForm.css'

const CreateSpotForm = () => {
    const spot = {
        country: '',
        address: '',
        city: '',
        state: '',
        lat: '',
        lng: '',
        description: '',
        name: '',
        price: '',
        // image: '',
    };

    const history = useHistory();
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState(1);
    const [longitude, setLongitude] = useState(1);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const SpotImages = [
        { preview: true, url: image },
        { preview: false, url: img1 },
        { preview: false, url: img2 },
        { preview: false, url: img3 },
        { preview: false, url: img4 }]

    const handleSubmit = async (e) => {
        e.preventDefault();
        const spotObj = {
            ...spot,
            country,
            address: street,
            city,
            state,
            lat: latitude,
            lng: longitude,
            description,
            name,
            price,
            SpotImages
        };

        const errors = {}
        if (!country) {
            errors.country = 'Country is required'
        }
        if (!street) {
            errors.street = 'Address is required'
        }
        if (!city) {
            errors.city = 'City is required'
        }
        if (!state) {
            errors.state = 'State is required'
        }
        if (!latitude) {
            errors.latitude = 'Latitude is required'
        }
        if (!longitude) {
            errors.longitude = 'Longitude is required'
        }
        if (!description || description.length < 30) {
            errors.description = 'Description needs a minimum of 30 characters'
        }
        if (!name) {
            errors.name = 'Name is required'
        }
        if (!price) {
            errors.price = 'Price is required'
        }

        if (!image) {
            errors.previewImage = 'Preview Image is required'
        }
        // if (!image.endsWith('.png') || !image.endsWith('.jpg') || !image.endsWith('.jpeg')) {
        //     errors.image = 'Image URL must end with .png, .jpg, or .jpeg'
        // }


        if (Object.values(errors).length > 0) {
            setErrors(errors);
        }else{

            const newSpot = await dispatch(createSpotThunk(spotObj, SpotImages));
            console.log('SPOT', newSpot)
            history.push(`/spots/${newSpot.id}`)
        }

        if(!spot){
            return null;
        }
};
    return (
        <div className='spot-form'>
            <form onSubmit={handleSubmit}>
                <h2>Create a new Spot</h2>
                <h3>Where's your place located?</h3>
                <h5>Guests will only get your exact address once they booked a reservation.</h5>
                <div className='errors'>{errors.country}</div>
                <label>
                    Country
                    <input
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <div className='errors'>{errors.street}</div>
                <label>
                    Street Address
                    <input
                        type='text'
                        placeholder='Address'
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </label>
                <div className='errors'>{errors.city}</div>
                <div className='city'>
                <label>
                    City
                    <input
                        type='text'
                        placeholder='City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <div className='errors'>{errors.state}</div>
                <label>
                    State
                    <input
                        type='text'
                        placeholder='STATE'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                </div>
                <div className='errors'>{errors.latitude}</div>
                <div className='lat'>
                <label>
                    Latitude
                    <input
                        type='text'
                        placeholder='latitude'
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </label>
                <div className='errors'>{errors.longitude}</div>
                <label>
                    Longitude
                    <input
                        type='text'
                        placeholder='longitude'
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </label>
                </div>
                <h3>Describe your place to guests</h3>
                <h6>Mention the best features of your space, any special amentities like
                    fast wif or parking, and what you love about the neighborhood.</h6>
                <textarea
                    value={description}
                    placeholder='Please write at least 30 characters'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className='errors'>{errors.description}</div>
                <h3>Create a title for your spot</h3>
                <h6>Catch guests' attention with a spot title that highlights what makes
                    your place special.</h6>
                <input
                    type='text'
                    placeholder='Name of your spot'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className='errors'>{errors.name}</div>
                <h3>Set a base price for your spot</h3>
                <h6>Competitive pricing can help your listing stand out and rank higher
                    in search results.</h6>
                <label>
                    $<input
                        type='text'
                        placeholder='Price per night (USD)'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <div className='errors'>{errors.price}</div>
                <h3>Liven up your spot with photos</h3>
                <h5>Submit a link to at least one photo to publish your spot.</h5>
                <input
                    type='text'
                    placeholder="Preview Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <div className='errors'>{errors.previewImage}</div>
                <input
                    type='text'
                    placeholder="Image URL"
                    value={img1}
                    onChange={(e) => setImg1(e.target.value)}
                />
                <div className='errors'>{errors.image}</div>
                <input
                    type='text'
                    placeholder="Image URL"
                    value={img2}
                    onChange={(e) => setImg2(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Image URL"
                    value={img3}
                    onChange={(e) => setImg3(e.target.value)}
                />
                <input
                    type='text'
                    placeholder="Image URL"
                    value={img4}
                    onChange={(e) => setImg4(e.target.value)}
                />
                <button type="submit">Create Spot</button>
            </form>
        </div>
    )
}

export default CreateSpotForm;
