//@ts-nocheck
import MapPerProvince from "../../../Components/MapPage/MapPerProvince";
import IranProvincesMap from "../../../Components/AssetPage/IranMapWrapper/IranMapWrapper";
import React, { lazy, Suspense } from 'react';
import { IranMap } from 'react-iran-map'

const AssetView2 = ({ provinceName, cityName, mapIranData, selectProvinceHandler, selectedProvince, mapProvincesData, selectProvinceHandler2, setCityName }) =>
{
    return (
        <Suspense fallback={<div>Loading Map...</div>}>
            {
                (provinceName === "" && cityName === "") ? (
                    <IranMap
                        data={mapIranData}
                        colorRange="78, 132, 243"
                        width={600}
                        textColor="#000"
                        defaultSelectedProvince=""
                        deactiveProvinceColor="#eee"
                        selectedProvinceColor="#3bcc6d"
                        tooltipTitle="Traffic CS: "
                        selectProvinceHandler={selectProvinceHandler}
                    />
                ) : (provinceName !== "" && cityName === "") ? (
                    <IranProvincesMap
                        province={selectedProvince}
                        provinceData={mapProvincesData}
                        colorRange="78, 132, 243"
                        deactiveProvinceColor="#eee"
                        selectedProvinceColor="#3bcc6d"
                        tooltipTitle="تعداد:"
                        textColor="#000"
                        width={600}
                        selectProvinceHandler={selectProvinceHandler2}
                        setCityName2={setCityName}
                        cityName2={cityName}
                    />
                ) : (
                    <div className="w-full h-full">
                        <MapPerProvince cityName={cityName} ProvinceName={provinceName} />
                    </div>
                )
            }
        </Suspense>
    );
};

export default AssetView2;