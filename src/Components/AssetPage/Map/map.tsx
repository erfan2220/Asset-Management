import {useState} from "react";
import {Items1, Items2, Items3} from "./DataBase/dataScores";
import {Items4} from "./DataBase/dataAssets";
import LeafletMap from "./leafletMap/Leaflet";





const Map = () => {
    const [currentTab, setCurrentTab] = useState(0)
    const [currentIndex,setCurrentIndex]=useState(1)


    const DegreeIcon =()=> (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.7833 15.0059L19.3525 6.60829C19.4188 6.54328 19.4976 6.4917 19.5843 6.45651C19.671 6.42133 19.7639 6.40321 19.8577 6.40321C19.9515 6.40321 20.0444 6.42133 20.1311 6.45651C20.2178 6.4917 20.2966 6.54328 20.3629 6.60829C20.4293 6.67331 20.4819 6.7505 20.5178 6.83545C20.5537 6.9204 20.5722 7.01145 20.5722 7.1034C20.5722 7.19535 20.5537 7.2864 20.5178 7.37135C20.4819 7.4563 20.4293 7.53349 20.3629 7.59851L11.7938 15.9961C11.7274 16.0611 11.6486 16.1127 11.562 16.1479C11.4753 16.1831 11.3824 16.2012 11.2885 16.2012C11.1947 16.2012 11.1018 16.1831 11.0151 16.1479C10.9284 16.1127 10.8497 16.0611 10.7833 15.9961C10.717 15.9311 10.6643 15.8539 10.6284 15.769C10.5925 15.684 10.574 15.5929 10.574 15.501C10.574 15.409 10.5925 15.318 10.6284 15.233C10.6643 15.1481 10.717 15.0709 10.7833 15.0059ZM12.0026 9.2028C12.6229 9.20203 13.2392 9.30042 13.8271 9.49409C13.9164 9.52511 14.0111 9.53841 14.1057 9.53323C14.2002 9.52804 14.2928 9.50448 14.378 9.46389C14.4632 9.42331 14.5392 9.36653 14.6018 9.29686C14.6644 9.22718 14.7122 9.146 14.7425 9.05805C14.7727 8.97009 14.7848 8.87712 14.778 8.78454C14.7713 8.69196 14.7458 8.60162 14.7031 8.51878C14.6603 8.43595 14.6012 8.36228 14.5291 8.30205C14.4571 8.24182 14.3735 8.19624 14.2833 8.16797C13.1453 7.79201 11.9289 7.70337 10.7467 7.91025C9.56452 8.11713 8.45464 8.61284 7.51977 9.35154C6.5849 10.0902 5.85523 11.0481 5.39825 12.1364C4.94128 13.2247 4.77177 14.4084 4.9054 15.578C4.92472 15.749 5.00768 15.9071 5.13842 16.022C5.26917 16.1369 5.43853 16.2006 5.61415 16.2008C5.64003 16.2008 5.66681 16.2008 5.69359 16.1964C5.88178 16.176 6.05398 16.0831 6.17233 15.9383C6.29067 15.7934 6.34547 15.6085 6.32467 15.424C6.30143 15.2172 6.28981 15.0093 6.28986 14.8012C6.29151 13.3169 6.89392 11.8939 7.96492 10.8443C9.03591 9.79477 10.488 9.20442 12.0026 9.2028ZM20.9056 10.34C20.8628 10.2582 20.804 10.1855 20.7326 10.1259C20.6611 10.0664 20.5784 10.0213 20.4891 9.99309C20.3998 9.96491 20.3058 9.95423 20.2123 9.96166C20.1188 9.9691 20.0277 9.99451 19.9443 10.0364C19.8608 10.0784 19.7866 10.136 19.7259 10.206C19.6651 10.2761 19.6191 10.3571 19.5903 10.4446C19.5615 10.5321 19.5506 10.6243 19.5582 10.7159C19.5658 10.8075 19.5918 10.8968 19.6345 10.9785C20.1628 11.9952 20.4748 13.1065 20.5516 14.245C20.6283 15.3835 20.4681 16.5253 20.0808 17.6013L3.91549 17.5952C3.46447 16.3282 3.32903 14.9739 3.52045 13.6453C3.71187 12.3166 4.2246 11.052 5.01592 9.95693C5.80723 8.86186 6.8542 7.96801 8.06954 7.34991C9.28487 6.73181 10.6334 6.40736 12.0026 6.4036H12.0812C13.4111 6.4118 14.7204 6.72643 15.9034 7.32209C15.9871 7.36723 16.0792 7.39545 16.1742 7.40509C16.2692 7.41473 16.3652 7.40558 16.4566 7.3782C16.5479 7.35082 16.6327 7.30576 16.706 7.24568C16.7792 7.18559 16.8395 7.11172 16.8831 7.02843C16.9267 6.94513 16.9528 6.85411 16.9598 6.76076C16.9669 6.6674 16.9548 6.5736 16.9242 6.48491C16.8936 6.39623 16.8452 6.31446 16.7817 6.24445C16.7183 6.17444 16.6412 6.11761 16.555 6.07732C14.7742 5.18344 12.7606 4.83376 10.7748 5.07354C8.78902 5.31331 6.9223 6.13149 5.41616 7.42226C3.91001 8.71302 2.83373 10.417 2.32654 12.3137C1.81935 14.2104 1.90457 16.2127 2.5712 18.0614C2.66968 18.3353 2.8523 18.5726 3.09397 18.7407C3.33564 18.9087 3.6245 18.9993 3.92084 19H20.0835C20.3797 19.0002 20.6686 18.9101 20.9103 18.7423C21.1519 18.5744 21.3343 18.3371 21.4323 18.0631C21.8827 16.8078 22.0682 15.4759 21.9777 14.1482C21.8872 12.8204 21.5224 11.5246 20.9056 10.3391V10.34Z"
                fill={ currentTab ===0? "#FFF":"#616161"}/>
        </svg>
    )
    const WifiIcon =()=> (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.8118 12.3357C10.8118 11.9534 11.1217 11.6436 11.5039 11.6436C11.8862 11.6436 12.1961 11.9534 12.1961 12.3357V21.4327C12.1961 21.815 11.8862 22.1249 11.5039 22.1249C11.1217 22.1249 10.8118 21.815 10.8118 21.4327V12.3357Z"
                fill={ currentTab ===1? "#FFF":"#616161"}/>
            <path
                d="M13.1846 11.1497C13.1846 12.0781 12.432 12.8307 11.5036 12.8307C10.5752 12.8307 9.82263 12.0781 9.82263 11.1497C9.82263 10.2213 10.5752 9.46875 11.5036 9.46875C12.432 9.46875 13.1846 10.2213 13.1846 11.1497Z"
                fill={ currentTab ===1? "#FFF":"#616161"}/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.7379 7.19505C11.0721 7.18864 10.4167 7.35769 9.83887 7.68458C9.26102 8.01144 8.78155 8.48424 8.44889 9.0542C8.11625 9.62412 7.94214 10.271 7.94391 10.9289C7.94569 11.5868 8.12329 12.2328 8.45901 12.8009C8.65348 13.1301 8.54433 13.5545 8.21522 13.749C7.88612 13.9434 7.46167 13.8343 7.2672 13.5052C6.80635 12.7253 6.56203 11.8375 6.55959 10.9327C6.55715 10.0278 6.79667 9.13875 7.25331 8.35638L7.8511 8.70529L7.25331 8.35638C7.70993 7.57405 8.36712 6.92663 9.15729 6.47966C9.94743 6.03271 10.8425 5.80203 11.7512 5.81079C12.6599 5.81954 13.5504 6.06742 14.3317 6.52954C15.113 6.99167 15.7574 7.65168 16.1987 8.4427C16.6399 9.23376 16.862 10.1273 16.8419 11.0319C16.8218 11.9366 16.5601 12.8194 16.0841 13.5903C15.8833 13.9155 15.4568 14.0164 15.1315 13.8155C14.8063 13.6147 14.7054 13.1882 14.9063 12.8629C15.2531 12.3013 15.4433 11.6589 15.4579 11.0011C15.4726 10.3434 15.3111 9.69326 14.9897 9.11708C14.6683 8.54087 14.1982 8.05896 13.6269 7.72105C13.0556 7.38311 12.4037 7.20147 11.7379 7.19505Z"
                  fill={ currentTab ===1? "#FFF":"#616161"}/>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M15.4785 4.66998C14.277 3.95588 12.8922 3.59718 11.4891 3.63737C10.0859 3.67756 8.72473 4.1149 7.56742 4.89641C6.41019 5.67786 5.50593 6.77023 4.96096 8.04261C4.41602 9.31492 4.25287 10.7145 4.49051 12.0751C4.72815 13.4358 5.35684 14.7016 6.30302 15.7214C6.56302 16.0016 6.54661 16.4396 6.26637 16.6996C5.98614 16.9596 5.54819 16.9432 5.28819 16.6629C4.16134 15.4484 3.4107 13.9387 3.12682 12.3133C2.84293 10.6878 3.03801 9.01618 3.68844 7.49758C4.33883 5.97907 5.41674 4.67832 6.7927 3.74916C8.16857 2.82006 9.78491 2.30128 11.4494 2.25361C13.114 2.20594 14.7579 2.63133 16.1857 3.47998C17.6137 4.32868 18.766 5.56532 19.5043 7.04384C20.2427 8.52244 20.5356 10.18 20.3476 11.8191C20.1596 13.4581 19.4988 15.0084 18.445 16.2857C18.2017 16.5805 17.7654 16.6223 17.4705 16.3791C17.1757 16.1358 17.1339 15.6995 17.3772 15.4047C18.2617 14.3326 18.8149 13.0333 18.9723 11.6613C19.1296 10.2895 18.8846 8.9015 18.2658 7.66231C17.6469 6.42303 16.6799 5.38404 15.4785 4.66998Z"
                  fill={ currentTab ===1? "#FFF":"#616161"}/>
        </svg>

    )




    const iconUrl = [
        {
            iconName: "Scores",
            svgIcon: <DegreeIcon/>
        },
        {
            iconName: "assets",
            svgIcon: <WifiIcon/>
        }
    ]

    const handleClick = (index: number) => {
        setCurrentTab(index)
    }

    const handleIndex = (index: number) => {
        setCurrentIndex(index)
    }



    return (
        <div className="relative w-full h-[641px] rounded-[16px] border-[1px]  overflow-hidden">
            <LeafletMap/>
            <div className=" z-50 absolute right-[20px] top-[20px] flex flex-col bg-white w-[40px] h-[80px] justify-center items-center
            rounded-[4px]  border-[1px]">

                {iconUrl.map((icon, index) =>
                        <div className={currentTab === index ? "relative flex items-center justify-center p-[8px] bg-black" :
                            "flex items-center justify-center bg-white p-[8px]"}>
                            <div key={index} className="relative cursor-pointer" onClick={() => handleClick(index)}>
                                {icon.svgIcon}
                            </div>

                            {
                                currentTab ===0 && (
                                    <div className="z-50 absolute right-[56px] top-0 bg-white rounded-[4px]
                                 w-[188px] h-[371px] py-[16px] ">
                                        <div className="flex flex-col pb-[8px] border-b-[1px] px-[16px]">
                                            <h2>Scores</h2>
                                            <span className="text-[12px] opacity-50">Layer</span>
                                        </div>
                                        <div
                                            className="flex flex-col gap-[12px] pt-[8px] px-[16px]  pb-[6px]  border-opacity-10">
                                            {Items1.map((item) => (
                                                <div className="flex flex-row gap-[6px] items-center">
                                                    <div
                                                        className={currentIndex === item.index ? "w-[16px] h-[16px] rounded-full border-[1px] border-[#007bFF]  p-[3px] justify-center items-center" :
                                                            "w-[16px] h-[16px] rounded-full border-[1px] border-[#212121] opacity-50 justify-center items-center"}
                                                        onClick={() => handleIndex(item.index)}>
                                                        {currentIndex ===item.index &&(
                                                            <div className=" w-[8px] h-[8px] rounded-full bg-[#66B0FF] p-[4px]">

                                                            </div>
                                                        )}
                                                    </div>
                                                    <span>{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div
                                            className="flex flex-col gap-[12px] pt-[8px] px-[16px]  pb-[6px]  border-opacity-10">
                                            {Items2.map((item) => (
                                                <div className="flex flex-row gap-[6px] items-center">
                                                    <div
                                                        className={currentIndex === item.index ? "w-[16px] h-[16px] rounded-full border-[1px] border-[#007bFF]  p-[3px] justify-center items-center" :
                                                            "w-[16px] h-[16px] rounded-full border-[1px] border-[#212121] opacity-50 justify-center items-center"}
                                                        onClick={() => handleIndex(item.index)}>
                                                        {currentIndex ===item.index &&(
                                                            <div className=" w-[8px] h-[8px] rounded-full bg-[#66B0FF] p-[4px]">

                                                            </div>
                                                        )}
                                                    </div>
                                                    <span>{item.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div
                                            className="flex flex-col gap-[12px] pt-[8px] px-[16px]  pb-[6px]  border-opacity-10">
                                            {Items3.map((item) => (
                                                <div className="flex flex-row gap-[6px] items-center">
                                                    <div
                                                        className={currentIndex === item.index ? "w-[16px] h-[16px] rounded-full border-[1px] border-[#007bFF]  p-[3px] justify-center items-center" :
                                                            "w-[16px] h-[16px] rounded-full border-[1px] border-[#212121] opacity-50 justify-center items-center"}
                                                        onClick={() => handleIndex(item.index)}>
                                                        {currentIndex ===item.index &&(
                                                            <div className=" w-[8px] h-[8px] rounded-full bg-[#66B0FF] p-[4px]">

                                                            </div>
                                                        )}
                                                    </div>
                                                    <span>{item.name}</span>
                                                </div>
                                            ))}
                                        </div>


                                    </div>
                                )
                            }
                            {
                                currentTab === 1 && (
                                    <div>
                                    <div className="z-50 absolute right-[56px] top-0 bg-white rounded-[4px]
                                 w-[188px] h-[371px] py-[16px] ">
                                        {/*<div className="flex flex-col pb-[8px] border-b-[1px] px-[16px]">*/}
                                        {/*    <h2>Assets</h2>*/}
                                        {/*    <span className="text-[12px] opacity-50">Layer</span>*/}
                                        {/*</div>*/}
                                        <div className="flex flex-col gap-[12px] pt-[8px] px-[16px]
                                    pb-[6px] border-b-[1px] border-b-[#000] border-opacity-10">
                                            {Items4.map((item) => (
                                                <div className="flex flex-row gap-[6px] items-center">
                                                    <div
                                                        className={currentIndex === item.index ? "w-[16px] h-[16px] rounded-full border-[1px] border-[#007bFF]  p-[3px] justify-center items-center" :
                                                            "w-[16px] h-[16px] rounded-full border-[1px] border-[#212121] opacity-50 justify-center items-center"}
                                                        onClick={() => handleIndex(item.index)}>
                                                        {currentIndex ===item.index &&(
                                                            <div className=" w-[8px] h-[8px] rounded-full bg-[#66B0FF] p-[4px]">

                                                            </div>
                                                        )}
                                                    </div>
                                                    <span>{item.name}</span>
                                                </div>
                                            ))}
                        </div>



                    </div>



                                    </div>
                    )
                }


            </div>)}


            </div>

            {
                currentTab===0 && (
                    <div className="z-40 absolute left-[20px] bottom-[20px] w-[165px] h-[194px] flex flex-col gap-[14px]
            bg-white py-[18px] border-[1px] rounded-[4px] justify-between p-[18px]">
                        <div className="flex flex-row justify-between items-center">
                            <h2>Health</h2>
                            <span className="text-[12px] opacity-60">July 2024</span>
                        </div>

                        <h2 className="text-[12px]">Good Health</h2>
                        <h2 className="text-[12px]">Good Health</h2>
                        <h2 className="text-[12px]">Good Health</h2>
                        <h2 className="text-[12px]">Good Health</h2>


                    </div>
                )
            }
            {
                currentTab===1 && (
                    <div className="z-40 absolute left-[20px] bottom-[20px] w-[165px] h-[194px] flex flex-col gap-[14px]
            bg-white py-[18px] border-[1px] rounded-[4px] justify-between p-[18px]">
                        <div className="flex flex-row justify-between items-center">
                            <h2>Criticaly</h2>
                            <span className="text-[12px] opacity-60">July 2024</span>
                        </div>

                        <h2 className="text-[12px]">A</h2>
                        <h2 className="text-[12px]">B</h2>
                        <h2 className="text-[12px]">C</h2>
                        <h2 className="text-[12px]">D</h2>


                    </div>
                )
            }


        </div>
    );
};

export default Map;