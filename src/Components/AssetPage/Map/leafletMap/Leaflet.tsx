//@ts-nocheck
import React, {useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Leaflet.css';

const CustomMarkerIcon = ({fillColor='#000'}) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 1.25C8.17727 1.25207 6.42979 1.97706 5.14092 3.26592C3.85206 4.55479 3.12707 6.30227 3.125 8.125C3.125 14.0078 9.375 18.4508 9.64141 18.6367C9.74649 18.7103 9.87169 18.7498 10 18.7498C10.1283 18.7498 10.2535 18.7103 10.3586 18.6367C10.625 18.4508 16.875 14.0078 16.875 8.125C16.8729 6.30227 16.1479 4.55479 14.8591 3.26592C13.5702 1.97706 11.8227 1.25207 10 1.25ZM10 5.625C10.4945 5.625 10.9778 5.77162 11.3889 6.04633C11.8 6.32103 12.1205 6.71148 12.3097 7.16829C12.4989 7.62511 12.5484 8.12777 12.452 8.61273C12.3555 9.09768 12.1174 9.54314 11.7678 9.89277C11.4181 10.2424 10.9727 10.4805 10.4877 10.577C10.0028 10.6734 9.50011 10.6239 9.04329 10.4347C8.58648 10.2455 8.19603 9.92505 7.92133 9.51393C7.64662 9.1028 7.5 8.61945 7.5 8.125C7.5 7.46196 7.76339 6.82607 8.23223 6.35723C8.70107 5.88839 9.33696 5.625 10 5.625Z"
            fill={fillColor}
        />
    </svg>
);



const getMarkerColor = (value) => {
    if (value < 20) return '#ff0000'; // Red
    if (value < 50) return '#ffff00'; // Yellow
    return '#00ff00'; // Green
};


const dataPoints = [
    { id: 1, position: [51.505, -0.09], value: 10 },
    { id: 2, position: [51.515, -0.1], value: 30 },
    { id: 3, position: [51.525, -0.11], value: 60 },
];


