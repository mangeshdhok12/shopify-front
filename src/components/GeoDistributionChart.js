
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const GeoDistributionChart = () => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/getCustomerDistribution')
            .then(response => {
                setCities(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the customer distribution data!", error);
            });
    }, []);

    
    const getLatLngForCity = (city) => {
        
        const cityCoordinates = {
            "New York": [40.7128, -74.0060],
            "Los Angeles": [34.0522, -118.2437],
            
        };
        return cityCoordinates[city] || [0, 0]; 
    };

    return (
        <>
        <h1>5. Geographical Distribution of Customers:</h1>
        <MapContainer center={[0, 0]} zoom={2} style={{ height: "600px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {cities.map(city => {
                const [lat, lng] = getLatLngForCity(city._id);
                return (

                    <Marker key={city._id} position={[lat, lng]}>
                        <Popup>
                            {city._id}: {city.count} customers
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
        </>
    );
};

export default GeoDistributionChart;
