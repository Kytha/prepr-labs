import { Map, InfoWindow } from "google-maps-react";
import Marker from "./Marker";
import GoogleApiWrapper from "./GoogleApiComponent";
import React from "react";

// ...
const containerStyle = {
    width: "100%",
    height: "100%",
    position: "relative"
};
const style = {
    width: "100%",
    height: "100%"
};
const GOOGLE_MAPS_API_KEY = "AIzaSyArPmlI2zy7HBEPYi0-7S4uap5T8WCxfUM";

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(prevProps) {
        const { selectedLab } = this.props;
        if (!selectedLab && prevProps.selectedLab) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
                selectedPlace: null
            });
        }
    }

    renderInfo = selectedPlace => {
        if (!selectedPlace || !selectedPlace.lab) return <h3>Error</h3>;
        const lab = selectedPlace.lab;
        const getImageUrl = () => {
            return `https://maps.googleapis.com/maps/api/streetview?size=300x200&location="${lab.address}",&key=${GOOGLE_MAPS_API_KEY}`;
        };
        return (
            <div style={{ maxWidth: 300 }}>
                <img src={getImageUrl()} />
                <h3>{lab.title}</h3>
                <p>{lab.category}</p>
                <p>
                    <strong>{lab.address}</strong>
                </p>
            </div>
        );
    };

    isSelected = id => {
        const { selectedLab } = this.props;
        if (!selectedLab) return false;
        return id === selectedLab.id;
    };

    windowHasClosed = () => {
        const { onSelect } = this.props;
        onSelect(null);
    };

    onMarkerClick = (props, marker, e) => {
        const { onSelect } = this.props;
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
        onSelect(props.lab);
    };

    getCenter = () => {
        const { labs, selectedLab } = this.props;
        let center = null;
        if (selectedLab) {
            center = {
                lat: parseFloat(selectedLab.latitude),
                lng: parseFloat(selectedLab.longitude)
            };
        } else if (labs) {
            center = {
                lat: parseFloat(labs[0].latitude),
                lng: parseFloat(labs[0].longitude)
            };
        }
        return center || { lat: 0, lng: 0 };
    };

    render() {
        const { labs } = this.props;
        const { showingInfoWindow, activeMarker, selectedPlace } = this.state;

        return (
            <Map
                google={this.props.google}
                zoom={10}
                containerStyle={containerStyle}
                style={style}
                center={this.getCenter()}
            >
                {labs &&
                    labs.map(lab => {
                        return (
                            <Marker
                                title={lab.title}
                                name={lab.title}
                                position={{
                                    lat: lab.latitude,
                                    lng: lab.longitude
                                }}
                                onClick={this.onMarkerClick}
                                selected={this.isSelected(lab.id)}
                                lab={lab}
                            />
                        );
                    })}
                <InfoWindow
                    visible={showingInfoWindow}
                    marker={activeMarker}
                    onClose={this.windowHasClosed}
                >
                    {this.renderInfo(selectedPlace)}
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: GOOGLE_MAPS_API_KEY
})(MapContainer);