const LeafletMap = () =>
{
    const [tooltipOpen, setTooltipOpen] = useState(null);
    const [actionOpen, setActionOpen] = useState(null);
    const [tooltipContent, setTooltipContent] = useState(null);

    const handleMarkerClick = (point) => {
        setTooltipOpen((prev) => (prev === point.id ? null : point.id));
        setTooltipContent(point); // Save the content to display in the tooltip
    };
    const handleAction = () =>
    {
       setActionOpen(true)
    };

    const defaultIcon = L.icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    L.Marker.prototype.options.icon = defaultIcon;

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" ,position:"relative"}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {dataPoints.map(point => (
                <Marker
                    key={point.id}
                    position={point.position}
                    icon={L.divIcon({
                        className: 'custom-icon',
                        html: `<div style="background-color: ${getMarkerColor(point.value)}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white;"></div>`,
                        iconSize: [30, 30],
                        iconAnchor: [15, 30], // Adjust anchor point
                    })}
                    eventHandlers={{
                        click: () => handleMarkerClick(point),
                    }}
                />
            ))}

            {tooltipOpen && (
                <div className="centered-tooltip">
                    <div className="  p-[20px] w-[442px] h-[480px] flex flex-col ">

                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-[10px] items-center">
                                <img src="/images/Asset/map/tooltip/tooltip.svg" alt="" width={40} height={40}/>
                                <h2 className="text-[#007BFF] text-[14px] font-[600]">Asset name........</h2>
                            </div>
                            <img src="/images/Asset/map/tooltip/close.svg" alt="" className="cursor-pointer"
                                 onClick={() =>{
                                     setTooltipOpen(null)
                                     setActionOpen(null)
                                 }}/>
                        </div>
                        <div className="flex flex-row items-center justify-between mt-[15px]">

                            <div className="flex flex-row gap-[4px] items-center text-[14px] text-[#616161]">
                                <img src="/images/Asset/map/tooltip/Pump.svg" alt=""/>
                                <span>Pump</span>
                            </div>

                            <div className="flex flex-row gap-[4px] items-center text-[14px] text-[#616161]">
                                <img src="/images/Asset/map/tooltip/Unspecified.svg" alt=""/>
                                <span>Unspecified</span>
                            </div>


                        </div>

                        <div className="mt-[12px] text-[14px] text-[#616161]">
                            <h3>Centrifugal pump 10005</h3>
                        </div>

                        <div className="mt-[11px] flex flex-row justify-between">
                            <img src="/images/Asset/map/tooltip/flag.svg" alt=""/>
                            <h3 className="text-[14px] font-[400]">Replaced</h3>
                        </div>

                        <div
                            className="mt-[38px] flex flex-row justify-between text-[14px] font-[600] pr-[45px]">
                            <h2>Health</h2>
                            <h3>Criticaly</h3>
                        </div>

                        <div className="mt-[6px] flex flex-row justify-between text-[14px] font-[600]">

                            <div
                                className="flex flex-row items-center gap-[8px] pr-[43px] border-b-[1px] border-b-[#EEEEEE]">
                                <img src="/images/Asset/map/tooltip/marker.svg" alt="" width={20} height={20}/>
                                <div className="flex flex-col gap-[4px] pb-[6px]">
                                    <h2 className="text-[20px]">96</h2>
                                    <span className="text-[12px]">Good</span>
                                </div>
                            </div>

                            <div
                                className="flex flex-row items-center gap-[8px] pr-[43px] border-b-[1px] border-b-[#EEEEEE] ">
                                <img src="/images/Asset/map/tooltip/marker.svg" alt="" width={20} height={20}/>
                                <div className="flex flex-col gap-[4px] pb-[6px] ">
                                    <h2 className="text-[20px]">75</h2>
                                    <span className="text-[12px]">B</span>
                                </div>
                            </div>

                        </div>


                        <div
                            className="mt-[38px] flex flex-row justify-between text-[14px] font-[600] pr-[45px]">
                            <h2>Risk</h2>
                            <h3>End of life</h3>
                        </div>

                        <div className="mt-[6px] flex flex-row justify-between text-[14px] font-[600]">

                            <div
                                className="flex flex-row items-center gap-[8px] pr-[43px] border-b-[1px] border-b-[#EEEEEE]">
                                <img src="/images/Asset/map/tooltip/marker.svg" alt="" width={20} height={20}/>
                                <div className="flex flex-col gap-[4px] pb-[6px]">
                                    <h2 className="text-[20px]">3</h2>
                                    <span className="text-[12px]">Good</span>
                                </div>
                            </div>

                            <div
                                className="flex flex-row items-center gap-[8px] pr-[43px] border-b-[1px] border-b-[#EEEEEE] ">
                                <CustomMarkerIcon fillColor="#000"/>
                                <div className="flex flex-col gap-[4px] pb-[6px] ">
                                    <h2 className="text-[20px]">--</h2>
                                    <span className="text-[12px]">No score</span>
                                </div>
                            </div>


                        </div>


                        <div className="flex flex-row justify-between mt-[20px]">
                            <h3 className="text-[12px] font-[400]">score last calculated : 8/6/23</h3>
                            <div className="relative bg-[#007BFF] text-white text-[#15px] rounded-[4px]
                            cursor-pointer flex flex-row gap-[8px] py-[8px] pl-[16px] pr-[12px]"
                                 onClick={()=>setActionOpen(!actionOpen)}>
                                <h2>Actions</h2>
                                <img src="/images/Asset/map/tooltip/arrowDown.svg" alt=""/>
                                {actionOpen && (
                                    <div className="z-50 bg-white absolute right-0 bottom-[44px]
                                  border-[1px] border-[#E0e0e0] rounded-[4px] py-[8px] px-[19px]">
                                        <div className="flex flex-col gap-[16px] pb-[8px] border-b-[1px] border-b-[#EEEEEE]">
                                            <p className="text-[12px] text-[#616161] text-nowrap">Create Service
                                                Request</p>
                                            <p className="text-[12px] text-[#616161] text-nowrap">Create Work Order</p>
                                        </div>
                                        <div className="flex flex-col gap-[16px] py-[8px] border-b-[1px] border-b-[#EEEEEE]">
                                            <p className="text-[12px] text-[#616161] text-nowrap">Create plan</p>
                                            <p className="text-[12px] text-[#616161] text-nowrap">Add flag</p>
                                        </div>
                                        <div className="flex flex-col gap-[16px] py-[8px] border-b-[1px] border-b-[#EEEEEE]">
                                            <p className="text-[12px] text-[#616161] text-nowrap">Recalculate Scores</p>
                                        </div>
                                        <div className="flex flex-col gap-[16px] pt-[8px]">
                                            <p className="text-[12px] text-[#616161] text-nowrap">Edit source asset record</p>
                                        </div>
                                    </div>
                                )}


                            </div>
                        </div>
                    </div>
                </div>
            )}

        </MapContainer>
    )
        ;
};

export default LeafletMap;