//@ts-nocheck
import "./TechMap.css";
import LeafletFilter from "../filterMap/leafletPoints/leafletFiltersPoints";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import LoadingProgress from "../../Loading/Loading";
import TechChooser from "../filterMap/TechChooser/TechChooser";
import {provinceMapping2} from "../../../database/dictionaryProvinces/provinceMapping";

// Define the Point interface
interface Point {
    latitude: number;
    longitude: number;
    sitename: string;
    tech: string;
    type: 'Single-Tech'|'Multi-Tech'|'BTS' | 'BSC' | 'MSC' | 'RNC' | 'nodeB' | 'enodeb';
}


const TechMap = ({ techs, setSiteNameClicked,provinceName }) =>
{
    const [points, setPoints] = useState<Point[]>([]);
    const [loading, setLoading] = useState(true);
    const techArray = [];


    // Memoize techs to prevent unnecessary re-renders
    const stableTechs = useMemo(() => techs, [techs]);
        let api;
        useEffect(() => {
            const fetchPoints = async () => {
                console.log("fetchPoints called"); // Debugging log
                setLoading(true);
                try {
                    const fetchPromises = stableTechs.map((tech) =>
                    {


                    // if (tech.type.includes("2G")) {
                    //     techArray.push("2G");
                    // }
                    // if (tech.type.includes("3G")) {
                    //     techArray.push("3G");
                    // }
                    // if (tech.type.includes("4G")) {
                    //     techArray.push("4G");
                    // }
                    // if (tech.type.includes("5G")) {
                    //     techArray.push("5G");
                    // }
                    // if (tech.type.includes("2G-3G")) {
                    //     techArray.push("2G,3G");
                    // }
                    // if (tech.type.includes("2G-4G")) {
                    //     techArray.push("2G,4G");
                    // }
                    // if (tech.type.includes("All-Tech")) {
                    //     techArray.push("2G,3G,4G");
                    // }
                        if (tech.type === "2G") {
                            techArray.push("2G");
                        }
                        if (tech.type === "3G") {
                            techArray.push("3G");
                        }
                        if (tech.type === "4G") {
                            techArray.push("4G");
                        }
                        if (tech.type === "5G") {
                            techArray.push("5G");
                        }
                        if (tech.type === "2G3G") {
                            techArray.push("2G3G");
                        }
                        if (tech.type === "2G4G") {
                            techArray.push("2G4G");
                        }
                        if (tech.type === "2G5G") {
                            techArray.push("2G5G");
                        }
                        if (tech.type === "3G4G") {
                            techArray.push("3G4G");
                        }
                        if (tech.type === "3G5G") {
                            techArray.push("3G5G");
                        }
                        if (tech.type === "4G5G") {
                            techArray.push("4G5G");
                        }
                        if (tech.type === "2G3G5G") {
                            techArray.push("2G3G5G");
                        }
                        if (tech.type === "2G3G4G") {
                            techArray.push("2G3G4G");
                        }
                        if (tech.type === "2G4G5G") {
                            techArray.push("2G4G5G");
                        }
                        if (tech.type === "3G4G5G") {
                            techArray.push("3G4G5G");
                        }

                        if (tech.type === "All-Tech") {
                            techArray.push("2G3G4G5G");
                        }



                    const apiTech = techArray

                    console.log("apiTech:", apiTech);

                    if(provinceName === "")
                    {
                        api=`http://10.15.90.72:9098/api/report/asset/multiple-technology?technologies=${apiTech}`
                    }
                    else
                    {
                        api=`http://10.15.90.72:9098/api/report/asset/fix-multiple-technology?technologies=${apiTech}&province=${provinceMapping2[provinceName]}`
                    }




                    return axios.get(api).then(response =>
                    {
                     console.log("respoooosoososososo",response.data)
                        return {
                            tech: tech.tech,
                            type: tech.type,
                            data: response.data
                        };
                    });
                });

                // Wait for all fetch promises to resolve
                const results = await Promise.all(fetchPromises);
                const allPoints: Point[] = [];

                results.forEach(result => {
                    const { tech, type, data } = result;



                    // Map and parse points, then add to allPoints array
                    const pointsWithLatLong = data.map(point => ({
                        latitude: parseFloat(point.latitude),
                        longitude: parseFloat(point.longitude),
                        sitename: type === "MSC" || type === "RNC" || type === "BSC" ? point.code_site : point.assetName,
                        tech,
                        type,
                    } as Point));
                    allPoints.push(...pointsWithLatLong);
                });

                // Use Set to remove duplicate points by creating a unique key from latitude and longitude
                const uniquePoints = Array.from(
                    new Set(allPoints.map(p => `${p.latitude},${p.longitude}`))
                ).map(key => {
                    const [latitude, longitude] = key.split(',').map(parseFloat);
                    return allPoints.find(p => p.latitude === latitude && p.longitude === longitude);
                });

                // Optional: Limit the points array size if necessary
                const limitedPoints = uniquePoints.slice(0, 5000); // Adjust the limit as needed

                console.log("limitedPoints",limitedPoints)
                setPoints(uniquePoints);
            } catch (error) {
                console.error("Error fetching points:", error); // Improved error handling
            } finally {
                setLoading(false);
            }
        };

        fetchPoints();
    }, [stableTechs]);

    console.log("pointtts",points)
    return (
        <div>
            {loading ? <LoadingProgress /> :
                <div className="map_data_information_base_category">
                    <TechChooser points={points} setPoints={setPoints} setSiteNameClicked={setSiteNameClicked} />
                </div>
            }
        </div>
    );
};

export default TechMap;