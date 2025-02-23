import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import CategoryCarousel from "./CategoryCaraousel";
import LatestJobs from "./LatestJob";
import Footer from "./Footer";
import useGetAllJobs from "./Hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import store from "../redux/store";

const Home=()=>{
    useGetAllJobs();
    const {user}=useSelector(store=>store.auth)
    const navigate=useNavigate()
    useEffect(()=>{
        if(user?.role==='recruiter'){
            navigate("/admin/companies")
        }
    },[])
    return(
        <>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
        </>
    )
}
export default Home