import { Link } from "react-router";
<<<<<<< HEAD
import Table from "../shared/Table/Table";
=======
import Table from "@/shared/table/Table";
>>>>>>> ad14cd14bb79c261220ddfab54334ca6b77b01e6
import ottoLogo from '@/assets/otto-logo.png';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GeneralSales(){
    return(
<<<<<<< HEAD
        <section className=" min-h-screen">

            <header className="bg-yellow-otto-light flex items-center justify-center h-[10dvh] text-[clamp(1.2rem,3vw,1.8rem)] text-shadow-md font-bold text-white sticky top-0 z-50 border-b border-b-amber-50">
                <Link to={'/home'} className="absolute left-6">
                    <button className=" ">
                        <span className="inline-block transition-transform duration-300 hover:-translate-x-1">
                            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
=======
        <section className="min-h-screen">

            <header className="bg-yellow-otto-light flex items-center justify-center h-[10dvh] text-[clamp(1.2rem,3vw,1.8rem)] text-shadow-md font-bold text-white sticky top-0 z-50 border-b border-b-amber-50">
                <Link to={'/home'} className="absolute left-6">
                    <button>
                        <span className="inline-block transition-transform duration-300 hover:-translate-x-1 cursor-pointer">
                            <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
>>>>>>> ad14cd14bb79c261220ddfab54334ca6b77b01e6
                        </span>
                    </button>
                </Link>  
                Historial
            </header>

            
            <div className="p-8">
                <div className=" flex flex-row text-4xl font-black text-black tracking-tighter text-left mb-6">
                    <h1>Historial de ventas historico</h1>
                </div>

                <div className="flex items-center justify-start w-full h-full">
                    <Table rowData={[]}/>
                </div>
            </div>

            <div
<<<<<<< HEAD
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-no-repeat bg-center opacity-10 pointer-events-none"
=======
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-full h-full bg-no-repeat bg-center opacity-10 pointer-events-none"
>>>>>>> ad14cd14bb79c261220ddfab54334ca6b77b01e6
                style={{
                    backgroundImage: `url(${ottoLogo})`,
                    backgroundSize: 'calc(20vw + 20vh)'
                }}
            />
        </section>
    )
}