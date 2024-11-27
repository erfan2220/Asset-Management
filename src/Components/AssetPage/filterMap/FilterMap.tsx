//@ts-nocheck
import "./FilterMap.css";
import LeafletFilter from "./leafletPoints/leafletFiltersPoints";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import LoadingProgress from "../../Loading/Loading";

// Define the Point interface
interface Point {
    latitude: number;
    longitude: number;
    sitename: string;
    tech: string;
    type: 'BTS' | 'BSC' | 'MSC' | 'RNC' | 'nodeB' | 'enodeb';
}

const FilterMap = ({ techs, setSiteNameClicked,provinceName }) =>
{
    const [points, setPoints] = useState<Point[]>([]);
    const [loading, setLoading] = useState(true);

    // Memoize techs to prevent unnecessary re-renders
    const stableTechs = useMemo(() => techs, [techs]);

    useEffect(() => {
        const fetchPoints = async () => {
            console.log("fetchPoints called"); // Debugging log
            setLoading(true);
            try {
                const fetchPromises = stableTechs.map((tech) =>
                {
                    let apiTech = '';
                    // Define API URLs based on the tech type
                    if(provinceName ==="")
                    {
                        if (tech.tech === "2G" && tech.type === "BTS") {
                            apiTech = "http://10.15.90.72:9098/api/report/asset/technology/2G";
                        } else if (tech.type === "nodeb") {
                            apiTech = "http://10.15.90.72:9098/api/report/asset/technology/3G";
                        } else if (tech.type === "enodeb") {
                            apiTech = "http://10.15.90.72:9098/api/report/asset/technology/4G";
                        } else if (tech.type === "RNC" || tech.type === "BSC") {
                            apiTech = "http://10.15.90.87:5001/api/assets/bsc_list";
                        } else if (tech.type === "MSC") {
                            apiTech = "http://10.15.90.87:5001/api/assets/msc_list";
                        }
                    }
                    // Define API URLs based on the tech type for every Province
                    else
                    {
                        if (tech.tech === "2G" && tech.type === "BTS") {
                            apiTech = `http://10.15.90.72:9098/api/report/asset/fix-multiple-technology?technologies=2G&province=${provinceName}`;
                        } else if (tech.type === "nodeb") {
                            apiTech = `http://10.15.90.72:9098/api/report/asset/fix-multiple-technology?technologies=3G&province=${provinceName}`;
                        } else if (tech.type === "enodeb") {
                            apiTech = `http://10.15.90.72:9098/api/report/asset/fix-multiple-technology?technologies=4G&province=${provinceName}`;
                        } else if (tech.type === "RNC" || tech.type === "BSC") {
                            apiTech = `http://10.15.90.72:9098/api/report/asset/fix-multiple-technology?technologies=BSC&province=${provinceName}`;
                        } else if (tech.type === "MSC") {
                            apiTech = `http://10.15.90.72:9098/api/report/asset/fix-multiple-technology?technologies=MSC&province=${provinceName}`;
                        }
                    }

                    return axios.get(apiTech).then(response =>
                    {
                        return {
                            tech: tech.tech,
                            type: tech.type,
                            data: response.data.data || response.data
                        };
                    });
                });

                // Wait for all fetch promises to resolve
                const results = await Promise.all(fetchPromises);
                const allPoints: Point[] = [];

                results.forEach(result => {
                    const { tech, type, data } = result;

                    if (type === "nodeb") {
                        console.log("nodeb data:", data); // Log data for enodeb
                    }

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

    return (
        <div>
            {loading ? <LoadingProgress /> :
                <div className="map_data_information_base_category">
                    <LeafletFilter points={points} setSiteNameClicked={setSiteNameClicked} />
                </div>
            }
        </div>
    );
};

export default FilterMap;
